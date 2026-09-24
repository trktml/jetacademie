import { getCurriculumEntriesFromDb } from "@/lib/curriculum-db";

export async function GET(request: Request) {
  const gradeParam = new URL(request.url).searchParams.get("sinif");
  const grade = Number(gradeParam);

  if (!gradeParam || !Number.isInteger(grade) || grade < 1 || grade > 6) {
    return Response.json({ error: "Geçersiz sınıf." }, { status: 400 });
  }

  const entries = await getCurriculumEntriesFromDb(grade);
  return Response.json(entries);
}
