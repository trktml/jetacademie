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

        {/* Academic Mortarboard Top - Matte Bordeaux Light (Left) */}
        <linearGradient
          id="acadLeft"
          x1="180"
          y1="210"
          x2="256"
          y2="306"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#b91c1c" />
          <stop offset="45%" stopColor="#9f1239" />
          <stop offset="100%" stopColor="#881337" />
        </linearGradient>

        {/* Academic Mortarboard Top - Matte Bordeaux Deep (Right) */}
        <linearGradient
          id="acadRight"
          x1="332"
          y1="210"
          x2="256"
          y2="306"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#881337" />
          <stop offset="55%" stopColor="#6b0d2b" />
          <stop offset="100%" stopColor="#4c0519" />
        </linearGradient>

        {/* Academic Mortarboard Rim - Matte Bordeaux Rim Left */}
        <linearGradient
          id="acadRimLeft"
          x1="108"
          y1="258"
          x2="256"
          y2="316"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#9f1239" />
          <stop offset="100%" stopColor="#5a081f" />
        </linearGradient>

        {/* Academic Mortarboard Rim - Matte Bordeaux Rim Right */}
        <linearGradient
          id="acadRimRight"
          x1="404"
          y1="258"
          x2="256"
          y2="316"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#5a081f" />
          <stop offset="100%" stopColor="#2c030e" />
        </linearGradient>

        {/* Academic Skullcap Base - Light Facet (Left) */}
        <linearGradient
          id="capLeft"
          x1="174"
          y1="270"
          x2="256"
          y2="368"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#9f1239" />
          <stop offset="50%" stopColor="#700b25" />
          <stop offset="100%" stopColor="#3b0514" />
        </linearGradient>

        {/* Academic Skullcap Base - Deep Facet (Right) */}
        <linearGradient
          id="capRight"
          x1="338"
          y1="270"
          x2="256"
          y2="368"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#6b0d2b" />
          <stop offset="50%" stopColor="#4c0519" />
          <stop offset="100%" stopColor="#22030b" />
        </linearGradient>

        {/* Academic Skullcap Brow Band - Left */}
        <linearGradient
          id="capBandLeft"
          x1="174"
          y1="336"
          x2="256"
          y2="368"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#9f1239" />
          <stop offset="100%" stopColor="#4c0519" />
        </linearGradient>

        {/* Academic Skullcap Brow Band - Right */}
        <linearGradient
          id="capBandRight"
          x1="338"
          y1="336"
          x2="256"
          y2="368"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#4c0519" />
          <stop offset="100%" stopColor="#22030b" />
        </linearGradient>

        {/* Academic Tassel - Titanium Silver/Platinum Gradient */}
        <linearGradient
          id="tasselGrad"
          x1="256"
          y1="258"
          x2="416"
          y2="360"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>

        {/* Soft Ambient Matte Aura */}
        <radialGradient id="ambientGlow" cx="256" cy="256" r="220" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9f1239" stopOpacity="0.16" />
          <stop offset="60%" stopColor="#9f1239" stopOpacity="0.03" />
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

        {/* 2. ACADEMIE: Skullcap Base (Recessed Under Board, Faceted Academic Coif & Brow Band) */}
        <path d="M 174,272 L 256,260 L 256,346 L 178,328 Z" fill="url(#capLeft)" />
        <path d="M 338,272 L 256,260 L 256,346 L 334,328 Z" fill="url(#capRight)" />
        <path d="M 178,328 L 256,346 L 256,366 L 182,344 Z" fill="url(#capBandLeft)" />
        <path d="M 334,328 L 256,346 L 256,366 L 330,344 Z" fill="url(#capBandRight)" />
        <line
          x1="182"
          y1="344"
          x2="256"
          y2="366"
          stroke="#ffffff"
          strokeWidth="0.75"
          strokeOpacity="0.25"
          strokeLinecap="round"
        />
        <line
          x1="330"
          y1="344"
          x2="256"
          y2="366"
          stroke="#ffffff"
          strokeWidth="0.5"
          strokeOpacity="0.1"
          strokeLinecap="round"
        />

        {/* 3. ACADEMIE: Mortarboard Board Rim (Front 3D Thickness) */}
        <path d="M 108,258 L 256,306 L 256,316 L 108,268 Z" fill="url(#acadRimLeft)" />
        <path d="M 404,258 L 256,306 L 256,316 L 404,268 Z" fill="url(#acadRimRight)" />

        {/* 4. ACADEMIE: Mortarboard Board Top (Perspective Rhombus) */}
        <path d="M 256,210 L 108,258 L 256,306 Z" fill="url(#acadLeft)" />
        <path d="M 256,210 L 404,258 L 256,306 Z" fill="url(#acadRight)" />
        <line
          x1="256"
          y1="210"
          x2="108"
          y2="258"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeOpacity="0.45"
          strokeLinecap="round"
        />

        {/* 5. ACADEMIE: Academic Tassel (Püskül) */}
        <circle cx="256" cy="258" r="5.5" fill="#f8fafc" stroke="#475569" strokeWidth="0.8" />
        <circle cx="256" cy="258" r="2.2" fill="#cbd5e1" />
        <path
          d="M 256,258 C 298,268 350,274 388,270 C 398,269 406,274 406,284 L 406,318"
          fill="none"
          stroke="url(#tasselGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <rect
          x="401"
          y="318"
          width="10"
          height="4"
          rx="1.5"
          fill="#f8fafc"
          stroke="#64748b"
          strokeWidth="0.75"
        />
        <polygon points="402,322 410,322 415,364 397,364" fill="url(#tasselGrad)" />
        <line
          x1="406"
          y1="322"
          x2="406"
          y2="362"
          stroke="#ffffff"
          strokeWidth="1"
          strokeOpacity="0.8"
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
    <div className={`jet-logo jet-logo--${size}`}>
      <div className="jet-logo__icon-shell">
        <JetLogoIcon className={`${iconSizes[size]} drop-shadow-sm`} />
      </div>
      <div className="jet-logo__copy">
        <div className="jet-logo__wordmark">
          <span
            className={`jet-logo__jet font-black tracking-tight ${titleSizes[size]} transition-colors`}
          >
            Jet
          </span>
          <span
            className={`jet-logo__name font-bold tracking-tight ${titleSizes[size]} transition-colors`}
          >
            Academie
          </span>
        </div>
        {showTagline && (
          <div className="jet-logo__tagline-row">
            <span className="jet-logo__dot" aria-hidden="true" />
            <span className="jet-logo__tagline">İlim · Hedef · İstikrar</span>
          </div>
        )}
      </div>
    </div>
  );
}
