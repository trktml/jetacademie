import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { changePasswordSchema } from "@/lib/validations/auth";
import {
  mutationErrorResponse,
  readMutationJson,
  validateMutationRequest,
} from "@/lib/mutation-security";

export async function POST(req: Request) {
  const rejected = validateMutationRequest(req);
  if (rejected) return rejected;
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user) {
      return NextResponse.json({ error: "Oturum açmanız gerekiyor." }, { status: 401 });
    }

    const json = await readMutationJson(req);
    const parseResult = changePasswordSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || "Geçersiz şifre." },
        { status: 400 }
      );
    }

    const changed = await auth.api.changePassword({
      body: { ...parseResult.data, revokeOtherSessions: true },
      headers: req.headers,
      asResponse: true,
    });
    if (!changed.ok) {
      return NextResponse.json(
        { error: "Mevcut şifre hatalı veya oturum süresi doldu." },
        { status: 400 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Şifreniz başarıyla güncellendi.",
    });
    for (const cookie of changed.headers.getSetCookie())
      response.headers.append("set-cookie", cookie);
    return response;
  } catch (error) {
    return mutationErrorResponse(error, "Şifre güncellenemedi.");
  }
}
