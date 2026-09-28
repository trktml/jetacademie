"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, GraduationCap } from "lucide-react";
import { BELGIUM_GRADES, GRADE_LABELS, type BelgiumGrade } from "@/lib/curriculum";
import { getRememberedCurriculumGrade, useCurriculumStore } from "@/store/use-curriculum-store";

const subscribeToHydration = (onStoreChange: () => void) =>
  useCurriculumStore.persist?.onFinishHydration(onStoreChange) ?? (() => {});
const getHydrationSnapshot = () => useCurriculumStore.persist?.hasHydrated() ?? true;
const getServerHydrationSnapshot = () => false;

export function CurriculumGradeChoices({
  onSelectGrade,
}: {
  onSelectGrade: (grade: BelgiumGrade) => void;
}) {
  return (
    <section className="curriculum-grade-entry" aria-labelledby="curriculum-grade-entry-title">
      <div className="curriculum-grade-entry__heading">
        <span className="curriculum-grade-entry__icon" aria-hidden="true">
          <GraduationCap />
        </span>
        <h1 id="curriculum-grade-entry-title">Önce sınıfını seç</h1>
      </div>

      <div className="curriculum-grade-entry__grid" aria-label="Sınıflar">
        {BELGIUM_GRADES.map((grade) => (
          <button
            key={grade}
            type="button"
            className="curriculum-grade-entry__card"
            onClick={() => onSelectGrade(grade)}
          >
            <span className="curriculum-grade-entry__number" aria-hidden="true">
              {grade}
            </span>
            <strong>{GRADE_LABELS[grade]}</strong>
            <ArrowRight className="curriculum-grade-entry__arrow" aria-hidden="true" />
          </button>
        ))}
      </div>
      <p className="curriculum-grade-entry__hint">Seçimin bu tarayıcıda hatırlanır.</p>
    </section>
  );
}

export function CurriculumGradeEntry() {
  const router = useRouter();
  const selectedGrade = useCurriculumStore((state) => state.selectedGrade);
  const hasSelectedGrade = useCurriculumStore((state) => state.hasSelectedGrade);
  const setSelectedGrade = useCurriculumStore((state) => state.setSelectedGrade);
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydrationSnapshot,
    getServerHydrationSnapshot
  );
  const navigationStarted = useRef(false);
  const rememberedGrade = getRememberedCurriculumGrade({ selectedGrade, hasSelectedGrade });

  useEffect(() => {
    if (!isHydrated || rememberedGrade === null || navigationStarted.current) return;
    navigationStarted.current = true;
    router.replace(`/mufredat?sinif=${rememberedGrade}`);
  }, [isHydrated, rememberedGrade, router]);

  function handleSelectGrade(grade: BelgiumGrade) {
    navigationStarted.current = true;
    setSelectedGrade(grade);
    router.replace(`/mufredat?sinif=${grade}`);
  }

  if (!isHydrated || rememberedGrade !== null) {
    return (
      <div className="curriculum-grade-entry__pending" role="status" aria-live="polite">
        Müfredat açılıyor…
      </div>
    );
  }

  return <CurriculumGradeChoices onSelectGrade={handleSelectGrade} />;
}
