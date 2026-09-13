import type { Metadata } from "next";
import { headers } from "next/headers";
import { Archive } from "lucide-react";
import { auth } from "@/lib/auth";
import { getCompletedEntryIds } from "@/lib/curriculum-progress";
import { CurriculumArchive } from "@/components/curriculum-archive";
import { ProgressStatusNote } from "@/components/progress-status-note";

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
        <ProgressStatusNote isSignedIn={Boolean(session?.user)} />
      </header>

      <CurriculumArchive
        initialCompletedEntryIds={completedEntryIds}
        isSignedIn={Boolean(session?.user)}
      />
    </main>
  );
}
