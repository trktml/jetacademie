"use client";
import MDEditor, { commands } from "@uiw/react-md-editor/nohighlight";
import { MarkdownContent } from "@/components/markdown-content";

export default function MarkdownEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <MDEditor
      value={value}
      onChange={(text) => onChange(text ?? "")}
      height={460}
      preview="edit"
      visibleDragbar={false}
      defaultTabEnable
      commands={[
        [commands.bold, "Kalın yazı (Ctrl+B)"],
        [commands.italic, "İtalik yazı (Ctrl+I)"],
        [commands.title, "Başlık (Ctrl+1)"],
        [commands.quote, "Alıntı (Ctrl+Q)"],
        [commands.link, "Bağlantı (Ctrl+L)"],
        [commands.unorderedListCommand, "Madde işaretli liste"],
        [commands.orderedListCommand, "Numaralı liste"],
        [commands.checkedListCommand, "Kontrol listesi"],
        [commands.code, "Kod (Ctrl+J)"],
      ].map(([command, label]) => ({
        ...(command as typeof commands.bold),
        buttonProps: { title: label as string, "aria-label": label as string },
      }))}
      extraCommands={[]}
      textareaProps={{
        "aria-label": "Haftalık içerik, Markdown editörü",
        placeholder: "## Başlık\n\nBu haftanın içeriğini buraya yazın…",
        maxLength: 100000,
        spellCheck: false,
      }}
      components={{ preview: (source) => <MarkdownContent>{source}</MarkdownContent> }}
    />
  );
}
