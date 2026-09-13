"use client";

import { ShieldCheck, Smartphone, LogIn } from "lucide-react";
import { useGuestStore } from "@/store/use-guest-store";

export function ProgressStatusNote({ isSignedIn }: { isSignedIn: boolean }) {
  const isGuest = useGuestStore((s) => s.isGuest);

  if (isSignedIn) {
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
