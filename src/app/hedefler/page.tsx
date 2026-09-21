import type { Metadata } from "next";
import { TargetsView } from "@/components/targets-view";

export const metadata: Metadata = {
  title: "Hedefler & Yıllık Planlar",
  description:
    "JetAcademie 6 yıllık Ortaokul ve Lise hedefleri, sene sonu kazanımları ve 36 haftalık müfredat yol haritası.",
};

interface TargetsPageProps {
  searchParams?: Promise<{ sinif?: string }>;
}

export default async function TargetsPage(props: TargetsPageProps) {
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  const gradeParam = Number(searchParams?.sinif);
  const initialGrade = gradeParam >= 1 && gradeParam <= 6 ? gradeParam : 1;

  return (
    <main className="targets-page page-shell archive-page-shell">
      <TargetsView initialGrade={initialGrade} />
    </main>
  );
}
