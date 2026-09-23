"use client";

import { useEffect, useLayoutEffect, useState } from "react";

interface CableTargetConfig {
  xPct: number;
  yPct: number;
}

const FOLIAGE_TARGETS: Record<string, CableTargetConfig> = {
  mufredat: { xPct: 0.35, yPct: 0.32 },
  "mufredat-kitaplari": { xPct: 0.27, yPct: 0.42 },
  hedefler: { xPct: 0.64, yPct: 0.33 },
  kampanyalar: { xPct: 0.71, yPct: 0.45 },
};

interface CableData {
  id: string;
  side: "left" | "right";
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  path: string;
}

interface HeroLeafCablesProps {
  isLampOn: boolean;
  hoveredId: string | null;
  items: Array<{ id: string; side: "left" | "right" }>;
  layoutRef: React.RefObject<HTMLDivElement | null>;
  treeArtRef: React.RefObject<HTMLDivElement | null>;
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function HeroLeafCables({
  isLampOn,
  hoveredId,
  items,
  layoutRef,
  treeArtRef,
}: HeroLeafCablesProps) {
  const [cables, setCables] = useState<CableData[]>([]);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useIsomorphicLayoutEffect(() => {
    const updateCables = () => {
      const layoutEl = layoutRef.current;
      const treeEl = treeArtRef.current;

      if (!layoutEl || !treeEl) return;
      if (typeof window !== "undefined" && window.innerWidth <= 900) {
        setCables([]);
        return;
      }

      const layoutRect = layoutEl.getBoundingClientRect();
      const treeRect = treeEl.getBoundingClientRect();

      if (layoutRect.width === 0 || treeRect.width === 0) return;

      setDimensions({ width: layoutRect.width, height: layoutRect.height });

      const nextCables: CableData[] = [];

      for (const item of items) {
        const portEl = layoutEl.querySelector<HTMLElement>(`[data-port-id="${item.id}"]`);
        if (!portEl) continue;

        const portRect = portEl.getBoundingClientRect();
        const startX = (item.side === "left" ? portRect.right : portRect.left) - layoutRect.left;
        const startY = portRect.top + portRect.height / 2 - layoutRect.top;

        const target = FOLIAGE_TARGETS[item.id] ?? { xPct: 0.5, yPct: 0.4 };
        const targetX = treeRect.left - layoutRect.left + treeRect.width * target.xPct;
        const targetY = treeRect.top - layoutRect.top + treeRect.height * target.yPct;

        const dx = Math.abs(targetX - startX);

        let path = "";
        if (item.side === "left") {
          const cp1X = startX + dx * 0.42;
          const cp1Y = startY;
          const cp2X = targetX - dx * 0.22;
          const cp2Y = targetY;
          path = `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${cp1X.toFixed(1)} ${cp1Y.toFixed(1)}, ${cp2X.toFixed(1)} ${cp2Y.toFixed(1)}, ${targetX.toFixed(1)} ${targetY.toFixed(1)}`;
        } else {
          const cp1X = startX - dx * 0.42;
          const cp1Y = startY;
          const cp2X = targetX + dx * 0.22;
          const cp2Y = targetY;
          path = `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${cp1X.toFixed(1)} ${cp1Y.toFixed(1)}, ${cp2X.toFixed(1)} ${cp2Y.toFixed(1)}, ${targetX.toFixed(1)} ${targetY.toFixed(1)}`;
        }

        nextCables.push({
          id: item.id,
          side: item.side,
          startX,
          startY,
          targetX,
          targetY,
          path,
        });
      }

      setCables(nextCables);
    };

    updateCables();

    const rafId = requestAnimationFrame(updateCables);
    const timeoutId = setTimeout(updateCables, 80);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && layoutRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateCables();
      });
      resizeObserver.observe(layoutRef.current);
      if (treeArtRef.current) {
        resizeObserver.observe(treeArtRef.current);
      }
    }

    window.addEventListener("resize", updateCables);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", updateCables);
    };
  }, [items, layoutRef, treeArtRef]);

  return (
    <svg
      className="hero-leaf-cables"
      width={dimensions.width || "100%"}
      height={dimensions.height || "100%"}
      viewBox={
        dimensions.width && dimensions.height
          ? `0 0 ${dimensions.width} ${dimensions.height}`
          : undefined
      }
      aria-hidden="true"
    >
      <defs>
        {/* Standard soft glow for cables */}
        <filter id="hero-cable-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Intensified glow when active / hovered */}
        <filter id="hero-cable-glow-active" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5.5" result="blur1" />
          <feGaussianBlur stdDeviation="2" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Radial soft aura for foliage leaf connection node */}
        <radialGradient id="hero-leaf-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {cables.map((cable) => {
        const isHovered = hoveredId === cable.id;

        return (
          <g key={cable.id} className="hero-cable-group" data-cable-id={cable.id}>
            {/* Outer Ambient Glow Line */}
            <path
              d={cable.path}
              fill="none"
              stroke={
                isLampOn
                  ? isHovered
                    ? "rgb(244 63 94 / 65%)"
                    : "rgb(244 63 94 / 32%)"
                  : "rgb(82 82 91 / 18%)"
              }
              strokeWidth={isHovered ? 4.5 : 2.5}
              strokeLinecap="round"
              filter={
                isLampOn
                  ? isHovered
                    ? "url(#hero-cable-glow-active)"
                    : "url(#hero-cable-glow)"
                  : undefined
              }
              style={{ transition: "stroke 240ms ease, stroke-width 240ms ease" }}
            />

            {/* Core Fiber-Optic Line */}
            <path
              d={cable.path}
              fill="none"
              stroke={isLampOn ? (isHovered ? "#fda4af" : "#fb7185") : "#52525b"}
              strokeWidth={isHovered ? 1.8 : 1.2}
              strokeLinecap="round"
              strokeOpacity={isLampOn ? (isHovered ? 1 : 0.85) : 0.28}
              style={{ transition: "stroke 240ms ease, stroke-width 240ms ease" }}
            />

            {/* Animated Flow Packet Pulse */}
            {isLampOn && (
              <path
                d={cable.path}
                fill="none"
                stroke={isHovered ? "#ffffff" : "#fecdd3"}
                strokeWidth={isHovered ? 2.2 : 1.4}
                strokeLinecap="round"
                strokeDasharray={isHovered ? "8 24" : "4 28"}
                className={`hero-cable-pulse ${isHovered ? "is-active" : ""}`}
                style={{ transition: "stroke 240ms ease" }}
              />
            )}

            {/* Foliage Connection Node in the Leaves */}
            <g
              className="hero-leaf-node"
              style={{
                transformOrigin: `${cable.targetX}px ${cable.targetY}px`,
                transition: "transform 240ms ease",
              }}
            >
              {/* Soft ambient aura nestled in the leaves */}
              <circle
                cx={cable.targetX}
                cy={cable.targetY}
                r={isHovered ? 18 : 13}
                fill="url(#hero-leaf-aura)"
                opacity={isLampOn ? (isHovered ? 1 : 0.72) : 0.12}
                style={{ transition: "r 240ms ease, opacity 240ms ease" }}
              />

              {/* Technical / botanical subtle dashed ring */}
              <circle
                cx={cable.targetX}
                cy={cable.targetY}
                r={isHovered ? 6.5 : 5}
                stroke={isLampOn ? (isHovered ? "#fb7185" : "rgb(244 63 94 / 75%)") : "#3f3f46"}
                strokeWidth="1"
                strokeDasharray="2 2"
                fill="none"
                opacity={isLampOn ? 1 : 0.3}
                style={{ transition: "stroke 240ms ease, r 240ms ease" }}
              />

              {/* Core luminous bud node */}
              <circle
                cx={cable.targetX}
                cy={cable.targetY}
                r={isHovered ? 3 : 2.2}
                fill={isLampOn ? (isHovered ? "#ffffff" : "#fda4af") : "#52525b"}
                stroke={isLampOn ? "#e11d48" : "#27272a"}
                strokeWidth="1.2"
                style={{ transition: "fill 240ms ease, r 240ms ease" }}
              />
            </g>
          </g>
        );
      })}
    </svg>
  );
}
