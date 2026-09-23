import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CampaignsState {
  joinedCampaignIds: string[];
  toggleJoinCampaign: (campaignId: string) => void;
  isCampaignJoined: (campaignId: string) => boolean;
}

export const useCampaignsStore = create<CampaignsState>()(
  persist(
    (set, get) => ({
      joinedCampaignIds: [],
      toggleJoinCampaign: (campaignId: string) => {
        const { joinedCampaignIds } = get();
        const next = joinedCampaignIds.includes(campaignId)
          ? joinedCampaignIds.filter((id) => id !== campaignId)
          : [...joinedCampaignIds, campaignId];
        set({ joinedCampaignIds: next });
      },
      isCampaignJoined: (campaignId: string) => {
        return get().joinedCampaignIds.includes(campaignId);
      },
    }),
    {
      name: "jetacademie-joined-campaigns",
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
