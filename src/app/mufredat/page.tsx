import type { Metadata } from "next";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getCompletedEntryIds } from "@/lib/curriculum-progress";
import { getCurriculumEntriesFromDb, getUserGenderFromDb } from "@/lib/curriculum-db";
import { CurriculumArchive } from "@/components/curriculum-archive";
import { ProgressStatusNote } from "@/components/progress-status-note";

export const metadata: Metadata = {
  title: "Müfredat",
  description: "Aylık ve haftalık JetAcademie müfredat dosyaları.",
};

interface CurriculumPageProps {
  searchParams?: Promise<{ sinif?: string }>;
}

export default async function CurriculumPage(props: CurriculumPageProps) {
  const searchParams = props.searchParams ? await props.searchParams : undefined;
  const gradeParam = Number(searchParams?.sinif);
  const initialGrade = gradeParam >= 1 && gradeParam <= 6 ? gradeParam : 1;

  const session = await auth.api.getSession({ headers: await headers() });
  const completedEntryIds = session?.user ? getCompletedEntryIds(session.user.id) : [];
  const initialGender = session?.user ? getUserGenderFromDb(session.user.id) : null;
  const entries = getCurriculumEntriesFromDb();

  return (
    <main className="curriculum-page page-shell archive-page-shell">
      <header className="page-heading">
        <ProgressStatusNote isSignedIn={Boolean(session?.user)} />
      </header>

      <CurriculumArchive
        initialCompletedEntryIds={completedEntryIds}
        isSignedIn={Boolean(session?.user)}
        initialGender={initialGender}
        allEntries={entries}
        initialGrade={initialGrade}
      />
    </main>
  );
}
