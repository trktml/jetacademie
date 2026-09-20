"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Check, GraduationCap } from "lucide-react";
import { BELGIUM_GRADES, GRADE_LABELS, type BelgiumGrade } from "@/lib/curriculum";
import { isValidGrade, useCurriculumStore } from "@/store/use-curriculum-store";

const emptySubscribe = () => () => {};

interface GradeSelectorProps {
  value?: BelgiumGrade;
  onGradeChange?: (grade: BelgiumGrade) => void;
  className?: string;
  compact?: boolean;
}

export function GradeSelector({
  value,
  onGradeChange,
  className = "",
  compact = false,
}: GradeSelectorProps) {
  const storeGrade = useCurriculumStore((state) => state.selectedGrade);
  const selectedGrade = value ?? storeGrade;
  const setStoreGrade = useCurriculumStore((state) => state.setSelectedGrade);

  const [isOpen, setIsOpen] = useState(false);
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Compute exact viewport coordinates for fixed position popover
  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;
    const dropdownWidth = 195;
    const dropdownHeight = 280;

    if (isMobile) {
      // In mobile, capsule is a sticky horizontal bar at top; dropdown opens below the button
      const top = rect.bottom + 8;
      const maxLeft = Math.max(8, window.innerWidth - dropdownWidth - 12);
      const left = Math.min(Math.max(8, rect.left), maxLeft);
      setCoords({ top, left });
    } else {
      // In desktop, capsule is fixed on left; dropdown opens to the right of the button
      const left = rect.right + 10;
      const maxTop = Math.max(16, window.innerHeight - dropdownHeight - 16);
      const top = Math.min(Math.max(16, rect.top), maxTop);
      setCoords({ top, left });
    }
  }, []);

  // Sync with URL query parameter on mount and popstate
  useEffect(() => {
    function syncFromUrl() {
      if (typeof window === "undefined") return;
      const url = new URL(window.location.href);
      const param = url.searchParams.get("sinif");
      if (param) {
        const num = parseInt(param, 10);
        if (isValidGrade(num) && num !== selectedGrade) {
          setStoreGrade(num);
          onGradeChange?.(num);
        }
      }
    }

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [selectedGrade, setStoreGrade, onGradeChange]);

  // Keep dropdown anchored on scroll or resize
  useEffect(() => {
    if (!isOpen) return;

    updatePosition();

    function handleScrollOrResize() {
      updatePosition();
    }

    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isOpen, updatePosition]);

  // Close dropdown on outside click or tap
  useEffect(() => {
    if (!isOpen) return;

    function handleDismiss(event: Event) {
      const target = event.target as Node;
      if (
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleDismiss);
    document.addEventListener("touchstart", handleDismiss, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleDismiss);
      document.removeEventListener("touchstart", handleDismiss);
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function handleToggle() {
    if (!isOpen) {
      updatePosition();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }

  function handleSelectGrade(grade: BelgiumGrade) {
    setStoreGrade(grade);
    setIsOpen(false);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("sinif", String(grade));
      window.history.pushState(null, "", url.toString());
    }

    onGradeChange?.(grade);
  }

  const dropdownElement =
    isOpen && isClient && typeof document !== "undefined" && document.body
      ? createPortal(
          <div
            ref={dropdownRef}
            role="listbox"
            aria-label="Belçika Sınıf Seçimi"
            className="grade-selector-dropdown"
            style={{
              position: "fixed",
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              zIndex: 9999,
            }}
          >
            <div className="grade-selector-dropdown__options">
              {BELGIUM_GRADES.map((grade) => {
                const isSelected = grade === selectedGrade;
                return (
                  <button
                    key={grade}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={`grade-selector-option ${isSelected ? "grade-selector-option--selected" : ""}`}
                    onClick={() => handleSelectGrade(grade)}
                  >
                    <span className="grade-selector-option__badge">{grade}</span>
                    <span className="grade-selector-option__text">{GRADE_LABELS[grade]}</span>
                    {isSelected && (
                      <Check
                        className="grade-selector-option__check ml-auto h-4 w-4 text-emerald-500"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <div
      ref={containerRef}
      className={`grade-selector-container relative ${className}`}
      data-open={isOpen ? "true" : undefined}
      data-compact={compact ? "true" : undefined}
    >
      <button
        ref={buttonRef}
        type="button"
        className="grade-selector-trigger"
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Sınıf seçimi: ${GRADE_LABELS[selectedGrade]}`}
        title={`Belçika Müfredat Sınıfı: ${GRADE_LABELS[selectedGrade]}`}
      >
        <span className="grade-selector-trigger__icon" aria-hidden="true">
          <GraduationCap className="h-4 w-4" />
        </span>
        <span className="grade-selector-trigger__num">{selectedGrade}</span>
      </button>

      {dropdownElement}
    </div>
  );
}
