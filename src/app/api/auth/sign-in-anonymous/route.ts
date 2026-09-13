import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { normalizeUsername, usernameToSyntheticEmail } from "@/lib/auth-anonymous";
import { anonymousSignInSchema } from "@/lib/validations/auth";

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => ({}));
    const parseResult = anonymousSignInSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || "Bilgileri kontrol edin." },
        { status: 400 }
      );
    }

    const normalizedUsername = normalizeUsername(parseResult.data.username);
    const email = usernameToSyntheticEmail(normalizedUsername);

    const signInResponse = await auth.api.signInEmail({
      body: {
        email,
        password: parseResult.data.password,
      },
      headers: req.headers,
      asResponse: true,
    });

    if (signInResponse.status !== 200) {
      const errData = (await signInResponse.json().catch(() => ({}))) as { message?: string };
      return NextResponse.json(
        { error: errData.message || "Kullanıcı adı veya şifre hatalı." },
        { status: signInResponse.status }
      );
    }

    const responseHeaders = new Headers();
    signInResponse.headers.forEach((val, key) => {
      if (key.toLowerCase() === "set-cookie") {
        responseHeaders.append("set-cookie", val);
      }
    });
    responseHeaders.set("content-type", "application/json");

    return new Response(JSON.stringify({ success: true, username: normalizedUsername }), {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Giriş işlemi başarısız oldu.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

