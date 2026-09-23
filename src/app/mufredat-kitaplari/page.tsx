import type { Metadata } from "next";
import { CurriculumBooksView } from "@/components/curriculum-books-view";

export const metadata: Metadata = {
  title: "Müfredat Kitapları",
  description:
    "JetAcademie 6 yıllık eğitim müfredatında takip edilen temel kitaplar, kaynak eserler ve okuma listesi.",
};

interface MufredatKitaplariPageProps {
  searchParams?: Promise<{
    kategori?: string;
    seviye?: string;
    sinif?: string;
  }>;
}

export default async function MufredatKitaplariPage(props: MufredatKitaplariPageProps) {
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  const gradeParam = Number(searchParams?.sinif);
  const initialGrade = gradeParam >= 1 && gradeParam <= 6 ? gradeParam : undefined;

  return (
    <main className="mufredat-kitaplari-page page-shell archive-page-shell">
      <CurriculumBooksView
        initialCategory={searchParams?.kategori}
        initialLevel={searchParams?.seviye}
        initialGrade={initialGrade}
      />
    </main>
  );
}
