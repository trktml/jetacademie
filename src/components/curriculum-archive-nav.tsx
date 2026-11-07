import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BelgiumGrade, CurriculumCategoryId } from "@/lib/curriculum";
import { GradeSelector } from "./grade-selector";
import { curriculumCategories } from "./curriculum-category";

interface Props {
  selectedGrade: BelgiumGrade;
  activeCategoryId: CurriculumCategoryId;
  onGradeChange: (grade: BelgiumGrade) => void;
  onSelectCategory: (category: CurriculumCategoryId) => void;
}

export function CurriculumArchiveNav({
  selectedGrade,
  activeCategoryId,
  onGradeChange,
  onSelectCategory,
}: Props) {
  // Horizontal mobile capsule navigation state & refs
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const capsuleNavRef = useRef<HTMLElement | null>(null);
  const categoryButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const updateScrollIndicators = useCallback(() => {
    const container = capsuleNavRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    const container = capsuleNavRef.current;
    if (!container) return;

    updateScrollIndicators();
    container.addEventListener("scroll", updateScrollIndicators, { passive: true });
    window.addEventListener("resize", updateScrollIndicators);

    const timer = setTimeout(updateScrollIndicators, 150);

    return () => {
      container.removeEventListener("scroll", updateScrollIndicators);
      window.removeEventListener("resize", updateScrollIndicators);
      clearTimeout(timer);
    };
  }, [updateScrollIndicators]);

  // Center active category inside horizontal capsule dock
  useEffect(() => {
    const listElement = capsuleNavRef.current;
    const activeButton = categoryButtonRefs.current[activeCategoryId];

    if (listElement && activeButton) {
      if (listElement.scrollWidth > listElement.clientWidth) {
        const targetLeft =
          activeButton.offsetLeft - listElement.clientWidth / 2 + activeButton.clientWidth / 2;

        listElement.scrollTo({
          left: Math.max(0, targetLeft),
          behavior: "smooth",
        });
      }
    }
  }, [activeCategoryId]);

  function scrollNav(direction: "left" | "right") {
    const container = capsuleNavRef.current;
    if (!container) return;
    const scrollAmount = Math.max(140, Math.round(container.clientWidth * 0.65));
    container.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  }

  return (
    <aside className="archive-fixed-capsule" aria-label="Müfredat Hızlı Menü">
      <div className="archive-capsule-grade-wrapper">
        <GradeSelector compact value={selectedGrade} onGradeChange={onGradeChange} />
      </div>

      <div className="archive-capsule-nav-container">
        {/* Mobilde sağa/sola kaydırılabilir olduğunu belirten zarif gradyan ve ok butonları */}
        <button
          type="button"
          className="archive-capsule-scroll-hint archive-capsule-scroll-hint--left"
          data-visible={canScrollLeft}
          aria-label="Önceki kategoriler"
          tabIndex={canScrollLeft ? 0 : -1}
          onClick={() => scrollNav("left")}
        >
          <span className="archive-capsule-scroll-hint__icon-box" aria-hidden="true">
            <ChevronLeft className="h-4 w-4" />
          </span>
        </button>

        <nav ref={capsuleNavRef} className="archive-capsule-list" aria-label="Kategori Listesi">
          {curriculumCategories.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeCategoryId;

            return (
              <button
                key={item.id}
                ref={(el) => {
                  categoryButtonRefs.current[item.id] = el;
                }}
                type="button"
                className="archive-capsule-item"
                data-active={isActive}
                aria-current={isActive ? "true" : undefined}
                aria-label={item.label}
                title={item.label}
                onClick={() => onSelectCategory(item.id)}
              >
                <span className="archive-capsule-icon-wrap" aria-hidden="true">
                  <Icon />
                </span>
                <span className="archive-capsule-label">{item.shortLabel}</span>
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          className="archive-capsule-scroll-hint archive-capsule-scroll-hint--right"
          data-visible={canScrollRight}
          aria-label="Daha fazla kategori"
          tabIndex={canScrollRight ? 0 : -1}
          onClick={() => scrollNav("right")}
        >
          <span className="archive-capsule-scroll-hint__icon-box" aria-hidden="true">
            <ChevronRight className="h-4 w-4" />
          </span>
        </button>
      </div>
    </aside>
  );
}
