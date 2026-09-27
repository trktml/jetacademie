import { create } from "zustand";
import { persist } from "zustand/middleware";

const LEGACY_GRADE_ONE_ENTRY_PREFIXES = [
  "esma-",
  "efendimiz-",
  "ayet-",
  "hadis-",
  "sahabe-kissalari-",
  "hocaefendi-dinleme-",
  "konu-",
  "ilmihal-",
  "adab-i-muaseret-",
  "siyer-",
];

function migrateLegacyGradeOneEntryId(entryId: string): string {
  if (/^g[1-6]-/.test(entryId)) return entryId;
  return LEGACY_GRADE_ONE_ENTRY_PREFIXES.some((prefix) => entryId.startsWith(prefix))
    ? `g1-${entryId}`
    : entryId;
}

interface GuestState {
  /** Kullanıcı misafir modunda mı? */
  isGuest: boolean;
  /** Misafir ilerleme: tamamlanan entry ID'leri */
  completedEntryIds: string[];
  /** Misafir İlmihal cinsiyet tercihi */
  gender: "erkek" | "bayan" | null;
  /** Misafir modunu başlat */
  enableGuest: () => void;
  /** Misafir modundan çık (veriyi sil) */
  disableGuest: () => void;
  /** Cinsiyet belirle */
  setGender: (gender: "erkek" | "bayan") => void;
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
      gender: null,
      enableGuest: () => set({ isGuest: true }),
      disableGuest: () => set({ isGuest: false, completedEntryIds: [], gender: null }),
      setGender: (gender) => set({ gender, isGuest: true }),
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
      version: 1,
      migrate: (persistedState, version) => {
        const state = persistedState as Partial<GuestState>;
        if (version >= 1) return state;

        return {
          ...state,
          completedEntryIds: Array.isArray(state.completedEntryIds)
            ? [...new Set(state.completedEntryIds.map(migrateLegacyGradeOneEntryId))]
            : [],
        };
      },
    }
  )
);
