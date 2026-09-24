import type { Metadata } from "next";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getCompletedEntryIds } from "@/lib/curriculum-progress";
import { getCurriculumEntriesFromDb, getUserGenderFromDb } from "@/lib/curriculum-db";
import { CurriculumPageContent } from "@/components/curriculum-page-content";
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
  const initialGrade =
    Number.isInteger(gradeParam) && gradeParam >= 1 && gradeParam <= 6 ? gradeParam : 1;

  const entriesPromise = getCurriculumEntriesFromDb(initialGrade);
  const session = await auth.api.getSession({ headers: await headers() });
  const [entries, completedEntryIds, initialGender] = await Promise.all([
    entriesPromise,
    session?.user ? getCompletedEntryIds(session.user.id) : Promise.resolve([]),
    session?.user ? getUserGenderFromDb(session.user.id) : Promise.resolve(null),
  ]);

  return (
    <main className="curriculum-page page-shell archive-page-shell">
      <header className="page-heading">
        <ProgressStatusNote isSignedIn={Boolean(session?.user)} />
      </header>

      <CurriculumPageContent
        initialCompletedEntryIds={completedEntryIds}
        isSignedIn={Boolean(session?.user)}
        initialGender={initialGender}
        allEntries={entries}
        initialGrade={initialGrade}
      />
    </main>
  );
}
