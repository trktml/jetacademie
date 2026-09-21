"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllGradePlans, getGradePlan } from "@/lib/data/curriculum-plans";
import { TargetsProgressionLadder } from "@/components/targets-progression-ladder";
import { TargetOutcomeCard } from "@/components/target-outcome-card";
import { TargetUnitsAccordion } from "@/components/target-units-accordion";

interface TargetsViewProps {
  initialGrade?: number;
}

export function TargetsView({ initialGrade = 1 }: TargetsViewProps) {
  const [selectedGrade, setSelectedGrade] = useState<number>(
    initialGrade >= 1 && initialGrade <= 6 ? initialGrade : 1
  );

  const plans = getAllGradePlans();
  const currentPlan = getGradePlan(selectedGrade) ?? plans[0];

  const handleSelectGrade = (grade: number) => {
    if (grade >= 1 && grade <= 6) {
      setSelectedGrade(grade);
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("sinif", String(grade));
        window.history.replaceState({}, "", url.toString());
      }
    }
  };

  return (
    <div className="targets-view">
      {/* Clean Minimalist Hero Header */}
      <header className="targets-view__hero">
        <h1 className="targets-view__hero-title">Hedefler ve Yıllık Planlar</h1>
        <p className="targets-view__hero-subtitle">
          Öğrencinin sene sonunda elde edeceği temel kazanımlar ve haftalık yol haritası.
        </p>
      </header>

      {/* 6-Year Progression Ladder */}
      <TargetsProgressionLadder
        plans={plans}
        selectedGrade={selectedGrade}
        onSelectGrade={handleSelectGrade}
      />

      {/* Active Grade Content */}
      <div
        id={`target-panel-${selectedGrade}`}
        role="tabpanel"
        aria-labelledby={`target-tab-${selectedGrade}`}
        className="targets-view__content"
      >
        {/* Sene Sonu Kazanım Kartı */}
        <TargetOutcomeCard plan={currentPlan} />

        {/* 36 Haftalık Müfredat Akışı */}
        <TargetUnitsAccordion units={currentPlan.units} gradeCode={currentPlan.code} />

        {/* Minimalist Curriculum Link Bridge */}
        <div className="targets-curriculum-bridge">
          <p className="targets-curriculum-bridge__text">
            {`${currentPlan.schoolLevel} haftalık ders içerikleri ve ses/video kayıtları için müfredat arşivine göz atabilirsiniz.`}
          </p>
          <Link
            href={`/mufredat?sinif=${currentPlan.grade}`}
            className="targets-curriculum-bridge__btn"
          >
            <span>{`${currentPlan.code} Müfredatına Git`}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
