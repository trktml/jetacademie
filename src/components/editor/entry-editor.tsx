"use client";
import { curriculumCategories } from "@/components/curriculum-category";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Check, Plus, Save, FilePenLine } from "lucide-react";
import type { EditorRecord } from "@/lib/editor/types";
import {
  filled,
  saveEditorEntry,
  EditorRequestError,
  type EditorLocation,
} from "@/lib/editor-client";
import { MarkdownContent } from "@/components/markdown-content";
import dynamic from "next/dynamic";
const MarkdownEditor = dynamic(() => import("./markdown-editor"), {
  ssr: false,
  loading: () => <div className="editor-loading">Editör hazırlanıyor…</div>,
});

type EntryDraft = {
  revision: number;
  title: string;
  body: string;
  resourceUrl: string;
};

export function EntryEditor({
  location,
  record,
  csrf,
  onDirty,
  onSaved,
  onReload,
  onSaving,
}: {
  location: EditorLocation;
  record?: EditorRecord;
  csrf: string;
  onDirty: () => void;
  onSaved: (record: EditorRecord) => void;
  onReload: () => void;
  onSaving: (saving: boolean) => void;
}) {
  // Follow refreshed records until editing starts, then keep that revision with the draft.
  const [draft, setDraft] = useState<EntryDraft | null>(null);
  const current = draft ?? {
    revision: record?.revision ?? 0,
    title: record?.entry.title ?? "",
    body: record?.entry.body ?? "",
    resourceUrl: record?.entry.resourceUrl ?? record?.entry.pdfUrl ?? "",
  };
  const { revision, title, body, resourceUrl } = current;
  const dirty = draft !== null;
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const category = curriculumCategories.find((cat) => cat.id === location.categoryId)!;
  const save = useMutation({
    onMutate: () => onSaving(true),
    onSettled: () => onSaving(false),
    mutationFn: () =>
      saveEditorEntry(
        {
          ...location,
          gender: location.categoryId === "ilmihal" ? location.gender : undefined,
          title,
          body,
          resourceUrl,
          revision,
        },
        csrf
      ),
    onSuccess: (result) => {
      onSaved(result);
      setDraft(null);
    },
  });
  useEffect(() => {
    if (!dirty) return;
    const beforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [dirty]);
  function changed(update: Partial<Omit<EntryDraft, "revision">>) {
    setDraft((previous) => ({ ...(previous ?? current), ...update }));
    onDirty();
  }
  return (
    <form
      className="editor-content-card"
      onSubmit={(event) => {
        event.preventDefault();
        save.mutate();
      }}
    >
      <header className="editor-content-heading">
        <div>
          <span className={`editor-content-status ${filled(record?.entry) ? "is-filled" : ""}`}>
            {filled(record?.entry) ? <Check size={13} /> : <Plus size={13} />}
            {filled(record?.entry) ? "İçerik var" : "Yeni içerik"}
          </span>
          <h3>{category.label}</h3>
        </div>
        <button
          className="editor-button primary"
          disabled={save.isPending || !title.trim() || !body.trim() || !dirty}
        >
          <Save size={17} />
          {save.isPending
            ? "Kaydediliyor…"
            : record?.entry.isDraft
              ? "Taslağı kaydet"
              : "Kaydet ve yayınla"}
        </button>
      </header>
      {!record && (
        <p className="editor-empty-hint">
          <FilePenLine size={18} /> Bu alan boş. Başlığı ve haftalık metni ekleyerek başlayın.
        </p>
      )}
      <label className="editor-field">
        İçerik başlığı
        <input
          value={title}
          maxLength={200}
          required
          onChange={(event) => changed({ title: event.target.value })}
          placeholder="Bu hafta ne anlatılacak?"
          disabled={save.isPending}
        />
      </label>
      <div className="editor-writing-heading">
        <div className="editor-tabs">
          <button
            type="button"
            aria-pressed={tab === "edit"}
            className={tab === "edit" ? "active" : ""}
            onClick={() => setTab("edit")}
          >
            Yazı düzenle
          </button>
          <button
            type="button"
            aria-pressed={tab === "preview"}
            className={tab === "preview" ? "active" : ""}
            onClick={() => setTab("preview")}
          >
            Önizleme
          </button>
        </div>
        <small>Markdown · {body.length.toLocaleString("tr-TR")} karakter</small>
      </div>
      <div className={save.isPending ? "editor-writing disabled" : "editor-writing"}>
        {tab === "edit" ? (
          <MarkdownEditor value={body} onChange={(value) => changed({ body: value })} />
        ) : (
          <div className="editor-preview">
            {body ? (
              <MarkdownContent>{body}</MarkdownContent>
            ) : (
              <p>Önizleme için bir metin yazın.</p>
            )}
          </div>
        )}
      </div>
      <p className="editor-help">
        Araç çubuğuyla başlık, kalın yazı, alıntı, liste ve bağlantı ekleyebilirsiniz. Arapça
        metinler kendi yazı yönünde gösterilir.
      </p>
      <label className="editor-field">
        Kaynak bağlantısı <span>(isteğe bağlı)</span>
        <input
          type="text"
          value={resourceUrl}
          maxLength={2048}
          placeholder="https://… veya /curriculum/…/hafta-01.pdf"
          onChange={(event) => changed({ resourceUrl: event.target.value })}
          disabled={save.isPending}
        />
      </label>
      {save.error && (
        <div className="editor-error" role="alert">
          {save.error.message}
          {save.error instanceof EditorRequestError && save.error.status === 409 && (
            <button type="button" className="editor-button" onClick={onReload}>
              Güncel içeriği yükle
            </button>
          )}
          {save.error instanceof EditorRequestError && save.error.status === 401 && (
            <button
              type="button"
              className="editor-button"
              onClick={() => window.location.reload()}
            >
              Tekrar giriş yap
            </button>
          )}
        </div>
      )}
      <footer className="editor-content-footer">
        <span>
          {dirty
            ? "Kaydedilmemiş değişiklikler"
            : record?.updatedAt
              ? `Son kayıt: ${new Date(record.updatedAt).toLocaleString("tr-TR")}`
              : "Değişiklikler kaydettiğinizde yayınlanır."}
        </span>
        <span>
          {location.categoryId === "ilmihal"
            ? `${location.gender === "erkek" ? "Erkek" : "Bayan"} · `
            : ""}
          M{location.grade} · {category.shortLabel}
        </span>
      </footer>
    </form>
  );
}
