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
        {/* Risale-i Nur Deep Crimson Leather Background */}
        <linearGradient id="logoBg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#140205" />
          <stop offset="35%" stopColor="#2d030c" />
          <stop offset="70%" stopColor="#4c0519" />
          <stop offset="100%" stopColor="#1e0207" />
        </linearGradient>

        {/* Risale-i Nur Imperial Crimson Cap Facets */}
        <linearGradient
          id="capRubyLeft"
          x1="64"
          y1="120"
          x2="256"
          y2="310"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#e11d48" />
          <stop offset="45%" stopColor="#9f1239" />
          <stop offset="100%" stopColor="#4c0519" />
        </linearGradient>

        <linearGradient
          id="capRubyRight"
          x1="448"
          y1="120"
          x2="256"
          y2="310"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#be123c" />
          <stop offset="50%" stopColor="#881337" />
          <stop offset="100%" stopColor="#280208" />
        </linearGradient>

        {/* 24K Gold Gilding Gradient (Risale-i Nur Altın Varak) */}
        <linearGradient
          id="logoGold"
          x1="120"
          y1="80"
          x2="420"
          y2="440"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="25%" stopColor="#facc15" />
          <stop offset="60%" stopColor="#eab308" />
          <stop offset="85%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#854d0e" />
        </linearGradient>

        {/* Jet Aerodynamic Fuselage & Wing Metals */}
        <linearGradient
          id="jetLeft"
          x1="256"
          y1="36"
          x2="140"
          y2="280"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#f8fafc" />
          <stop offset="80%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>

        <linearGradient
          id="jetRight"
          x1="256"
          y1="36"
          x2="372"
          y2="280"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="40%" stopColor="#e2e8f0" />
          <stop offset="80%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>

        {/* Supersonic Canopy Glass (Azure Tint) */}
        <linearGradient
          id="canopyGlass"
          x1="256"
          y1="84"
          x2="256"
          y2="158"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="40%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#082f49" />
        </linearGradient>

        {/* Mach Rocket Exhaust Plume */}
        <linearGradient
          id="afterburnerFlame"
          x1="256"
          y1="272"
          x2="256"
          y2="408"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#fef08a" />
          <stop offset="60%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>

        {/* Gold Glow Filter */}
        <filter id="logoGoldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Risale-i Nur Burgundy Leather App Icon Frame */}
      <rect width="512" height="512" rx="116" fill="url(#logoBg)" />

      {/* Outer & Inner Gold Filigree Borders */}
      <rect
        width="512"
        height="512"
        rx="116"
        stroke="url(#logoGold)"
        strokeWidth="2.5"
        opacity="0.75"
      />
      <rect
        x="12"
        y="12"
        width="488"
        height="488"
        rx="104"
        stroke="rgba(250,204,21,0.2)"
        strokeWidth="1"
      />

      {/* Celestial Horizon Grid / Orbit */}
      <circle
        cx="256"
        cy="256"
        r="202"
        stroke="rgba(251,191,36,0.14)"
        strokeWidth="1.5"
        strokeDasharray="6 10"
      />

      <g transform="translate(0, 10)">
        {/* 1. ACADEMIC MORTARBOARD CAP (BURGUNDY DIAMOND WITH GOLD EDGES) */}
        <path d="M 256,120 L 64,222 L 256,310 Z" fill="url(#capRubyLeft)" />
        <path d="M 256,120 L 448,222 L 256,310 Z" fill="url(#capRubyRight)" />

        {/* Gold Filigree Trim on Cap Perimeter */}
        <path
          d="M 256,120 L 64,222 L 256,310 L 448,222 Z"
          fill="none"
          stroke="url(#logoGold)"
          strokeWidth="3.5"
        />
        <line
          x1="256"
          y1="120"
          x2="256"
          y2="310"
          stroke="url(#logoGold)"
          strokeWidth="1.5"
          opacity="0.5"
        />

        {/* 2. FLOWING GOLD TASSEL */}
        <path
          d="M 256,150 C 330,165 386,198 390,256 C 392,292 384,324 380,350"
          fill="none"
          stroke="url(#logoGold)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Golden Tassel Mount & Fringe */}
        <circle cx="380" cy="348" r="5" fill="#fef08a" />
        <path
          d="M 380,344 L 392,382 L 380,375 L 368,382 Z"
          fill="url(#logoGold)"
          filter="url(#logoGoldGlow)"
        />
        <line x1="380" y1="350" x2="380" y2="372" stroke="#854d0e" strokeWidth="1.2" />

        {/* 3. JET AFTERBURNER PROPULSION PLUME */}
        <path d="M 244,272 L 256,408 L 268,272 Z" fill="url(#afterburnerFlame)" />
        <path d="M 248,272 L 256,350 L 264,272 Z" fill="#ffffff" />

        {/* 4. AUTHENTIC SUPERSONIC FIGHTER JET */}
        {/* Jet Main Delta Wings */}
        <path d="M 256,166 L 122,252 L 146,276 L 244,242 Z" fill="url(#jetLeft)" />
        <line x1="256" y1="166" x2="122" y2="252" stroke="#ffffff" strokeWidth="1.5" />

        <path d="M 256,166 L 390,252 L 366,276 L 268,242 Z" fill="url(#jetRight)" />
        <line x1="256" y1="166" x2="390" y2="252" stroke="#cbd5e1" strokeWidth="1.5" />

        {/* Twin Vertical Stabilizers */}
        <path d="M 238,216 L 220,280 L 244,272 Z" fill="#64748b" />
        <line x1="220" y1="280" x2="238" y2="216" stroke="url(#logoGold)" strokeWidth="1.5" />

        <path d="M 274,216 L 292,280 L 268,272 Z" fill="#94a3b8" />
        <line x1="292" y1="280" x2="274" y2="216" stroke="url(#logoGold)" strokeWidth="1.5" />

        {/* Main Supersonic Fuselage */}
        <path d="M 256,38 L 236,170 L 244,276 L 256,272 Z" fill="url(#jetLeft)" />
        <path d="M 256,38 L 276,170 L 268,276 L 256,272 Z" fill="url(#jetRight)" />
        <line x1="256" y1="38" x2="256" y2="272" stroke="#ffffff" strokeWidth="1.5" />

        {/* Fighter Cockpit Canopy */}
        <path
          d="M 256,84 C 265,106 266,138 256,158 C 246,138 247,106 256,84 Z"
          fill="url(#canopyGlass)"
        />
        <ellipse cx="254" cy="116" rx="2.5" ry="14" fill="#ffffff" opacity="0.8" />
        <circle cx="256" cy="88" r="2" fill="#ffffff" />

        {/* Pitot Spear / Supersonic Nose Tip */}
        <line
          x1="256"
          y1="38"
          x2="256"
          y2="22"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* 5. RISALE-I NUR PRESTIGE GOLD CHEVRON / OPEN BOOK FOUNDATION */}
        <path
          d="M 256,368 L 152,320 L 168,294 L 256,336 L 344,294 L 360,320 Z"
          fill="url(#logoGold)"
          filter="url(#logoGoldGlow)"
        />
        <line x1="168" y1="312" x2="256" y2="352" stroke="#854d0e" strokeWidth="1.5" />
        <line x1="344" y1="312" x2="256" y2="352" stroke="#854d0e" strokeWidth="1.5" />
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
            className={`font-black tracking-tight ${titleSizes[size]} bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 bg-clip-text text-transparent dark:from-red-500 dark:via-rose-400 dark:to-amber-300`}
          >
            Jet
          </span>
          <span
            className={`font-black tracking-tight ${titleSizes[size]} text-zinc-900 dark:text-zinc-100`}
          >
            Academie
          </span>
        </div>
        {showTagline && (
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
              PWA Mobile-First
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          </div>
        )}
      </div>
    </div>
  );
}
