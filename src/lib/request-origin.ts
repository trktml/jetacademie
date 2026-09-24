/** Resolve the public origin seen by the browser when Next.js runs behind a reverse proxy. */
export function getRequestOrigin(request: Request): string | null {
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    new URL(request.url).host;
  const forwardedProtocol = request.headers.get("x-forwarded-proto");
  const protocol = forwardedProtocol || new URL(request.url).protocol.replace(":", "");

  if (!host || !/^[a-z0-9.:-]+$/i.test(host) || !/^(http|https)$/.test(protocol)) {
    return null;
  }

  try {
    const url = new URL(`${protocol}://${host}`);
    return url.protocol === "http:" || url.protocol === "https:" ? url.origin : null;
  } catch {
    return null;
  }
}
