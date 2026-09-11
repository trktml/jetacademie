"use client";

import { useState } from "react";
import { signUpSchema, type SignUpInput } from "@/lib/validations/auth";
import { authClient } from "@/lib/auth-client";

export function AuthZodDemo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: session, isPending: sessionPending } = authClient.useSession();

  const handleValidateAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setStatusMessage(null);

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
        setStatusMessage(`Hata: ${error.message || "Kayıt başarısız"}`);
      } else if (data) {
        setStatusMessage("Zod doğrulaması ve Better-Auth kaydı başarılı!");
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Bir hata oluştu";
      setStatusMessage(`Hata: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between pb-4">
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Zod & Better-Auth Demo</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Şema doğrulama ve kimlik doğrulama testi
          </p>
        </div>
        {session?.user ? (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
            Giriş yapıldı: {session.user.name}
          </span>
        ) : (
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {sessionPending ? "Yükleniyor..." : "Oturum açık değil"}
          </span>
        )}
      </div>

      <form onSubmit={handleValidateAndRegister} className="mt-2 space-y-4">
        <div>
          <label className="block text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
            Ad Soyad
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Örn: Ahmet Yılmaz"
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 transition outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:text-zinc-100"
          />
          {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
            E-posta
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@jetacademie.com"
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 transition outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:text-zinc-100"
          />
          {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
            Şifre (Min 8 karakter)
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-900 transition outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:text-zinc-100"
          />
          {errors.password && <p className="mt-1 text-xs text-rose-500">{errors.password}</p>}
        </div>

        {statusMessage && (
          <div className="rounded-lg bg-zinc-100 p-3 text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
            {statusMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          {isSubmitting ? "Doğrulanıyor..." : "Zod ile Doğrula & Better-Auth'a Gönder"}
        </button>
      </form>
    </div>
  );
}
