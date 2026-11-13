/** Normalize line breaks and bullets before CommonMark parsing. */
export function normalizeMarkdown(text?: string | null): string {
  if (!text) return "";
  const normalized = text.replace(/\r\n/g, "\n").replace(/^(\s*)[•●○⁃]\s*/gm, "$1- ");
  return normalized.replace(/(^[^\s\-*#\d].*)\n(\s*([*+-]|\d+\.)\s)/gm, "$1\n\n$2");
}
