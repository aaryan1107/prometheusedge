import type { Env } from "./types";

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/**
 * Simple HTTP Basic Auth gate for the admin area — an alternative to
 * Cloudflare Access that needs no dashboard configuration, just the
 * ADMIN_USERNAME / ADMIN_PASSWORD Pages secrets. Returns null when the
 * request is authenticated (caller should proceed); otherwise a 401
 * challenge response to return directly.
 */
export function requireBasicAuth(request: Request, env: Env): Response | null {
  const expectedUser = env.ADMIN_USERNAME ?? "admin";
  const expectedPass = env.ADMIN_PASSWORD;

  if (!expectedPass) {
    return new Response("ADMIN_PASSWORD is not configured.", { status: 500 });
  }

  const challenge = () =>
    new Response("Authentication required.", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin", charset="UTF-8"' },
    });

  const header = request.headers.get("Authorization");
  if (!header?.startsWith("Basic ")) return challenge();

  let decoded: string;
  try {
    decoded = atob(header.slice("Basic ".length));
  } catch {
    return challenge();
  }

  const separatorIndex = decoded.indexOf(":");
  if (separatorIndex === -1) return challenge();

  const user = decoded.slice(0, separatorIndex);
  const pass = decoded.slice(separatorIndex + 1);

  if (!timingSafeEqual(user, expectedUser) || !timingSafeEqual(pass, expectedPass)) {
    return challenge();
  }

  return null;
}
