/**
 * JetAcademie Dönemsel Kampanya & Seferberlik Duyuruları Veri Havuzu
 *
 * Resmi kampanya afişleri ve görsel duyurular.
 */

export interface CampaignAnnouncement {
  readonly id: string;
  readonly title: string;
  readonly image: string;
  readonly period?: string;
  readonly badge?: string;
  readonly downloadFilename?: string;
}

export const CAMPAIGN_ANNOUNCEMENTS: readonly CampaignAnnouncement[] = [
  {
    id: "risale-i-nur-kulliyati",
    title: "Risale-i Nur Külliyatı Okuma Kampanyası",
    period: "2026 – 2027",
    badge: "Kampanya Afişi",
    image: "/kampanyalar/risale-okuma-kampanyasi.jpg",
    downloadFilename: "risale-i-nur-okuma-kampanyasi-afisi.jpg",
  },
];

export function getAllCampaignAnnouncements(): readonly CampaignAnnouncement[] {
  return CAMPAIGN_ANNOUNCEMENTS;
}

export function getCampaignAnnouncementById(id: string): CampaignAnnouncement | undefined {
  return CAMPAIGN_ANNOUNCEMENTS.find((c) => c.id === id);
}

// Compatibility aliases
export type Campaign = CampaignAnnouncement;
export const campaigns = CAMPAIGN_ANNOUNCEMENTS;
export const getAllCampaigns = getAllCampaignAnnouncements;
export const getCampaignById = getCampaignAnnouncementById;
