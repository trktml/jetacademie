"use client";

import React, { useState } from "react";
import Image from "next/image";
import { JetLogoIcon } from "@/components/jet-logo";
import { BellLamp } from "@/components/bell-lamp";
import { BookOpen, Target, Cpu, Server, Lightbulb, LightbulbOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function HeroShowcase() {
  const [isLampOn, setIsLampOn] = useState(true);

  const toggleLamp = () => {
    setIsLampOn((prev) => !prev);
  };

  const navBoxes = [
    {
      id: "mufredat",
      href: "#mufredat",
      label: "MÜFREDAT",
      subtitle: "Sistem & AI Müfredatı",
      icon: BookOpen,
    },
    {
      id: "ai-agents",
      href: "#query",
      label: "AI AJANLARI",
      subtitle: "Otonom Sistemler",
      icon: Cpu,
    },
    {
      id: "hedefler",
      href: "#hedefler",
      label: "HEDEFLER",
      subtitle: "Kariyer & Çıktılar",
      icon: Target,
    },
    {
      id: "dokploy",
      href: "#dokploy",
      label: "MİMARİ & DEPLOY",
      subtitle: "Dokploy & Bun",
      icon: Server,
    },
  ];

  return (
    <div
      className={`bell-scene relative w-full overflow-hidden bg-black text-white transition-colors duration-700 ${!isLampOn ? "is-off" : ""
        }`}
    >
      {/* Noise Grain Overlay from Specification */}
      <div className="grain" aria-hidden="true" />

      {/* Subtle Background Grid & Atmospheric Radial Glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(136,19,55,0.18),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_45%,transparent_28%,#000_55%,transparent_100%)] bg-[size:4rem_4rem]"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pt-6 pb-12 sm:px-6 lg:px-8">
        {/* Top Technical Metadata Header */}
        <div className="flex w-full items-center justify-between font-mono text-[11px] tracking-widest text-zinc-500 uppercase">
          <div className="flex items-center gap-4">
            <span className="text-zinc-400">/JETACADEMIE</span>
            <span className="hidden text-zinc-600 sm:inline">•</span>
            <span className="hidden text-zinc-500 sm:inline">
              /GELİŞİM [ SİSTEM MİMARİSİ & AI ]
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${isLampOn ? "bg-emerald-400 shadow-[0_0_8px_#34d399]" : "bg-zinc-600"
                }`}
            />
            <span className="text-zinc-400">
              {isLampOn ? "AYDINLATMA: AKTİF" : "AYDINLATMA: KAPALI"}
            </span>
          </div>
        </div>

        {/* Brand Headline and Typography */}
        <header className="relative z-30 mt-8 flex flex-col items-center text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-zinc-400 uppercase sm:text-sm">
            Thinking in Systems
          </p>

          <div className="mt-4 flex flex-col items-center gap-4">
            {/* Center Logo with Dynamic Glow */}
            <div className="relative flex items-center justify-center">
              <div
                className={`absolute -inset-4 rounded-full blur-xl transition-all duration-700 ${isLampOn ? "bg-rose-600/30 opacity-100" : "bg-zinc-800/10 opacity-20"
                  }`}
                aria-hidden="true"
              />
              <JetLogoIcon
                className={`relative h-16 w-16 drop-shadow-2xl transition-transform duration-500 sm:h-20 sm:w-20 ${isLampOn ? "scale-105" : "scale-95 grayscale-[30%]"
                  }`}
              />
            </div>

            {/* Large Jet Academie Title */}
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Jet Academie
            </h1>
          </div>

          <p className="mt-4 max-w-2xl text-xs leading-relaxed font-light text-zinc-400 sm:text-sm md:text-base">
            Geleceğin otonom yapay zeka ajanları, modern web mühendisliği ve yüksek performanslı
            sistem mimarileri için tasarlanmış ileri düzey eğitim ekosistemi.
          </p>
        </header>

        {/* Tree & Lamp Interactive Stage */}
        <div className="hero-stage-wrap mx-auto mt-4 w-full max-w-5xl">
          {/* Hanging Bell Lamp Suspended from Above */}
          <BellLamp isOn={isLampOn} onToggle={toggleLamp} />

          {/* Floating Warm Dust Particles / Embers in Light Cone */}
          <AnimatePresence>
            {isLampOn && (
              <div
                className="pointer-events-none absolute inset-0 z-15 overflow-hidden"
                aria-hidden="true"
              >
                {[
                  { top: "42%", left: "48%", delay: 0 },
                  { top: "48%", left: "44%", delay: 0.8 },
                  { top: "46%", left: "54%", delay: 1.5 },
                  { top: "54%", left: "47%", delay: 0.4 },
                  { top: "50%", left: "52%", delay: 1.2 },
                  { top: "58%", left: "42%", delay: 2.0 },
                  { top: "44%", left: "58%", delay: 1.7 },
                ].map((particle, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{
                      opacity: [0, 0.9, 0.2, 0.9, 0],
                      y: [-10, -40],
                      x: [0, idx % 2 === 0 ? 8 : -8],
                    }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      delay: particle.delay,
                      ease: "easeInOut",
                    }}
                    style={{ top: particle.top, left: particle.left }}
                    className="absolute h-1.5 w-1.5 rounded-full bg-amber-200/90 shadow-[0_0_10px_#fde68a]"
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Red Bonsai Tree on Floating Rock Pedestal with Branch Anchored Telemetry */}
          <div className="hero-tree-wrap z-10 flex w-full items-center justify-center">
            <div className="relative aspect-[3/4] w-full">
              {/* Masked Tree Image Container */}
              <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_75%_80%_at_50%_52%,black_55%,transparent_92%)] mix-blend-screen">
                <Image
                  src="/red-tree.jpg"
                  alt="Jet Academie Crimson Red Bonsai Tree on Floating Pedestal"
                  fill
                  priority
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, (max-width: 1024px) 420px, 460px"
                  className={`object-contain transition-all duration-700 ${isLampOn
                      ? "brightness-[1.12] contrast-[1.08] drop-shadow-[0_0_50px_rgba(225,29,72,0.5)] saturate-[1.2]"
                      : "opacity-25 brightness-[0.25] contrast-[0.95] drop-shadow-none saturate-[0.25]"
                    }`}
                />
              </div>

              {/* Rock Pedestal Light Reflection Pool */}
              <div
                className={`pointer-events-none absolute bottom-[14%] left-1/2 h-16 w-3/4 -translate-x-1/2 rounded-[100%] transition-opacity duration-700 ${isLampOn ? "opacity-100" : "opacity-0"
                  }`}
                style={{
                  background:
                    "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(254, 215, 170, 0.25) 0%, rgba(225, 29, 72, 0.15) 50%, transparent 70%)",
                  filter: "blur(6px)",
                }}
                aria-hidden="true"
              />

              {/* Telemetry Connector Guide Lines (SVG) Connecting Cards Directly to Tree Branches */}
              <svg
                className="pointer-events-none absolute inset-0 z-15 hidden h-full w-full overflow-visible lg:block"
                viewBox="0 0 460 613.33"
                overflow="visible"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <filter id="telemetry-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Node 1 Guide Line: Müfredat (Top-Left) -> Left Upper Branch */}
                <path
                  d="M -20 180 L 76 180 L 144 210"
                  stroke={isLampOn ? "#f43f5e" : "#3f3f46"}
                  strokeWidth={isLampOn ? 1.5 : 1}
                  strokeOpacity={isLampOn ? 0.85 : 0.25}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter={isLampOn ? "url(#telemetry-glow)" : undefined}
                  className="transition-colors duration-500"
                />
                <circle
                  cx="144"
                  cy="210"
                  r="7"
                  stroke={isLampOn ? "#f43f5e" : "#52525b"}
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  strokeOpacity={isLampOn ? 0.7 : 0.2}
                  className="transition-colors duration-500"
                />

                {/* Node 2 Guide Line: AI Ajanları (Bottom-Left) -> Left Lower Branch */}
                <path
                  d="M -20 351 L 48 351 L 118 265"
                  stroke={isLampOn ? "#f43f5e" : "#3f3f46"}
                  strokeWidth={isLampOn ? 1.5 : 1}
                  strokeOpacity={isLampOn ? 0.85 : 0.25}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter={isLampOn ? "url(#telemetry-glow)" : undefined}
                  className="transition-colors duration-500"
                />
                <circle
                  cx="118"
                  cy="265"
                  r="7"
                  stroke={isLampOn ? "#f43f5e" : "#52525b"}
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  strokeOpacity={isLampOn ? 0.7 : 0.2}
                  className="transition-colors duration-500"
                />

                {/* Node 3 Guide Line: Hedefler (Top-Right) -> Right Upper Branch */}
                <path
                  d="M 480 180 L 384 180 L 318 224"
                  stroke={isLampOn ? "#f43f5e" : "#3f3f46"}
                  strokeWidth={isLampOn ? 1.5 : 1}
                  strokeOpacity={isLampOn ? 0.85 : 0.25}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter={isLampOn ? "url(#telemetry-glow)" : undefined}
                  className="transition-colors duration-500"
                />
                <circle
                  cx="318"
                  cy="224"
                  r="7"
                  stroke={isLampOn ? "#f43f5e" : "#52525b"}
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  strokeOpacity={isLampOn ? 0.7 : 0.2}
                  className="transition-colors duration-500"
                />

                {/* Node 4 Guide Line: Mimari & Deploy (Bottom-Right) -> Right Lower Branch */}
                <path
                  d="M 480 351 L 412 351 L 338 266"
                  stroke={isLampOn ? "#f43f5e" : "#3f3f46"}
                  strokeWidth={isLampOn ? 1.5 : 1}
                  strokeOpacity={isLampOn ? 0.85 : 0.25}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter={isLampOn ? "url(#telemetry-glow)" : undefined}
                  className="transition-colors duration-500"
                />
                <circle
                  cx="338"
                  cy="266"
                  r="7"
                  stroke={isLampOn ? "#f43f5e" : "#52525b"}
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  strokeOpacity={isLampOn ? 0.7 : 0.2}
                  className="transition-colors duration-500"
                />
              </svg>

              {/* Branch Terminal Radar Nodes with Active Pulse */}
              <div
                className="pointer-events-none absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
                style={{ left: "31.3%", top: "34.2%" }}
                aria-hidden="true"
              >
                <div className="relative flex items-center justify-center">
                  {isLampOn && (
                    <span className="absolute h-6 w-6 animate-ping rounded-full bg-rose-500/40" />
                  )}
                  <span
                    className={`h-2.5 w-2.5 rounded-full transition-colors duration-500 ${isLampOn ? "bg-rose-400 shadow-[0_0_10px_#f43f5e]" : "bg-zinc-700"
                      }`}
                  />
                  <span
                    className={`absolute h-1 w-1 rounded-full ${isLampOn ? "bg-white" : "bg-zinc-500"
                      }`}
                  />
                </div>
              </div>

              <div
                className="pointer-events-none absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
                style={{ left: "25.6%", top: "43.2%" }}
                aria-hidden="true"
              >
                <div className="relative flex items-center justify-center">
                  {isLampOn && (
                    <span className="absolute h-6 w-6 animate-ping rounded-full bg-rose-500/40" />
                  )}
                  <span
                    className={`h-2.5 w-2.5 rounded-full transition-colors duration-500 ${isLampOn ? "bg-rose-400 shadow-[0_0_10px_#f43f5e]" : "bg-zinc-700"
                      }`}
                  />
                  <span
                    className={`absolute h-1 w-1 rounded-full ${isLampOn ? "bg-white" : "bg-zinc-500"
                      }`}
                  />
                </div>
              </div>

              <div
                className="pointer-events-none absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
                style={{ left: "69.1%", top: "36.5%" }}
                aria-hidden="true"
              >
                <div className="relative flex items-center justify-center">
                  {isLampOn && (
                    <span className="absolute h-6 w-6 animate-ping rounded-full bg-rose-500/40" />
                  )}
                  <span
                    className={`h-2.5 w-2.5 rounded-full transition-colors duration-500 ${isLampOn ? "bg-rose-400 shadow-[0_0_10px_#f43f5e]" : "bg-zinc-700"
                      }`}
                  />
                  <span
                    className={`absolute h-1 w-1 rounded-full ${isLampOn ? "bg-white" : "bg-zinc-500"
                      }`}
                  />
                </div>
              </div>

              <div
                className="pointer-events-none absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
                style={{ left: "73.5%", top: "43.4%" }}
                aria-hidden="true"
              >
                <div className="relative flex items-center justify-center">
                  {isLampOn && (
                    <span className="absolute h-6 w-6 animate-ping rounded-full bg-rose-500/40" />
                  )}
                  <span
                    className={`h-2.5 w-2.5 rounded-full transition-colors duration-500 ${isLampOn ? "bg-rose-400 shadow-[0_0_10px_#f43f5e]" : "bg-zinc-700"
                      }`}
                  />
                  <span
                    className={`absolute h-1 w-1 rounded-full ${isLampOn ? "bg-white" : "bg-zinc-500"
                      }`}
                  />
                </div>
              </div>

              {/* Desktop Floating Navigation Pills (hidden on mobile/tablets < 1024px to prevent overlap) */}
              {/* 1. MÜFREDAT (Top-Left) */}
              <div className="absolute top-[25%] right-[calc(100%+20px)] z-20 hidden w-[190px] lg:block xl:w-[210px]">
                <a
                  href="#mufredat"
                  className="group relative flex min-h-[48px] items-center gap-3 rounded-xl border border-zinc-800/90 bg-black/85 px-3.5 py-2.5 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-rose-500 hover:bg-zinc-950 hover:shadow-[0_0_20px_rgba(225,29,72,0.35)]"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-rose-500/40 bg-rose-950/40 text-rose-400 group-hover:scale-110">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-xs font-bold tracking-wider whitespace-nowrap text-white group-hover:text-rose-300">
                      MÜFREDAT
                    </span>
                    <span className="text-[10px] whitespace-nowrap text-zinc-400">
                      Sistem & AI Müfredatı
                    </span>
                  </div>
                  {/* Telemetry terminal notch on inner edge */}
                  <div
                    className={`absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rounded-full border transition-all duration-500 group-hover:scale-125 ${isLampOn
                        ? "border-rose-400 bg-rose-500 shadow-[0_0_6px_#f43f5e] group-hover:border-rose-300 group-hover:shadow-[0_0_10px_#f43f5e]"
                        : "border-zinc-700 bg-zinc-800"
                      }`}
                    aria-hidden="true"
                  />
                </a>
              </div>

              {/* 2. AI AJANLARI (Bottom-Left) */}
              <div className="absolute top-[53%] right-[calc(100%+20px)] z-20 hidden w-[190px] lg:block xl:w-[210px]">
                <a
                  href="#query"
                  className="group relative flex min-h-[48px] items-center gap-3 rounded-xl border border-zinc-800/90 bg-black/85 px-3.5 py-2.5 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-rose-500 hover:bg-zinc-950 hover:shadow-[0_0_20px_rgba(225,29,72,0.35)]"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-rose-500/40 bg-rose-950/40 text-rose-400 group-hover:scale-110">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-xs font-bold tracking-wider whitespace-nowrap text-white group-hover:text-rose-300">
                      AI AJANLARI
                    </span>
                    <span className="text-[10px] whitespace-nowrap text-zinc-400">
                      Otonom Sistemler
                    </span>
                  </div>
                  {/* Telemetry terminal notch on inner edge */}
                  <div
                    className={`absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rounded-full border transition-all duration-500 group-hover:scale-125 ${isLampOn
                        ? "border-rose-400 bg-rose-500 shadow-[0_0_6px_#f43f5e] group-hover:border-rose-300 group-hover:shadow-[0_0_10px_#f43f5e]"
                        : "border-zinc-700 bg-zinc-800"
                      }`}
                    aria-hidden="true"
                  />
                </a>
              </div>

              {/* 3. HEDEFLER (Top-Right) */}
              <div className="absolute top-[25%] left-[calc(100%+20px)] z-20 hidden w-[190px] lg:block xl:w-[210px]">
                <a
                  href="#hedefler"
                  className="group relative flex min-h-[48px] items-center gap-3 rounded-xl border border-zinc-800/90 bg-black/85 px-3.5 py-2.5 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-rose-500 hover:bg-zinc-950 hover:shadow-[0_0_20px_rgba(225,29,72,0.35)]"
                >
                  {/* Telemetry terminal notch on inner edge */}
                  <div
                    className={`absolute top-1/2 -left-1 h-2 w-2 -translate-y-1/2 rounded-full border transition-all duration-500 group-hover:scale-125 ${isLampOn
                        ? "border-rose-400 bg-rose-500 shadow-[0_0_6px_#f43f5e] group-hover:border-rose-300 group-hover:shadow-[0_0_10px_#f43f5e]"
                        : "border-zinc-700 bg-zinc-800"
                      }`}
                    aria-hidden="true"
                  />
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-rose-500/40 bg-rose-950/40 text-rose-400 group-hover:scale-110">
                    <Target className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-xs font-bold tracking-wider whitespace-nowrap text-white group-hover:text-rose-300">
                      HEDEFLER
                    </span>
                    <span className="text-[10px] whitespace-nowrap text-zinc-400">
                      Kariyer & Çıktılar
                    </span>
                  </div>
                </a>
              </div>

              {/* 4. MİMARİ & DEPLOY (Bottom-Right) */}
              <div className="absolute top-[53%] left-[calc(100%+20px)] z-20 hidden w-[190px] lg:block xl:w-[210px]">
                <a
                  href="#dokploy"
                  className="group relative flex min-h-[48px] items-center gap-3 rounded-xl border border-zinc-800/90 bg-black/85 px-3.5 py-2.5 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-rose-500 hover:bg-zinc-950 hover:shadow-[0_0_20px_rgba(225,29,72,0.35)]"
                >
                  {/* Telemetry terminal notch on inner edge */}
                  <div
                    className={`absolute top-1/2 -left-1 h-2 w-2 -translate-y-1/2 rounded-full border transition-all duration-500 group-hover:scale-125 ${isLampOn
                        ? "border-rose-400 bg-rose-500 shadow-[0_0_6px_#f43f5e] group-hover:border-rose-300 group-hover:shadow-[0_0_10px_#f43f5e]"
                        : "border-zinc-700 bg-zinc-800"
                      }`}
                    aria-hidden="true"
                  />
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-rose-500/40 bg-rose-950/40 text-rose-400 group-hover:scale-110">
                    <Server className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-xs font-bold tracking-wider whitespace-nowrap text-white group-hover:text-rose-300">
                      MİMARİ & DEPLOY
                    </span>
                    <span className="text-[10px] whitespace-nowrap text-zinc-400">
                      Dokploy & Bun
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Lamp Toggle Button Styled After Specification (.button) */}
          <button
            type="button"
            onClick={toggleLamp}
            className="button lamp-toggle-btn group"
            aria-label={isLampOn ? "Aydınlatmayı Kapat" : "Aydınlatmayı Aç"}
          >
            {isLampOn ? (
              <>
                <Lightbulb className="h-4 w-4 text-amber-300 transition-transform group-hover:scale-110" />
                <span>Aydınlatma: Açık (Kapat)</span>
              </>
            ) : (
              <>
                <LightbulbOff className="h-4 w-4 text-zinc-400 transition-transform group-hover:scale-110" />
                <span>Aydınlatma: Kapalı (Aç)</span>
              </>
            )}
          </button>
        </div>

        {/* Interaction Helper Hint */}
        <p className="mt-4 text-center font-mono text-[11px] text-zinc-500">
          * Lambaya veya butona tıklayarak ağaç aydınlatmasını kontrol edebilirsiniz.
        </p>

        {/* Mobile & Tablet Navigation Grid (Clean 2-column grid on tablets, 1-col on mobile, hidden on lg+) */}
        <div className="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
          {navBoxes.map((box) => {
            const Icon = box.icon;
            return (
              <a
                key={box.id}
                href={box.href}
                className="flex min-h-[48px] items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-md transition-all hover:border-rose-500 hover:bg-zinc-900 active:scale-95"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-rose-500/40 bg-rose-950/40 text-rose-400">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-mono text-xs font-bold tracking-wider text-white">
                    {box.label}
                  </span>
                  <span className="text-[11px] text-zinc-400">{box.subtitle}</span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom Metadata Bar Matching Reference Aesthetic */}
        <div className="mt-14 flex w-full flex-col items-center justify-between gap-2 border-t border-zinc-900 pt-6 font-mono text-[11px] text-zinc-500 sm:flex-row">
          <span>/MİMARİ [ NEXT.JS 16 • BUN • PWA ]</span>
          <span className="hidden sm:inline">/</span>
          <span>/DİJİTAL SİSTEMLER [ JETACADEMIE ]</span>
        </div>
      </div>
    </div>
  );
}
