import type { Env } from "../_shared/types";
import { calendlyFetch } from "../_shared/calendly";

const DEFAULT_WINDOW_DAYS = 6; // kept safely under Calendly's documented ~1-week request-range cap.

interface AvailableTimesResponse {
  collection: Array<{
    status: string;
    start_time: string;
    scheduling_url: string;
  }>;
}

/**
 * GET /api/availability?start=<ISO>&end=<ISO>
 *
 * Proxies Calendly's `event_type_available_times` for the configured
 * consultation event type. Calendly caps how wide a single request's date
 * range can be — if a caller asks for a window Calendly rejects, that error
 * is surfaced as-is rather than silently truncated.
 */
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!env.CALENDLY_EVENT_TYPE_URI) {
    return jsonError("CALENDLY_EVENT_TYPE_URI is not configured.", 500);
  }

  const url = new URL(request.url);
  const now = new Date();
  const start = url.searchParams.get("start") ?? now.toISOString();
  const end =
    url.searchParams.get("end") ??
    new Date(now.getTime() + DEFAULT_WINDOW_DAYS * 24 * 60 * 60 * 1000).toISOString();

  const upstreamUrl = new URL(`https://api.calendly.com/event_type_available_times`);
  upstreamUrl.searchParams.set("event_type", env.CALENDLY_EVENT_TYPE_URI);
  upstreamUrl.searchParams.set("start_time", start);
  upstreamUrl.searchParams.set("end_time", end);

  let resp: Response;
  try {
    resp = await calendlyFetch(env, upstreamUrl.pathname + upstreamUrl.search);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Calendly is not connected.", 503);
  }

  if (!resp.ok) {
    return jsonError(`Calendly rejected the availability request: ${resp.status} ${await resp.text()}`, 502);
  }

  const data: AvailableTimesResponse = await resp.json();
  const slots = data.collection
    .filter((slot) => slot.status === "available")
    .map((slot) => ({ start: slot.start_time, schedulingUrl: slot.scheduling_url }));

  return new Response(JSON.stringify({ slots }), {
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
};

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
