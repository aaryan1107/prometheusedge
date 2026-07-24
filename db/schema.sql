-- The Edge Way — Calendly integration schema (Cloudflare D1)
-- Apply via the Cloudflare dashboard D1 console, or:
--   wrangler d1 execute edge-way-calendly --remote --file=db/schema.sql
--   wrangler d1 execute edge-way-calendly --local --file=db/schema.sql   (for local dev)

CREATE TABLE IF NOT EXISTS calendly_connection (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  owner_uri TEXT NOT NULL,
  organization_uri TEXT,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  token_expires_at INTEGER NOT NULL,
  webhook_subscription_uri TEXT,
  webhook_signing_key TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  calendly_event_uuid TEXT NOT NULL UNIQUE,
  event_type_name TEXT,
  invitee_name TEXT,
  invitee_email TEXT,
  invitee_phone TEXT,
  start_time TEXT NOT NULL,
  end_time TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  cancel_reason TEXT,
  raw_payload TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_bookings_start_time ON bookings(start_time);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
