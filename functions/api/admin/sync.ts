import type { Env } from "../../_shared/types";
import { calendlyFetch } from "../../_shared/calendly";
import { getConnection, upsertBooking } from "../../_shared/db";

const MAX_PAGES = 10; // safety cap against runaway pagination

interface ScheduledEventsResponse {
  collection: Array<{
    uri: string;
    name: string | null;
    start_time: string;
    end_time: string;
    status: "active" | "canceled";
  }>;
  pagination: { next_page_token: string | null };
}

interface InviteesResponse {
  collection: Array<{
    name: string | null;
    email: string | null;
    questions_and_answers?: Array<{ question: string; answer: string }>;
    cancellation?: { reason?: string };
  }>;
}

function lastPathSegment(uri: string): string {
  return uri.split("/").filter(Boolean).pop() ?? uri;
}

function findAnswer(qas: InviteesResponse["collection"][number]["questions_and_answers"], keyword: string) {
  return qas?.find((qa) => qa.question.toLowerCase().includes(keyword))?.answer ?? null;
}

/**
 * POST /api/admin/sync
 *
 * Backfills bookings directly from Calendly's scheduled events, as a
 * webhook-miss safety net and for historical data from before the webhook
 * was registered. Upserts are keyed on calendly_event_uuid, so re-running
 * this is always safe. Protected by Cloudflare Access at the edge.
 */
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { env } = context;
  const connection = await getConnection(env.DB);
  if (!connection?.organization_uri) {
    return new Response(JSON.stringify({ error: "Calendly is not connected." }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  const minStart = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(); // last 30 days
  const maxStart = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(); // next 90 days

  let pageToken: string | null = null;
  let synced = 0;

  for (let page = 0; page < MAX_PAGES; page++) {
    const eventsUrl = new URL("https://api.calendly.com/scheduled_events");
    eventsUrl.searchParams.set("organization", connection.organization_uri);
    eventsUrl.searchParams.set("min_start_time", minStart);
    eventsUrl.searchParams.set("max_start_time", maxStart);
    if (pageToken) eventsUrl.searchParams.set("page_token", pageToken);

    const eventsResp = await calendlyFetch(env, eventsUrl.pathname + eventsUrl.search);
    if (!eventsResp.ok) {
      return new Response(
        JSON.stringify({ error: `Calendly rejected the sync request: ${eventsResp.status}`, synced }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }
    const events: ScheduledEventsResponse = await eventsResp.json();

    for (const event of events.collection) {
      const inviteesResp = await calendlyFetch(env, `/scheduled_events/${lastPathSegment(event.uri)}/invitees`);
      const invitee = inviteesResp.ok ? ((await inviteesResp.json()) as InviteesResponse).collection[0] : undefined;

      await upsertBooking(env.DB, {
        calendly_event_uuid: lastPathSegment(event.uri),
        event_type_name: event.name,
        invitee_name: invitee?.name ?? null,
        invitee_email: invitee?.email ?? null,
        invitee_phone: findAnswer(invitee?.questions_and_answers, "phone"),
        start_time: event.start_time,
        end_time: event.end_time,
        status: event.status === "canceled" ? "canceled" : "active",
        cancel_reason: invitee?.cancellation?.reason ?? null,
        raw_payload: JSON.stringify({ event, invitee }),
      });
      synced++;
    }

    pageToken = events.pagination.next_page_token;
    if (!pageToken) break;
  }

  return new Response(JSON.stringify({ synced }), {
    headers: { "Content-Type": "application/json" },
  });
};
