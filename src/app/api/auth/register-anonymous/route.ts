import { authLimitResponse, reserveAuthAttempt } from "@/lib/auth-rate-limit";
import { copyResponseCookies, privateJson } from "@/lib/http";
import { NextResponse } from "next/server";
import { getNextAvailableUsername, usernameToSyntheticEmail } from "@/lib/auth-anonymous";
import { clearLoginAttempts } from "@/lib/auth-login-limit";
import { anonymousSignUpSchema } from "@/lib/validations/auth";
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
    const parseResult = anonymousSignUpSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || "Geçersiz şifre." },
        { status: 400 }
      );
    }

    if (!(await reserveAuthAttempt("registration-global", "all", 60))) return authLimitResponse();

    // The email uniqueness constraint arbitrates races between app instances.
    let username = "";
    let signUpResponse: Response | undefined;
    for (let attempt = 0; attempt < 8; attempt++) {
      username = await getNextAvailableUsername();
      signUpResponse = await dispatchAuthRequest(req, "sign-up/email", {
        name: username,
        email: usernameToSyntheticEmail(username),
        password: parseResult.data.password,
      });
      if (signUpResponse.ok) break;
      const error = (await signUpResponse
        .clone()
        .json()
        .catch(() => null)) as { code?: string } | null;
      if (
        error?.code !== "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL" &&
        error?.code !== "USER_ALREADY_EXISTS" &&
        !(
          error?.code === "FAILED_TO_CREATE_USER" && (await getNextAvailableUsername()) !== username
        )
      ) {
        return NextResponse.json(
          { error: "Kayıt işlemi başarısız oldu." },
          { status: signUpResponse.status === 429 ? 429 : 400 }
        );
      }
    }
    if (!signUpResponse?.ok)
      return NextResponse.json({ error: "Kayıt işlemi yoğun. Tekrar deneyin." }, { status: 503 });

    const userId = await readAuthResponseUserId(signUpResponse);
    // A newly assigned username must not inherit attempts from its previous owner.
    await clearLoginAttempts(usernameToSyntheticEmail(username));

    return copyResponseCookies(signUpResponse, privateJson({ success: true, username, userId }));
  } catch (error) {
    return mutationErrorResponse(error, "Kayıt işlemi başarısız oldu.");
  }
}
