import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { deleteUserAccount } from "@/lib/auth-anonymous";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user) {
      return NextResponse.json({ error: "Oturum açmanız gerekiyor." }, { status: 401 });
    }

    await deleteUserAccount(session.user.id);

    const response = NextResponse.json({
      success: true,
      message: "Hesabınız başarıyla silindi.",
    });

    // Clear session cookie on client
    response.cookies.set("better-auth.session_token", "", {
      path: "/",
      maxAge: 0,
      httpOnly: true,
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Hesap silinemedi.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
