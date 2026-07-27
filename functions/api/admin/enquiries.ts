import type { Env } from "../../_shared/types";
import { listEnquiries } from "../../_shared/db";

/**
 * GET /api/admin/enquiries
 *
 * Teacher-friendly lead list for the protected admin dashboard.
 */
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const limit = Number(url.searchParams.get("limit") ?? "200");
  const enquiries = await listEnquiries(context.env.DB, {
    limit: Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 500) : 200,
  });

  return new Response(JSON.stringify({ enquiries }), {
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
};
