import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import "./markdown-content.css";

/** Shared safe renderer: no raw HTML, images or executable URLs. */
export function MarkdownContent({ children }: { children: string }) {
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
        {children}
      </Markdown>
    </div>
  );
}
