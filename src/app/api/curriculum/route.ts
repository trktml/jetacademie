import { parseCurriculumGrade } from "@/lib/curriculum";
import { getCurriculumEntriesFromDb } from "@/lib/curriculum-db";

export async function GET(request: Request) {
  const grade = parseCurriculumGrade(new URL(request.url).searchParams.get("sinif"));

  if (!grade) {
    return Response.json({ error: "Geçersiz sınıf." }, { status: 400 });
  }

  const entries = await getCurriculumEntriesFromDb(grade);
  return Response.json(entries);
}
