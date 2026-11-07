export type ActionResult<T> = { ok: true; value: T } | { ok: false; error: string };

/** Only explicit business failures may be shown to the user. */
export class ActionError extends Error {}

export function unwrapActionResult<T>(result: ActionResult<T>): T {
  if (!result.ok) throw new Error(result.error);
  return result.value;
}
