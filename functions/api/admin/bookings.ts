import type { Env } from "../../_shared/types";
import { listBookings } from "../../_shared/db";

/**
 * GET /api/admin/bookings
 *
 * Reads bookings from D1 for the dashboard. Protected by Cloudflare Access
 * at the edge (see the manual setup checklist) — no app-level auth here.
 */
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const upcomingOnly = url.searchParams.get("all") !== "1";

  const bookings = await listBookings(context.env.DB, { upcomingOnly });

  return new Response(JSON.stringify({ bookings }), {
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
};
