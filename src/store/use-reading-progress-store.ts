import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ReadingProgressState {
  // Mapping of entryId -> last read page (1-indexed)
  progressMap: Record<string, number>;
  setReadingPage: (entryId: string, page: number) => void;
  getReadingPage: (entryId: string) => number;
  resetReadingPage: (entryId: string) => void;
}

export const useReadingProgressStore = create<ReadingProgressState>()(
  persist(
    (set, get) => ({
      progressMap: {},

      setReadingPage: (entryId: string, page: number) => {
        if (!entryId) return;
        const validPage = Math.max(1, Math.floor(page));
        set((state) => ({
          progressMap: {
            ...state.progressMap,
            [entryId]: validPage,
          },
        }));
      },

      getReadingPage: (entryId: string) => {
        if (!entryId) return 1;
        return get().progressMap[entryId] || 1;
      },

      resetReadingPage: (entryId: string) => {
        if (!entryId) return;
        set((state) => {
          const next = { ...state.progressMap };
          delete next[entryId];
          return { progressMap: next };
        });
      },
    }),
    {
      name: "jetacademie-reading-progress",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return window.localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    }
  )
);
