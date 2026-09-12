"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Drawer } from "vaul";
import { CheckCircle2, LogIn, LogOut, UserPlus, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { signInSchema, signUpSchema } from "@/lib/validations/auth";
import { useUiStore } from "@/store/use-ui-store";

export function AccountSheet() {
  const router = useRouter();
  const isOpen = useUiStore((state) => state.isAccountOpen);
  const setOpen = useUiStore((state) => state.setAccountOpen);
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    const result =
      mode === "signUp"
        ? signUpSchema.safeParse({ name, email, password })
        : signInSchema.safeParse({ email, password });

    if (!result.success) {
      setMessage(result.error.issues[0]?.message ?? "Bilgileri kontrol edin.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response =
        mode === "signUp"
          ? await authClient.signUp.email({ name, email, password })
          : await authClient.signIn.email({ email, password });

      if (response.error) {
        setMessage(response.error.message || "İşlem tamamlanamadı.");
        return;
      }

      setMessage(null);
      setOpen(false);
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "İşlem tamamlanamadı.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function signOut() {
    setIsSubmitting(true);
    try {
      await authClient.signOut();
      setOpen(false);
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={setOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="sheet-overlay" />
        <Drawer.Content className="account-sheet">
          <Drawer.Handle className="sheet-handle" />
          <div className="sheet-heading">
            <div>
              <Drawer.Title>{session?.user ? "Hesabınız" : "İlerlemenizi kaydedin"}</Drawer.Title>
              <Drawer.Description>
                {session?.user
                  ? "Okuduğunuz her dosya hesabınıza kaydedilir."
                  : "Müfredatta kaldığınız yer cihazlarınız arasında korunsun."}
              </Drawer.Description>
            </div>
            <Drawer.Close asChild>
              <button type="button" className="icon-button" aria-label="Kapat">
                <X aria-hidden="true" />
              </button>
            </Drawer.Close>
          </div>

          {isSessionPending ? (
            <div className="sheet-status">Oturum kontrol ediliyor…</div>
          ) : session?.user ? (
            <div className="account-summary">
              <span className="account-summary__icon">
                <CheckCircle2 aria-hidden="true" />
              </span>
              <div>
                <strong>{session.user.name}</strong>
                <span>{session.user.email}</span>
              </div>
              <button
                type="button"
                className="secondary-button"
                onClick={signOut}
                disabled={isSubmitting}
              >
                <LogOut aria-hidden="true" /> Çıkış yap
              </button>
            </div>
          ) : (
            <>
              <div className="auth-tabs" role="tablist" aria-label="Hesap işlemi">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "signIn"}
                  onClick={() => setMode("signIn")}
                >
                  <LogIn aria-hidden="true" /> Giriş yap
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "signUp"}
                  onClick={() => setMode("signUp")}
                >
                  <UserPlus aria-hidden="true" /> Kayıt ol
                </button>
              </div>
              <form className="auth-form" onSubmit={submit}>
                {mode === "signUp" && (
                  <label>
                    <span>Ad soyad</span>
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      autoComplete="name"
                    />
                  </label>
                )}
                <label>
                  <span>E-posta</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                  />
                </label>
                <label>
                  <span>Şifre</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete={mode === "signUp" ? "new-password" : "current-password"}
                  />
                </label>
                {message && <p className="form-message">{message}</p>}
                <button className="primary-button" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "İşleniyor…" : mode === "signUp" ? "Hesap oluştur" : "Giriş yap"}
                </button>
              </form>
            </>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
