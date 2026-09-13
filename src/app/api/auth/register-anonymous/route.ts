import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getNextAvailableUsername, usernameToSyntheticEmail } from "@/lib/auth-anonymous";
import { anonymousSignUpSchema } from "@/lib/validations/auth";

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => ({}));
    const parseResult = anonymousSignUpSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || "Geçersiz şifre." },
        { status: 400 }
      );
    }

    const username = getNextAvailableUsername();
    const email = usernameToSyntheticEmail(username);

    const signUpResponse = await auth.api.signUpEmail({
      body: {
        name: username,
        email,
        password: parseResult.data.password,
      },
      headers: req.headers,
      asResponse: true,
    });

    if (signUpResponse.status !== 200) {
      const errData = (await signUpResponse.json().catch(() => ({}))) as { message?: string };
      return NextResponse.json(
        { error: errData.message || "Kayıt işlemi başarısız oldu." },
        { status: signUpResponse.status }
      );
    }

    const responseHeaders = new Headers();
    signUpResponse.headers.forEach((val, key) => {
      if (key.toLowerCase() === "set-cookie") {
        responseHeaders.append("set-cookie", val);
      }
    });
    responseHeaders.set("content-type", "application/json");

    return new Response(JSON.stringify({ success: true, username }), {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Beklenmedik bir hata oluştu.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
