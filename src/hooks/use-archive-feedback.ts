"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CurriculumCategoryId } from "@/lib/curriculum";

export const UNDO_DURATION_SECONDS = 7;

export interface UndoState {
  entryId: string;
  timingLabel: string;
  categoryId: CurriculumCategoryId;
}

export interface ToastState {
  message: string;
  type: "success" | "warning" | "error";
  hasUndo?: boolean;
}

export function useArchiveFeedback() {
  const [toast, setToast] = useState<ToastState | null>(null);
  const [undoState, setUndoState] = useState<UndoState | null>(null);
  const [undoSecondsLeft, setUndoSecondsLeft] = useState(0);
  const undoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearUndo = useCallback(() => {
    if (undoTimerRef.current) {
      clearInterval(undoTimerRef.current);
      undoTimerRef.current = null;
    }
    setUndoState(null);
    setUndoSecondsLeft(0);
  }, []);

  const dismissToast = useCallback(() => {
    clearUndo();
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setToast(null);
  }, [clearUndo]);

  const showToast = useCallback(
    (message: string, type: "success" | "warning" | "error", durationMs = 3500) => {
      clearUndo();
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
        toastTimerRef.current = null;
      }
      setToast({ message, type, hasUndo: false });
      toastTimerRef.current = setTimeout(() => {
        setToast(null);
      }, durationMs);
    },
    [clearUndo]
  );

  const triggerUndoCountdown = useCallback(
    (entryId: string, timingLabel: string, categoryId: CurriculumCategoryId) => {
      clearUndo();
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
        toastTimerRef.current = null;
      }

      setUndoState({ entryId, timingLabel, categoryId });
      setUndoSecondsLeft(UNDO_DURATION_SECONDS);

      setToast({
        message: `${timingLabel} okundu olarak kaydedildi.`,
        type: "success",
        hasUndo: true,
      });

      const deadline = Date.now() + UNDO_DURATION_SECONDS * 1000;
      undoTimerRef.current = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
        setUndoSecondsLeft(remaining);
        if (remaining === 0) {
          if (undoTimerRef.current) {
            clearInterval(undoTimerRef.current);
            undoTimerRef.current = null;
          }
          setUndoState(null);
          toastTimerRef.current = setTimeout(() => {
            setToast(null);
          }, 1200);
        }
      }, 1000);
    },
    [clearUndo]
  );

  useEffect(() => {
    return () => {
      if (undoTimerRef.current) clearInterval(undoTimerRef.current);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  return {
    toast,
    undoState,
    undoSecondsLeft,
    clearUndo,
    dismissToast,
    showToast,
    triggerUndoCountdown,
  };
}
