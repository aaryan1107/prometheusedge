export interface ConnectionRow {
  id: number;
  owner_uri: string;
  organization_uri: string | null;
  access_token: string;
  refresh_token: string;
  token_expires_at: number;
  webhook_subscription_uri: string | null;
  webhook_signing_key: string | null;
  created_at: number;
  updated_at: number;
}

export interface BookingRecord {
  calendly_event_uuid: string;
  event_type_name: string | null;
  invitee_name: string | null;
  invitee_email: string | null;
  invitee_phone: string | null;
  start_time: string;
  end_time: string | null;
  status: "active" | "canceled";
  cancel_reason: string | null;
  raw_payload: string;
}

export interface EnquiryRecord {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  grade: string | null;
  message: string;
  source: string | null;
  created_at: number;
}

export async function getConnection(db: D1Database): Promise<ConnectionRow | null> {
  const row = await db
    .prepare("SELECT * FROM calendly_connection ORDER BY id DESC LIMIT 1")
    .first<ConnectionRow>();
  return row ?? null;
}

/** Full upsert used right after OAuth consent (token exchange + webhook registration). */
export async function saveConnection(
  db: D1Database,
  data: Omit<ConnectionRow, "id" | "created_at" | "updated_at">,
): Promise<void> {
  const existing = await getConnection(db);
  const now = Date.now();

  if (existing) {
    await db
      .prepare(
        `UPDATE calendly_connection SET
           owner_uri = ?, organization_uri = ?, access_token = ?, refresh_token = ?,
           token_expires_at = ?, webhook_subscription_uri = ?, webhook_signing_key = ?,
           updated_at = ?
         WHERE id = ?`,
      )
      .bind(
        data.owner_uri,
        data.organization_uri,
        data.access_token,
        data.refresh_token,
        data.token_expires_at,
        data.webhook_subscription_uri,
        data.webhook_signing_key,
        now,
        existing.id,
      )
      .run();
    return;
  }

  await db
    .prepare(
      `INSERT INTO calendly_connection
         (owner_uri, organization_uri, access_token, refresh_token, token_expires_at,
          webhook_subscription_uri, webhook_signing_key, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      data.owner_uri,
      data.organization_uri,
      data.access_token,
      data.refresh_token,
      data.token_expires_at,
      data.webhook_subscription_uri,
      data.webhook_signing_key,
      now,
      now,
    )
    .run();
}

/**
 * Compare-and-swap token refresh: only writes if `refresh_token` still matches
 * the token that was just used to request this refresh. If another concurrent
 * request already refreshed and rotated it, this UPDATE affects 0 rows and the
 * caller should re-read the connection instead of trusting its own result.
 */
export async function casUpdateTokens(
  db: D1Database,
  connectionId: number,
  usedRefreshToken: string,
  next: { access_token: string; refresh_token: string; token_expires_at: number },
): Promise<boolean> {
  const result = await db
    .prepare(
      `UPDATE calendly_connection
         SET access_token = ?, refresh_token = ?, token_expires_at = ?, updated_at = ?
       WHERE id = ? AND refresh_token = ?`,
    )
    .bind(next.access_token, next.refresh_token, next.token_expires_at, Date.now(), connectionId, usedRefreshToken)
    .run();
  return (result.meta.changes ?? 0) > 0;
}

export async function upsertBooking(db: D1Database, booking: BookingRecord): Promise<void> {
  const now = Date.now();
  await db
    .prepare(
      `INSERT INTO bookings
         (calendly_event_uuid, event_type_name, invitee_name, invitee_email, invitee_phone,
          start_time, end_time, status, cancel_reason, raw_payload, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(calendly_event_uuid) DO UPDATE SET
         event_type_name = excluded.event_type_name,
         invitee_name = excluded.invitee_name,
         invitee_email = excluded.invitee_email,
         invitee_phone = excluded.invitee_phone,
         start_time = excluded.start_time,
         end_time = excluded.end_time,
         status = excluded.status,
         cancel_reason = excluded.cancel_reason,
         raw_payload = excluded.raw_payload,
         updated_at = excluded.updated_at`,
    )
    .bind(
      booking.calendly_event_uuid,
      booking.event_type_name,
      booking.invitee_name,
      booking.invitee_email,
      booking.invitee_phone,
      booking.start_time,
      booking.end_time,
      booking.status,
      booking.cancel_reason,
      booking.raw_payload,
      now,
      now,
    )
    .run();
}

export async function listBookings(
  db: D1Database,
  opts: { upcomingOnly?: boolean; limit?: number } = {},
) {
  const { upcomingOnly = true, limit = 200 } = opts;
  const query = upcomingOnly
    ? `SELECT * FROM bookings WHERE start_time >= ? ORDER BY start_time ASC LIMIT ?`
    : `SELECT * FROM bookings ORDER BY start_time DESC LIMIT ?`;
  const stmt = upcomingOnly
    ? db.prepare(query).bind(new Date().toISOString(), limit)
    : db.prepare(query).bind(limit);
  const { results } = await stmt.all();
  return results;
}

export async function listEnquiries(db: D1Database, opts: { limit?: number } = {}) {
  const { limit = 200 } = opts;
  const { results } = await db
    .prepare(
      `SELECT id, name, email, phone, grade, message, source, created_at
       FROM enquiries
       ORDER BY created_at DESC
       LIMIT ?`,
    )
    .bind(limit)
    .all<EnquiryRecord>();

  return results;
}
