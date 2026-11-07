import { authLimitResponse, clearAuthAttempts, reserveAuthAttempt } from "@/lib/auth-rate-limit";
import { privateJson } from "@/lib/http";

const MAX_CONCURRENT_LOGINS = 8;
const activeLogins = new Set<string>();

/** Bound work per server without a shared quota that can lock unrelated accounts. */
export async function runLoginAttempt(email: string, login: () => Promise<Response>) {
  if (activeLogins.has(email) || activeLogins.size >= MAX_CONCURRENT_LOGINS) {
    const response = privateJson({ error: "Giriş işlemi yoğun. Tekrar deneyin." }, 503);
    response.headers.set("Retry-After", "1");
    return response;
  }
  activeLogins.add(email);
  try {
    // Apply the same per-username budget to existing and nonexistent accounts.
    if (!(await reserveAuthAttempt("login", email, 5))) return authLimitResponse();
    return await login();
  } finally {
    activeLogins.delete(email);
  }
}

export function clearLoginAttempts(email: string): Promise<void> {
  return clearAuthAttempts("login", email);
}
