import type { Metadata } from "next";
import { TargetsView } from "@/components/targets-view";

export const metadata: Metadata = {
  title: "Hedefler & Yıllık Planlar",
  description:
    "M1–M6 yıllık planlarına göre sınıf hedefleri, yıl sonu kazanımları ve 36 haftalık konu, soru ve kaynak akışı.",
};

interface TargetsPageProps {
  searchParams?: Promise<{ sinif?: string }>;
}

export default async function TargetsPage(props: TargetsPageProps) {
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  const gradeParam = Number(searchParams?.sinif);
  const initialGrade =
    Number.isInteger(gradeParam) && gradeParam >= 1 && gradeParam <= 6 ? gradeParam : 1;

  return (
    <main className="targets-page page-shell archive-page-shell" suppressHydrationWarning>
      <TargetsView initialGrade={initialGrade} />
    </main>
  );
}
