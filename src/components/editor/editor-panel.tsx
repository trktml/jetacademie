"use client";

import { curriculumCategories } from "@/components/curriculum-category";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Circle,
  LogOut,
  Plus,
  ShieldCheck,
} from "lucide-react";
import {
  EditorRequestError,
  filled,
  matchLocation,
  getEditorEntries,
  logoutEditor,
  type EditorLocation,
} from "@/lib/editor-client";
import { EntryEditor } from "./entry-editor";
import { EditorLoginForm } from "./editor-login-form";
import type { EditorRecord } from "@/lib/editor/types";
import "./editor.css";
import "@uiw/react-md-editor/markdown-editor.css";

const months = [
  { id: 9, name: "Eylül" },
  { id: 10, name: "Ekim" },
  { id: 11, name: "Kasım" },
  { id: 12, name: "Aralık" },
  { id: 1, name: "Ocak" },
  { id: 2, name: "Şubat" },
  { id: 3, name: "Mart" },
  { id: 4, name: "Nisan" },
  { id: 5, name: "Mayıs" },
  { id: 6, name: "Haziran" },
  { id: 7, name: "Temmuz" },
  { id: 8, name: "Ağustos" },
];
export function EditorPanel({
  initialCsrf,
  unavailable,
}: {
  initialCsrf: string | null;
  unavailable: boolean;
}) {
  const [csrf, setCsrf] = useState(initialCsrf);
  const [location, setLocation] = useState<EditorLocation>({
    grade: 1,
    month: 9,
    week: 1,
    categoryId: "konu",
    gender: "erkek",
  });
  const [dirty, setDirty] = useState(false);
  const [editorGeneration, setEditorGeneration] = useState(0);
  const [saving, setSaving] = useState(false);
  const [pending, setPending] = useState<(() => void) | null>(null);
  const [notice, setNotice] = useState("");
  const queryClient = useQueryClient();
  const entriesQuery = useQuery({
    queryKey: ["editor-entries", location.grade],
    queryFn: ({ signal }) => getEditorEntries(location.grade, signal),
    enabled: !!csrf && !dirty,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const records = entriesQuery.data ?? [];
  const expired =
    entriesQuery.error instanceof EditorRequestError && entriesQuery.error.status === 401;
  function navigate(next: () => void) {
    if (saving) return;
    if (dirty) {
      setPending(() => next);
      return;
    }
    setNotice("");
    next();
  }
  function select(next: EditorLocation) {
    if (
      next.grade === location.grade &&
      next.month === location.month &&
      next.week === location.week &&
      next.categoryId === location.categoryId &&
      next.gender === location.gender &&
      next.extraOrder === location.extraOrder
    )
      return;
    navigate(() => {
      setDirty(false);
      setLocation(next);
    });
  }
  const logout = useMutation({
    mutationFn: () => logoutEditor(csrf ?? ""),
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: ["editor-entries"] });
      setDirty(false);
      setCsrf(null);
      queryClient.removeQueries({ queryKey: ["editor-entries"] });
    },
    onError: (error) => setNotice(error.message),
  });
  const current = records.find((record) => matchLocation(record, location));
  const extraCount = Math.max(
    0,
    ...records
      .filter(
        (record) =>
          record.entry.isExtra &&
          record.entry.categoryId === location.categoryId &&
          (location.categoryId !== "ilmihal" || record.entry.gender === location.gender)
      )
      .map((record) => record.entry.extraOrder ?? 0)
  );
  const category = curriculumCategories.find((item) => item.id === location.categoryId)!;
  const monthIndex = months.findIndex((month) => month.id === location.month);
  const weekIndex = monthIndex * 4 + location.week - 1;
  function step(offset: number) {
    const nextIndex = weekIndex + offset;
    if (nextIndex >= 0 && nextIndex < 48)
      select({
        ...location,
        month: months[Math.floor(nextIndex / 4)].id,
        week: (nextIndex % 4) + 1,
        extraOrder: undefined,
      });
  }
  if (!csrf || expired)
    return (
      <EditorLoginForm
        unavailable={unavailable}
        onLogin={(token) => {
          setDirty(false);
          setCsrf(token);
          queryClient.removeQueries({ queryKey: ["editor-entries"] });
        }}
      />
    );

  return (
    <main className="editor-shell" data-color-mode="light">
      <header className="editor-header">
        <div className="editor-brand">
          <span className="editor-brand-icon">
            <BookOpen size={22} />
          </span>
          <div>
            <strong>JetAcademie</strong>
            <span>Müfredat çalışma alanı</span>
          </div>
        </div>
        <div className="editor-header-actions">
          <span className="editor-security">
            <ShieldCheck size={16} /> Özel oturum
          </span>
          <button
            className="editor-button subtle"
            disabled={logout.isPending}
            onClick={() => navigate(() => logout.mutate())}
          >
            <LogOut size={16} />
            <span>Çıkış</span>
          </button>
        </div>
      </header>
      <div className="editor-layout">
        <aside className="editor-sidebar">
          <div className="editor-sidebar-heading">
            <span className="editor-eyebrow">YILLIK PLAN</span>
            <h1>Haftalara göz at</h1>
            <p>Bir hafta seç. İçeriği ekle veya düzenle.</p>
          </div>
          <label className="editor-field">
            Sınıf
            <select
              value={location.grade}
              onChange={(event) => select({ ...location, grade: Number(event.target.value) })}
            >
              {[1, 2, 3, 4, 5, 6].map((grade) => (
                <option key={grade} value={grade}>
                  M{grade} · {grade}. Sınıf
                </option>
              ))}
            </select>
          </label>
          <label className="editor-field">
            İlmihal içerik hattı
            <select
              value={location.gender}
              onChange={(event) =>
                select({ ...location, gender: event.target.value as "erkek" | "bayan" })
              }
            >
              <option value="erkek">Erkek</option>
              <option value="bayan">Bayan</option>
            </select>
          </label>
          <div className="editor-legend">
            <span>
              <i className="filled-dot" /> Dolu
            </span>
            <span>
              <i /> Boş
            </span>
            <small>Rakamlar: dolu kategori / {curriculumCategories.length}</small>
          </div>
          <nav className="editor-months" aria-label="Aylar ve haftalar">
            {months.map((month) => (
              <div key={month.id} className="editor-month">
                <div className="editor-month-name">
                  <strong>{month.name}</strong>
                  <span>{month.id >= 9 ? "2026" : "2027"}</span>
                </div>
                <div className="editor-weeks">
                  {[1, 2, 3, 4].map((week) => {
                    const target = { ...location, month: month.id, week, extraOrder: undefined };
                    const count = curriculumCategories.filter((cat) =>
                      filled(records.find((record) => matchLocation(record, target, cat.id))?.entry)
                    ).length;
                    const active =
                      !location.extraOrder && location.month === month.id && location.week === week;
                    return (
                      <button
                        key={week}
                        className={`editor-week ${active ? "active" : ""} ${count ? "has-content" : ""}`}
                        aria-pressed={active}
                        aria-label={`${month.name} ${week}. hafta, ${count} dolu kategori`}
                        disabled={entriesQuery.isPending}
                        onClick={() => select(target)}
                      >
                        <span>{week}. hafta</span>
                        <small>
                          {entriesQuery.isPending ? "…" : `${count}/${curriculumCategories.length}`}
                        </small>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
          <div className="editor-extras">
            <span className="editor-eyebrow">EK HAFTALAR · {category.shortLabel}</span>
            <div>
              {Array.from({ length: extraCount }, (_, index) => index + 1).map((order) => (
                <button
                  key={order}
                  className={`editor-button subtle ${location.extraOrder === order ? "selected" : ""}`}
                  onClick={() => select({ ...location, extraOrder: order })}
                >
                  Ek {order}
                </button>
              ))}
              <button
                className="editor-button subtle"
                onClick={() => select({ ...location, extraOrder: extraCount + 1 })}
              >
                <Plus size={15} /> Ek hafta
              </button>
            </div>
            <small>48 normal haftadan sonra eklenir.</small>
          </div>
        </aside>
        <section className="editor-workspace">
          <div className="editor-workspace-heading">
            <div>
              <span className="editor-eyebrow">
                M{location.grade} · {location.grade}. SINIF
              </span>
              <h2>
                {location.extraOrder
                  ? `Ek hafta ${location.extraOrder}`
                  : `${months[monthIndex].name} · ${location.week}. hafta`}
              </h2>
              <p>Bu haftanın tüm içerikleri tek yerde.</p>
            </div>
            {!location.extraOrder && (
              <div className="editor-week-navigation">
                <button
                  className="editor-icon-button"
                  aria-label="Önceki hafta"
                  disabled={weekIndex === 0}
                  onClick={() => step(-1)}
                >
                  <ChevronLeft size={20} />
                </button>
                <span>{weekIndex + 1} / 48</span>
                <button
                  className="editor-icon-button"
                  aria-label="Sonraki hafta"
                  disabled={weekIndex === 47}
                  onClick={() => step(1)}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
          <nav className="editor-categories" aria-label="Haftalık içerik kategorileri">
            {curriculumCategories.map((cat) => {
              const exists = filled(
                records.find((record) => matchLocation(record, location, cat.id))?.entry
              );
              return (
                <button
                  key={cat.id}
                  aria-pressed={location.categoryId === cat.id}
                  className={`editor-category ${location.categoryId === cat.id ? "active" : ""}`}
                  onClick={() => select({ ...location, categoryId: cat.id })}
                >
                  <cat.icon size={19} />
                  <span>{cat.shortLabel}</span>
                  {exists ? (
                    <Check className="editor-status-check" size={14} aria-label="Dolu" />
                  ) : (
                    <Circle size={10} aria-label="Boş" />
                  )}
                </button>
              );
            })}
          </nav>
          {notice && (
            <p className="editor-notice" role="status">
              {notice}
            </p>
          )}
          {entriesQuery.isPending ? (
            <div className="editor-loading">Haftalık içerikler yükleniyor…</div>
          ) : entriesQuery.isError && !entriesQuery.data ? (
            <div className="editor-error" role="alert">
              {entriesQuery.error.message}
              <button className="editor-button" onClick={() => entriesQuery.refetch()}>
                Tekrar dene
              </button>
            </div>
          ) : (
            <EntryEditor
              key={`${location.grade}:${location.month}:${location.week}:${location.categoryId}:${location.gender}:${location.extraOrder ?? 0}:${editorGeneration}`}
              location={location}
              record={current}
              csrf={csrf}
              onSaving={setSaving}
              onDirty={() => {
                setDirty(true);
                setNotice("");
              }}
              onSaved={(record) => {
                setDirty(false);
                setNotice(
                  record.entry.isDraft
                    ? "Kaydedildi. İçerik taslak olarak korundu."
                    : "Kaydedildi. İçerik müfredatta yayında."
                );
                queryClient.setQueryData<EditorRecord[]>(
                  ["editor-entries", location.grade],
                  (previous = []) => [
                    ...previous.filter((item) => item.entry.id !== record.entry.id),
                    record,
                  ]
                );
                queryClient.invalidateQueries({ queryKey: ["curriculum", location.grade] });
              }}
              onReload={() =>
                navigate(() => {
                  setDirty(false);
                  void entriesQuery.refetch().then((result) => {
                    if (result.isSuccess) setEditorGeneration((value) => value + 1);
                    else setNotice(result.error?.message ?? "İçerik yüklenemedi.");
                  });
                })
              }
            />
          )}
        </section>
      </div>
      {pending && (
        <UnsavedDialog
          onCancel={() => setPending(null)}
          onDiscard={() => {
            const action = pending;
            setPending(null);
            setDirty(false);
            action();
          }}
        />
      )}
    </main>
  );
}

function UnsavedDialog({ onCancel, onDiscard }: { onCancel: () => void; onDiscard: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    dialog.current?.showModal();
  }, []);
  return (
    <dialog
      ref={dialog}
      className="editor-dialog"
      aria-labelledby="discard-title"
      onCancel={onCancel}
    >
      <h2 id="discard-title">Kaydedilmemiş değişiklikler var</h2>
      <p>Bu haftada yaptığınız değişiklikleri kaybetmemek için önce kaydedin.</p>
      <div>
        <button autoFocus className="editor-button primary" onClick={onCancel}>
          Düzenlemeye dön
        </button>
        <button className="editor-button" onClick={onDiscard}>
          Değişiklikleri bırak
        </button>
      </div>
    </dialog>
  );
}
