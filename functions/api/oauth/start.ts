import type { Env } from "../../_shared/types";

/**
 * GET /api/oauth/start
 *
 * One-time entry point the business owner visits to connect their Calendly
 * account. Redirects to Calendly's consent screen. A random `state` value is
 * stored in a short-lived cookie and re-checked in the callback as basic CSRF
 * protection — this route is not meant for public/repeated use.
 */
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const origin = env.PUBLIC_BASE_URL ?? new URL(request.url).origin;
  const redirectUri = `${origin}/api/oauth/callback`;

  const state = crypto.randomUUID();

  const authorizeUrl = new URL("https://calendly.com/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", env.CALENDLY_CLIENT_ID);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("state", state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorizeUrl.toString(),
      "Set-Cookie": `calendly_oauth_state=${state}; Path=/; Max-Age=600; HttpOnly; Secure; SameSite=Lax`,
    },
  });
};
