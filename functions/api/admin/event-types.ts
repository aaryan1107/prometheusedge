import type { Env } from "../../_shared/types";
import { calendlyFetch } from "../../_shared/calendly";
import { getConnection } from "../../_shared/db";

interface EventTypesResponse {
  collection: Array<{
    uri: string; // the API resource URI — this is what CALENDLY_EVENT_TYPE_URI must be set to
    name: string;
    active: boolean;
    scheduling_url: string;
  }>;
}

/**
 * GET /api/admin/event-types
 *
 * One-time lookup helper: after the OAuth connect step, visit this to see
 * every event type on the connected Calendly account with its real API URI
 * (not the human-facing scheduling link) — copy the right one into the
 * CALENDLY_EVENT_TYPE_URI Pages environment variable. Protected by
 * Cloudflare Access like the rest of /api/admin/*.
 */
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;
  const connection = await getConnection(env.DB);
  if (!connection) {
    return new Response(
      JSON.stringify({ error: "Calendly is not connected yet — visit /api/oauth/start first." }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  const resp = await calendlyFetch(env, `/event_types?user=${encodeURIComponent(connection.owner_uri)}`);
  if (!resp.ok) {
    return new Response(JSON.stringify({ error: `Calendly rejected the request: ${resp.status}` }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data: EventTypesResponse = await resp.json();
  const eventTypes = data.collection.map((et) => ({
    name: et.name,
    active: et.active,
    apiUri: et.uri,
    schedulingUrl: et.scheduling_url,
  }));

  return new Response(JSON.stringify({ eventTypes }, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
