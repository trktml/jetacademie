"use client";

import { ShieldCheck, Smartphone, LogIn } from "lucide-react";
import { useGuestStore } from "@/store/use-guest-store";
import { authClient } from "@/lib/auth-client";

export function ProgressStatusNote({
  isSignedIn,
  isGuest: isGuestProp,
}: {
  isSignedIn: boolean;
  isGuest?: boolean;
}) {
  const storeGuest = useGuestStore((s) => s.isGuest);
  const isGuest = isGuestProp ?? storeGuest;
  const { data: session } = authClient.useSession();
  const effectiveSignedIn = Boolean(session?.user ?? isSignedIn);

  if (effectiveSignedIn) {
    return (
      <div className="secure-note">
        <ShieldCheck aria-hidden="true" />
        <span>İlerlemeniz hesabınıza kaydediliyor</span>
      </div>
    );
  }

  if (isGuest) {
    return (
      <div className="secure-note secure-note--guest">
        <Smartphone aria-hidden="true" />
        <span>Kaldığınız yerler cihazınızda kaydediliyor</span>
      </div>
    );
  }

  return (
    <div className="secure-note">
      <LogIn aria-hidden="true" />
      <span>Kaydetmek için giriş yapın</span>
    </div>
  );
}
