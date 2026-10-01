"use client";

import { useId, useMemo, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import type { Element, Root } from "hast";
import { readCurriculumVocabulary } from "@/lib/curriculum-vocabulary";
import "./markdown-content.css";

interface VocabularyItem {
  readonly word: string;
  readonly definition: string;
}

/** Keep sanitized footnote anchors local to each card, including their back links. */
function rehypeFootnoteAnchors(prefix: string) {
  return () => (tree: Root) => {
    const elements: Element[] = [];
    function collect(node: Root | Element) {
      for (const child of node.children) {
        if (child.type === "element") {
          elements.push(child);
          collect(child);
        }
      }
    }
    collect(tree);

    const anchors = new Map<string, string>();
    const normalize = (id: string) => id.replace(/^(?:user-content-)+/, "");
    for (const element of elements) {
      const id = element.properties.id;
      if (typeof id !== "string") continue;
      const name = normalize(id);
      if (!/^fn(?:ref)?-/.test(name) && name !== "footnote-label") continue;
      const scopedId = `${prefix}-${name}`;
      anchors.set(name, scopedId);
      element.properties.id = scopedId;
    }
    for (const element of elements) {
      const href = element.properties.href;
      if (typeof href === "string" && href.startsWith("#")) {
        const target = anchors.get(normalize(href.slice(1)));
        if (target) element.properties.href = `#${target}`;
      }
      const describedBy = element.properties.ariaDescribedBy;
      if (describedBy) {
        const ids = Array.isArray(describedBy) ? describedBy : String(describedBy).split(/\s+/);
        element.properties.ariaDescribedBy = ids.map(
          (id) => anchors.get(normalize(String(id))) ?? id
        );
      }
    }
  };
}

function VocabularyTerm({ word, definition }: VocabularyItem) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  return (
    <span className="relative inline-block">
      <button
        type="button"
        className="inline-flex min-h-[44px] cursor-pointer items-center rounded px-1 text-inherit underline decoration-teal-500/50 underline-offset-4"
        aria-label={`${word} kelimesinin anlamı`}
        aria-expanded={open}
        aria-describedby={open ? tooltipId : undefined}
        title={`${word}: ${definition}`}
        onClick={() => setOpen(true)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
        }}
      >
        {word}
      </button>
      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          className="absolute bottom-full left-0 z-20 w-52 max-w-[70vw] rounded-lg border border-teal-200 bg-white p-3 text-sm font-normal text-slate-900 shadow-lg dark:border-teal-800 dark:bg-slate-900 dark:text-slate-100"
        >
          {definition}
        </span>
      )}
    </span>
  );
}

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
  vocabulary,
}: {
  children?: string | null;
  stripTitle?: string;
  vocabulary?: readonly VocabularyItem[];
}) {
  const footnotePrefix = `footnotes-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const effectiveVocabulary = useMemo(
    () => vocabulary ?? readCurriculumVocabulary(children ?? "").items,
    [children, vocabulary]
  );
  const content = useMemo(() => {
    const withoutTitle = stripTitle ? stripLeadingTitle(children, stripTitle) : children;
    return normalizeMarkdown(withoutTitle).replace(/<u>([^<\n]+)<\/u>/g, (_, word: string) => {
      const index = effectiveVocabulary.findIndex(
        (item) => item.word.toLocaleLowerCase("tr-TR") === word.toLocaleLowerCase("tr-TR")
      );
      if (index === -1) return word;
      const escaped = word.replace(/([\\`*_[\]<>])/g, "\\$1");
      return `[${escaped}](#curriculum-vocabulary-${index})`;
    });
  }, [children, stripTitle, effectiveVocabulary]);

  return (
    <div className="curriculum-markdown" dir="auto">
      <Markdown
        skipHtml
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize, rehypeFootnoteAnchors(footnotePrefix)]}
        disallowedElements={["img"]}
        components={{
          a: ({ children, href, id, "aria-describedby": describedBy }) => {
            const match = href?.match(/^#curriculum-vocabulary-(\d+)$/);
            const item = match ? effectiveVocabulary[Number(match[1])] : undefined;
            if (item) {
              return <VocabularyTerm word={String(children)} definition={item.definition} />;
            }
            if (href?.startsWith("#")) {
              return (
                <a href={href} id={id} aria-describedby={describedBy}>
                  {children}
                </a>
              );
            }
            return (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          },
          p: ({ children }) => <p dir="auto">{children}</p>,
          blockquote: ({ children }) => <blockquote dir="auto">{children}</blockquote>,
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
