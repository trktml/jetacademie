"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BellLamp } from "@/components/bell-lamp";
import { curriculumModules } from "@/lib/curriculum-data";
import { motion, AnimatePresence } from "motion/react";

export function HeroTree() {
  const [isLampOn, setIsLampOn] = useState(true);
  const toggleLamp = () => setIsLampOn((prev) => !prev);

  /* The first 4 modules positioned around the tree on desktop */
  const positioned = curriculumModules.slice(0, 4);
  /* Desktop pill positions: [top-left, bottom-left, top-right, bottom-right] */
  const positions = [
    { side: "left" as const, top: "calc(29.35% - 22px)" },
    { side: "left" as const, top: "calc(57.23% - 22px)" },
    { side: "right" as const, top: "calc(29.35% - 22px)" },
    { side: "right" as const, top: "calc(57.23% - 22px)" },
  ];

  return (
    <div
      className={`bell-scene relative w-full overflow-hidden bg-black text-white transition-colors duration-700 ${
        !isLampOn ? "is-off" : ""
      }`}
    >
      {/* Noise Grain Overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Atmospheric Glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(136,19,55,0.18),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_45%,transparent_28%,#000_55%,transparent_100%)] bg-[size:4rem_4rem]"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pt-3 pb-4 sm:px-6 sm:pt-4 sm:pb-6 lg:px-8">
        {/* Accessible Brand Heading for SEO & Screen Readers */}
        <h1 className="sr-only">Jet Academie — Manevi Gelişim ve İslami İlimler Müfredatı</h1>

        {/* Tree & Lamp Stage — Balanced & Harmonious */}
        <div className="hero-stage-wrap mx-auto mt-1 w-full max-w-xl sm:max-w-2xl lg:max-w-4xl">
          <BellLamp isOn={isLampOn} onToggle={toggleLamp} />

          {/* Soft Atmospheric Ambient Light from Lamp */}
          <div
            className={`pointer-events-none absolute top-[2em] left-1/2 z-12 -translate-x-1/2 transition-opacity duration-700 ${
              isLampOn ? "opacity-100" : "opacity-0"
            }`}
            style={{
              width: "min(560px, 90vw)",
              height: "440px",
              background:
                "radial-gradient(ellipse 60% 60% at 50% 10%, rgba(254, 240, 138, 0.18) 0%, rgba(251, 146, 60, 0.08) 35%, rgba(225, 29, 72, 0.03) 65%, transparent 85%)",
              filter: "blur(24px)",
            }}
            aria-hidden="true"
          />

          {/* Floating Dust Particles */}
          <AnimatePresence>
            {isLampOn && (
              <div
                className="pointer-events-none absolute inset-0 z-15 overflow-hidden"
                aria-hidden="true"
              >
                {[
                  { top: "32%", left: "48%", delay: 0 },
                  { top: "38%", left: "42%", delay: 0.8 },
                  { top: "35%", left: "56%", delay: 1.5 },
                  { top: "44%", left: "46%", delay: 0.4 },
                  { top: "40%", left: "53%", delay: 1.2 },
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

          {/* Crimson Tree Image — Transparent & Isolated */}
          <div className="hero-tree-wrap z-10 flex w-full items-center justify-center">
            <div className="relative aspect-[3/4] w-full">
              <div className="absolute inset-0">
                <Image
                  src="/red-tree.png"
                  alt="Jet Academie Kırmızı Ağaç"
                  fill
                  priority
                  sizes="(max-width: 640px) 340px, (max-width: 1024px) 460px, 560px"
                  className={`object-contain transition-all duration-700 ${
                    isLampOn
                      ? "brightness-[1.08] contrast-[1.06] drop-shadow-[0_0_45px_rgba(225,29,72,0.5)] saturate-[1.15]"
                      : "opacity-25 brightness-[0.3] contrast-[0.95] drop-shadow-none saturate-[0.3]"
                  }`}
                />
              </div>

              {/* Light Reflection Pool */}
              <div
                className={`pointer-events-none absolute bottom-[14%] left-1/2 h-12 w-3/4 -translate-x-1/2 rounded-[100%] transition-opacity duration-700 ${
                  isLampOn ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background:
                    "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(254, 215, 170, 0.25) 0%, rgba(225, 29, 72, 0.15) 50%, transparent 70%)",
                  filter: "blur(6px)",
                }}
                aria-hidden="true"
              />

              {/* SVG Telemetry Connectors (Desktop Only) */}
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
                {/* Top-Left connector */}
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
                {/* Bottom-Left connector */}
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
                {/* Top-Right connector */}
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
                {/* Bottom-Right connector */}
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

              {/* Branch Terminal Radar Nodes */}
              {[
                { left: "31.3%", top: "34.2%" },
                { left: "25.6%", top: "43.2%" },
                { left: "69.1%", top: "36.5%" },
                { left: "73.5%", top: "43.4%" },
              ].map((pos, idx) => (
                <div
                  key={idx}
                  className="pointer-events-none absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
                  style={pos}
                  aria-hidden="true"
                >
                  <div className="relative flex items-center justify-center">
                    {isLampOn && (
                      <span className="absolute h-6 w-6 animate-ping rounded-full bg-rose-500/40" />
                    )}
                    <span
                      className={`h-2.5 w-2.5 rounded-full transition-colors duration-500 ${
                        isLampOn ? "bg-rose-400 shadow-[0_0_10px_#f43f5e]" : "bg-zinc-700"
                      }`}
                    />
                    <span
                      className={`absolute h-1 w-1 rounded-full ${
                        isLampOn ? "bg-white" : "bg-zinc-500"
                      }`}
                    />
                  </div>
                </div>
              ))}

              {/* Desktop Floating Navigation Pills (4 modules around tree) */}
              {positioned.map((mod, idx) => {
                const Icon = mod.icon;
                const pos = positions[idx];
                const isLeft = pos.side === "left";
                return (
                  <div
                    key={mod.id}
                    className={`absolute z-20 hidden w-[170px] lg:block xl:w-[190px] ${
                      isLeft ? "right-[calc(100%+16px)]" : "left-[calc(100%+16px)]"
                    }`}
                    style={{ top: pos.top }}
                  >
                    <Link
                      href={`/mufredat/${mod.slug}`}
                      prefetch={true}
                      className="group relative flex min-h-[44px] items-center gap-2.5 rounded-lg border border-zinc-800/90 bg-black/85 px-3 py-2 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-rose-500 hover:bg-zinc-950 hover:shadow-[0_0_20px_rgba(225,29,72,0.35)]"
                    >
                      {/* Telemetry notch */}
                      <div
                        className={`absolute top-1/2 ${isLeft ? "-right-1" : "-left-1"} h-2 w-2 -translate-y-1/2 rounded-full border transition-all duration-500 group-hover:scale-125 ${
                          isLampOn
                            ? "border-rose-400 bg-rose-500 shadow-[0_0_6px_#f43f5e] group-hover:border-rose-300 group-hover:shadow-[0_0_10px_#f43f5e]"
                            : "border-zinc-700 bg-zinc-800"
                        }`}
                        aria-hidden="true"
                      />
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-rose-500/40 bg-rose-950/40 text-rose-400 group-hover:scale-110">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[10px] font-bold tracking-wider whitespace-nowrap text-white group-hover:text-rose-300">
                          {mod.title.split("—")[0].trim()}
                        </span>
                        <span className="text-[9px] whitespace-nowrap text-zinc-400">
                          {mod.subtitle}
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Navigation Grid (all 6 modules) */}
        <div className="mt-4 grid w-full max-w-md grid-cols-2 gap-2 sm:max-w-lg sm:gap-2.5 lg:hidden">
          {curriculumModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.id}
                href={`/mufredat/${mod.slug}`}
                prefetch={true}
                className="flex min-h-[44px] items-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-950/80 px-3 py-2 backdrop-blur-md transition-all hover:border-rose-500 hover:bg-zinc-900 active:scale-95"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-rose-500/40 bg-rose-950/40 text-rose-400">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold tracking-wider text-white">
                    {mod.title.split("—")[0].trim()}
                  </span>
                  <span className="text-[9px] text-zinc-400">{mod.subtitle}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
