import type { SVGProps } from "react";

export function JetLogoIcon({ className = "h-8 w-8", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        {/* Background: Deep Space Obsidian with Navy Violet Undertone */}
        <linearGradient id="logoBg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#080c1d" />
          <stop offset="50%" stopColor="#0e132c" />
          <stop offset="100%" stopColor="#151134" />
        </linearGradient>

        {/* Radial Core Speed Glow */}
        <radialGradient id="logoGlow" cx="256" cy="240" r="230" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
          <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* Left Mortarboard Wing: Electric Sky to Royal Indigo */}
        <linearGradient
          id="capLeft"
          x1="72"
          y1="120"
          x2="246"
          y2="340"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#3730a3" />
        </linearGradient>

        {/* Right Mortarboard Wing: Royal Indigo to Deep Violet */}
        <linearGradient
          id="capRight"
          x1="266"
          y1="120"
          x2="440"
          y2="340"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#2e1065" />
        </linearGradient>

        {/* Central Ascending Supersonic Jet Interceptor */}
        <linearGradient
          id="jetCore"
          x1="256"
          y1="52"
          x2="256"
          y2="340"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#e0f2fe" />
          <stop offset="65%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>

        {/* Academic Foundation & Sonic Mach Chevron: 24k Prestige Gold */}
        <linearGradient
          id="tasselGold"
          x1="160"
          y1="330"
          x2="352"
          y2="410"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#fbbf24" />
          <stop offset="80%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* iOS / PWA Squircle Background */}
      <rect width="512" height="512" rx="116" fill="url(#logoBg)" />
      <rect width="512" height="512" rx="116" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="2" />
      <circle cx="256" cy="240" r="230" fill="url(#logoGlow)" />

      <g>
        {/* 1. Academic Foundation Chevron in 24k Gold (Open Knowledge Crest & Afterburner Flare) */}
        <path
          d="M 164,342 L 256,396 L 348,342 L 328,318 L 256,360 L 184,318 Z"
          fill="url(#tasselGold)"
        />

        {/* 2. Left Delta Mortarboard Wing (Aerodynamic Speed Facet) */}
        <path d="M 240,110 L 72,228 L 240,320 Z" fill="url(#capLeft)" />

        {/* 3. Right Delta Mortarboard Wing (Deep Aerospace Facet) */}
        <path d="M 272,110 L 440,228 L 272,320 Z" fill="url(#capRight)" />

        {/* 4. Ascending Supersonic Jet Interceptor (Forward Thrust Needle) */}
        <path
          d="M 256,52 L 278,146 L 306,204 L 270,200 L 256,310 L 242,200 L 206,204 L 234,146 Z"
          fill="url(#jetCore)"
        />
      </g>
    </svg>
  );
}

interface JetLogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

export function JetLogo({ size = "md", showTagline = true }: JetLogoProps) {
  const iconSizes = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-12 w-12",
  };

  const titleSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-center gap-2.5">
      <div className="shrink-0 transition-transform group-hover:scale-105">
        <JetLogoIcon className={`${iconSizes[size]} drop-shadow-md`} />
      </div>
      <div className="flex flex-col">
        <div className="flex items-baseline gap-0.5">
          <span
            className={`font-black tracking-tight ${titleSizes[size]} bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-sky-300 dark:to-indigo-300`}
          >
            Jet
          </span>
          <span
            className={`font-black tracking-tight ${titleSizes[size]} text-zinc-900 dark:text-white`}
          >
            Academie
          </span>
        </div>
        {showTagline && (
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
              PWA Mobile-First
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </div>
        )}
      </div>
    </div>
  );
}
