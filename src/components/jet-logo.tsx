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
        {/* Background Gradient */}
        <linearGradient id="logoBg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#070913" />
          <stop offset="45%" stopColor="#0d1127" />
          <stop offset="100%" stopColor="#181338" />
        </linearGradient>

        {/* Supersonic Jet Nosecone Flare */}
        <radialGradient id="logoNoseFlare" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="logoCoreFlare" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#60a5fa" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
        </radialGradient>

        {/* Jet Dart Facets (Speed & Tech) */}
        <linearGradient
          id="logoJetNoseLeft"
          x1="256"
          y1="40"
          x2="220"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>

        <linearGradient
          id="logoJetNoseRight"
          x1="256"
          y1="40"
          x2="292"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#c7d2fe" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>

        {/* Academic Cap Diamond (Mortarboard Delta Wings) */}
        <linearGradient
          id="logoCapWingLeft"
          x1="72"
          y1="160"
          x2="256"
          y2="280"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="35%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>

        <linearGradient
          id="logoCapWingRight"
          x1="440"
          y1="160"
          x2="256"
          y2="280"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="35%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#312e81" />
        </linearGradient>

        {/* Under-Cap Academic Band */}
        <linearGradient
          id="logoBandGrad"
          x1="204"
          y1="244"
          x2="308"
          y2="286"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="50%" stopColor="#312e81" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        {/* Open Book Pages (Wings of Wisdom) */}
        <linearGradient
          id="logoBookPageLeft"
          x1="70"
          y1="280"
          x2="256"
          y2="440"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#00f2fe" />
          <stop offset="55%" stopColor="#4facfe" />
          <stop offset="100%" stopColor="#4338ca" />
        </linearGradient>

        <linearGradient
          id="logoBookPageRight"
          x1="442"
          y1="280"
          x2="256"
          y2="440"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="55%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#3730a3" />
        </linearGradient>

        {/* Thrust Stream / Knowledge Spine */}
        <linearGradient
          id="logoSpineThrust"
          x1="256"
          y1="270"
          x2="256"
          y2="448"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="40%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>

        {/* Academic Golden Tassel */}
        <linearGradient
          id="logoTasselGold"
          x1="256"
          y1="170"
          x2="380"
          y2="340"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Outer Squircle Container with Subtle Border */}
      <rect width="512" height="512" rx="116" fill="url(#logoBg)" />
      <rect width="512" height="512" rx="116" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />

      {/* Orbital Rings */}
      <circle
        cx="256"
        cy="256"
        r="198"
        stroke="rgba(99,102,241,0.14)"
        strokeWidth="1.5"
        strokeDasharray="6 10"
      />
      <ellipse cx="256" cy="272" rx="216" ry="136" stroke="rgba(56,189,248,0.07)" strokeWidth="1" />

      <g transform="translate(0, 4)">
        {/* 1. BASE: THE OPEN BOOK OF KNOWLEDGE (LOWER WINGS) */}
        <path
          d="M 256,334 C 188,290 120,298 64,338 C 96,296 182,270 254,302 Z"
          fill="url(#logoBookPageLeft)"
        />
        <path
          d="M 256,334 C 324,290 392,298 448,338 C 416,296 330,270 258,302 Z"
          fill="url(#logoBookPageRight)"
        />

        <path
          d="M 256,366 C 196,326 134,334 82,370 C 112,332 186,308 254,336 Z"
          fill="url(#logoBookPageLeft)"
          opacity="0.45"
        />
        <path
          d="M 256,366 C 316,326 378,334 430,370 C 400,332 326,308 258,336 Z"
          fill="url(#logoBookPageRight)"
          opacity="0.45"
        />

        {/* Center Spine & Rocket Exhaust Plume */}
        <path d="M 252,304 L 256,442 L 260,304 Z" fill="url(#logoSpineThrust)" />

        {/* 2. UNDER-CAP ACADEMIC BAND */}
        <path
          d="M 204,244 L 308,244 L 292,286 L 220,286 Z"
          fill="url(#logoBandGrad)"
          stroke="#6366f1"
          strokeWidth="1.5"
        />
        <line
          x1="220"
          y1="265"
          x2="292"
          y2="265"
          stroke="#4338ca"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* 3. THE ACADEMIC GRADUATION CAP (MORTARBOARD DELTA PLANE) */}
        <path d="M 256,92 L 72,188 L 256,268 Z" fill="url(#logoCapWingLeft)" />
        <path d="M 256,92 L 440,188 L 256,268 Z" fill="url(#logoCapWingRight)" />
        <path d="M 256,92 L 256,268 L 268,262 L 256,92 Z" fill="#ffffff" opacity="0.2" />

        {/* 4. SUPERSONIC JET INTERCEPTOR (PIERCING THROUGH CAP) */}
        <circle cx="256" cy="46" r="38" fill="url(#logoNoseFlare)" />
        <path d="M 256,42 L 256,152 L 222,180 L 256,134 Z" fill="url(#logoJetNoseLeft)" />
        <path d="M 256,42 L 256,152 L 290,180 L 256,134 Z" fill="url(#logoJetNoseRight)" />
        <path d="M 256,36 L 265,82 L 256,74 L 247,82 Z" fill="#ffffff" />

        {/* Stealth Wing Canards */}
        <path
          d="M 256,134 L 334,188 L 282,192 L 256,166 L 230,192 L 178,188 Z"
          fill="#1e1b4b"
          stroke="#818cf8"
          strokeWidth="1.5"
        />
        <path d="M 256,134 L 256,166 L 282,192 L 334,188 Z" fill="#6366f1" />
        <path d="M 256,134 L 256,166 L 230,192 L 178,188 Z" fill="#38bdf8" />

        {/* 5. CENTER COCKPIT & BEACON OF KNOWLEDGE */}
        <circle cx="256" cy="170" r="28" fill="url(#logoCoreFlare)" />
        <circle cx="256" cy="170" r="14" fill="#ffffff" />
        <circle cx="256" cy="170" r="8" fill="#4f46e5" />
        <circle cx="254" cy="168" r="3" fill="#ffffff" />

        {/* 6. THE ACADEMIC TASSEL (GOLDEN FLIGHT TRAIL & PEN-NIB) */}
        <path
          d="M 256,170 C 344,178 372,212 372,266 C 372,300 366,328 366,346"
          fill="none"
          stroke="url(#logoTasselGold)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path d="M 366,340 L 376,374 L 366,368 L 356,374 Z" fill="#fbbf24" />
        <circle cx="366" cy="342" r="4.5" fill="#fef08a" />
        <line x1="366" y1="346" x2="366" y2="364" stroke="#78350f" strokeWidth="1.4" />

        {/* Speed Sparks */}
        <circle cx="256" cy="24" r="3" fill="#38bdf8" />
        <circle cx="228" cy="48" r="2" fill="#818cf8" />
        <circle cx="284" cy="48" r="2" fill="#c084fc" />
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
