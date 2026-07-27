import { ArrowUpRight } from "lucide-react";
import { CountUpStat } from "./CountUpStat";
import { Reveal } from "./Reveal";
import { UniversityLogo } from "./UniversityLogo";
import { DESTINATIONS } from "@/data/destinations";

// Derived from the same source the globe and hero strip read, so these can
// never drift out of sync with the destinations actually shown on the site.
const DESTINATION_COUNT = DESTINATIONS.length;
const UNIVERSITY_COUNT = DESTINATIONS.reduce((total, d) => total + d.universities.length, 0);

// One flagship per destination, for the proof strip.
const SHOWCASE = DESTINATIONS.slice(0, 8).map((d) => d.universities[0]);

export function EdgeProof() {
  return (
    <section id="proof" className="tw:bg-parchment tw:pb-24 tw:pt-8 tw:md:pb-28 tw:md:pt-10">
      <div className="tw:mx-auto tw:max-w-6xl tw:px-6">
        <Reveal className="tw:max-w-xl">
          <span className="tw:font-sans tw:text-[11px] tw:font-semibold tw:uppercase tw:tracking-[0.18em] tw:text-clay">
            Results Snapshot
          </span>
          <h2 className="tw:mt-4 tw:font-display tw:text-4xl tw:leading-tight tw:text-espresso tw:md:text-5xl">
            Proof before process.
          </h2>
        </Reveal>

        {/* 6 x 3 grid that tiles exactly:
            row 1  [ A A | B B B B ]
            row 2  [ A A | C C | D D ]
            row 3  [ E E E E | F F ]  */}
        <div className="tw:mt-14 tw:grid tw:grid-cols-1 tw:gap-4 tw:sm:grid-cols-2 tw:lg:grid-cols-6 tw:lg:auto-rows-[148px]">
          {/* A — headline placement number */}
          <Reveal className="tw:sm:col-span-2 tw:lg:col-span-2 tw:lg:row-span-2">
            <article className="tw:h-full tw:rounded-[1.75rem] tw:bg-espresso/[0.04] tw:p-1.5 tw:ring-1 tw:ring-ink-line">
              <div className="tw:flex tw:h-full tw:flex-col tw:justify-between tw:gap-4 tw:rounded-[calc(1.75rem-0.375rem)] tw:bg-espresso tw:p-6 tw:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                <span className="tw:font-sans tw:text-[10px] tw:font-semibold tw:uppercase tw:tracking-[0.16em] tw:text-parchment/40">
                  Verified placements
                </span>
                <span className="tw:font-display tw:text-6xl tw:leading-none tw:text-parchment">
                  <CountUpStat end={12} suffix="+" label="12 plus verified placements" />
                </span>
                <span className="tw:font-sans tw:text-[13px] tw:leading-relaxed tw:text-parchment/60">
                  Students placed at universities across our destination list — each one a single,
                  individually built application file.
                </span>
              </div>
            </article>
          </Reveal>

          {/* B — student quote, with the university's own mark attached */}
          <Reveal delay={0.05} className="tw:sm:col-span-2 tw:lg:col-span-4">
            <article className="tw:h-full tw:rounded-[1.75rem] tw:bg-espresso/[0.04] tw:p-1.5 tw:ring-1 tw:ring-ink-line">
              <div className="tw:flex tw:h-full tw:flex-col tw:justify-center tw:gap-4 tw:rounded-[calc(1.75rem-0.375rem)] tw:bg-parchment tw:px-7 tw:py-6 tw:shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
                <p className="tw:font-display tw:text-xl tw:italic tw:leading-snug tw:text-espresso tw:md:text-2xl">
                  "Their personalized approach and insight into my strengths helped me stand out."
                </p>
                <div className="tw:flex tw:items-center tw:gap-3">
                  <UniversityLogo name="Boston University" mark="BU" size="sm" />
                  <span className="tw:font-sans tw:text-xs">
                    <b className="tw:text-espresso">Isha Chauhan</b>
                    <span className="tw:ml-2 tw:text-espresso-soft/50">Boston University</span>
                  </span>
                </div>
              </div>
            </article>
          </Reveal>

          {/* C — destinations covered */}
          <Reveal delay={0.1} className="tw:lg:col-span-2">
            <article className="tw:h-full tw:rounded-[1.75rem] tw:bg-espresso/[0.04] tw:p-1.5 tw:ring-1 tw:ring-ink-line">
              <div className="tw:flex tw:h-full tw:flex-col tw:justify-center tw:gap-1 tw:rounded-[calc(1.75rem-0.375rem)] tw:bg-gold-soft tw:px-6 tw:py-5">
                <span className="tw:font-display tw:text-4xl tw:leading-none tw:text-espresso">
                  <CountUpStat end={DESTINATION_COUNT} label={`${DESTINATION_COUNT} destination countries`} />
                </span>
                <span className="tw:font-sans tw:text-[13px] tw:leading-snug tw:text-espresso-soft/70">
                  destination countries, each with its own admissions grammar.
                </span>
              </div>
            </article>
          </Reveal>

          {/* D — universities covered */}
          <Reveal delay={0.15} className="tw:lg:col-span-2">
            <article className="tw:h-full tw:rounded-[1.75rem] tw:bg-espresso/[0.04] tw:p-1.5 tw:ring-1 tw:ring-ink-line">
              <div className="tw:flex tw:h-full tw:flex-col tw:justify-center tw:gap-1 tw:rounded-[calc(1.75rem-0.375rem)] tw:bg-parchment tw:px-6 tw:py-5 tw:shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
                <span className="tw:font-display tw:text-4xl tw:leading-none tw:text-espresso">
                  <CountUpStat end={UNIVERSITY_COUNT} label={`${UNIVERSITY_COUNT} representative universities`} />
                </span>
                <span className="tw:font-sans tw:text-[13px] tw:leading-snug tw:text-espresso-soft/70">
                  representative universities mapped across those systems.
                </span>
              </div>
            </article>
          </Reveal>

          {/* E — logo proof strip */}
          <Reveal delay={0.1} className="tw:sm:col-span-2 tw:lg:col-span-4">
            <article className="tw:h-full tw:rounded-[1.75rem] tw:bg-espresso/[0.04] tw:p-1.5 tw:ring-1 tw:ring-ink-line">
              <div className="tw:flex tw:h-full tw:flex-col tw:justify-center tw:gap-3 tw:rounded-[calc(1.75rem-0.375rem)] tw:bg-parchment tw:px-6 tw:py-5 tw:shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
                <span className="tw:font-sans tw:text-[10px] tw:font-semibold tw:uppercase tw:tracking-[0.16em] tw:text-espresso-soft/45">
                  Where our guidance points
                </span>
                <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
                  {SHOWCASE.map((university) => (
                    <UniversityLogo
                      key={university.name}
                      name={university.name}
                      mark={university.mark}
                      size="sm"
                    />
                  ))}
                </div>
              </div>
            </article>
          </Reveal>

          {/* F — story CTA */}
          <Reveal delay={0.15} className="tw:sm:col-span-2 tw:lg:col-span-2">
            <article className="tw:h-full tw:rounded-[1.75rem] tw:bg-clay tw:p-1.5">
              <a
                href="#testimonials"
                className="tw:group tw:flex tw:h-full tw:items-center tw:justify-between tw:gap-4 tw:rounded-[calc(1.75rem-0.375rem)] tw:bg-clay tw:px-6 tw:py-5 tw:font-sans tw:text-sm tw:font-semibold tw:text-parchment"
              >
                Read student story
                <span className="tw:flex tw:h-8 tw:w-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:bg-parchment/15 tw:transition-transform tw:duration-700 tw:ease-[cubic-bezier(0.32,0.72,0,1)] tw:group-hover:translate-x-0.5 tw:group-hover:-translate-y-0.5">
                  <ArrowUpRight className="tw:h-3.5 tw:w-3.5" strokeWidth={1.5} />
                </span>
              </a>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
