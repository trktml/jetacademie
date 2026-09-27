import type { Metadata } from "next";
import { cookies } from "next/headers";
import { EditorPanel } from "@/components/editor/editor-panel";
import { editorCookieName, editorCsrf, hasEditorSession } from "@/lib/editor/auth";

export const metadata: Metadata = {
  title: "Müfredat Düzenleme",
  robots: { index: false, follow: false },
};
export default async function EditCurriculumPage() {
  const token = (await cookies()).get(editorCookieName())?.value;
  let csrf: string | null = null;
  let unavailable = false;
  try {
    if (await hasEditorSession(token)) csrf = editorCsrf(token!);
  } catch {
    unavailable = true;
  }
  return <EditorPanel initialCsrf={csrf} unavailable={unavailable} />;
}
