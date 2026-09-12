import { create } from "zustand";

interface UiState {
  isAccountOpen: boolean;
  setAccountOpen: (open: boolean) => void;
  openAccount: () => void;
  closeAccount: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isAccountOpen: false,
  setAccountOpen: (open) => set({ isAccountOpen: open }),
  openAccount: () => set({ isAccountOpen: true }),
  closeAccount: () => set({ isAccountOpen: false }),
}));
