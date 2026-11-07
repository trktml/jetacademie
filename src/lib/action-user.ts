import { headers } from "next/headers";
import { getAuth } from "@/lib/auth";
import { hasTrustedOriginHeaders } from "@/lib/request-origin";
import { ActionError, type ActionResult } from "./action-result";

export async function runUserAction<T>(work: () => Promise<T>): Promise<ActionResult<T>> {
  try {
    return { ok: true, value: await work() };
  } catch (error) {
    if (error instanceof ActionError) return { ok: false, error: error.message };
    throw error;
  }
}

/** A queued browser mutation must still belong to the account that initiated it. */
export async function requireActionUser(message: string, expectedUserId?: string) {
  const requestHeaders = await headers();
  if (!hasTrustedOriginHeaders(requestHeaders)) throw new ActionError("İstek reddedildi.");
  const session = await getAuth().api.getSession({ headers: requestHeaders });
  if (!session?.user) throw new ActionError(message);
  if (expectedUserId !== undefined && session.user.id !== expectedUserId)
    throw new ActionError("Oturum değişti. İşlemi yeniden deneyin.");
  return session.user;
}
