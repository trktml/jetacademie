import { beforeEach, describe, expect, it } from "bun:test";
import { useCampaignsStore } from "./use-campaigns-store";

describe("useCampaignsStore", () => {
  beforeEach(() => {
    useCampaignsStore.setState({ joinedCampaignIds: [] });
  });

  it("should initialize with empty joined campaigns list", () => {
    expect(useCampaignsStore.getState().joinedCampaignIds).toEqual([]);
    expect(useCampaignsStore.getState().isCampaignJoined("30-gunde-1-kitap")).toBe(false);
  });

  it("should toggle join campaign on and off", () => {
    const store = useCampaignsStore.getState();

    store.toggleJoinCampaign("30-gunde-1-kitap");
    expect(useCampaignsStore.getState().joinedCampaignIds).toContain("30-gunde-1-kitap");
    expect(useCampaignsStore.getState().isCampaignJoined("30-gunde-1-kitap")).toBe(true);

    useCampaignsStore.getState().toggleJoinCampaign("30-gunde-1-kitap");
    expect(useCampaignsStore.getState().joinedCampaignIds).not.toContain("30-gunde-1-kitap");
    expect(useCampaignsStore.getState().isCampaignJoined("30-gunde-1-kitap")).toBe(false);
  });
});
