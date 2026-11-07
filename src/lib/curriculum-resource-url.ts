/** Read and write use the same URL policy, including for older database rows. */
export function curriculumResourceUrl(value?: string | null): string | undefined {
  if (
    !value ||
    value.length > 2048 ||
    [...value].some((c) => c <= " " || c === "\x7f" || c === "\\")
  ) {
    return undefined;
  }
  if (value.startsWith("/curriculum/")) {
    // Local documents must stay in the public curriculum tree after URL decoding.
    if (/^\/curriculum\/(?:[a-z0-9_-]+\/)*[a-z0-9_.-]+\.pdf$/i.test(value)) return value;
    return undefined;
  }
  if (!/^https:\/\//i.test(value)) return undefined;
  try {
    const url = new URL(value);
    if (!url.username && !url.password) return url.href;
  } catch {
    return undefined;
  }
}

export function curriculumPdfUrl(value?: string | null): string | undefined {
  const url = curriculumResourceUrl(value);
  return url && /\.pdf$/i.test(new URL(url, "https://curriculum.invalid").pathname)
    ? url
    : undefined;
}
