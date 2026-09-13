import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GuestState {
  /** Kullanıcı misafir modunda mı? */
  isGuest: boolean;
  /** Misafir ilerleme: tamamlanan entry ID'leri */
  completedEntryIds: string[];
  /** Misafir modunu başlat */
  enableGuest: () => void;
  /** Misafir modundan çık (veriyi sil) */
  disableGuest: () => void;
  /** Entry tamamla */
  completeEntry: (entryId: string) => void;
  /** Entry tamamlamayı geri al */
  uncompleteEntry: (entryId: string) => void;
  /** Tüm ilerlemeyi temizle (hesaba aktarıldıktan sonra) */
  clearProgress: () => void;
}

export const useGuestStore = create<GuestState>()(
  persist(
    (set) => ({
      isGuest: false,
      completedEntryIds: [],
      enableGuest: () => set({ isGuest: true }),
      disableGuest: () => set({ isGuest: false, completedEntryIds: [] }),
      completeEntry: (entryId) =>
        set((state) => ({
          completedEntryIds: state.completedEntryIds.includes(entryId)
            ? state.completedEntryIds
            : [...state.completedEntryIds, entryId],
        })),
      uncompleteEntry: (entryId) =>
        set((state) => ({
          completedEntryIds: state.completedEntryIds.filter((id) => id !== entryId),
        })),
      clearProgress: () => set({ completedEntryIds: [] }),
    }),
    {
      name: "jetacademie-guest",
    }
  )
);
