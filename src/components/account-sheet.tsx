"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Drawer } from "vaul";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
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
  MIN_PASSWORD_LENGTH,
  anonymousSignInSchema,
  anonymousSignUpSchema,
  changePasswordSchema,
} from "@/lib/validations/auth";
import { useUiStore } from "@/store/use-ui-store";
import { useGuestStore } from "@/store/use-guest-store";
import { unwrapActionResult } from "@/lib/action-result";
import { migrateGuestProgress } from "@/app/mufredat/migrate-guest-progress";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { postJson } from "@/lib/client-http";

const accountResponseSchema = z.object({ success: z.literal(true) });
const authenticationResponseSchema = accountResponseSchema.extend({
  username: z.string().min(1),
  userId: z.string().min(1),
});

export function AccountSheet() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isOpen = useUiStore((state) => state.isAccountOpen);
  const setOpen = useUiStore((state) => state.setAccountOpen);
  const {
    data: session,
    isPending: isSessionPending,
    refetch: refetchSession,
  } = authClient.useSession();

  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
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
  const [showGuestLogoutConfirm, setShowGuestLogoutConfirm] = useState(false);
  const [showAuthFromGuest, setShowAuthFromGuest] = useState(false);

  function resetForm() {
    setPassword("");
    setConfirmPassword("");
    setCurrentPassword("");
    setDeletePassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setMessage(null);
    setSuccessMessage(null);
    setShowDeleteConfirm(false);
    setShowGuestLogoutConfirm(false);
    setShowAuthFromGuest(false);
  }

  async function refreshAccountState() {
    await queryClient.cancelQueries({ queryKey: ["curriculum-progress"] });
    queryClient.removeQueries({ queryKey: ["curriculum-progress"] });
    await refetchSession();
    router.refresh();
  }

  async function transferGuestProgress(userId: string): Promise<boolean> {
    const snapshot = useGuestStore.getState();
    if (snapshot.completedEntryIds.length === 0 && !snapshot.gender) {
      snapshot.suspendGuest();
      return true;
    }
    try {
      unwrapActionResult(
        await migrateGuestProgress(userId, snapshot.completedEntryIds, snapshot.gender)
      );
      useGuestStore.getState().acknowledgeTransfer(snapshot.completedEntryIds, snapshot.gender);
      return true;
    } catch {
      useGuestStore.getState().suspendGuest();
      return false;
    }
  }

  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
      setMessage("Şifreler eşleşmiyor.");
      return;
    }

    const result = anonymousSignUpSchema.safeParse({ password });
    if (!result.success) {
      setMessage(result.error.issues[0]?.message ?? "Geçersiz şifre.");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await postJson(
        "/api/auth/register-anonymous",
        { password },
        authenticationResponseSchema,
        "Kayıt işlemi tamamlanamadı."
      );

      setAssignedUsername(data.username);
      setPassword("");
      setConfirmPassword("");

      const transferred = await transferGuestProgress(data.userId);
      await refreshAccountState();
      if (!transferred)
        setMessage(
          "Hesabınız oluşturuldu. Misafir ilerlemesi bu cihazda korundu; sonraki girişte aktarım tekrar denenecek."
        );
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
      const data = await postJson(
        "/api/auth/sign-in-anonymous",
        result.data,
        authenticationResponseSchema,
        "Kullanıcı adı veya şifre hatalı."
      );

      const transferred = await transferGuestProgress(data.userId);
      await refreshAccountState();
      resetForm();
      if (transferred) setOpen(false);
      else
        setMessage(
          "Giriş başarılı. Misafir ilerlemesi bu cihazda korundu; sonraki girişte aktarım tekrar denenecek."
        );
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

    if (newPassword !== confirmNewPassword) {
      setMessage("Yeni şifreler eşleşmiyor.");
      return;
    }

    const result = changePasswordSchema.safeParse({ currentPassword, newPassword });
    if (!result.success) {
      setMessage(result.error.issues[0]?.message ?? "Geçersiz şifre.");
      return;
    }

    setIsSubmitting(true);
    try {
      await postJson(
        "/api/account/change-password",
        result.data,
        accountResponseSchema,
        "Şifre güncellenemedi."
      );

      setSuccessMessage("Şifreniz başarıyla güncellendi.");
      setNewPassword("");
      setConfirmNewPassword("");
      setCurrentPassword("");
      setShowChangePassword(false);
      await refetchSession();
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
      await postJson(
        "/api/account/delete",
        { password: deletePassword },
        accountResponseSchema,
        "Hesap silinemedi."
      );

      await refreshAccountState();
      resetForm();
      setOpen(false);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Hesap silinemedi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function signOut() {
    setIsSubmitting(true);
    try {
      const result = await authClient.signOut();
      if (result.error) throw new Error("Çıkış işlemi tamamlanamadı.");
      await refreshAccountState();
      resetForm();
      setOpen(false);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Çıkış işlemi tamamlanamadı.");
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
      autoFocus
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
        <Drawer.Content
          className="account-sheet"
          onOpenAutoFocus={() => {
            returnFocusRef.current = document.activeElement as HTMLElement | null;
            setMode("signIn");
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            if (returnFocusRef.current?.isConnected) returnFocusRef.current.focus();
          }}
        >
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
              {message && (
                <p className="form-message" role="alert">
                  {message}
                </p>
              )}
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

              {message && (
                <p className="form-message mt-3" role="alert">
                  {message}
                </p>
              )}
              {successMessage && (
                <p className="form-message form-message--success mt-3" role="status">
                  {successMessage}
                </p>
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
                      <PasswordInput
                        value={currentPassword}
                        onChange={setCurrentPassword}
                        name="currentPassword"
                        autoComplete="current-password"
                        maxLength={128}
                        required
                      />
                    </label>
                    <label>
                      <span>Yeni Şifre (en az {MIN_PASSWORD_LENGTH} karakter)</span>
                      <PasswordInput
                        value={newPassword}
                        onChange={setNewPassword}
                        name="newPassword"
                        placeholder={`En az ${MIN_PASSWORD_LENGTH} karakter`}
                        minLength={MIN_PASSWORD_LENGTH}
                        maxLength={128}
                        autoComplete="new-password"
                        required
                      />
                    </label>
                    <label>
                      <span>Yeni Şifreyi Tekrar Girin</span>
                      <PasswordInput
                        value={confirmNewPassword}
                        onChange={setConfirmNewPassword}
                        name="confirmNewPassword"
                        placeholder="Yeni şifrenizi tekrar girin"
                        maxLength={128}
                        autoComplete="new-password"
                        required
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
                          setConfirmNewPassword("");
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
                      <PasswordInput
                        value={deletePassword}
                        onChange={setDeletePassword}
                        name="password"
                        autoComplete="current-password"
                        maxLength={128}
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

              {message && (
                <p className="form-message mt-3" role="alert">
                  {message}
                </p>
              )}

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
                      <strong>Tamamen Anonim:</strong> Ad, soyad veya e-posta istenmez. Kullanıcı
                      adınız otomatik atanır. E-posta olmadığı için şifre sıfırlama yapılamaz;
                      bilgilerinizi güvenli bir yerde saklayın.
                    </span>
                  </div>
                  <label>
                    <span>Şifreniz (en az {MIN_PASSWORD_LENGTH} karakter)</span>
                    <PasswordInput
                      value={password}
                      onChange={setPassword}
                      name="password"
                      placeholder={`En az ${MIN_PASSWORD_LENGTH} karakter`}
                      minLength={MIN_PASSWORD_LENGTH}
                      maxLength={128}
                      required
                      autoComplete="new-password"
                    />
                  </label>
                  <label>
                    <span>Şifrenizi Tekrar Girin</span>
                    <PasswordInput
                      value={confirmPassword}
                      onChange={setConfirmPassword}
                      name="confirmPassword"
                      placeholder="Şifrenizi tekrar girin"
                      maxLength={128}
                      required
                      autoComplete="new-password"
                    />
                  </label>
                  {message && (
                    <p className="form-message" role="alert">
                      {message}
                    </p>
                  )}
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
                      name="username"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      placeholder="ör. user1"
                      autoComplete="username"
                      autoCapitalize="none"
                    />
                  </label>
                  <label>
                    <span>Şifre</span>
                    <PasswordInput
                      value={password}
                      onChange={setPassword}
                      name="password"
                      placeholder="Şifreniz"
                      autoComplete="current-password"
                      maxLength={128}
                      required
                    />
                  </label>
                  {message && (
                    <p className="form-message" role="alert">
                      {message}
                    </p>
                  )}
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

type PasswordInputProps = {
  value: string;
  onChange: (value: string) => void;
  autoComplete: "current-password" | "new-password";
  name: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
};

function PasswordInput({
  value,
  onChange,
  name,
  autoComplete,
  placeholder,
  minLength,
  maxLength,
  required,
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="password-input">
      <input
        type={isVisible ? "text" : "password"}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
      />
      <button
        type="button"
        className="password-input__toggle"
        onClick={() => setIsVisible((visible) => !visible)}
        aria-label={isVisible ? "Şifreyi gizle" : "Şifreyi göster"}
        aria-pressed={isVisible}
        title={isVisible ? "Şifreyi gizle" : "Şifreyi göster"}
      >
        {isVisible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
      </button>
    </div>
  );
}
