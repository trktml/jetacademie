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
        {/* Deep Matte Obsidian Canvas */}
        <linearGradient
          id="logoBg"
          x1="256"
          y1="0"
          x2="256"
          y2="512"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#12151c" />
          <stop offset="100%" stopColor="#08090d" />
        </linearGradient>

        {/* Subtle Matte Precision Hairline Border */}
        <linearGradient
          id="logoBorder"
          x1="0"
          y1="0"
          x2="512"
          y2="512"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#334155" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1e293b" stopOpacity="0.15" />
        </linearGradient>

        {/* Supersonic Delta Wing - Titanium Light (Left) */}
        <linearGradient
          id="jetLeft"
          x1="170"
          y1="84"
          x2="252"
          y2="230"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>

        {/* Supersonic Delta Wing - Titanium Shadow (Right) */}
        <linearGradient
          id="jetRight"
          x1="342"
          y1="84"
          x2="260"
          y2="230"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>

        {/* Academic Mortarboard Crest - Matte Bordeaux Light (Left) */}
        <linearGradient
          id="acadLeft"
          x1="170"
          y1="216"
          x2="252"
          y2="408"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#9f1239" />
          <stop offset="60%" stopColor="#881337" />
          <stop offset="100%" stopColor="#4c0519" />
        </linearGradient>

        {/* Academic Mortarboard Crest - Matte Bordeaux Deep (Right) */}
        <linearGradient
          id="acadRight"
          x1="342"
          y1="216"
          x2="260"
          y2="408"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#881337" />
          <stop offset="60%" stopColor="#4c0519" />
          <stop offset="100%" stopColor="#2c030e" />
        </linearGradient>

        {/* Soft Ambient Matte Aura */}
        <radialGradient id="ambientGlow" cx="256" cy="256" r="220" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9f1239" stopOpacity="0.12" />
          <stop offset="60%" stopColor="#9f1239" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Deep Matte Obsidian Canvas */}
      <rect width="512" height="512" rx="116" fill="url(#logoBg)" />
      <rect width="512" height="512" rx="116" fill="url(#ambientGlow)" />
      <rect
        x="1"
        y="1"
        width="510"
        height="510"
        rx="115"
        stroke="url(#logoBorder)"
        strokeWidth="1.5"
      />

      {/* Unified Supersonic Jet & Academic Mortarboard Mark */}
      <g id="jetMark" transform="translate(0, 10)">
        {/* 1. JET: Aerodynamic Mach Delta Wings (Supersonic Titanium Facets) */}
        <path d="M 252,80 L 96,252 L 252,198 Z" fill="url(#jetLeft)" />
        <path d="M 260,80 L 416,252 L 260,198 Z" fill="url(#jetRight)" />

        {/* 2. ACADEMIE: Foundation Mortarboard Diamond / Knowledge Crest (Matte Bordeaux) */}
        <path d="M 252,224 L 116,274 L 252,410 Z" fill="url(#acadLeft)" />
        <path d="M 260,224 L 396,274 L 260,410 Z" fill="url(#acadRight)" />

        {/* 3. Wing Leading Edge Sheen (Matte Precision Refraction Lines) */}
        <line
          x1="252"
          y1="80"
          x2="96"
          y2="252"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeOpacity="0.75"
          strokeLinecap="round"
        />
        <line
          x1="260"
          y1="80"
          x2="416"
          y2="252"
          stroke="#ffffff"
          strokeWidth="1"
          strokeOpacity="0.35"
          strokeLinecap="round"
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
      <div className="shrink-0 transition-transform duration-200 group-hover:scale-105">
        <JetLogoIcon className={`${iconSizes[size]} drop-shadow-sm`} />
      </div>
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span
            className={`font-black tracking-tight ${titleSizes[size]} text-[#881337] transition-colors dark:text-[#e05666]`}
          >
            Jet
          </span>
          <span
            className={`font-bold tracking-tight ${titleSizes[size]} text-zinc-900 transition-colors dark:text-zinc-100`}
          >
            Academie
          </span>
        </div>
        {showTagline && (
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
              PWA Mobile-First
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#881337] dark:bg-[#d64555]" />
          </div>
        )}
      </div>
    </div>
  );
}
