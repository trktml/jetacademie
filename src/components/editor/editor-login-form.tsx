"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { LockKeyhole, ShieldCheck, ChevronRight } from "lucide-react";
import { loginEditor } from "@/lib/editor-client";

export function EditorLoginForm({
  unavailable,
  onLogin,
}: {
  unavailable: boolean;
  onLogin: (csrf: string) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useMutation({
    mutationFn: () => loginEditor(username, password),
    onSuccess: (result) => {
      setPassword("");
      onLogin(result.csrf);
    },
  });
  return (
    <main className="editor-login-page" data-color-mode="light">
      <section className="editor-login-card">
        <div className="editor-brand-icon">
          <LockKeyhole size={26} />
        </div>
        <span className="editor-eyebrow">JETACADEMIE · İÇERİK EDİTÖRÜ</span>
        <h1>Müfredat düzenleme</h1>
        <p>Haftalık içerikleri hazırlamak için özel hesabınızla giriş yapın.</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            login.mutate();
          }}
        >
          <label className="editor-field">
            Kullanıcı adı
            <input
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              maxLength={80}
              required
              autoCapitalize="none"
              spellCheck={false}
            />
          </label>
          <label className="editor-field">
            Şifre
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              maxLength={128}
              required
            />
          </label>
          {(login.error || unavailable) && (
            <p className="editor-error" role="alert">
              {login.error?.message ?? "Düzenleme hesabı sunucuda yapılandırılmamış."}
            </p>
          )}
          <button className="editor-button primary" disabled={login.isPending || unavailable}>
            {login.isPending ? "Giriş yapılıyor…" : "Çalışma alanına gir"}
            <ChevronRight size={18} />
          </button>
        </form>
        <div className="editor-login-footer">
          <ShieldCheck size={16} /> Yalnızca müfredat düzenleme erişimi
        </div>
      </section>
    </main>
  );
}
