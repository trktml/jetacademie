import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);
export function GET(request: Request) {
  const path = new URL(request.url).pathname.replace(/\/+$/, "");
  if (path !== "/api/auth/get-session") {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return handler.GET(request);
}

export function POST(request: Request) {
  const path = new URL(request.url).pathname.replace(/\/+$/, "");
  // Only the client sign-out flow is exposed through the generic auth route.
  // Anonymous registration and login are dispatched internally by their own routes.
  if (path !== "/api/auth/sign-out") {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return handler.POST(request);
}
