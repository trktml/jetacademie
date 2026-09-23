import { describe, expect, it } from "bun:test";
import {
  CAMPAIGN_CATEGORIES,
  CAMPAIGN_STATUS_TABS,
  campaigns,
  filterCampaigns,
  getAllCampaigns,
  getCampaignById,
} from "./campaigns";

describe("campaigns data integrity", () => {
  it("should contain a collection of campaigns", () => {
    const all = getAllCampaigns();
    expect(all.length).toBeGreaterThanOrEqual(4);
  });

  it("should have all required fields for each campaign", () => {
    for (const campaign of campaigns) {
      expect(campaign.id).toBeDefined();
      expect(campaign.title.length).toBeGreaterThan(0);
      expect(campaign.slogan.length).toBeGreaterThan(0);
      expect(campaign.category).toBeDefined();
      expect(campaign.status).toBeDefined();
      expect(campaign.badge.length).toBeGreaterThan(0);
      expect(campaign.period.length).toBeGreaterThan(0);
      expect(campaign.participantsCount).toBeGreaterThanOrEqual(0);
      expect(campaign.targetGoal.length).toBeGreaterThan(0);
      expect(campaign.progressPercent).toBeGreaterThanOrEqual(0);
      expect(campaign.progressPercent).toBeLessThanOrEqual(100);
      expect(campaign.description.length).toBeGreaterThan(0);
      expect(campaign.motivationQuote.length).toBeGreaterThan(0);
      expect(campaign.quoteSource.length).toBeGreaterThan(0);
      expect(campaign.guidanceSteps.length).toBeGreaterThan(0);
      expect(campaign.rewards.length).toBeGreaterThan(0);
      expect(campaign.themeColor.bgGradient).toBeDefined();
    }
  });

  it("should find campaign by ID", () => {
    const campaign = getCampaignById("30-gunde-1-kitap");
    expect(campaign).toBeDefined();
    expect(campaign?.title).toContain("30 Günde 1 Kitap");

    const nonExistent = getCampaignById("unknown-campaign");
    expect(nonExistent).toBeUndefined();
  });

  it("should filter campaigns by status", () => {
    const active = filterCampaigns({ status: "active" });
    expect(active.length).toBeGreaterThan(0);
    expect(active.every((c) => c.status === "active")).toBe(true);

    const upcoming = filterCampaigns({ status: "upcoming" });
    expect(upcoming.length).toBeGreaterThan(0);
    expect(upcoming.every((c) => c.status === "upcoming")).toBe(true);

    const completed = filterCampaigns({ status: "completed" });
    expect(completed.length).toBeGreaterThan(0);
    expect(completed.every((c) => c.status === "completed")).toBe(true);
  });

  it("should filter campaigns by category", () => {
    const okuma = filterCampaigns({ category: "okuma" });
    expect(okuma.length).toBeGreaterThan(0);
    expect(okuma.every((c) => c.category === "okuma")).toBe(true);

    const dua = filterCampaigns({ category: "dua-zikir" });
    expect(dua.length).toBeGreaterThan(0);
    expect(dua.every((c) => c.category === "dua-zikir")).toBe(true);
  });

  it("should search campaigns by query", () => {
    const searchResults = filterCampaigns({ query: "salavat" });
    expect(searchResults.length).toBeGreaterThan(0);
    expect(searchResults.some((c) => c.title.toLowerCase().includes("salavat"))).toBe(true);
  });

  it("should define valid status tabs and categories", () => {
    expect(CAMPAIGN_STATUS_TABS.map((t) => t.id)).toEqual(["active", "upcoming", "completed"]);
    expect(CAMPAIGN_CATEGORIES.length).toBeGreaterThanOrEqual(4);
  });
});
