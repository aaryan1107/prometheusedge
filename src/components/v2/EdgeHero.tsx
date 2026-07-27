import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { CountUpStat } from "./CountUpStat";
import { BrandMark } from "./BrandMark";
import { UniversityLogo } from "./UniversityLogo";
import { gsap } from "./gsapConfig";
import { LogoLoop } from "@/components/ui/LogoLoop";
import { DESTINATIONS } from "@/data/destinations";

const heroStats: Array<{ end: number; suffix?: string; label: string; caption: string }> = [
  // Derived so this can't contradict the destination strip below it.
  {
    end: DESTINATIONS.length,
    label: `${DESTINATIONS.length} global destinations`,
    caption: "Global Destinations",
  },
  { end: 12, suffix: "+", label: "12 plus verified placements", caption: "Verified Placements" },
  { end: 9, suffix: "-12", label: "Grades 9 to 12 four-year runway", caption: "Four-Year Runway" },
  { end: 1, suffix: ":1", label: "1 to 1 counsellor model", caption: "Counsellor Model" },
];

// Bare logos, no chrome — the institutions themselves do the trust-building.
const universityLoopItems = DESTINATIONS.flatMap((destination) =>
  destination.universities.map((university) => ({
    title: university.name,
    ariaLabel: `${university.name}, ${destination.name}`,
    node: <UniversityLogo name={university.name} mark={university.mark} variant="bare" />,
  })),
);

const universityLaneBreak = Math.ceil(universityLoopItems.length / 2);
const universityLanes = [
  universityLoopItems.slice(0, universityLaneBreak),
  universityLoopItems.slice(universityLaneBreak),
];

const heroSequence: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.12,
    },
  },
};

const softReveal: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.985, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", mass: 1.1, stiffness: 44, damping: 16 },
  },
};

const fileReveal: Variants = {
  hidden: { opacity: 0, y: 34, rotate: -4, scale: 0.96, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    rotate: -2,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", mass: 1.3, stiffness: 42, damping: 15, delay: 0.28 },
  },
};

function DotField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let dots: Array<{ x: number; y: number; lane: number }> = [];
    let raf = 0;
    let size = { w: 0, h: 0, left: 0, top: 0 };
    let pointer = { x: -9999, y: -9999, active: false };

    const buildDots = () => {
      const step = 18;
      const cols = Math.ceil(size.w / step);
      const rows = Math.ceil(size.h / step);
      const padX = (size.w % step) / 2;
      const padY = (size.h % step) / 2;
      dots = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          dots.push({
            x: padX + col * step + step / 2,
            y: padY + row * step + step / 2,
            lane: (row + col) % 4,
          });
        }
      }
    };

    // Deliberately restrained: a quiet grid that is legible at rest, with a
    // soft warm response near the cursor. No glow wash — the field should
    // read as texture, never as an effect competing with the copy.
    const draw = () => {
      raf = 0;
      ctx.clearRect(0, 0, size.w, size.h);

      ctx.fillStyle = "rgba(82, 106, 112, 0.19)";
      ctx.beginPath();
      dots.forEach((dot) => {
        const radius = 0.85;
        ctx.moveTo(dot.x + radius, dot.y);
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
      });
      ctx.fill();

      if (pointer.active) {
        const RADIUS = 190;
        ctx.fillStyle = "rgba(196, 111, 82, 0.34)";
        ctx.beginPath();
        dots.forEach((dot) => {
          const distance = Math.hypot(pointer.x - dot.x, pointer.y - dot.y);
          if (distance > RADIUS) return;
          const lift = 1 - distance / RADIUS;
          const radius = 0.85 + lift * lift * 1.05;
          ctx.moveTo(dot.x + radius, dot.y);
          ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        });
        ctx.fill();
      }
    };

    const scheduleDraw = () => {
      if (!raf) raf = window.requestAnimationFrame(draw);
    };

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      size = { w: rect.width, h: rect.height, left: rect.left + window.scrollX, top: rect.top + window.scrollY };
      canvas.width = Math.max(1, size.w * dpr);
      canvas.height = Math.max(1, size.h * dpr);
      canvas.style.width = `${size.w}px`;
      canvas.style.height = `${size.h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
      scheduleDraw();
    };

    const onMove = (event: PointerEvent) => {
      pointer = {
        x: event.pageX - size.left,
        y: event.pageY - size.top,
        active: true,
      };
      scheduleDraw();
    };

    const onLeave = () => {
      pointer = { x: -9999, y: -9999, active: false };
      scheduleDraw();
    };

    const hero = canvas.closest("section");
    resize();
    window.addEventListener("resize", resize);
    hero?.addEventListener("pointermove", onMove as EventListener, { passive: true });
    hero?.addEventListener("pointerleave", onLeave);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      hero?.removeEventListener("pointermove", onMove as EventListener);
      hero?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas className="tw:absolute tw:inset-0 tw:z-0 tw:h-full tw:w-full" ref={canvasRef} aria-hidden="true" />;
}

export function EdgeHero() {
  const scope = useRef<HTMLElement | null>(null);
  const copyDepth = useRef<HTMLDivElement | null>(null);
  const fileDepth = useRef<HTMLDivElement | null>(null);
  const royalAtmosphere = useRef<HTMLDivElement | null>(null);
  const goldAtmosphere = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        {
          desktop: "(min-width: 900px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, reduceMotion } = context.conditions as { desktop: boolean; reduceMotion: boolean };
          if (!desktop || reduceMotion || !scope.current) return;

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: scope.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .to(copyDepth.current, { y: -18, ease: "none" }, 0)
            .to(fileDepth.current, { y: -44, ease: "none" }, 0)
            .to(royalAtmosphere.current, { y: 28, x: -10, ease: "none" }, 0)
            .to(goldAtmosphere.current, { y: -20, x: 8, ease: "none" }, 0);
        },
      );
      return () => media.revert();
    },
    { scope },
  );

  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    // Above the fold: reveal on mount (no scroll trigger needed). Uses the
    // compositor-driven .reveal transition, so it is not rAF-dependent.
    const nodes = root.querySelectorAll<HTMLElement>(".reveal");
    const id = window.setTimeout(() => {
      nodes.forEach((node) => node.classList.add("is-in"));
    }, 60);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <motion.section
      id="top"
      ref={scope}
      className="tw:relative tw:overflow-hidden tw:bg-parchment tw:pt-[168px]"
      initial="hidden"
      animate="visible"
      variants={heroSequence}
    >
      <DotField />
      <div className="tw:pointer-events-none tw:absolute tw:inset-0" aria-hidden="true">
        <div ref={royalAtmosphere} className="tw:absolute tw:-top-40 tw:right-[-10%] tw:h-[520px] tw:w-[520px] tw:will-change-transform">
          <motion.div
            className="tw:h-full tw:w-full tw:rounded-full tw:bg-clay/13 tw:blur-[120px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <div ref={goldAtmosphere} className="tw:absolute tw:top-[30%] tw:left-[-12%] tw:h-[420px] tw:w-[420px] tw:will-change-transform">
          <motion.div
            className="tw:h-full tw:w-full tw:rounded-full tw:bg-gold/14 tw:blur-[110px]"
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.35, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      <div className="tw:relative tw:mx-auto tw:max-w-6xl tw:px-6">
        <div className="tw:grid tw:gap-16 tw:lg:grid-cols-[1.15fr_0.85fr] tw:lg:items-center">
          <div ref={copyDepth} className="tw:will-change-transform">
            <motion.div variants={heroSequence}>
              <motion.span variants={softReveal} className="tw:inline-flex tw:rounded-full tw:bg-espresso/[0.05] tw:px-4 tw:py-1.5 tw:font-sans tw:text-[11px] tw:font-semibold tw:uppercase tw:tracking-[0.18em] tw:text-espresso-soft tw:ring-1 tw:ring-ink-line">
                The Edge Way · Find Your Edge
              </motion.span>

              <h1 className="tw:mt-7 tw:max-w-3xl tw:font-display tw:text-[clamp(2.25rem,3.9vw,3.6rem)] tw:font-medium tw:leading-[1.08] tw:text-espresso">
                <motion.span variants={softReveal} className="tw:block">Every student has potential.</motion.span>
                <motion.span variants={softReveal} className="tw:block">
                  We help you find the right <span className="tw:italic tw:text-clay">path to it.</span>
                </motion.span>
              </h1>

              <motion.p variants={softReveal} className="tw:mt-7 tw:max-w-lg tw:font-sans tw:text-[15px] tw:leading-relaxed tw:text-espresso-soft/70">
                University admissions are more competitive than ever — it's no longer just about grades, but
                strategy, planning, experiences and informed decisions. We help students discover their strengths,
                explore careers, build exceptional profiles and navigate admissions with confidence.
              </motion.p>

              <motion.div variants={softReveal} className="tw:mt-9 tw:flex tw:flex-wrap tw:items-center tw:gap-4">
              <a
                href="#contact"
                className="tw:group tw:flex tw:items-center tw:gap-3 tw:rounded-full tw:bg-clay tw:py-2 tw:pl-6 tw:pr-2 tw:font-sans tw:text-sm tw:font-semibold tw:text-parchment tw:transition-all tw:duration-700 tw:ease-[cubic-bezier(0.32,0.72,0,1)] tw:hover:bg-gold tw:hover:text-espresso tw:active:scale-[0.98]"
              >
                Book a Free Consultation
                <span className="tw:flex tw:h-9 tw:w-9 tw:items-center tw:justify-center tw:rounded-full tw:bg-parchment/15 tw:transition-transform tw:duration-700 tw:ease-[cubic-bezier(0.32,0.72,0,1)] tw:group-hover:translate-x-0.5 tw:group-hover:-translate-y-0.5">
                  <ArrowUpRight className="tw:h-4 tw:w-4" strokeWidth={1.5} />
                </span>
              </a>
              <a
                href="#about"
                className="tw:rounded-full tw:px-6 tw:py-2.5 tw:font-sans tw:text-sm tw:font-semibold tw:text-espresso tw:ring-1 tw:ring-ink-line tw:transition-colors tw:duration-500 tw:hover:bg-espresso/[0.04]"
              >
                Learn More
              </a>
              </motion.div>

              <motion.div variants={heroSequence} className="tw:mt-14 tw:grid tw:grid-cols-2 tw:gap-3 tw:sm:grid-cols-4">
                {heroStats.map((stat) => (
                  <motion.div key={stat.caption} variants={softReveal} className="tw:rounded-2xl tw:bg-espresso/[0.03] tw:p-1 tw:ring-1 tw:ring-ink-line">
                    <div className="tw:rounded-[calc(1rem-2px)] tw:bg-parchment tw:px-3 tw:py-3 tw:shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
                      <div className="tw:font-display tw:text-xl tw:text-espresso">
                        <CountUpStat end={stat.end} suffix={stat.suffix} label={stat.label} />
                      </div>
                      <span className="tw:font-sans tw:text-[11px] tw:text-espresso-soft/60">{stat.caption}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <div ref={fileDepth} className="tw:relative tw:mx-auto tw:w-full tw:max-w-sm tw:will-change-transform">
            <motion.aside variants={fileReveal} className="tw:relative tw:w-full">
              <div className="tw:rounded-[2rem] tw:bg-espresso tw:p-2 tw:shadow-[0_40px_80px_-30px_rgba(18,33,43,0.42)] tw:ring-1 tw:ring-black/10">
                <div className="tw:rounded-[calc(2rem-0.5rem)] tw:bg-espresso-soft/40 tw:p-7 tw:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                <div className="tw:flex tw:items-center tw:justify-between tw:font-sans tw:text-[11px] tw:uppercase tw:tracking-[0.14em] tw:text-parchment/50">
                  <span className="tw:flex tw:items-center tw:gap-2">
                    <BrandMark className="tw:h-7 tw:w-7 tw:ring-1 tw:ring-gold/35" />
                    File 01
                  </span>
                  <span>00 / 06</span>
                </div>
                <p className="tw:mt-6 tw:font-display tw:text-xl tw:italic tw:leading-snug tw:text-parchment">
                  "Education isn't just about degrees — it's about building real, meaningful futures."
                </p>
                <div className="tw:mt-6 tw:flex tw:items-center tw:gap-3">
                  <div className="tw:flex tw:h-10 tw:w-10 tw:items-center tw:justify-center tw:rounded-full tw:bg-gold tw:font-sans tw:text-xs tw:font-semibold tw:text-espresso">
                    MS
                  </div>
                  <div>
                    <p className="tw:font-sans tw:text-sm tw:font-semibold tw:text-parchment">Mukesh Sharma</p>
                    <p className="tw:font-sans tw:text-xs tw:text-parchment/50">Founder, The Edge Way</p>
                  </div>
                </div>
                <dl className="tw:mt-6 tw:space-y-2 tw:border-t tw:border-parchment/10 tw:pt-5 tw:font-sans tw:text-xs">
                  {[
                    ["Student Window", "Grade 8 onward"],
                    ["Destinations", "US · UK · Europe · Asia"],
                    ["Method", "1:1 mentorship, not mass coaching"],
                  ].map(([dt, dd]) => (
                    <div key={dt} className="tw:flex tw:items-center tw:justify-between tw:gap-4">
                      <dt className="tw:text-parchment/45">{dt}</dt>
                      <dd className="tw:text-right tw:text-parchment/80">{dd}</dd>
                    </div>
                  ))}
                </dl>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>

      {/* Opaque parchment backdrop: the logos use mix-blend-multiply to drop
          the white box on the JPEG lockups, so they need a flat surface to
          blend against rather than the dot field. */}
      <motion.div variants={softReveal} className="tw:relative tw:z-10 tw:mt-16 tw:overflow-hidden tw:bg-parchment tw:pb-6 tw:pt-2 tw:md:pb-10">
        <div className="tw:mx-auto tw:max-w-6xl tw:px-6">
          <p className="tw:font-sans tw:text-[10px] tw:font-bold tw:uppercase tw:tracking-[0.18em] tw:text-clay">
            Where our students go
          </p>
          <div className="tw:mt-2 tw:flex tw:flex-col tw:gap-2 tw:border-b tw:border-espresso/10 tw:pb-5 tw:sm:flex-row tw:sm:items-end tw:sm:justify-between tw:sm:gap-6">
            <p className="tw:max-w-xl tw:font-display tw:text-2xl tw:leading-snug tw:text-espresso tw:md:text-3xl">
              Our guidance has opened doors to the world's best institutions.
            </p>
            <p className="tw:max-w-xs tw:font-sans tw:text-[10px] tw:leading-relaxed tw:text-espresso-soft/48 tw:sm:text-right">
              {universityLoopItems.length} representative universities across {DESTINATIONS.length} destinations. Every shortlist remains individual.
            </p>
          </div>
        </div>

        <div className="tw:mt-5 tw:flex tw:flex-col tw:gap-3">
          <LogoLoop
            logos={universityLanes[0]}
            speed={42}
            direction="left"
    logoHeight={64}
            gap={40}
            hoverSpeed={7}
            scaleOnHover
            fadeOut
            fadeOutColor="#fbfaf6"
            ariaLabel="Universities across the first set of destinations"
          />
          <LogoLoop
            logos={universityLanes[1]}
            speed={34}
            direction="right"
    logoHeight={64}
            gap={40}
            hoverSpeed={7}
            scaleOnHover
            fadeOut
            fadeOutColor="#fbfaf6"
            ariaLabel="Universities across the second set of destinations"
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
