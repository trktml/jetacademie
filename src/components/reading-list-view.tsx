"use client";

import { useState } from "react";
import Image from "next/image";
import { BookOpen, ChevronDown, Sparkles } from "lucide-react";
import {
  GRADES,
  GRADE_DETAILS,
  READING_PERIODS,
  type ReadingBook,
  type ReadingPeriod,
} from "@/lib/data/curriculum-reading-list";

/* ------------------------------------------------------------------ */
/*  Dönem renk paleti (Aydınlık & Karanlık tema uyumlu)                */
/* ------------------------------------------------------------------ */

const PERIOD_COLORS: Record<
  string,
  { badge: string; border: string; bgLight: string; bgDark: string }
> = {
  "eylul-ekim": {
    badge:
      "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30",
    border: "border-amber-300 dark:border-amber-500/30",
    bgLight: "from-amber-500/5",
    bgDark: "dark:from-amber-500/5",
  },
  "kasim-aralik": {
    badge:
      "bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-500/15 dark:text-sky-300 dark:border-sky-500/30",
    border: "border-sky-300 dark:border-sky-500/30",
    bgLight: "from-sky-500/5",
    bgDark: "dark:from-sky-500/5",
  },
  "ocak-subat-mart": {
    badge:
      "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30",
    border: "border-emerald-300 dark:border-emerald-500/30",
    bgLight: "from-emerald-500/5",
    bgDark: "dark:from-emerald-500/5",
  },
  "nisan-mayis": {
    badge:
      "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30",
    border: "border-rose-300 dark:border-rose-500/30",
    bgLight: "from-rose-500/5",
    bgDark: "dark:from-rose-500/5",
  },
};

/* ------------------------------------------------------------------ */
/*  BookCard — Standart tek kitap kartı                                */
/* ------------------------------------------------------------------ */

function BookCard({ book }: { book: ReadingBook }) {
  return (
    <div className="group flex w-[110px] shrink-0 flex-col items-center gap-2" title={book.title}>
      <div className="relative h-[155px] w-[110px] overflow-hidden rounded-xl border border-zinc-200/90 bg-zinc-100 shadow-sm transition-all duration-200 group-hover:scale-[1.03] group-hover:border-rose-500/50 group-hover:shadow-lg dark:border-zinc-700/60 dark:bg-zinc-800/80 dark:group-hover:border-rose-500/50 dark:group-hover:shadow-rose-950/30">
        {book.image ? (
          <Image
            src={book.image}
            alt={book.title}
            fill
            sizes="110px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-gradient-to-b from-zinc-100 to-zinc-200 p-2 dark:from-zinc-800 dark:to-zinc-900">
            <BookOpen className="h-6 w-6 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
            <span className="text-center text-[10px] leading-tight font-semibold text-zinc-600 dark:text-zinc-400">
              {book.title}
            </span>
          </div>
        )}
      </div>
      <p className="line-clamp-2 w-[110px] text-center text-xs leading-tight font-semibold text-zinc-800 transition-colors group-hover:text-rose-600 dark:text-zinc-200 dark:group-hover:text-rose-400">
        {book.title}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  BookCardMini — Sahabe ve çok kitaplı seriler için kompakt kart     */
/* ------------------------------------------------------------------ */

function BookCardMini({ book }: { book: ReadingBook }) {
  const displayName = book.shortTitle ?? book.title;

  return (
    <div className="group flex w-[58px] shrink-0 flex-col items-center gap-1" title={book.title}>
      <div className="relative h-[82px] w-[58px] overflow-hidden rounded-lg border border-zinc-200/90 bg-zinc-100 shadow-xs transition-all duration-200 group-hover:scale-105 group-hover:border-emerald-500/60 group-hover:shadow-sm dark:border-zinc-700/50 dark:bg-zinc-800/80 dark:group-hover:border-emerald-400/50">
        {book.image ? (
          <Image src={book.image} alt={book.title} fill sizes="58px" className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
            <BookOpen className="h-4 w-4 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
          </div>
        )}
      </div>
      <p className="line-clamp-1 w-[58px] text-center text-[9px] leading-tight font-semibold text-zinc-700 transition-colors group-hover:text-emerald-700 dark:text-zinc-300 dark:group-hover:text-emerald-300">
        {displayName}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  EmptyCell — Kitap olmayan hücre                                    */
/* ------------------------------------------------------------------ */

function EmptyCell() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 py-8 opacity-40">
      <BookOpen className="h-5 w-5 text-zinc-400 dark:text-zinc-600" aria-hidden="true" />
      <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-600">—</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Desktop: Tablo Görünümü (Sütunlar ayrıştırılmış)                   */
/* ------------------------------------------------------------------ */

function DesktopTable() {
  return (
    <div className="hidden md:block">
      <div className="overflow-x-auto rounded-2xl border border-zinc-200/90 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900/90 dark:shadow-2xl">
        <table className="w-full border-collapse">
          {/* Sütun Başlıkları */}
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-100/90 dark:border-zinc-800 dark:bg-zinc-950/90">
              {/* Dönem Sütun Başlığı */}
              <th className="sticky left-0 z-20 w-[150px] border-r border-zinc-200 bg-zinc-100/95 px-4 py-3.5 text-left text-xs font-bold tracking-wider text-zinc-500 uppercase backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/95 dark:text-zinc-400">
                Dönem
              </th>

              {/* Sınıf Sütun Başlıkları (M1–M6) */}
              {GRADES.map((grade) => {
                const details = GRADE_DETAILS[grade];
                const isOrtaokul = grade <= 3;
                const isEven = grade % 2 === 0;

                return (
                  <th
                    key={grade}
                    className={`min-w-[145px] border-r border-zinc-200 px-3 py-3.5 text-center transition-colors last:border-r-0 dark:border-zinc-800 ${
                      isEven
                        ? "bg-zinc-100/60 dark:bg-zinc-900/40"
                        : "bg-zinc-100/30 dark:bg-zinc-950/60"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span
                        className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1 text-xs font-black tracking-wide shadow-xs ${
                          isOrtaokul
                            ? "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300"
                            : "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300"
                        }`}
                      >
                        {details.label}
                      </span>
                      <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                        {details.subLabel}
                      </span>
                      <span className="text-[9px] font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
                        {details.level}
                      </span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Tablo Gövdesi */}
          <tbody>
            {READING_PERIODS.map((period, periodIdx) => {
              const colors = PERIOD_COLORS[period.id];
              const isLast = periodIdx === READING_PERIODS.length - 1;

              return (
                <tr
                  key={period.id}
                  className={`transition-colors hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30 ${
                    !isLast ? "border-b border-zinc-200/90 dark:border-zinc-800/80" : ""
                  }`}
                >
                  {/* Dönem Adı (Sticky sol sütun) */}
                  <td
                    className={`sticky left-0 z-10 border-r border-zinc-200 bg-zinc-50/95 px-4 py-5 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/95 ${
                      !isLast ? "border-b border-b-zinc-200/90 dark:border-b-zinc-800/80" : ""
                    }`}
                  >
                    <span
                      className={`inline-block rounded-lg border px-2.5 py-1.5 text-xs font-bold shadow-xs ${
                        colors?.badge ?? ""
                      }`}
                    >
                      {period.label}
                    </span>
                  </td>

                  {/* Sınıf Hücreleri */}
                  {GRADES.map((grade) => {
                    const books = period.books[grade] ?? [];
                    const isEven = grade % 2 === 0;
                    const isMultiSeries = books.length >= 3;

                    return (
                      <td
                        key={grade}
                        className={`border-r border-zinc-200 px-3 py-5 text-center align-middle transition-colors last:border-r-0 dark:border-zinc-800 ${
                          !isLast ? "border-b border-zinc-200/90 dark:border-zinc-800/80" : ""
                        } ${
                          isEven
                            ? "bg-zinc-50/40 dark:bg-zinc-900/25"
                            : "bg-white dark:bg-zinc-900/10"
                        }`}
                      >
                        {books.length === 0 ? (
                          <EmptyCell />
                        ) : isMultiSeries ? (
                          /* Sahabe Serisi ve 3+ kitaplık hücreler: özel çerçeveli kutu */
                          <div className="mx-auto flex max-w-[210px] flex-col items-center gap-2 rounded-xl border border-emerald-500/25 bg-emerald-50/40 p-2.5 shadow-xs dark:border-emerald-500/25 dark:bg-emerald-950/20">
                            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                              <span>Sahabe Serisi</span>
                              <span className="rounded bg-emerald-500/20 px-1 py-0.5 text-[9px] font-bold text-emerald-800 dark:text-emerald-200">
                                6 Kitap
                              </span>
                            </div>
                            <div className="grid grid-cols-3 justify-items-center gap-2">
                              {books.map((book) => (
                                <BookCardMini key={book.id} book={book} />
                              ))}
                            </div>
                          </div>
                        ) : (
                          /* 1 veya 2 kitaplık standart hücreler */
                          <div className="flex flex-col items-center justify-center gap-4">
                            {books.map((book) => (
                              <BookCard key={book.id} book={book} />
                            ))}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile: Collapsible Dönem Kartları (Aydınlık & Karanlık Uyumlu)   */
/* ------------------------------------------------------------------ */

function MobilePeriodCard({
  period,
  isOpen,
  onToggle,
}: {
  period: ReadingPeriod;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const colors = PERIOD_COLORS[period.id];

  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
        isOpen
          ? `${colors?.border ?? "border-zinc-300 dark:border-zinc-700"} bg-gradient-to-b ${colors?.bgLight ?? ""} ${colors?.bgDark ?? ""} to-white shadow-md dark:to-zinc-900/90`
          : "border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900/60"
      }`}
    >
      {/* Kart Başlığı */}
      <button
        type="button"
        onClick={onToggle}
        className="flex min-h-[52px] w-full items-center justify-between px-4 py-3 text-left"
        aria-expanded={isOpen}
      >
        <span
          className={`inline-block rounded-lg border px-3 py-1 text-xs font-bold shadow-xs ${
            colors?.badge ?? ""
          }`}
        >
          {period.label}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-zinc-500 transition-transform duration-200 dark:text-zinc-400 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Kart İçeriği: Sınıflara göre kitaplar */}
      {isOpen && (
        <div className="space-y-4 px-4 pt-1 pb-5">
          {GRADES.map((grade) => {
            const books = period.books[grade] ?? [];
            const details = GRADE_DETAILS[grade];
            const isOrtaokul = grade <= 3;
            const isMultiSeries = books.length >= 3;

            return (
              <div
                key={grade}
                className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-3.5 text-center dark:border-zinc-800/80 dark:bg-zinc-950/40"
              >
                <div className="mb-3 flex items-center justify-center gap-2">
                  <span
                    className={`inline-flex items-center justify-center rounded-md border px-2.5 py-0.5 text-xs font-black shadow-2xs ${
                      isOrtaokul
                        ? "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300"
                        : "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300"
                    }`}
                  >
                    {details.label}
                  </span>
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {details.subLabel}
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
                    ({details.level})
                  </span>
                </div>

                {books.length === 0 && (
                  <div className="py-2 text-center text-xs font-medium text-zinc-400 italic dark:text-zinc-500">
                    Kitap belirlenmedi
                  </div>
                )}

                {/* 1-2 kitaplık: ortalanmış flex düzeni */}
                {books.length > 0 && !isMultiSeries && (
                  <div className="flex flex-wrap items-center justify-center gap-4 py-1">
                    {books.map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </div>
                )}

                {/* 3+ kitaplık seri (Sahabe): ortalanmış */}
                {isMultiSeries && (
                  <div className="mx-auto max-w-[240px] rounded-xl border border-emerald-500/25 bg-emerald-50/50 p-2.5 dark:border-emerald-500/25 dark:bg-emerald-950/20">
                    <div className="mb-2 flex items-center justify-center gap-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                      <Sparkles className="h-3 w-3 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span>Sahabe Serisi (6 Kitap)</span>
                    </div>
                    <div className="grid grid-cols-3 justify-items-center gap-2">
                      {books.map((book) => (
                        <BookCardMini key={book.id} book={book} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MobileView() {
  const [openPeriod, setOpenPeriod] = useState<string>(READING_PERIODS[0]?.id ?? "");

  return (
    <div className="flex flex-col gap-3 md:hidden">
      {READING_PERIODS.map((period) => (
        <MobilePeriodCard
          key={period.id}
          period={period}
          isOpen={openPeriod === period.id}
          onToggle={() => setOpenPeriod((prev) => (prev === period.id ? "" : period.id))}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Ana Sayfa Bileşeni                                                 */
/* ------------------------------------------------------------------ */

export function ReadingListView() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6">
      {/* Hero Header */}
      <header className="space-y-3 pt-2 pb-4 text-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl dark:text-white">
          Müfredat Kitapları
        </h1>
      </header>

      {/* Desktop Tablo */}
      <DesktopTable />

      {/* Mobil Kartlar */}
      <MobileView />
    </div>
  );
}
