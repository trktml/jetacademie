import { NextResponse } from "next/server";
import { getNextAvailableUsername, usernameToSyntheticEmail } from "@/lib/auth-anonymous";
import { anonymousSignUpSchema } from "@/lib/validations/auth";
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
    const parseResult = anonymousSignUpSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || "Geçersiz şifre." },
        { status: 400 }
      );
    }

    const username = await getNextAvailableUsername();
    const email = usernameToSyntheticEmail(username);

    const signUpResponse = await dispatchAuthRequest(req, "sign-up/email", {
      name: username,
      email,
      password: parseResult.data.password,
    });

    if (signUpResponse.status !== 200) {
      return NextResponse.json(
        { error: "Kayıt işlemi başarısız oldu." },
        { status: signUpResponse.status === 429 ? 429 : 400 }
      );
    }

    const responseHeaders = new Headers();
    for (const cookie of signUpResponse.headers.getSetCookie())
      responseHeaders.append("set-cookie", cookie);
    responseHeaders.set("content-type", "application/json");

    return new Response(JSON.stringify({ success: true, username }), {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    return mutationErrorResponse(error, "Kayıt işlemi başarısız oldu.");
  }
}
