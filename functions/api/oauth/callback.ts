import type { Env } from "../../_shared/types";
import { API_BASE } from "../../_shared/calendly";
import { getConnection, saveConnection } from "../../_shared/db";

interface TokenExchangeResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

interface CalendlyUserResponse {
  resource: {
    uri: string;
    current_organization: string;
  };
}

interface WebhookSubscriptionResource {
  uri: string;
  state: "active" | "disabled";
  signing_key?: string;
}

function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get("Cookie") ?? "";
  const match = header.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * GET /api/oauth/callback
 *
 * Completes the one-time "connect Calendly" flow: exchanges the auth code for
 * tokens, resolves the owner/organization URIs, idempotently ensures a
 * webhook subscription exists (reusing a still-active one rather than
 * creating a duplicate on reconnect), and persists everything in one D1 row.
 */
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const expectedState = readCookie(request, "calendly_oauth_state");

  if (!code) {
    return new Response("Missing ?code from Calendly redirect.", { status: 400 });
  }
  if (!state || !expectedState || state !== expectedState) {
    return new Response("OAuth state mismatch — please restart the connect flow at /api/oauth/start.", {
      status: 400,
    });
  }

  const origin = env.PUBLIC_BASE_URL ?? url.origin;
  const redirectUri = `${origin}/api/oauth/callback`;

  const tokenResp = await fetch("https://auth.calendly.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: env.CALENDLY_CLIENT_ID,
      client_secret: env.CALENDLY_CLIENT_SECRET,
      redirect_uri: redirectUri,
    }),
  });
  if (!tokenResp.ok) {
    return new Response(`Token exchange failed: ${tokenResp.status} ${await tokenResp.text()}`, { status: 502 });
  }
  const tokens: TokenExchangeResponse = await tokenResp.json();

  const meResp = await fetch(`${API_BASE}/users/me`, {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });
  if (!meResp.ok) {
    return new Response(`Failed to read Calendly user: ${meResp.status} ${await meResp.text()}`, { status: 502 });
  }
  const me: CalendlyUserResponse = await meResp.json();

  // Idempotent webhook registration: reuse an existing, still-active
  // subscription (e.g. on reconnect) instead of creating a duplicate.
  const existingConnection = await getConnection(env.DB);
  let webhookSubscriptionUri = existingConnection?.webhook_subscription_uri ?? null;
  let webhookSigningKey = existingConnection?.webhook_signing_key ?? null;

  let reusableWebhookIsValid = false;
  if (webhookSubscriptionUri) {
    const existingResp = await fetch(webhookSubscriptionUri, {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    if (existingResp.ok) {
      const existing: { resource: WebhookSubscriptionResource } = await existingResp.json();
      reusableWebhookIsValid = existing.resource.state === "active";
    }
  }

  if (!reusableWebhookIsValid) {
    const webhookResp = await fetch(`${API_BASE}/webhook_subscriptions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: `${origin}/api/webhooks/calendly`,
        events: ["invitee.created", "invitee.canceled"],
        organization: me.resource.current_organization,
        scope: "organization",
      }),
    });
    if (!webhookResp.ok) {
      return new Response(
        `Token exchange succeeded but webhook registration failed: ${webhookResp.status} ${await webhookResp.text()}`,
        { status: 502 },
      );
    }
    const created: { resource: WebhookSubscriptionResource } = await webhookResp.json();
    // signing_key is only ever returned at creation time — persist it now or lose it permanently.
    webhookSubscriptionUri = created.resource.uri;
    webhookSigningKey = created.resource.signing_key ?? webhookSigningKey;
  }

  await saveConnection(env.DB, {
    owner_uri: me.resource.uri,
    organization_uri: me.resource.current_organization,
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    token_expires_at: Date.now() + tokens.expires_in * 1000,
    webhook_subscription_uri: webhookSubscriptionUri,
    webhook_signing_key: webhookSigningKey,
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/admin/bookings?connected=1",
      "Set-Cookie": "calendly_oauth_state=; Path=/; Max-Age=0",
    },
  });
};
