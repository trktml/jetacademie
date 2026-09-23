"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Filter,
  GraduationCap,
  Layers,
  Library,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import {
  BOOK_CATEGORIES,
  BookCategory,
  BookLevel,
  CurriculumBook,
  getAllCurriculumBooks,
} from "@/lib/data/curriculum-books";

interface CurriculumBooksViewProps {
  initialCategory?: string;
  initialLevel?: string;
  initialGrade?: number;
}

export function CurriculumBooksView({
  initialCategory = "all",
  initialLevel = "all",
  initialGrade,
}: CurriculumBooksViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | "all">(
    (BOOK_CATEGORIES.some((c) => c.id === initialCategory) ? initialCategory : "all") as
      BookCategory | "all"
  );
  const [selectedLevel, setSelectedLevel] = useState<BookLevel | "all">(
    initialLevel === "ortaokul" || initialLevel === "lise" ? initialLevel : "all"
  );
  const [selectedGrade, setSelectedGrade] = useState<number | undefined>(
    initialGrade && initialGrade >= 1 && initialGrade <= 6 ? initialGrade : undefined
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBookModal, setActiveBookModal] = useState<CurriculumBook | null>(null);

  const searchInputId = useId();
  const allBooks = useMemo(() => getAllCurriculumBooks(), []);

  const filteredBooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return allBooks.filter((book) => {
      if (selectedCategory !== "all" && book.category !== selectedCategory) {
        return false;
      }
      if (selectedLevel !== "all" && book.level !== "all" && book.level !== selectedLevel) {
        return false;
      }
      if (selectedGrade !== undefined && !book.targetGrades.includes(selectedGrade)) {
        return false;
      }
      if (q) {
        const inTitle = book.title.toLowerCase().includes(q);
        const inSub = book.subtitle?.toLowerCase().includes(q) ?? false;
        const inAuthor = book.author.toLowerCase().includes(q);
        const inPublisher = book.publisher.toLowerCase().includes(q);
        const inDesc = book.description.toLowerCase().includes(q);
        const inHighlights = book.highlights.some((h) => h.toLowerCase().includes(q));
        if (!inTitle && !inSub && !inAuthor && !inPublisher && !inDesc && !inHighlights) {
          return false;
        }
      }
      return true;
    });
  }, [allBooks, selectedCategory, selectedLevel, selectedGrade, searchQuery]);

  return (
    <div className="curriculum-books-view mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6">
      {/* Hero Header */}
      <header className="space-y-3 pt-2 pb-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-400">
          <Library className="h-3.5 w-3.5" aria-hidden="true" />
          <span>JetAcademie Kütüphanesi</span>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Müfredat Kitapları & Kaynak Eserler
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-zinc-400 sm:text-base">
          6 yıllık Belçika ortaokul ve lise müfredatında (M1–M6) takip edilen temel ders kitapları,
          fıkıh ilmihalleri, hadis külliyatları ve tefekkür eserleri.
        </p>
      </header>

      {/* Quick Stats Ribbon */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3.5 text-center">
          <div className="text-xl font-black text-rose-400 sm:text-2xl">{allBooks.length}</div>
          <div className="text-xs font-medium text-zinc-400">Temel Eser</div>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3.5 text-center">
          <div className="text-xl font-black text-amber-400 sm:text-2xl">6 Sınıf</div>
          <div className="text-xs font-medium text-zinc-400">M1 – M6 Kapsamı</div>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3.5 text-center">
          <div className="text-xl font-black text-emerald-400 sm:text-2xl">7 Kategori</div>
          <div className="text-xs font-medium text-zinc-400">İlmihalden Siyere</div>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3.5 text-center">
          <div className="text-xl font-black text-sky-400 sm:text-2xl">100%</div>
          <div className="text-xs font-medium text-zinc-400">Müfredat Uyumu</div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <section className="space-y-4 rounded-2xl border border-zinc-800/90 bg-zinc-900/60 p-4 shadow-sm backdrop-blur-md sm:p-5">
        {/* Search Input */}
        <div className="relative">
          <label htmlFor={searchInputId} className="sr-only">
            Kitap, yazar veya konu ara
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-400"
            aria-hidden="true"
          />
          <input
            id={searchInputId}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kitap adı, yazar, kavram veya konu ara..."
            className="min-h-[44px] w-full rounded-xl border border-zinc-800 bg-zinc-950/80 pr-10 pl-10 text-sm text-zinc-100 placeholder-zinc-500 transition focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/50 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute top-1/2 right-2.5 flex min-h-[36px] min-w-[36px] -translate-y-1/2 items-center justify-center text-zinc-400 hover:text-zinc-200"
              aria-label="Aramayı temizle"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Level & Grade Filter Row */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="mr-1 flex items-center gap-1.5 text-xs font-semibold text-zinc-400">
            <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Kademe:</span>
          </span>

          <button
            type="button"
            onClick={() => {
              setSelectedLevel("all");
              setSelectedGrade(undefined);
            }}
            className={`min-h-[44px] rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
              selectedLevel === "all" && selectedGrade === undefined
                ? "bg-rose-600 text-white shadow-md shadow-rose-900/30"
                : "border border-zinc-800 bg-zinc-950/70 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            Tüm Kademeler
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedLevel("ortaokul");
              setSelectedGrade(undefined);
            }}
            className={`min-h-[44px] rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
              selectedLevel === "ortaokul" && selectedGrade === undefined
                ? "bg-rose-600 text-white shadow-md shadow-rose-900/30"
                : "border border-zinc-800 bg-zinc-950/70 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            Ortaokul (M1–M3)
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedLevel("lise");
              setSelectedGrade(undefined);
            }}
            className={`min-h-[44px] rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
              selectedLevel === "lise" && selectedGrade === undefined
                ? "bg-rose-600 text-white shadow-md shadow-rose-900/30"
                : "border border-zinc-800 bg-zinc-950/70 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            Lise (M4–M6)
          </button>

          {/* Sınıf Pills */}
          <div className="ml-auto inline-flex items-center gap-1">
            {[1, 2, 3, 4, 5, 6].map((grade) => (
              <button
                key={grade}
                type="button"
                onClick={() => {
                  if (selectedGrade === grade) {
                    setSelectedGrade(undefined);
                  } else {
                    setSelectedGrade(grade);
                    setSelectedLevel(grade <= 3 ? "ortaokul" : "lise");
                  }
                }}
                className={`flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-xs font-bold transition ${
                  selectedGrade === grade
                    ? "bg-rose-600 text-white ring-2 ring-rose-400"
                    : "border border-zinc-800 bg-zinc-950/70 text-zinc-400 hover:text-white"
                }`}
                title={`${grade}. Sınıf (M${grade})`}
              >
                M{grade}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills Rail */}
        <div className="flex flex-wrap items-center gap-1.5 border-t border-zinc-800/60 pt-1">
          <span className="mr-1 flex items-center gap-1.5 py-1 text-xs font-semibold text-zinc-400">
            <Filter className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Kategori:</span>
          </span>

          {BOOK_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`min-h-[44px] rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                  isSelected
                    ? "bg-rose-600 text-white shadow-md shadow-rose-900/30"
                    : "border border-zinc-800/80 bg-zinc-950/60 text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
                }`}
              >
                {cat.shortLabel}
              </button>
            );
          })}
        </div>
      </section>

      {/* Results Header */}
      <div className="flex items-center justify-between px-1 text-xs text-zinc-400">
        <span>
          Toplam <strong className="font-bold text-white">{filteredBooks.length}</strong> eser
          listeleniyor
        </span>
        {(searchQuery ||
          selectedCategory !== "all" ||
          selectedLevel !== "all" ||
          selectedGrade !== undefined) && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSelectedLevel("all");
              setSelectedGrade(undefined);
            }}
            className="flex min-h-[44px] items-center text-rose-400 hover:underline"
          >
            Filtreleri Sıfırla
          </button>
        )}
      </div>

      {/* Book Cards Grid */}
      {filteredBooks.length === 0 ? (
        <div className="space-y-3 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-12 text-center">
          <BookOpen className="mx-auto h-10 w-10 text-zinc-500" aria-hidden="true" />
          <h2 className="text-lg font-bold text-white">Eser Bulunamadı</h2>
          <p className="mx-auto max-w-md text-sm text-zinc-400">
            Arama kriterlerinize uygun kitap bulunamadı. Lütfen arama terimini değiştirin veya
            filtreleri sıfırlayın.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSelectedLevel("all");
              setSelectedGrade(undefined);
            }}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-500"
          >
            Tüm Kitapları Göster
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => {
            return (
              <article
                key={book.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-sm transition-all duration-200 hover:border-rose-500/50 hover:bg-zinc-900 hover:shadow-xl hover:shadow-rose-950/20"
              >
                {/* Book Card Top: Spine & Badges */}
                <div className="space-y-4">
                  {/* Visual Header Mockup */}
                  <div
                    className={`relative rounded-xl bg-gradient-to-br p-4 ${book.coverColor.bg} border ${book.coverColor.border} overflow-hidden shadow-inner`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <span className="inline-block rounded-md bg-black/40 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white/90 uppercase">
                          {book.publisher}
                        </span>
                        <h2 className="line-clamp-2 text-base leading-snug font-extrabold text-white">
                          {book.title}
                        </h2>
                      </div>
                      <span className="shrink-0 rounded-lg bg-black/30 p-2 text-rose-300">
                        <BookOpen className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </div>

                    {book.subtitle && (
                      <p className="mt-2 line-clamp-1 text-xs text-white/75 italic">
                        {book.subtitle}
                      </p>
                    )}

                    <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5 text-[11px] text-white/80">
                      <span className="truncate font-medium">{book.author}</span>
                      {book.pageCount && (
                        <span className="shrink-0 font-mono text-[10px] text-white/70">
                          {book.pageCount} s.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Level & Grades Badges */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="rounded-md border border-rose-500/20 bg-rose-500/10 px-2 py-0.5 text-[11px] font-semibold text-rose-300">
                      {book.level === "all"
                        ? "Tüm Kademeler"
                        : book.level === "ortaokul"
                          ? "Ortaokul (M1–M3)"
                          : "Lise (M4–M6)"}
                    </span>

                    {book.targetGrades.map((g) => (
                      <span
                        key={g}
                        className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px] font-bold text-zinc-300"
                      >
                        M{g}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="line-clamp-3 text-xs leading-relaxed text-zinc-300">
                    {book.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-1.5 border-t border-zinc-800/80 pt-2">
                    <span className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase">
                      Öne Çıkan Başlıklar
                    </span>
                    <ul className="space-y-1">
                      {book.highlights.slice(0, 2).map((item, idx) => (
                        <li
                          key={idx}
                          className="line-clamp-1 flex items-start gap-1.5 text-xs text-zinc-400"
                        >
                          <CheckCircle2
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-5 flex items-center justify-between gap-2 border-t border-zinc-800/80 pt-3">
                  <button
                    type="button"
                    onClick={() => setActiveBookModal(book)}
                    className="flex min-h-[44px] items-center gap-1.5 rounded-xl bg-zinc-800/80 px-3.5 py-2 text-xs font-semibold text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
                  >
                    <span>İncele</span>
                    <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>

                  {book.curriculumPath ? (
                    <Link
                      href={book.curriculumPath}
                      className="flex min-h-[44px] items-center gap-1 rounded-xl border border-rose-500/40 bg-rose-600/30 px-3.5 py-2 text-xs font-semibold text-rose-200 transition hover:bg-rose-600 hover:text-white"
                    >
                      <span>Müfredatta Gör</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Book Detail Modal */}
      {activeBookModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="book-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div className="animate-in fade-in zoom-in-95 relative max-h-[90vh] w-full max-w-lg space-y-5 overflow-y-auto rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl duration-200">
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setActiveBookModal(null)}
              className="absolute top-4 right-4 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-zinc-900 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
              aria-label="Kapat"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1.5 pr-8">
              <span className="inline-block rounded-lg border border-rose-500/20 bg-rose-500/10 px-2.5 py-1 text-xs font-bold tracking-wider text-rose-400 uppercase">
                {activeBookModal.publisher}
              </span>
              <h2
                id="book-modal-title"
                className="text-xl leading-tight font-black text-white sm:text-2xl"
              >
                {activeBookModal.title}
              </h2>
              {activeBookModal.subtitle && (
                <p className="text-xs text-zinc-400 italic sm:text-sm">
                  {activeBookModal.subtitle}
                </p>
              )}
              <div className="pt-1 text-xs font-medium text-zinc-300">
                Yazar: <strong className="text-white">{activeBookModal.author}</strong>
              </div>
            </div>

            {/* Curriculum Relevance */}
            <div className="space-y-1.5 rounded-2xl border border-rose-500/30 bg-rose-950/20 p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>Müfredattaki Yeri ve Önemi</span>
              </div>
              <p className="text-xs leading-relaxed text-rose-100">
                {activeBookModal.curriculumRelevance}
              </p>
            </div>

            {/* General Description */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
                Eser Hakkında
              </h3>
              <p className="text-xs leading-relaxed text-zinc-300 sm:text-sm">
                {activeBookModal.description}
              </p>
            </div>

            {/* Key Topics / Highlights */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
                Öne Çıkan Başlıklar & Konular
              </h3>
              <ul className="space-y-1.5">
                {activeBookModal.highlights.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-2.5 text-xs text-zinc-200 sm:text-sm"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Target Grades */}
            <div className="flex items-center gap-2 border-t border-zinc-800 pt-2 text-xs text-zinc-400">
              <span>Hedef Kademeler:</span>
              <div className="flex gap-1">
                {activeBookModal.targetGrades.map((g) => (
                  <span
                    key={g}
                    className="rounded bg-zinc-800 px-2 py-0.5 font-mono font-bold text-white"
                  >
                    M{g}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom Action */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveBookModal(null)}
                className="min-h-[44px] rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              >
                Kapat
              </button>
              {activeBookModal.curriculumPath && (
                <Link
                  href={activeBookModal.curriculumPath}
                  className="flex min-h-[44px] items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-500"
                >
                  <span>Müfredat Dersine Git</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
