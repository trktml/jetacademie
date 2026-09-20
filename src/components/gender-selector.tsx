"use client";

import { useEffect, useState } from "react";
import { BookOpen, ChevronRight, Smartphone, User, Users, X } from "lucide-react";
import { type Gender } from "@/lib/data/ilmihal-curriculum";

export interface GenderSelectorProps {
  currentGender: Gender;
  onGenderChange: (gender: Gender) => void;
  onSelectGuest: (gender: Gender) => void;
  onOpenAccount: () => void;
  isSignedIn: boolean;
  isGuest: boolean;
  isPending?: boolean;
  initialModalGender?: Gender | null;
}

export function GenderSelector({
  currentGender,
  onGenderChange,
  onSelectGuest,
  onOpenAccount,
  isSignedIn,
  isGuest,
  isPending = false,
  initialModalGender = null,
}: GenderSelectorProps) {
  const [modalTargetGender, setModalTargetGender] = useState<Gender | null>(initialModalGender);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setModalTargetGender(null);
      }
    }
    if (modalTargetGender) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [modalTargetGender]);

  function handleSelect(gender: Gender) {
    if (isPending) return;

    // Eğer oturum açılmamışsa ve misafir modu da aktif değilse, seçim için giriş veya misafir onayı iste
    if (!isSignedIn && !isGuest) {
      setModalTargetGender(gender);
      return;
    }

    if (gender !== currentGender) {
      onGenderChange(gender);
    }
  }

  function handleConfirmGuest() {
    if (!modalTargetGender) return;
    const gender = modalTargetGender;
    setModalTargetGender(null);
    onSelectGuest(gender);
  }

  function handleConfirmAccount() {
    setModalTargetGender(null);
    onOpenAccount();
  }

  return (
    <div className="archive-gender-container" aria-label="İlmihal müfredat seçimi">
      <div className="archive-gender-title-wrap">
        <Users className="h-3.5 w-3.5 shrink-0 text-[var(--accent-teal)]" aria-hidden="true" />
        <span className="archive-gender-title">Müfredat</span>
      </div>

      <div
        className="archive-gender-pills"
        role="tablist"
        aria-label="İlmihal müfredat cinsiyet seçimi"
      >
        <button
          type="button"
          role="tab"
          id="gender-tab-erkek"
          aria-selected={currentGender === "erkek"}
          aria-controls="ilmihal"
          data-active={currentGender === "erkek"}
          className="archive-gender-btn archive-gender-btn--erkek"
          onClick={() => handleSelect("erkek")}
          disabled={isPending}
          title="Erkek Müfredatı"
          aria-label="Erkek Müfredatı"
        >
          <span className="archive-gender-icon" aria-hidden="true">
            👨
          </span>
          <span className="sr-only">Erkek Müfredatı</span>
        </button>

        <button
          type="button"
          role="tab"
          id="gender-tab-bayan"
          aria-selected={currentGender === "bayan"}
          aria-controls="ilmihal"
          data-active={currentGender === "bayan"}
          className="archive-gender-btn archive-gender-btn--bayan"
          onClick={() => handleSelect("bayan")}
          disabled={isPending}
          title="Bayan Müfredatı"
          aria-label="Bayan Müfredatı"
        >
          <span className="archive-gender-icon" aria-hidden="true">
            👩
          </span>
          <span className="sr-only">Bayan Müfredatı</span>
        </button>
      </div>

      {/* Oturum açmamış ve misafir olmayan kullanıcı için onay ve yönlendirme modalı */}
      {modalTargetGender && (
        <div
          className="archive-gender-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gender-modal-title"
          aria-describedby="gender-modal-desc"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setModalTargetGender(null);
            }
          }}
        >
          <div className="archive-gender-modal-card">
            <div className="archive-gender-modal-header">
              <span className="archive-gender-modal-tag">
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{modalTargetGender === "erkek" ? "Erkek" : "Bayan"} Müfredatı</span>
              </span>
              <button
                type="button"
                className="archive-gender-modal-close"
                onClick={() => setModalTargetGender(null)}
                aria-label="Kapat"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="archive-gender-modal-body">
              <h3 id="gender-modal-title" className="archive-gender-modal-title">
                İlerlemenizi Nasıl Kaydedelim?
              </h3>
              <p id="gender-modal-desc" className="archive-gender-modal-desc">
                Ders takibinizi korumak için bir yöntem seçin.
              </p>

              <div className="archive-gender-modal-options">
                <button
                  type="button"
                  className="archive-gender-option-row"
                  onClick={handleConfirmGuest}
                >
                  <div
                    className="archive-gender-option-row__icon archive-gender-option-row__icon--guest"
                    aria-hidden="true"
                  >
                    <Smartphone className="h-4 w-4" />
                  </div>
                  <div className="archive-gender-option-row__text">
                    <span className="archive-gender-option-row__title">
                      Misafir Olarak Devam Et
                    </span>
                    <span className="archive-gender-option-row__desc">
                      Hesap açmadan bu cihazda saklayın
                    </span>
                  </div>
                  <ChevronRight className="archive-gender-option-row__arrow" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  className="archive-gender-option-row"
                  onClick={handleConfirmAccount}
                >
                  <div
                    className="archive-gender-option-row__icon archive-gender-option-row__icon--account"
                    aria-hidden="true"
                  >
                    <User className="h-4 w-4" />
                  </div>
                  <div className="archive-gender-option-row__text">
                    <span className="archive-gender-option-row__title">Giriş Yap veya Kaydol</span>
                    <span className="archive-gender-option-row__desc">
                      Tüm cihazlarınızla eşitleyin
                    </span>
                  </div>
                  <ChevronRight className="archive-gender-option-row__arrow" aria-hidden="true" />
                </button>
              </div>

              <div className="archive-gender-modal-actions">
                <button
                  type="button"
                  className="archive-gender-modal-cancel"
                  onClick={() => setModalTargetGender(null)}
                >
                  Vazgeç
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
