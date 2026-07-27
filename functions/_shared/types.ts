export interface Env {
  DB: D1Database;
  CALENDLY_CLIENT_ID: string;
  CALENDLY_CLIENT_SECRET: string;
  CALENDLY_EVENT_TYPE_URI?: string;
  /** Base URL Calendly should redirect back to / send webhooks to, e.g. https://prometheusedge.pages.dev */
  PUBLIC_BASE_URL?: string;
  /** HTTP Basic Auth gate for /admin/* — alternative to Cloudflare Access. */
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD?: string;
}
