import { useMemo, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { Globe, type GlobeArc, type GlobeMarker } from "@/components/ui/cobe-globe";
import { LogoLoop } from "@/components/ui/LogoLoop";
import { SectionHead, Reveal } from "./Reveal";

type Country = {
  code: string;
  name: string;
  label: string;
  flag: string;
  location: [number, number];
  colleges: string[];
};

const origin = {
  id: "noida",
  name: "Noida",
  label: "Start",
  flag: "🇮🇳",
  location: [28.5355, 77.391] as [number, number],
};

const countries: Country[] = [
  { code: "US", name: "USA", label: "United States", flag: "🇺🇸", location: [40.7128, -74.006], colleges: ["Boston University", "Northeastern University", "University of Illinois", "UMass Amherst", "UC Irvine"] },
  { code: "UK", name: "UK", label: "United Kingdom", flag: "🇬🇧", location: [51.5074, -0.1278], colleges: ["UCL", "King's College London", "University of Manchester", "University of Warwick"] },
  { code: "CA", name: "Canada", label: "Canada", flag: "🇨🇦", location: [43.6532, -79.3832], colleges: ["University of Toronto", "University of British Columbia", "McGill University", "University of Waterloo"] },
  { code: "SG", name: "Singapore", label: "Singapore", flag: "🇸🇬", location: [1.3521, 103.8198], colleges: ["National University of Singapore", "Nanyang Technological University", "Singapore Management University"] },
  { code: "AU", name: "Australia", label: "Australia", flag: "🇦🇺", location: [-33.8688, 151.2093], colleges: ["University of Melbourne", "University of Sydney", "Monash University", "UNSW Sydney"] },
  { code: "NZ", name: "New Zealand", label: "New Zealand", flag: "🇳🇿", location: [-36.8485, 174.7633], colleges: ["University of Auckland", "University of Otago", "Victoria University of Wellington"] },
  { code: "AE", name: "UAE", label: "UAE", flag: "🇦🇪", location: [25.2048, 55.2708], colleges: ["NYU Abu Dhabi", "Khalifa University", "American University of Sharjah"] },
  { code: "EU", name: "Europe", label: "Europe", flag: "🇪🇺", location: [48.8566, 2.3522], colleges: ["Bocconi University", "TU Munich", "Sciences Po", "IE University"] },
  { code: "HK", name: "Hong Kong", label: "Hong Kong", flag: "🇭🇰", location: [22.3193, 114.1694], colleges: ["University of Hong Kong", "HKUST", "Chinese University of Hong Kong"] },
  { code: "IN", name: "India", label: "India", flag: "🇮🇳", location: [19.076, 72.8777], colleges: ["Ashoka University", "FLAME University", "Krea University", "OP Jindal Global University"] },
];

export function EdgeCountries() {
  const [active, setActive] = useState(0);
  const country = countries[active];

  const markers = useMemo<GlobeMarker[]>(
    () => [
      {
        id: origin.id,
        location: origin.location,
        label: origin.label,
        sticker: origin.flag,
        size: 0.05,
      },
      {
        id: `destination-${country.code.toLowerCase()}`,
        location: country.location,
        label: country.name,
        sticker: country.flag,
        size: 0.075,
      },
    ],
    [country],
  );

  const arcs = useMemo<GlobeArc[]>(
    () => [
      {
        id: `route-${country.code.toLowerCase()}`,
        from: origin.location,
        to: country.location,
        label: `${origin.name} to ${country.name}`,
      },
    ],
    [country],
  );

  const collegeLogos = useMemo(
    () =>
      country.colleges.map((college) => ({
        title: college,
        node: (
          <span className="tw:inline-flex tw:items-center tw:gap-2 tw:rounded-full tw:bg-espresso/[0.05] tw:px-4 tw:py-2 tw:font-sans tw:text-[13px] tw:font-semibold tw:text-espresso">
            <span className="tw:text-base">{country.flag}</span>
            {college}
          </span>
        ),
      })),
    [country],
  );

  return (
    <section id="destinations" className="tw:relative tw:overflow-hidden tw:bg-espresso tw:py-24 tw:md:py-36">
      <div className="tw:pointer-events-none tw:absolute tw:inset-0" aria-hidden="true">
        <div className="tw:absolute tw:right-[-10%] tw:top-[10%] tw:h-[420px] tw:w-[420px] tw:rounded-full tw:bg-clay/15 tw:blur-[130px]" />
        <div className="tw:absolute tw:left-[-8%] tw:bottom-[6%] tw:h-[360px] tw:w-[360px] tw:rounded-full tw:bg-gold/12 tw:blur-[130px]" />
      </div>

      <div className="tw:relative tw:mx-auto tw:max-w-6xl tw:px-6">
        <SectionHead
          eyebrow="Countries We Guide Students For"
          title="Choose a destination. Watch the route come alive."
          intro="Start in Noida, select a country, and the admissions route redraws around that destination with representative universities for that system."
          dark
        />

        <div className="tw:mt-14 tw:grid tw:gap-10 tw:lg:grid-cols-2 tw:lg:items-start">
          <Reveal className="tw:w-full">
            <div className="tw:rounded-[2rem] tw:bg-parchment/[0.04] tw:p-2 tw:ring-1 tw:ring-parchment/10">
              <div className="tw:rounded-[calc(2rem-0.5rem)] tw:bg-espresso-soft/55 tw:p-5">
                <label className="tw:block tw:font-sans tw:text-[11px] tw:font-semibold tw:uppercase tw:tracking-[0.16em] tw:text-parchment/45">
                  Destination
                </label>
                <select
                  value={country.code}
                  onChange={(event) => {
                    const index = countries.findIndex((item) => item.code === event.target.value);
                    if (index >= 0) setActive(index);
                  }}
                  className="tw:mt-3 tw:w-full tw:rounded-2xl tw:border tw:border-parchment/10 tw:bg-parchment tw:px-4 tw:py-3 tw:font-sans tw:text-sm tw:font-semibold tw:text-espresso tw:outline-none"
                >
                  {countries.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.flag} {item.label}
                    </option>
                  ))}
                </select>

                <div className="tw:mt-5 tw:grid tw:grid-cols-2 tw:gap-2">
                  {countries.map((item, index) => {
                    const isActive = index === active;
                    return (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => setActive(index)}
                        className="tw:flex tw:items-center tw:gap-2 tw:rounded-2xl tw:px-3 tw:py-2.5 tw:text-left tw:font-sans tw:text-[12px] tw:font-semibold tw:transition-all tw:duration-500"
                        style={{
                          background: isActive ? "#b5502a" : "rgba(251,246,238,0.08)",
                          color: isActive ? "#fbf6ee" : "rgba(251,246,238,0.72)",
                          boxShadow: isActive ? "0 14px 30px -18px rgba(181,80,42,0.9)" : "inset 0 0 0 1px rgba(251,246,238,0.08)",
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

            <div className="tw:mt-5 tw:rounded-[2rem] tw:bg-parchment/[0.04] tw:p-2 tw:ring-1 tw:ring-parchment/10 tw:backdrop-blur-sm">
              <div className="tw:overflow-hidden tw:rounded-[calc(2rem-0.5rem)] tw:bg-parchment tw:p-7">
                <div className="tw:flex tw:items-center tw:gap-3">
                  <motion.span
                    key={country.code}
                    initial={{ scale: 0.5, rotate: -12, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 130, damping: 12 }}
                    className="tw:flex tw:h-12 tw:w-12 tw:items-center tw:justify-center tw:rounded-full tw:bg-clay/10 tw:text-2xl"
                  >
                    {country.flag}
                  </motion.span>
                  <div>
                    <p className="tw:font-sans tw:text-[11px] tw:uppercase tw:tracking-[0.16em] tw:text-clay">
                      Universities we guide toward
                    </p>
                    <h3 className="tw:font-display tw:text-2xl tw:text-espresso">{country.label}</h3>
                  </div>
                </div>

                <div className="tw:mt-6 tw:h-px tw:w-full tw:bg-ink-line" />

                <div key={`loop-${country.code}`} className="swap-in tw:mt-6 tw:overflow-hidden">
                  <LogoLoop
                    logos={collegeLogos}
                    speed={70}
                    gap={12}
                    logoHeight={34}
                    hoverSpeed={12}
                    fadeOut
                    fadeOutColor="#fbf6ee"
                    scaleOnHover
                    ariaLabel={`${country.label} university highlights`}
                  />
                </div>

                <ul key={`list-${country.code}`} className="swap-in tw:mt-6 tw:grid tw:gap-2.5 tw:sm:grid-cols-2">
                  {country.colleges.map((college) => (
                    <li
                      key={college}
                      className="tw:flex tw:items-center tw:gap-3 tw:rounded-2xl tw:bg-espresso/[0.04] tw:px-4 tw:py-3 tw:font-sans tw:text-[13.5px] tw:text-espresso"
                    >
                      <MapPin className="tw:h-3.5 tw:w-3.5 tw:text-clay" strokeWidth={1.8} />
                      {college}
                    </li>
                  ))}
                </ul>

                <p className="tw:mt-6 tw:font-sans tw:text-[12px] tw:italic tw:text-espresso-soft/50">
                  Representative destinations. Shortlists are always built around the individual student.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="tw:w-full tw:lg:sticky tw:lg:top-32">
            <div className="tw:relative tw:mx-auto tw:aspect-square tw:w-full tw:max-w-[540px]" style={{ minWidth: 280 }}>
              <div className="tw:absolute tw:inset-0 tw:rounded-full tw:bg-parchment/5 tw:blur-2xl" />
              <Globe
                key={country.code}
                className="tw:relative tw:z-10 tw:w-full"
                markers={markers}
                arcs={arcs}
                focusLocation={country.location}
                markerColor={[181 / 255, 80 / 255, 42 / 255]}
                arcColor={[251 / 255, 246 / 255, 238 / 255]}
                baseColor={[1, 1, 1]}
                glowColor={[1, 1, 1]}
                dark={0}
                mapBrightness={8}
                markerSize={0.05}
                markerElevation={0.01}
                arcWidth={1.25}
                arcHeight={0.46}
                speed={0.003}
              />

              <motion.div
                key={`flag-${country.code}`}
                initial={{ opacity: 0, y: 14, scale: 0.82, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                transition={{ type: "spring", stiffness: 90, damping: 14 }}
                className="tw:absolute tw:bottom-8 tw:left-1/2 tw:z-20 tw:flex tw:-translate-x-1/2 tw:items-center tw:gap-2 tw:rounded-full tw:bg-parchment tw:px-4 tw:py-2 tw:font-sans tw:text-sm tw:font-bold tw:text-espresso tw:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.8)]"
              >
                <span className="tw:text-xl">{country.flag}</span>
                {origin.name}
                <ArrowRight className="tw:h-3.5 tw:w-3.5" strokeWidth={1.8} />
                {country.name}
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
