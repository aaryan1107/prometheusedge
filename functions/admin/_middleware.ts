import type { Env } from "../_shared/types";
import { requireBasicAuth } from "../_shared/basicAuth";

/**
 * Gates the /admin/* page paths (e.g. /admin/bookings). This is a
 * client-rendered SPA route with no dedicated Function handler of its own —
 * middleware still runs for it before it falls through to the static
 * SPA-fallback (_redirects), so the browser gets a Basic Auth prompt before
 * ever receiving the app shell.
 */
export const onRequest: PagesFunction<Env> = async (context) => {
  const denied = requireBasicAuth(context.request, context.env);
  if (denied) return denied;
  return context.next();
};
