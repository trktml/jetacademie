import { describe, expect, it } from "bun:test";
import {
  CAMPAIGN_ANNOUNCEMENTS,
  getAllCampaignAnnouncements,
  getCampaignAnnouncementById,
} from "./campaigns";

describe("campaigns data integrity", () => {
  it("should contain at least one campaign visual announcement", () => {
    const all = getAllCampaignAnnouncements();
    expect(all.length).toBeGreaterThanOrEqual(1);
  });

  it("should have all required fields for each campaign visual announcement", () => {
    for (const campaign of CAMPAIGN_ANNOUNCEMENTS) {
      expect(campaign.id).toBeDefined();
      expect(campaign.title.length).toBeGreaterThan(0);
      expect(campaign.image.length).toBeGreaterThan(0);
      expect(campaign.image).toContain("/kampanyalar/risale-okuma-kampanyasi.jpg");
    }
  });

  it("should find announcement by ID and return undefined for non-existent ID", () => {
    const risale = getCampaignAnnouncementById("risale-i-nur-kulliyati");
    expect(risale).toBeDefined();
    expect(risale?.title).toContain("Risale-i Nur");

    const nonExistent = getCampaignAnnouncementById("unknown-campaign");
    expect(nonExistent).toBeUndefined();
  });
});
