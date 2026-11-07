import { NextResponse, type NextRequest } from "next/server";
import { contentSecurityPolicy } from "@/lib/content-security-policy";
import { hasTrustedRequestOrigin } from "@/lib/request-origin";

export function proxy(request: NextRequest) {
  // All page POSTs in this app are Server Actions. Reject before Next.js decodes their body.
  if (request.method === "POST" && !hasTrustedRequestOrigin(request)) {
    return new NextResponse(null, { status: 403, headers: { "Cache-Control": "no-store" } });
  }
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const policy = contentSecurityPolicy(nonce, process.env.NODE_ENV !== "production");
  const headers = new Headers(request.headers);
  // Always replace caller-supplied values before Next.js reads the script nonce.
  headers.set("x-nonce", nonce);
  headers.set("Content-Security-Policy", policy);
  const response = NextResponse.next({ request: { headers } });
  response.headers.set("Content-Security-Policy", policy);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  matcher: ["/((?!api/|_next/|.*\\.[^/]+$).*)"],
};
