import { copyResponseCookies, privateJson } from "@/lib/http";
import { NextResponse } from "next/server";
import { normalizeUsername, usernameToSyntheticEmail } from "@/lib/auth-anonymous";
import { anonymousSignInSchema } from "@/lib/validations/auth";
import { clearLoginAttempts, runLoginAttempt } from "@/lib/auth-login-limit";
import {
  dispatchAuthRequest,
  mutationErrorResponse,
  readAuthResponseUserId,
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

    return await runLoginAttempt(email, async () => {
      const signInResponse = await dispatchAuthRequest(req, "sign-in/email", {
        email,
        password: parseResult.data.password,
      });
      if (!signInResponse.ok) {
        return privateJson(
          { error: "Kullanıcı adı veya şifre hatalı." },
          signInResponse.status === 429 ? 429 : 401
        );
      }
      const userId = await readAuthResponseUserId(signInResponse);
      await clearLoginAttempts(email);
      return copyResponseCookies(
        signInResponse,
        privateJson({ success: true, username: normalizedUsername, userId })
      );
    });
  } catch (error) {
    return mutationErrorResponse(error, "Giriş işlemi başarısız oldu.");
  }
}
