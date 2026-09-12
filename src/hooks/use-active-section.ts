"use client";

import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";

const READING_OFFSET_PX = 140;

export interface ActiveSectionEntry {
  readonly id: string;
  readonly top: number;
  readonly isIntersecting: boolean;
}

export function resolveActiveSectionId({
  entries,
  sectionIds,
  readingOffsetPx = 140,
  isAtBottom = false,
}: {
  entries: readonly ActiveSectionEntry[];
  sectionIds: readonly string[];
  readingOffsetPx?: number;
  isAtBottom?: boolean;
}): string | null {
  if (sectionIds.length === 0) {
    return null;
  }

  if (isAtBottom) {
    return sectionIds[sectionIds.length - 1];
  }

  const visible = entries.filter((e) => e.isIntersecting);
  if (visible.length === 0) {
    return null;
  }

  // Sections that have scrolled to or above the reading line
  const passedReadingLine = visible.filter((entry) => entry.top <= readingOffsetPx);

  if (passedReadingLine.length > 0) {
    // Pick the section closest to the reading line from above (largest top <= readingOffsetPx)
    const current = passedReadingLine.reduce((prev, curr) => (prev.top > curr.top ? prev : curr));
    return current.id;
  }

  // If all intersecting sections are below the reading line, pick the top-most incoming one (smallest top)
  const incoming = visible.reduce((prev, curr) => (prev.top < curr.top ? prev : curr));
  return incoming.id;
}

export function useActiveSection(
  sectionIds: readonly string[],
  initialSectionId?: string,
  rootMargin = "-10% 0px -60% 0px"
): [string, Dispatch<SetStateAction<string>>] {
  const [activeId, setActiveIdState] = useState<string>(initialSectionId || sectionIds[0] || "");
  const manualLockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isManualLockedRef = useRef(false);
  const visibleMapRef = useRef<Map<string, ActiveSectionEntry>>(new Map());

  const setActiveId: Dispatch<SetStateAction<string>> = (action) => {
    setActiveIdState((prev) => {
      const next = typeof action === "function" ? action(prev) : action;
      // When manually set (e.g. user clicks a category in capsule), temporarily lock
      // auto-updates so smooth scrolling doesn't jitter through intermediary sections
      isManualLockedRef.current = true;
      if (manualLockTimeoutRef.current) {
        clearTimeout(manualLockTimeoutRef.current);
      }
      manualLockTimeoutRef.current = setTimeout(() => {
        isManualLockedRef.current = false;
      }, 800);
      return next;
    });
  };

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    visibleMapRef.current.clear();

    const updateActiveSection = () => {
      if (isManualLockedRef.current) return;

      const doc = document.documentElement;
      const isAtBottom =
        sectionIds.length > 0 && window.innerHeight + window.scrollY >= doc.scrollHeight - 40;

      const nextId = resolveActiveSectionId({
        entries: Array.from(visibleMapRef.current.values()),
        sectionIds,
        readingOffsetPx: READING_OFFSET_PX,
        isAtBottom,
      });

      if (nextId) {
        setActiveIdState(nextId);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleMapRef.current.set(entry.target.id, {
              id: entry.target.id,
              top: entry.boundingClientRect.top,
              isIntersecting: true,
            });
          } else {
            visibleMapRef.current.delete(entry.target.id);
          }
        });
        updateActiveSection();
      },
      { rootMargin, threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      if (isManualLockedRef.current || sectionIds.length === 0) return;
      const doc = document.documentElement;
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 40) {
        setActiveIdState(sectionIds[sectionIds.length - 1]);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (manualLockTimeoutRef.current) {
        clearTimeout(manualLockTimeoutRef.current);
      }
    };
  }, [sectionIds, rootMargin]);

  return [activeId, setActiveId];
}
