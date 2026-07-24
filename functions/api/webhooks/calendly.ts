import type { Env } from "../../_shared/types";
import { API_BASE, calendlyFetch } from "../../_shared/calendly";
import { getConnection, upsertBooking } from "../../_shared/db";
import { verifyCalendlySignature } from "../../_shared/crypto";

interface InviteePayload {
  uri: string;
  name: string | null;
  email: string | null;
  event: string | { uri: string }; // Calendly webhook schema has varied between a bare URI string and a nested object across API versions.
  questions_and_answers?: Array<{ question: string; answer: string }>;
  cancellation?: { reason?: string };
}

interface WebhookBody {
  event: "invitee.created" | "invitee.canceled";
  payload: InviteePayload;
}

interface ScheduledEventResource {
  resource: {
    uri: string;
    name: string | null;
    start_time: string;
    end_time: string;
  };
}

function lastPathSegment(uri: string): string {
  return uri.split("/").filter(Boolean).pop() ?? uri;
}

function findAnswer(qas: InviteePayload["questions_and_answers"], keyword: string): string | null {
  const match = qas?.find((qa) => qa.question.toLowerCase().includes(keyword));
  return match?.answer ?? null;
}

/**
 * POST /api/webhooks/calendly
 *
 * Receives invitee.created / invitee.canceled events. Verifies the HMAC
 * signature before touching the body, then fetches the canonical scheduled
 * event (rather than trusting whatever shape the webhook payload embeds —
 * Calendly's webhook schema for the nested event has varied across API
 * versions) so start/end time and the event type name are always correct.
 */
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const connection = await getConnection(env.DB);
  if (!connection?.webhook_signing_key) {
    return new Response("Calendly is not connected — no signing key on file.", { status: 503 });
  }

  const rawBody = await request.text();
  const verification = await verifyCalendlySignature(
    rawBody,
    request.headers.get("Calendly-Webhook-Signature"),
    connection.webhook_signing_key,
  );
  if (!verification.ok) {
    return new Response(`Signature verification failed: ${verification.reason}`, { status: 401 });
  }

  const body: WebhookBody = JSON.parse(rawBody);
  const eventUri = typeof body.payload.event === "string" ? body.payload.event : body.payload.event.uri;
  const eventUuid = lastPathSegment(eventUri);

  let eventName: string | null = null;
  let startTime = new Date().toISOString();
  let endTime: string | null = null;

  const eventResp = await calendlyFetch(env, eventUri.replace(API_BASE, ""));
  if (eventResp.ok) {
    const eventData: ScheduledEventResource = await eventResp.json();
    eventName = eventData.resource.name;
    startTime = eventData.resource.start_time;
    endTime = eventData.resource.end_time;
  }

  await upsertBooking(env.DB, {
    calendly_event_uuid: eventUuid,
    event_type_name: eventName,
    invitee_name: body.payload.name,
    invitee_email: body.payload.email,
    invitee_phone: findAnswer(body.payload.questions_and_answers, "phone"),
    start_time: startTime,
    end_time: endTime,
    status: body.event === "invitee.canceled" ? "canceled" : "active",
    cancel_reason: body.payload.cancellation?.reason ?? null,
    raw_payload: rawBody,
  });

  return new Response(null, { status: 200 });
};
