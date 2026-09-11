import { create } from "zustand";

interface UiState {
  isDrawerOpen: boolean;
  activeSection: string;
  setDrawerOpen: (open: boolean) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  setActiveSection: (section: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  isDrawerOpen: false,
  activeSection: "overview",
  setDrawerOpen: (open) => set({ isDrawerOpen: open }),
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  setActiveSection: (section) => set({ activeSection: section }),
}));
