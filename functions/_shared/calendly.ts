import type { Env } from "./types";
import { casUpdateTokens, getConnection } from "./db";

const REFRESH_SKEW_MS = 5 * 60 * 1000;
const TOKEN_URL = "https://auth.calendly.com/oauth/token";
export const API_BASE = "https://api.calendly.com";

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

async function refreshTokens(env: Env, refreshToken: string): Promise<TokenResponse> {
  const resp = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: env.CALENDLY_CLIENT_ID,
      client_secret: env.CALENDLY_CLIENT_SECRET,
    }),
  });
  if (!resp.ok) {
    throw new Error(`Calendly token refresh failed: ${resp.status} ${await resp.text()}`);
  }
  return resp.json();
}

/**
 * Returns a valid access token for the single stored business connection,
 * refreshing it if it's within 5 minutes of expiry. Handles the case where a
 * concurrent request already refreshed first: if our compare-and-swap write
 * loses (0 rows changed), we re-read the row a second connection just wrote
 * and use that instead of trusting our own now-stale refresh response.
 */
export async function getValidAccessToken(env: Env): Promise<string> {
  const conn = await getConnection(env.DB);
  if (!conn) throw new Error("Calendly is not connected yet — visit /api/oauth/start once as the business owner.");

  if (conn.token_expires_at - Date.now() > REFRESH_SKEW_MS) {
    return conn.access_token;
  }

  const tokens = await refreshTokens(env, conn.refresh_token);
  const nextExpiry = Date.now() + tokens.expires_in * 1000;

  const wroteOurs = await casUpdateTokens(env.DB, conn.id, conn.refresh_token, {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    token_expires_at: nextExpiry,
  });

  if (wroteOurs) return tokens.access_token;

  // Another request refreshed concurrently and won the race — use its result.
  const latest = await getConnection(env.DB);
  if (!latest) throw new Error("Calendly connection disappeared during refresh race");
  return latest.access_token;
}

export async function calendlyFetch(env: Env, path: string, init: RequestInit = {}): Promise<Response> {
  const token = await getValidAccessToken(env);
  return fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}
