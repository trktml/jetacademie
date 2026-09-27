"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Circle,
  FilePenLine,
  LockKeyhole,
  LogOut,
  Plus,
  Save,
  ShieldCheck,
} from "lucide-react";
import {
  curriculumCategories,
  type CurriculumCategoryId,
  type CurriculumEntry,
} from "@/lib/curriculum";
import { MarkdownContent } from "@/components/markdown-content";
import type { EditorRecord } from "@/lib/editor/content";
import "./editor.css";
import "@uiw/react-md-editor/markdown-editor.css";

const MarkdownEditor = dynamic(() => import("./markdown-editor"), {
  ssr: false,
  loading: () => <div className="editor-loading">Editör hazırlanıyor…</div>,
});
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
interface Location {
  grade: number;
  month: number;
  week: number;
  categoryId: CurriculumCategoryId;
  gender: "erkek" | "bayan";
  extraOrder?: number;
}
class EditorRequestError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
  }
}
async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api/editor/${path}`, {
    ...init,
    cache: "no-store",
    credentials: "same-origin",
  });
  const data = await response.json();
  if (!response.ok)
    throw new EditorRequestError(data.error ?? "İşlem tamamlanamadı.", response.status);
  return data as T;
}
const filled = (entry?: CurriculumEntry) =>
  !!(entry?.body?.trim() || entry?.resourceUrl || entry?.pdfUrl);
function matchLocation(
  record: EditorRecord,
  location: Location,
  categoryId = location.categoryId
): boolean {
  const entry = record.entry;
  return (
    entry.categoryId === categoryId &&
    (categoryId !== "ilmihal" || entry.gender === location.gender) &&
    (location.extraOrder
      ? !!entry.isExtra && entry.extraOrder === location.extraOrder
      : !entry.isExtra && entry.month === location.month && entry.week === location.week)
  );
}

export function EditorPanel({
  initialCsrf,
  unavailable,
}: {
  initialCsrf: string | null;
  unavailable: boolean;
}) {
  const [csrf, setCsrf] = useState(initialCsrf);
  const [location, setLocation] = useState<Location>({
    grade: 1,
    month: 9,
    week: 1,
    categoryId: "konu",
    gender: "erkek",
  });
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pending, setPending] = useState<(() => void) | null>(null);
  const [notice, setNotice] = useState("");
  const queryClient = useQueryClient();
  const entriesQuery = useQuery({
    queryKey: ["editor-entries", location.grade],
    queryFn: () => api<EditorRecord[]>(`entries?sinif=${location.grade}`),
    enabled: !!csrf,
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
  function select(next: Location) {
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
    mutationFn: () =>
      api("session", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "X-Editor-CSRF": csrf ?? "" },
        body: "{}",
      }),
    onSuccess: () => {
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
      <LoginForm
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
            <small>Rakamlar: dolu kategori / 9</small>
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
                        <small>{entriesQuery.isPending ? "…" : `${count}/9`}</small>
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
          ) : entriesQuery.isError ? (
            <div className="editor-error" role="alert">
              {entriesQuery.error.message}
              <button className="editor-button" onClick={() => entriesQuery.refetch()}>
                Tekrar dene
              </button>
            </div>
          ) : (
            <EntryEditor
              key={`${location.grade}:${location.month}:${location.week}:${location.categoryId}:${location.gender}:${location.extraOrder ?? 0}:${current?.revision ?? 0}`}
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
                setNotice("Kaydedildi. İçerik müfredatta yayında.");
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
                  entriesQuery.refetch();
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

function LoginForm({
  unavailable,
  onLogin,
}: {
  unavailable: boolean;
  onLogin: (csrf: string) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useMutation({
    mutationFn: () =>
      api<{ csrf: string }>("session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }),
    onSuccess: (result) => {
      setPassword("");
      onLogin(result.csrf);
    },
  });
  return (
    <main className="editor-login-page" data-color-mode="light">
      <section className="editor-login-card">
        <div className="editor-brand-icon">
          <LockKeyhole size={26} />
        </div>
        <span className="editor-eyebrow">JETACADEMIE · İÇERİK EDİTÖRÜ</span>
        <h1>Müfredat düzenleme</h1>
        <p>Haftalık içerikleri hazırlamak için özel hesabınızla giriş yapın.</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            login.mutate();
          }}
        >
          <label className="editor-field">
            Kullanıcı adı
            <input
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              maxLength={80}
              required
              autoCapitalize="none"
              spellCheck={false}
            />
          </label>
          <label className="editor-field">
            Şifre
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              maxLength={128}
              required
            />
          </label>
          {(login.error || unavailable) && (
            <p className="editor-error" role="alert">
              {login.error?.message ?? "Düzenleme hesabı sunucuda yapılandırılmamış."}
            </p>
          )}
          <button className="editor-button primary" disabled={login.isPending || unavailable}>
            {login.isPending ? "Giriş yapılıyor…" : "Çalışma alanına gir"}
            <ChevronRight size={18} />
          </button>
        </form>
        <div className="editor-login-footer">
          <ShieldCheck size={16} /> Yalnızca müfredat düzenleme erişimi
        </div>
      </section>
    </main>
  );
}

function EntryEditor({
  location,
  record,
  csrf,
  onDirty,
  onSaved,
  onReload,
  onSaving,
}: {
  location: Location;
  record?: EditorRecord;
  csrf: string;
  onDirty: () => void;
  onSaved: (record: EditorRecord) => void;
  onReload: () => void;
  onSaving: (saving: boolean) => void;
}) {
  const [title, setTitle] = useState(record?.entry.title ?? "");
  const [body, setBody] = useState(record?.entry.body ?? "");
  const [resourceUrl, setResourceUrl] = useState(
    record?.entry.resourceUrl ?? record?.entry.pdfUrl ?? ""
  );
  const [dirty, setDirty] = useState(false);
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const category = curriculumCategories.find((cat) => cat.id === location.categoryId)!;
  const save = useMutation({
    onMutate: () => onSaving(true),
    onSettled: () => onSaving(false),
    mutationFn: () =>
      api<EditorRecord>("entries", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "X-Editor-CSRF": csrf },
        body: JSON.stringify({
          ...location,
          gender: location.categoryId === "ilmihal" ? location.gender : undefined,
          title,
          body,
          resourceUrl,
          revision: record?.revision ?? 0,
        }),
      }),
    onSuccess: (result) => {
      setDirty(false);
      onSaved(result);
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
  function changed() {
    setDirty(true);
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
          {save.isPending ? "Kaydediliyor…" : "Kaydet ve yayınla"}
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
          onChange={(event) => {
            setTitle(event.target.value);
            changed();
          }}
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
          <MarkdownEditor
            value={body}
            onChange={(value) => {
              setBody(value);
              changed();
            }}
          />
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
          onChange={(event) => {
            setResourceUrl(event.target.value);
            changed();
          }}
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
