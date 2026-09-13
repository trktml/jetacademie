import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { updateUserPassword } from "@/lib/auth-anonymous";
import { changePasswordSchema } from "@/lib/validations/auth";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user) {
      return NextResponse.json({ error: "Oturum açmanız gerekiyor." }, { status: 401 });
    }

    const json = await req.json().catch(() => ({}));
    const parseResult = changePasswordSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || "Geçersiz şifre." },
        { status: 400 }
      );
    }

    await updateUserPassword(session.user.id, parseResult.data.newPassword);

    return NextResponse.json({
      success: true,
      message: "Şifreniz başarıyla güncellendi.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Şifre güncellenemedi.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

