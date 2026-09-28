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

/** Shared safe renderer: no raw HTML, images or executable URLs. */
export function MarkdownContent({ children }: { children?: string | null }) {
  const content = useMemo(() => normalizeMarkdown(children), [children]);

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
