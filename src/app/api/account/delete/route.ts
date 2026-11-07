import { authLimitResponse, reserveAuthAttempt } from "@/lib/auth-rate-limit";
import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";
import { deleteAccountSchema } from "@/lib/validations/auth";
import {
  mutationErrorResponse,
  readMutationJson,
  validateMutationRequest,
} from "@/lib/mutation-security";

export async function POST(req: Request) {
  const rejected = validateMutationRequest(req);
  if (rejected) return rejected;
  try {
    const session = await getAuth().api.getSession({ headers: req.headers });

    if (!session?.user) {
      return NextResponse.json({ error: "Oturum açmanız gerekiyor." }, { status: 401 });
    }

    const parsed = deleteAccountSchema.safeParse(await readMutationJson(req));
    if (!parsed.success) {
      return NextResponse.json({ error: "Şifrenizi girin." }, { status: 400 });
    }

    if (!(await reserveAuthAttempt("account-reauth", session.user.id, 5)))
      return authLimitResponse();

    const deleted = await getAuth().api.deleteUser({
      body: parsed.data,
      headers: req.headers,
      asResponse: true,
    });
    if (!deleted.ok) {
      return NextResponse.json(
        { error: "Şifre hatalı veya oturum süresi doldu." },
        { status: 400 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Hesabınız başarıyla silindi.",
    });

    for (const cookie of deleted.headers.getSetCookie())
      response.headers.append("set-cookie", cookie);

    return response;
  } catch (error) {
    return mutationErrorResponse(error, "Hesap silinemedi.");
  }
}
