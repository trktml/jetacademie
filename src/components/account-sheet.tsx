"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Drawer } from "vaul";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Copy,
  KeyRound,
  LogIn,
  LogOut,
  ShieldCheck,
  Smartphone,
  Trash2,
  UserPlus,
  UserRound,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
  anonymousSignInSchema,
  anonymousSignUpSchema,
  changePasswordSchema,
} from "@/lib/validations/auth";
import { useUiStore } from "@/store/use-ui-store";
import { useGuestStore } from "@/store/use-guest-store";
import { migrateGuestProgress } from "@/app/mufredat/migrate-guest-progress";

export function AccountSheet() {
  const router = useRouter();
  const isOpen = useUiStore((state) => state.isAccountOpen);
  const setOpen = useUiStore((state) => state.setAccountOpen);
  const { data: session, isPending: isSessionPending } = authClient.useSession();

  const [mode, setMode] = useState<"signIn" | "signUp">("signUp");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Post-registration assigned username card
  const [assignedUsername, setAssignedUsername] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);

  // Profile actions state
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Guest store
  const isGuest = useGuestStore((s) => s.isGuest);
  const enableGuest = useGuestStore((s) => s.enableGuest);
  const disableGuest = useGuestStore((s) => s.disableGuest);
  const guestCompletedIds = useGuestStore((s) => s.completedEntryIds);
  const guestGender = useGuestStore((s) => s.gender);
  const [showGuestLogoutConfirm, setShowGuestLogoutConfirm] = useState(false);
  const [showAuthFromGuest, setShowAuthFromGuest] = useState(false);

  function resetForm() {
    setPassword("");
    setCurrentPassword("");
    setDeletePassword("");
    setNewPassword("");
    setMessage(null);
    setSuccessMessage(null);
    setShowDeleteConfirm(false);
    setShowGuestLogoutConfirm(false);
    setShowAuthFromGuest(false);
  }

  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setSuccessMessage(null);

    const result = anonymousSignUpSchema.safeParse({ password });
    if (!result.success) {
      setMessage(result.error.issues[0]?.message ?? "Geçersiz şifre.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/register-anonymous", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        setMessage(data.error || "Kayıt işlemi tamamlanamadı.");
        return;
      }

      setAssignedUsername(data.username);
      setPassword("");

      // Misafir ilerlemesini ve tercihlerini yeni hesaba aktar
      if (isGuest && (guestCompletedIds.length > 0 || guestGender)) {
        try {
          await migrateGuestProgress(guestCompletedIds, guestGender);
        } catch {
          // Aktarım başarısız olsa da kayıt başarılı
        }
      }
      if (isGuest) disableGuest();

      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Kayıt işlemi tamamlanamadı.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setSuccessMessage(null);

    const result = anonymousSignInSchema.safeParse({ username, password });
    if (!result.success) {
      setMessage(result.error.issues[0]?.message ?? "Bilgileri kontrol edin.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/sign-in-anonymous", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        setMessage(data.error || "Kullanıcı adı veya şifre hatalı.");
        return;
      }

      // Misafir ilerlemesini ve tercihlerini mevcut hesaba aktar
      if (isGuest && (guestCompletedIds.length > 0 || guestGender)) {
        try {
          await migrateGuestProgress(guestCompletedIds, guestGender);
        } catch {
          // Aktarım başarısız olsa da giriş başarılı
        }
      }
      if (isGuest) disableGuest();

      resetForm();
      setOpen(false);
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Giriş işlemi tamamlanamadı.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleChangePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setSuccessMessage(null);

    const result = changePasswordSchema.safeParse({ currentPassword, newPassword });
    if (!result.success) {
      setMessage(result.error.issues[0]?.message ?? "Geçersiz şifre.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/account/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        setMessage(data.error || "Şifre güncellenemedi.");
        return;
      }

      setSuccessMessage("Şifreniz başarıyla güncellendi.");
      setNewPassword("");
      setCurrentPassword("");
      setShowChangePassword(false);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Şifre güncellenemedi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteAccount() {
    if (!deletePassword) {
      setMessage("Hesabınızı silmek için şifrenizi girin.");
      return;
    }
    setIsSubmitting(true);
    setMessage(null);
    try {
      const response = await fetch("/api/account/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: deletePassword }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        setMessage(data.error || "Hesap silinemedi.");
        return;
      }

      resetForm();
      setOpen(false);
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Hesap silinemedi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function signOut() {
    setIsSubmitting(true);
    try {
      await authClient.signOut();
      resetForm();
      setOpen(false);
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  async function copyUsername() {
    if (!assignedUsername) return;
    try {
      await navigator.clipboard.writeText(assignedUsername);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch {
      // Ignore clipboard write failures
    }
  }

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          setAssignedUsername(null);
          resetForm();
        }
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="sheet-overlay" />
        <Drawer.Content className="account-sheet">
          <Drawer.Handle className="sheet-handle" />
          <div className="sheet-heading">
            <div>
              <Drawer.Title>
                {session?.user ? "Hesabınız" : isGuest ? "Misafir Oturum" : "İlerlemenizi Kaydedin"}
              </Drawer.Title>
              <Drawer.Description>
                {session?.user
                  ? "Okuduğunuz her ders ve modül hesabınıza güvenle kaydedilir."
                  : isGuest
                    ? "Kaldığınız yerler bu cihazda kaydediliyor."
                    : "Müfredatta kaldığınız yer cihazlarınız arasında anonim olarak korunsun."}
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
          ) : assignedUsername ? (
            <div className="account-created-card">
              <div className="account-created-card__title">
                <CheckCircle2 className="text-emerald-500" aria-hidden="true" />
                <span>Hesabınız Oluşturuldu!</span>
              </div>
              <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                GDPR uyumlu anonim hesabınız hazır. Kullanıcı adınız sistem tarafından otomatik
                olarak atandı:
              </p>
              <div className="username-display-box">
                <strong>{assignedUsername}</strong>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={copyUsername}
                  aria-label="Kullanıcı adını kopyala"
                >
                  {hasCopied ? (
                    <>
                      <Check aria-hidden="true" /> Kopyalandı
                    </>
                  ) : (
                    <>
                      <Copy aria-hidden="true" /> Kopyala
                    </>
                  )}
                </button>
              </div>
              <div className="auth-info-card">
                <AlertTriangle aria-hidden="true" />
                <span>
                  <strong>Önemli:</strong> Lütfen bu kullanıcı adını ve belirlediğiniz şifreyi bir
                  yere kaydedin. Oturumunuz kapandığında tekrar giriş yapmak için buna ihtiyacınız
                  olacak.
                </span>
              </div>
              <button
                type="button"
                className="primary-button"
                onClick={() => setAssignedUsername(null)}
              >
                Anladım, Devam Et
              </button>
            </div>
          ) : session?.user ? (
            <>
              <div className="account-summary">
                <span className="account-summary__icon">
                  <ShieldCheck aria-hidden="true" />
                </span>
                <div>
                  <strong>{session.user.name}</strong>
                  <span>GDPR Uyumlu Anonim Hesap</span>
                </div>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={signOut}
                  disabled={isSubmitting}
                >
                  <LogOut aria-hidden="true" /> Çıkış Yap
                </button>
              </div>

              {message && <p className="form-message mt-3">{message}</p>}
              {successMessage && (
                <p className="form-message form-message--success mt-3">{successMessage}</p>
              )}

              <div className="account-actions-card">
                {!showChangePassword ? (
                  <button
                    type="button"
                    className="secondary-button justify-start"
                    onClick={() => {
                      setShowChangePassword(true);
                      setShowDeleteConfirm(false);
                      setMessage(null);
                    }}
                  >
                    <KeyRound aria-hidden="true" /> Şifre Değiştir
                  </button>
                ) : (
                  <form className="auth-form mt-0" onSubmit={handleChangePassword}>
                    <h3 className="account-subheading">
                      <KeyRound aria-hidden="true" className="h-4 w-4 text-[var(--brand)]" />
                      Şifre Değiştirin
                    </h3>
                    <label>
                      <span>Mevcut Şifre</span>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                      />
                    </label>
                    <label>
                      <span>Yeni Şifre (en az 4 karakter)</span>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="En az 4 karakter"
                        maxLength={128}
                        autoComplete="new-password"
                      />
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="primary-button flex-1"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Güncelleniyor…" : "Kaydet"}
                      </button>
                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() => {
                          setShowChangePassword(false);
                          setCurrentPassword("");
                          setNewPassword("");
                        }}
                      >
                        Vazgeç
                      </button>
                    </div>
                  </form>
                )}

                {!showDeleteConfirm ? (
                  <button
                    type="button"
                    className="danger-button danger-button--outline justify-start"
                    onClick={() => {
                      setShowDeleteConfirm(true);
                      setShowChangePassword(false);
                      setMessage(null);
                    }}
                  >
                    <Trash2 aria-hidden="true" /> Hesabı Sil
                  </button>
                ) : (
                  <div className="danger-zone-box">
                    <h3 className="account-subheading text-red-600 dark:text-red-400">
                      <AlertTriangle aria-hidden="true" className="h-4 w-4" />
                      Hesabınızı Silmek İstiyor musunuz?
                    </h3>
                    <p>
                      Hesabınız ve tüm müfredat okuma ilerlemeniz kalıcı olarak silinecektir. Bu
                      işlem geri alınamaz.
                    </p>
                    <label className="auth-form">
                      <span>Onay için şifreniz</span>
                      <input
                        type="password"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        autoComplete="current-password"
                        required
                      />
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="danger-button flex-1"
                        onClick={handleDeleteAccount}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Siliniyor…" : "Evet, Hesabımı Sil"}
                      </button>
                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() => {
                          setShowDeleteConfirm(false);
                          setDeletePassword("");
                        }}
                      >
                        Vazgeç
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : isGuest && !showAuthFromGuest ? (
            <>
              <div className="guest-profile-card">
                <div className="guest-profile-card__header">
                  <span className="guest-profile-card__icon">
                    <UserRound aria-hidden="true" />
                  </span>
                  <div className="guest-profile-card__info">
                    <strong>Misafir Oturum</strong>
                    <span>{guestCompletedIds.length} dosya tamamlandı</span>
                  </div>
                </div>
                <div className="guest-profile-card__note">
                  <Smartphone aria-hidden="true" />
                  <span>
                    Kaldığınız yerler bu cihazda kaydediliyor. Hesap oluşturursanız ilerlemeniz
                    güvenle aktarılır ve tüm cihazlarınızdan erişebilirsiniz.
                  </span>
                </div>
                <button
                  type="button"
                  className="primary-button"
                  onClick={() => {
                    setMode("signUp");
                    setMessage(null);
                    setShowAuthFromGuest(true);
                  }}
                >
                  <UserPlus aria-hidden="true" /> Hesap Oluştur ve İlerlemeyi Aktar
                </button>
              </div>

              {message && <p className="form-message mt-3">{message}</p>}

              <div className="account-actions-card">
                {!showGuestLogoutConfirm ? (
                  <button
                    type="button"
                    className="danger-button danger-button--outline justify-start"
                    onClick={() => setShowGuestLogoutConfirm(true)}
                  >
                    <LogOut aria-hidden="true" /> Misafir Oturumunu Sonlandır
                  </button>
                ) : (
                  <div className="danger-zone-box">
                    <h3 className="account-subheading text-red-600 dark:text-red-400">
                      <AlertTriangle aria-hidden="true" className="h-4 w-4" />
                      Misafir Oturumunu Sonlandırmak İstiyor musunuz?
                    </h3>
                    <p>
                      Bu cihazdaki tüm ilerlemeniz ({guestCompletedIds.length} dosya) kalıcı olarak
                      silinecektir. Bu işlem geri alınamaz.
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="danger-button flex-1"
                        onClick={() => {
                          disableGuest();
                          resetForm();
                          setOpen(false);
                          router.refresh();
                        }}
                      >
                        Evet, Sonlandır
                      </button>
                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() => setShowGuestLogoutConfirm(false)}
                      >
                        Vazgeç
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="auth-tabs" role="tablist" aria-label="Hesap işlemi">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "signUp"}
                  onClick={() => {
                    setMode("signUp");
                    setMessage(null);
                  }}
                >
                  <UserPlus aria-hidden="true" /> Kayıt Ol
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === "signIn"}
                  onClick={() => {
                    setMode("signIn");
                    setMessage(null);
                  }}
                >
                  <LogIn aria-hidden="true" /> Giriş Yap
                </button>
              </div>

              {mode === "signUp" ? (
                <form className="auth-form" onSubmit={handleSignUp}>
                  <div className="auth-info-card">
                    <ShieldCheck aria-hidden="true" />
                    <span>
                      <strong>Tamamen Anonim:</strong> Ad, soyad veya e-posta istenmez. Sadece şifre
                      belirlersiniz, kullanıcı adınız otomatik atanır.
                    </span>
                  </div>
                  <label>
                    <span>Şifreniz (en az 4 karakter)</span>
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="En az 4 karakter"
                      maxLength={128}
                      autoComplete="new-password"
                    />
                  </label>
                  {message && <p className="form-message">{message}</p>}
                  <button className="primary-button" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Kaydediliyor…" : "Kayıt Ol ve Kullanıcı Adı Al"}
                  </button>
                </form>
              ) : (
                <form className="auth-form" onSubmit={handleSignIn}>
                  <label>
                    <span>Kullanıcı Adı</span>
                    <input
                      type="text"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      placeholder="ör. user1"
                      autoComplete="username"
                      autoCapitalize="none"
                    />
                  </label>
                  <label>
                    <span>Şifre</span>
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Şifreniz"
                      autoComplete="current-password"
                    />
                  </label>
                  {message && <p className="form-message">{message}</p>}
                  <button className="primary-button" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Giriş yapılıyor…" : "Giriş Yap"}
                  </button>
                </form>
              )}

              <div className="guest-login-divider">
                <span>veya</span>
              </div>
              <button
                type="button"
                className="guest-login-button"
                onClick={() => {
                  enableGuest();
                  setOpen(false);
                  router.refresh();
                }}
              >
                <UserRound aria-hidden="true" />
                <div>
                  <strong>Misafir Olarak Devam Et</strong>
                  <span>Kaldığınız yerler bu cihazda kaydedilir</span>
                </div>
              </button>
            </>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
