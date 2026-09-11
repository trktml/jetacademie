"use client";

import { useState } from "react";
import {
  signUpSchema,
  signInSchema,
  type SignUpInput,
  type SignInInput,
} from "@/lib/validations/auth";
import { authClient } from "@/lib/auth-client";
import { ShieldCheck, UserPlus, LogIn, LogOut, CheckCircle2, AlertCircle } from "lucide-react";

export function AuthZodDemo() {
  const [mode, setMode] = useState<"signUp" | "signIn">("signUp");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: session, isPending: sessionPending } = authClient.useSession();

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setStatusMessage(null);

    if (mode === "signUp") {
      const formData: SignUpInput = { name, email, password };
      const validationResult = signUpSchema.safeParse(formData);

      if (!validationResult.success) {
        const fieldErrors: Record<string, string> = {};
        for (const issue of validationResult.error.issues) {
          const fieldName = issue.path[0] as string;
          if (!fieldErrors[fieldName]) {
            fieldErrors[fieldName] = issue.message;
          }
        }
        setErrors(fieldErrors);
        return;
      }

      setIsSubmitting(true);
      try {
        const { data, error } = await authClient.signUp.email({
          name,
          email,
          password,
        });

        if (error) {
          setStatusMessage({
            type: "error",
            text: `Hata: ${error.message || "Kayıt başarısız"}`,
          });
        } else if (data) {
          setStatusMessage({
            type: "success",
            text: "Zod doğrulaması ve Better-Auth kaydı başarılı!",
          });
          setName("");
          setEmail("");
          setPassword("");
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Bir hata oluştu";
        setStatusMessage({ type: "error", text: `Hata: ${message}` });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      const formData: SignInInput = { email, password };
      const validationResult = signInSchema.safeParse(formData);

      if (!validationResult.success) {
        const fieldErrors: Record<string, string> = {};
        for (const issue of validationResult.error.issues) {
          const fieldName = issue.path[0] as string;
          if (!fieldErrors[fieldName]) {
            fieldErrors[fieldName] = issue.message;
          }
        }
        setErrors(fieldErrors);
        return;
      }

      setIsSubmitting(true);
      try {
        const { data, error } = await authClient.signIn.email({
          email,
          password,
        });

        if (error) {
          setStatusMessage({
            type: "error",
            text: `Hata: ${error.message || "Giriş başarısız"}`,
          });
        } else if (data) {
          setStatusMessage({
            type: "success",
            text: "Giriş başarılı!",
          });
          setEmail("");
          setPassword("");
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Bir hata oluştu";
        setStatusMessage({ type: "error", text: `Hata: ${message}` });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSignOut = async () => {
    setIsSubmitting(true);
    setStatusMessage(null);
    try {
      await authClient.signOut();
      setStatusMessage({ type: "success", text: "Çıkış yapıldı." });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Çıkış yapılırken hata";
      setStatusMessage({ type: "error", text: `Hata: ${message}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="auth"
      className="scroll-mt-24 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:shadow-md sm:p-6 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
              Zod & Better-Auth Demo
            </h3>
            <p className="text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
              Şema doğrulama ve kimlik yönetimi testi
            </p>
          </div>
        </div>

        {session?.user ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{session.user.name || session.user.email}</span>
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSubmitting}
              className="flex min-h-[44px] items-center gap-1.5 rounded-xl border border-zinc-300 px-3.5 py-2 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-100 active:scale-95 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        ) : (
          <span className="inline-flex w-fit items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {sessionPending ? "Yükleniyor..." : "Oturum açık değil"}
          </span>
        )}
      </div>

      {/* Tabs with min-h-[44px] touch target */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => {
            setMode("signUp");
            setErrors({});
            setStatusMessage(null);
          }}
          className={`flex min-h-[44px] flex-1 items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold transition active:scale-98 sm:flex-initial sm:text-sm ${
            mode === "signUp"
              ? "border-b-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
              : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          }`}
        >
          <UserPlus className="h-4 w-4" />
          <span>Kayıt Ol (Zod SignUp)</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("signIn");
            setErrors({});
            setStatusMessage(null);
          }}
          className={`flex min-h-[44px] flex-1 items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold transition active:scale-98 sm:flex-initial sm:text-sm ${
            mode === "signIn"
              ? "border-b-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
              : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          }`}
        >
          <LogIn className="h-4 w-4" />
          <span>Giriş Yap (Zod SignIn)</span>
        </button>
      </div>

      <form onSubmit={handleAuthSubmit} className="mt-5 space-y-4">
        {mode === "signUp" && (
          <div>
            <label className="block text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
              Ad Soyad
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Örn: Ahmet Yılmaz"
              className="mt-1.5 min-h-[44px] w-full rounded-xl border border-zinc-300 bg-transparent px-3.5 py-2.5 text-base text-zinc-900 transition outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm dark:border-zinc-700 dark:text-zinc-100"
            />
            {errors.name && (
              <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-500">
                <AlertCircle className="h-3 w-3" />
                {errors.name}
              </p>
            )}
          </div>
        )}

        <div>
          <label className="block text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
            E-posta
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@jetacademie.com"
            className="mt-1.5 min-h-[44px] w-full rounded-xl border border-zinc-300 bg-transparent px-3.5 py-2.5 text-base text-zinc-900 transition outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm dark:border-zinc-700 dark:text-zinc-100"
          />
          {errors.email && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-500">
              <AlertCircle className="h-3 w-3" />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
            Şifre {mode === "signUp" && "(Min 8 karakter)"}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="mt-1.5 min-h-[44px] w-full rounded-xl border border-zinc-300 bg-transparent px-3.5 py-2.5 text-base text-zinc-900 transition outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm dark:border-zinc-700 dark:text-zinc-100"
          />
          {errors.password && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-500">
              <AlertCircle className="h-3 w-3" />
              {errors.password}
            </p>
          )}
        </div>

        {statusMessage && (
          <div
            className={`flex items-center gap-2 rounded-xl p-3.5 text-sm ${
              statusMessage.type === "success"
                ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                : "bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 active:scale-[0.99] disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          {isSubmitting
            ? "İşleniyor..."
            : mode === "signUp"
              ? "Zod ile Doğrula & Kayıt Ol"
              : "Zod ile Doğrula & Giriş Yap"}
        </button>
      </form>
    </div>
  );
}
