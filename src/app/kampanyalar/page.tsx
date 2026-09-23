import type { Metadata } from "next";
import { CampaignsView } from "@/components/campaigns-view";
import { CampaignStatus } from "@/lib/data/campaigns";

export const metadata: Metadata = {
  title: "Kampanyalar",
  description:
    "JetAcademie dönemsel okuma maratonları, manevi hedefler, dua halkaları ve cemaat seferberlikleri.",
};

interface KampanyalarPageProps {
  searchParams?: Promise<{
    durum?: string;
    kategori?: string;
  }>;
}

export default async function KampanyalarPage(props: KampanyalarPageProps) {
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  const statusParam = searchParams?.durum;
  const initialStatus: CampaignStatus =
    statusParam === "upcoming" || statusParam === "completed" ? statusParam : "active";

  return (
    <main className="kampanyalar-page page-shell archive-page-shell">
      <CampaignsView initialStatus={initialStatus} initialCategory={searchParams?.kategori} />
    </main>
  );
}
