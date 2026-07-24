import { lazy, Suspense, useEffect, useMemo, useState, type CSSProperties } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { GlobeArc, GlobeMarker, GlobeTravelState } from "@/components/ui/cobe-globe";
import { DESTINATIONS, INDIA_ORIGIN, type Destination } from "@/data/destinations";
import { SectionHead, Reveal } from "./Reveal";

// The globe pulls in the `cobe` WebGL library, which is only needed once this
// section is actually reached. Splitting it into its own chunk keeps it out
// of the main bundle's parse/eval cost on first load.
const Globe = lazy(() => import("@/components/ui/cobe-globe").then((mod) => ({ default: mod.Globe })));

function GlobeFallback() {
  return (
    <div className="tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center tw:rounded-full tw:bg-espresso-soft/20">
      <span className="tw:h-8 tw:w-8 tw:animate-spin tw:rounded-full tw:border-2 tw:border-parchment/20 tw:border-t-gold" />
    </div>
  );
}

const desktopConstellationOffsets = [
  { x: -148, y: -92 },
  { x: 146, y: -102 },
  { x: -145, y: 90 },
  { x: 144, y: 86 },
];

const compactConstellationOffsets = [
  { x: -104, y: -72 },
  { x: 104, y: -76 },
  { x: -100, y: 76 },
  { x: 100, y: 74 },
];

function UniversityConstellation({ destination, compact }: { destination: Destination; compact: boolean }) {
  const offsets = compact ? compactConstellationOffsets : desktopConstellationOffsets;
  const anchorName = `--cobe-country-${destination.code.toLowerCase()}`;

  return (
    <AnimatePresence mode="wait">
      <motion.div key={destination.code} className="tw:contents">
        <motion.span
          data-country-origin={destination.code}
          aria-hidden="true"
          initial={{ opacity: 0.9, scale: 0.35 }}
          animate={{ opacity: 0, scale: 2.8 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="tw:pointer-events-none tw:absolute tw:z-20 tw:h-4 tw:w-4 tw:rounded-full tw:border tw:border-gold tw:bg-clay/70"
          style={{
            positionAnchor: anchorName,
            left: "anchor(center)",
            top: "anchor(center)",
            translate: "-50% -50%",
          } as CSSProperties}
        />
        {destination.universities.map((university, index) => {
          const offset = offsets[index] ?? offsets[0];
          return (
            <div
              key={university.name}
              className={`tw:pointer-events-none tw:absolute tw:z-20 ${index > 2 ? "tw:hidden tw:sm:block" : ""}`}
              style={{
                positionAnchor: anchorName,
                left: "anchor(center)",
                top: "anchor(center)",
                translate: "-50% -50%",
              } as CSSProperties}
            >
              <motion.div
                data-university-overlay={university.mark}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.18, filter: "blur(9px)" }}
                animate={{ opacity: 1, x: offset.x, y: offset.y, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 0, y: 0, scale: 0.2, filter: "blur(8px)" }}
                transition={{
                  type: "spring",
                  stiffness: 118,
                  damping: 17,
                  mass: 0.9,
                  delay: index * 0.09,
                }}
                className="tw:flex tw:max-w-[128px] tw:items-center tw:gap-2 tw:rounded-xl tw:bg-parchment/95 tw:p-1.5 tw:pr-2 tw:text-espresso tw:shadow-[0_18px_45px_-24px_rgba(36,51,58,0.48)] tw:ring-1 tw:ring-white/70 tw:sm:max-w-[150px] tw:sm:pr-3"
              >
                <span className="tw:flex tw:h-8 tw:min-w-8 tw:items-center tw:justify-center tw:rounded-lg tw:bg-heritage tw:px-1.5 tw:font-sans tw:text-[8px] tw:font-bold tw:text-parchment">
                  {university.mark}
                </span>
                <span className="tw:line-clamp-2 tw:font-sans tw:text-[9px] tw:font-semibold tw:leading-tight">
                  {university.name}
                </span>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}

export function EdgeCountries() {
  const [activeCode, setActiveCode] = useState("US");
  const [journeyVersion, setJourneyVersion] = useState(0);
  const [travelState, setTravelState] = useState<GlobeTravelState>("travelling");
  const [compactConstellation, setCompactConstellation] = useState(false);
  const destination = DESTINATIONS.find((item) => item.code === activeCode) ?? DESTINATIONS[0];

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const update = () => setCompactConstellation(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const selectDestination = (code: string) => {
    setActiveCode(code);
    setTravelState("travelling");
    setJourneyVersion((version) => version + 1);
  };

  const markers = useMemo<GlobeMarker[]>(() => {
    return DESTINATIONS.map((item) => ({
      id: `country-${item.code.toLowerCase()}`,
      location: item.location,
      label: item.name,
      sticker: item.flag,
      size: item.code === destination.code ? 0.082 : item.code === "IN" ? 0.046 : 0.026,
      destination: item.code === destination.code,
      origin: item.code === "IN" && destination.code !== "IN",
      interactive: true,
      pinOffset:
        item.code === "UK"
          ? { x: -24, y: -14 }
          : item.code === "EU"
            ? { x: 24, y: 14 }
            : undefined,
    }));
  }, [destination]);

  const arcs = useMemo<GlobeArc[]>(
    () => destination.code === "IN" ? [] : [{
      id: `route-${destination.code.toLowerCase()}`,
      from: INDIA_ORIGIN.location,
      to: destination.location,
      label: `India to ${destination.name}`,
    }],
    [destination],
  );

  const hasArrived = travelState === "arrived";

  return (
    <section
      id="destinations"
      data-active-destination={destination.code}
      data-travel-state={travelState}
      className="tw:relative tw:overflow-hidden tw:bg-espresso tw:py-24 tw:md:py-36"
    >
      <div className="tw:pointer-events-none tw:absolute tw:inset-0" aria-hidden="true">
        <div className="tw:absolute tw:right-[-10%] tw:top-[10%] tw:h-[420px] tw:w-[420px] tw:rounded-full tw:bg-heritage/9 tw:blur-[130px]" />
        <div className="tw:absolute tw:left-[-8%] tw:bottom-[6%] tw:h-[360px] tw:w-[360px] tw:rounded-full tw:bg-clay/12 tw:blur-[130px]" />
      </div>

      <div className="tw:relative tw:mx-auto tw:max-w-6xl tw:px-6">
        <SectionHead
          eyebrow="Global Destinations"
          title="Begin in India. Arrive with direction."
          intro="Choose a destination below or select a pin on the globe to follow the journey from India and reveal representative universities for that admissions system."
          dark
        />

        <div className="tw:mt-14 tw:grid tw:gap-10 tw:lg:grid-cols-[0.82fr_1.18fr] tw:lg:items-start">
          <Reveal className="tw:w-full">
            <div className="tw:rounded-[2rem] tw:bg-parchment/[0.04] tw:p-2 tw:ring-1 tw:ring-parchment/10">
              <div className="tw:rounded-[calc(2rem-0.5rem)] tw:bg-espresso-soft/24 tw:p-5">
                <label htmlFor="mobile-destination" className="tw:block tw:font-sans tw:text-[11px] tw:font-semibold tw:uppercase tw:tracking-[0.16em] tw:text-parchment/48 tw:md:hidden">
                  Destination
                </label>
                <select
                  id="mobile-destination"
                  value={destination.code}
                  onChange={(event) => selectDestination(event.target.value)}
                  className="tw:mt-3 tw:w-full tw:rounded-xl tw:border-0 tw:bg-parchment tw:px-4 tw:py-3 tw:font-sans tw:text-sm tw:font-semibold tw:text-espresso tw:outline-none tw:ring-1 tw:ring-parchment/15 tw:md:hidden"
                >
                  {DESTINATIONS.map((item) => (
                    <option key={item.code} value={item.code}>{item.flag} {item.label}</option>
                  ))}
                </select>

                <div className="tw:hidden tw:grid-cols-2 tw:gap-2 tw:md:grid">
                  {DESTINATIONS.map((item) => {
                    const isActive = item.code === destination.code;
                    return (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => selectDestination(item.code)}
                        aria-pressed={isActive}
                        className="tw:flex tw:items-center tw:gap-2 tw:rounded-xl tw:px-3 tw:py-2.5 tw:text-left tw:font-sans tw:text-[12px] tw:font-semibold tw:transition-all tw:duration-500 tw:ease-[cubic-bezier(0.32,0.72,0,1)] tw:active:scale-[0.98]"
                        style={{
                          background: isActive ? "#c46f52" : "rgba(251,250,246,0.07)",
                          color: isActive ? "#fbfaf6" : "rgba(251,250,246,0.72)",
                          boxShadow: isActive ? "0 14px 30px -20px rgba(196,111,82,0.7)" : "inset 0 0 0 1px rgba(251,250,246,0.07)",
                        }}
                      >
                        <span className="tw:text-base">{item.flag}</span>
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <motion.div
              key={destination.code}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="tw:mt-5 tw:rounded-[2rem] tw:bg-parchment/[0.05] tw:p-2 tw:ring-1 tw:ring-parchment/10"
            >
              <div className="tw:rounded-[calc(2rem-0.5rem)] tw:bg-parchment tw:p-7">
                <div className="tw:flex tw:items-center tw:gap-3">
                  <span className="tw:flex tw:h-12 tw:w-12 tw:items-center tw:justify-center tw:rounded-xl tw:bg-clay-soft/45 tw:text-2xl">
                    {destination.flag}
                  </span>
                  <div>
                    <p className="tw:font-sans tw:text-[10px] tw:font-semibold tw:uppercase tw:tracking-[0.15em] tw:text-clay">
                      {hasArrived ? "Destination reached" : travelState === "manual" ? "Explore freely" : "Journey in progress"}
                    </p>
                    <h3 className="tw:font-display tw:text-2xl tw:text-espresso">{destination.label}</h3>
                  </div>
                </div>

                <ul className="tw:mt-6 tw:grid tw:gap-2.5">
                  {destination.universities.map((university) => (
                    <li key={university.name} className="tw:flex tw:items-center tw:gap-3 tw:font-sans tw:text-[13.5px] tw:text-espresso-soft">
                      <span className="tw:flex tw:h-7 tw:min-w-7 tw:items-center tw:justify-center tw:rounded-lg tw:bg-heritage/10 tw:px-1.5 tw:text-[8px] tw:font-bold tw:text-heritage">{university.mark}</span>
                      {university.name}
                    </li>
                  ))}
                </ul>

                <p className="tw:mt-6 tw:font-sans tw:text-[12px] tw:italic tw:text-espresso-soft/58">
                  Representative universities only. Every shortlist is built around the individual student.
                </p>
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.1} className="tw:w-full tw:lg:sticky tw:lg:top-32">
            <div className="tw:relative tw:mx-auto tw:aspect-square tw:w-full tw:max-w-[620px]" style={{ minWidth: 280 }}>
              <div className="tw:absolute tw:inset-[8%] tw:rounded-full tw:bg-parchment/7 tw:blur-2xl" />
              <Suspense fallback={<GlobeFallback />}>
                <Globe
                  className="tw:relative tw:z-10 tw:w-full"
                  markers={markers}
                  arcs={arcs}
                  initialCamera={INDIA_ORIGIN.camera}
                  targetCamera={destination.camera}
                  journeyKey={`${destination.code}-${journeyVersion}`}
                  onTravelStateChange={setTravelState}
                  onMarkerSelect={(marker) => selectDestination(marker.id.replace("country-", "").toUpperCase())}
                  markerColor={[47 / 255, 85 / 255, 114 / 255]}
                  arcColor={[211 / 255, 157 / 255, 70 / 255]}
                  baseColor={[0.91, 0.93, 0.91]}
                  glowColor={[0.98, 0.98, 0.96]}
                  dark={0.18}
                  mapBrightness={4.8}
                  markerSize={0.052}
                  markerElevation={0.025}
                  arcWidth={1.05}
                  arcHeight={0.38}
                >
                  {hasArrived ? <UniversityConstellation destination={destination} compact={compactConstellation} /> : null}
                </Globe>
              </Suspense>

              <motion.div
                key={`journey-${destination.code}-${travelState}`}
                initial={{ opacity: 0, y: 10, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 17 }}
                className="tw:absolute tw:bottom-6 tw:left-1/2 tw:z-30 tw:flex tw:-translate-x-1/2 tw:items-center tw:gap-2 tw:whitespace-nowrap tw:rounded-full tw:bg-parchment tw:px-4 tw:py-2 tw:font-sans tw:text-[12px] tw:font-bold tw:text-espresso tw:shadow-[0_20px_42px_-24px_rgba(36,51,58,0.52)]"
              >
                <span className="tw:text-base">{INDIA_ORIGIN.flag}</span>
                India
                {destination.code !== "IN" ? (
                  <>
                    <ArrowRight className="tw:h-3.5 tw:w-3.5 tw:text-clay" strokeWidth={1.8} />
                    <span className="tw:text-base">{destination.flag}</span>
                    {destination.name}
                  </>
                ) : (
                  <span className="tw:ml-1 tw:flex tw:items-center tw:gap-1 tw:text-clay"><MapPin className="tw:h-3.5 tw:w-3.5" /> Selected</span>
                )}
              </motion.div>
            </div>
            <p className="tw:mx-auto tw:mt-4 tw:max-w-md tw:text-center tw:font-sans tw:text-[11px] tw:leading-relaxed tw:text-parchment/46">
              Drag to explore. Choose a destination again whenever you want the camera to reframe it.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
