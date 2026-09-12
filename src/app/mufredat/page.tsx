import type { Metadata } from "next";
import { headers } from "next/headers";
import { Archive, ShieldCheck } from "lucide-react";
import { auth } from "@/lib/auth";
import { getCompletedEntryIds } from "@/lib/curriculum-progress";
import { CurriculumArchive } from "@/components/curriculum-archive";

export const metadata: Metadata = {
  title: "Müfredat",
  description: "Aylık ve haftalık JetAcademie müfredat dosyaları.",
};

export default async function CurriculumPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const completedEntryIds = session?.user ? getCompletedEntryIds(session.user.id) : [];

  return (
    <main className="curriculum-page page-shell archive-page-shell">
      <header className="page-heading">
        <div className="page-heading__title-row">
          <div className="page-heading__mark">
            <Archive aria-hidden="true" />
          </div>
          <h1>Müfredat</h1>
        </div>
        <div className="secure-note">
          <ShieldCheck aria-hidden="true" />
          <span>
            {session?.user ? "İlerlemeniz hesabınıza kaydediliyor" : "Kaydetmek için giriş yapın"}
          </span>
        </div>
      </header>

      <CurriculumArchive
        initialCompletedEntryIds={completedEntryIds}
        isSignedIn={Boolean(session?.user)}
      />
    </main>
  );
}
