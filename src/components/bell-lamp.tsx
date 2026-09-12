"use client";

import React from "react";

interface BellLampProps {
  isOn: boolean;
  onToggle: () => void;
  className?: string;
}

export function BellLamp({ isOn, onToggle, className = "" }: BellLampProps) {
  return (
    <div className={`bell-lamp-scope ${className}`}>
      {/* Realistic ceiling cable anchor fixture */}
      <div
        className="ceiling-mount pointer-events-none absolute -top-10 left-1/2 z-30 h-1.5 w-10 -translate-x-1/2 opacity-0"
        aria-hidden="true"
      />

      <div
        className={`bell-container ${!isOn ? "off" : ""}`}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        aria-label={isOn ? "Lambayı Kapat" : "Lambayı Aç"}
        aria-pressed={isOn}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        <div className="rope" data-testid="rope" />
        <div className="bell-top" data-testid="bell-top" />

        <div className="bell-base" />
        <div className="bell-base" />
        <div className="shadow-l1" />
        <div className="shadow-l2" />
        <div className="left-glow" />
        <div className="left-glow2" />
        <div className="r-glow" />
        <div className="r-glow2" />
        <div className="mid-ring" />
        <div className="mid-ring small" />

        <div className="glow" />
        <div className="glow2" />

        <div className="bell-buff-t" />
        <div className="bell-buff" />

        <div className="bell-btm" />
        <div className="bell-btm2" />

        <div className="bell-ring-container">
          <div className="bell-ring" />
          <div className="bell-rays" />
        </div>

        <div className="volumetric">
          <div className="vl" />
          <div className="vr" />
        </div>
      </div>
    </div>
  );
}
