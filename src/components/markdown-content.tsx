import { useMemo } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import "./markdown-content.css";

/**
 * Normalizes input text for CommonMark rendering:
 * 1. Normalizes CRLF (\r\n) to LF (\n).
 * 2. Converts unicode bullet characters (•, ●, ○, ⁃) at line starts to standard Markdown list syntax (- ).
 * 3. Ensures an empty line before a list if it is preceded by a non-list text line (CommonMark requirement).
 */
export function normalizeMarkdown(text?: string | null): string {
  if (!text) return "";
  const normalizedBullets = text.replace(/\r\n/g, "\n").replace(/^(\s*)[•●○⁃]\s*/gm, "$1- ");

  return normalizedBullets.replace(/(^[^\s\-*#\d].*)\n(\s*([*+-]|\d+\.)\s)/gm, "$1\n\n$2");
}

/**
 * Strips the leading markdown heading (e.g. "# Title") from the body if it matches
 * the entry's title, preventing duplicate title rendering on cards that already
 * display the entry title in their header.
 */
export function stripLeadingTitle(body?: string | null, title?: string | null): string {
  if (!body) return "";
  const trimmed = body.trimStart();
  if (!trimmed.startsWith("#")) return body;

  const match = trimmed.match(/^#+\s+(.*?)(?:\r?\n|$)/);
  if (!match) return body;

  const headingText = match[1].trim();

  if (title) {
    const normalize = (s: string) =>
      s
        .toLowerCase()
        .replace(/[*_`]/g, "")
        .replace(/[\s\u200B-\u200D\uFEFF]+/g, " ")
        .replace(/[.,:;!?—–\-"'«»“”]/g, "")
        .trim();

    const nHeading = normalize(headingText);
    const nTitle = normalize(title);

    if (
      nHeading === nTitle ||
      (nHeading.length >= 8 && (nTitle.startsWith(nHeading) || nHeading.startsWith(nTitle)))
    ) {
      return trimmed.slice(match[0].length).trimStart();
    }
  }

  return body;
}

/** Shared safe renderer: no raw HTML, images or executable URLs. */
export function MarkdownContent({
  children,
  stripTitle,
}: {
  children?: string | null;
  stripTitle?: string;
}) {
  const content = useMemo(() => {
    const withoutTitle = stripTitle ? stripLeadingTitle(children, stripTitle) : children;
    return normalizeMarkdown(withoutTitle);
  }, [children, stripTitle]);

  return (
    <div className="curriculum-markdown" dir="auto">
      <Markdown
        skipHtml
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        disallowedElements={["img"]}
        components={{
          a: ({ children, href }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          p: ({ children }) => <p dir="auto">{children}</p>,
          blockquote: ({ children }) => <blockquote dir="auto">{children}</blockquote>,
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
