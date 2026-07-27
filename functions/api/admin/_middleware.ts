import type { Env } from "../../_shared/types";
import { requireBasicAuth } from "../../_shared/basicAuth";

export const onRequest: PagesFunction<Env> = async (context) => {
  const denied = requireBasicAuth(context.request, context.env);
  if (denied) return denied;
  return context.next();
};
