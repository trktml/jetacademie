import type { Metadata } from "next";
import { ReadingListView } from "@/components/reading-list-view";

export const metadata: Metadata = {
  title: "Müfredat Kitapları",
  description:
    "JetAcademie M1–M6 sınıfları için dönemlere göre belirlenen senelik hedef okutmalık kitaplar listesi.",
};

export default function MufredatKitaplariPage() {
  return (
    <main className="mufredat-kitaplari-page page-shell archive-page-shell">
      <ReadingListView />
    </main>
  );
}
