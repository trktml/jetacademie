import type { Root } from "hast";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import { normalizeMarkdown } from "@/lib/curriculum-markdown";
import { collectNarrationParagraphs } from "@/lib/konu-narration";

const markdown = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkBreaks)
  .use(remarkRehype)
  .use(rehypeSanitize);

export function lessonNarrationParagraphs(body: string) {
  const source = normalizeMarkdown(body).replace(/<u>([^<\n]+)<\/u>/g, "$1");
  const tree = markdown.runSync(markdown.parse(source)) as Root;
  return collectNarrationParagraphs(tree);
}
