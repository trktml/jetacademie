import type { Element, Root, RootContent } from "hast";

export const NARRATION_VERSION = 2;
export const NARRATION_VOICES = ["M1", "M2", "M3", "M4", "M5"] as const;
export const NARRATION_ID =
  /^g[1-6]-konu-(?:eylul|ekim|kasim|aralik|ocak|subat|mart|nisan|mayis)-[1-4]$/;

export interface NarrationCue {
  start: number;
  end: number;
}

export interface NarrationManifest {
  bodyHash: string;
  version: number;
  cues: NarrationCue[];
  audioUrl: string;
}

export async function narrationBodyHash(body: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(body));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

const blockTags = new Set(["p", "h1", "h2", "h3", "h4", "h5", "h6", "li", "td", "th", "pre"]);

function isSilent(node: Element) {
  return (
    node.properties.dataFootnoteRef !== undefined ||
    node.properties.dataFootnotes !== undefined ||
    node.tagName === "img"
  );
}

function blockText(node: RootContent, isBlock = true): string {
  if (node.type === "text") return node.value;
  if (node.type !== "element" || isSilent(node)) return "";
  if (node.tagName === "br") return " ";
  if (!isBlock && (blockTags.has(node.tagName) || /^(ul|ol|blockquote|table)$/.test(node.tagName)))
    return "";
  return node.children.map((child) => blockText(child, false)).join("");
}

/** One cue per visible Markdown block; inline formatting and footnotes stay in the rendered tree. */
export function collectNarrationParagraphs(tree: Root, markBlocks = false): string[] {
  const paragraphs: string[] = [];
  let bibliography = false;

  function visit(node: RootContent) {
    if (bibliography || node.type !== "element" || isSilent(node)) return;
    if (blockTags.has(node.tagName)) {
      const spoken = blockText(node)
        .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, "")
        .replace(/\s+/g, " ")
        .trim();
      if (/^h[1-6]$/.test(node.tagName) && spoken.toLocaleLowerCase("tr-TR") === "dipnotlar") {
        bibliography = true;
        return;
      }
      if (/[\p{L}\p{N}]/u.test(spoken)) {
        if (markBlocks) node.properties.dataNarrationCue = paragraphs.length;
        paragraphs.push(spoken);
      }
    }
    node.children.forEach(visit);
  }

  tree.children.forEach(visit);
  return paragraphs;
}

export function rehypeNarration() {
  return (tree: Root) => {
    collectNarrationParagraphs(tree, true);
  };
}

export function narrationCueAt(cues: readonly NarrationCue[], time: number): number {
  let low = 0;
  let high = cues.length - 1;
  while (low <= high) {
    const middle = (low + high) >>> 1;
    const cue = cues[middle];
    if (time < cue.start) high = middle - 1;
    else if (time >= cue.end) low = middle + 1;
    else return middle;
  }
  return -1;
}
