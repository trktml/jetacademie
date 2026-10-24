"use client";

import { useSyncExternalStore } from "react";
import { ArrowUp } from "lucide-react";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function getScrollSnapshot() {
  return window.scrollY > 400;
}

function getServerSnapshot() {
  return false;
}

export function ScrollToTop() {
  const isVisible = useSyncExternalStore(subscribeToScroll, getScrollSnapshot, getServerSnapshot);

  if (!isVisible) return null;

  function scrollToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });
  }

  return (
    <button
      type="button"
      className="scroll-to-top"
      aria-label="Sayfa başına dön"
      title="Sayfa başına dön"
      onClick={scrollToTop}
    >
      <ArrowUp size={22} aria-hidden="true" />
    </button>
  );
}
