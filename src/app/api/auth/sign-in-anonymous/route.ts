import { NextResponse } from "next/server";
import { normalizeUsername, usernameToSyntheticEmail } from "@/lib/auth-anonymous";
import { anonymousSignInSchema } from "@/lib/validations/auth";
import { clearLoginAttempts, reserveLoginAttempt } from "@/lib/auth-login-limit";
import {
  dispatchAuthRequest,
  mutationErrorResponse,
  readMutationJson,
  validateMutationRequest,
} from "@/lib/mutation-security";

export async function POST(req: Request) {
  const rejected = validateMutationRequest(req);
  if (rejected) return rejected;
  try {
    const json = await readMutationJson(req);
    const parseResult = anonymousSignInSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || "Bilgileri kontrol edin." },
        { status: 400 }
      );
    }

    const normalizedUsername = normalizeUsername(parseResult.data.username);
    const email = usernameToSyntheticEmail(normalizedUsername);

    const attempt = await reserveLoginAttempt(email);
    if (!attempt.allowed) {
      return NextResponse.json(
        { error: "Çok fazla deneme. 15 dakika sonra tekrar deneyin." },
        { status: 429 }
      );
    }

    const signInResponse = await dispatchAuthRequest(req, "sign-in/email", {
      email,
      password: parseResult.data.password,
    });

    if (signInResponse.status !== 200) {
      return NextResponse.json(
        { error: "Kullanıcı adı veya şifre hatalı." },
        { status: signInResponse.status === 429 ? 429 : 401 }
      );
    }

    if (attempt.userId) await clearLoginAttempts(attempt.userId);

    const responseHeaders = new Headers();
    for (const cookie of signInResponse.headers.getSetCookie())
      responseHeaders.append("set-cookie", cookie);
    responseHeaders.set("content-type", "application/json");

    return new Response(JSON.stringify({ success: true, username: normalizedUsername }), {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    return mutationErrorResponse(error, "Giriş işlemi başarısız oldu.");
  }
}
