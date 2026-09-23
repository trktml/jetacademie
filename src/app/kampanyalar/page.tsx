import type { Metadata } from "next";
import { CampaignsView } from "@/components/campaigns-view";

export const metadata: Metadata = {
  title: "Kampanyalar",
  description:
    "JetAcademie dönemsel okuma maratonları, manevi seferberlikler ve resmi kampanya duyuruları.",
};

export default function KampanyalarPage() {
  return (
    <main className="kampanyalar-page page-shell archive-page-shell">
      <CampaignsView />
    </main>
  );
}
