"use client";

import { useEffect } from "react";
import { useUiStore } from "@/store/use-ui-store";

export const SECTION_IDS = ["overview", "mufredat-grid"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export function useActiveSectionObserver() {
  const setActiveSection = useUiStore((state) => state.setActiveSection);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0];
          if (topEntry?.target.id) {
            setActiveSection(topEntry.target.id);
          }
        }
      },
      {
        rootMargin: "-10% 0px -65% 0px",
        threshold: [0, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [setActiveSection]);
}
