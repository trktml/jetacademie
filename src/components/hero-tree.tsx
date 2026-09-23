"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpenText, Flame, Library, Target } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { BellLamp } from "@/components/bell-lamp";
import { HeroLeafCables } from "@/components/hero-leaf-cables";

const navigationItems = [
  {
    id: "mufredat",
    href: "/mufredat",
    title: "Müfredat",
    icon: BookOpenText,
    side: "left" as const,
  },
  {
    id: "mufredat-kitaplari",
    href: "/mufredat-kitaplari",
    title: "Müfredat Kitapları",
    icon: Library,
    side: "left" as const,
  },
  {
    id: "hedefler",
    href: "/hedefler",
    title: "Hedefler",
    icon: Target,
    side: "right" as const,
  },
  {
    id: "kampanyalar",
    href: "/kampanyalar",
    title: "Kampanyalar",
    icon: Flame,
    side: "right" as const,
  },
];

type NavigationItem = (typeof navigationItems)[number];

interface NavigationCardProps {
  item: NavigationItem;
  isLampOn: boolean;
  isHovered: boolean;
  mobile?: boolean;
  onHover: (id: string | null) => void;
}

function NavigationCard({ item, isLampOn, isHovered, mobile, onHover }: NavigationCardProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="hero-nav-card"
      data-active={isHovered ? "true" : undefined}
      data-lamp-on={isLampOn ? "true" : undefined}
      data-mobile={mobile ? "true" : undefined}
      data-side={item.side}
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(item.id)}
      onBlur={() => onHover(null)}
    >
      {!mobile && (
        <span className="hero-nav-card__port" data-port-id={item.id} aria-hidden="true" />
      )}
      <span className="hero-nav-card__icon" aria-hidden="true">
        <Icon />
      </span>
      <span className="hero-nav-card__copy">
        <strong>{item.title}</strong>
      </span>
      <ArrowUpRight className="hero-nav-card__arrow" aria-hidden="true" />
    </Link>
  );
}

export function HeroTree() {
  const [isLampOn, setIsLampOn] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const treeArtRef = useRef<HTMLDivElement>(null);
  const leftItems = navigationItems.filter((item) => item.side === "left");
  const rightItems = navigationItems.filter((item) => item.side === "right");

  return (
    <div className={`bell-scene ${isLampOn ? "" : "is-off"}`} data-testid="hero-tree">
      <div className="grain" aria-hidden="true" />
      <div className="hero-ambient" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="scene-edge-fade scene-edge-fade--top" aria-hidden="true" />
      <div className="scene-edge-fade scene-edge-fade--bottom" aria-hidden="true" />

      <div className="hero-shell">
        <h1 className="sr-only">Jet Academie — Müfredat ve hedef takip sistemi</h1>

        <div className="hero-stage-wrap">
          <BellLamp isOn={isLampOn} onToggle={() => setIsLampOn((value) => !value)} />

          <AnimatePresence>
            {isLampOn && (
              <motion.div
                className="hero-light-particles"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                aria-hidden="true"
              >
                {[34, 43, 54, 63].map((left, index) => (
                  <motion.span
                    key={left}
                    style={{ left: `${left}%` }}
                    animate={{ opacity: [0, 0.9, 0], y: [18, -28], x: [0, index % 2 ? 7 : -7] }}
                    transition={{
                      duration: 4.2,
                      repeat: Infinity,
                      delay: index * 0.7,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={layoutRef} className="hero-desktop-layout">
            <HeroLeafCables
              isLampOn={isLampOn}
              hoveredId={hoveredId}
              items={navigationItems}
              layoutRef={layoutRef}
              treeArtRef={treeArtRef}
            />

            <nav className="hero-side-nav hero-side-nav--left" aria-label="Öğrenme bölümleri">
              {leftItems.map((item) => (
                <NavigationCard
                  key={item.id}
                  item={item}
                  isLampOn={isLampOn}
                  isHovered={hoveredId === item.id}
                  onHover={setHoveredId}
                />
              ))}
            </nav>

            <div className="hero-tree-column">
              <div ref={treeArtRef} className="hero-tree-art">
                <Image
                  src="/red-tree.png"
                  alt="Jet Academie kırmızı ilim ağacı"
                  fill
                  priority
                  sizes="(max-width: 767px) 70vw, (max-width: 1200px) 38vw, 430px"
                  className={isLampOn ? "is-illuminated" : "is-dimmed"}
                />
                <div className="hero-tree-ground-light" aria-hidden="true" />
              </div>
            </div>

            <nav className="hero-side-nav hero-side-nav--right" aria-label="Planlama bölümleri">
              {rightItems.map((item) => (
                <NavigationCard
                  key={item.id}
                  item={item}
                  isLampOn={isLampOn}
                  isHovered={hoveredId === item.id}
                  onHover={setHoveredId}
                />
              ))}
            </nav>
          </div>

          <nav className="hero-mobile-nav" aria-label="JetAcademie ana bölümleri">
            {navigationItems.map((item) => (
              <NavigationCard
                key={item.id}
                item={item}
                isLampOn={isLampOn}
                isHovered={hoveredId === item.id}
                mobile
                onHover={setHoveredId}
              />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
