import { ArrowUpRight } from "lucide-react";
import { CountUpStat } from "./CountUpStat";
import { Reveal } from "./Reveal";

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

        <div className="tw:mt-14 tw:grid tw:grid-cols-1 tw:gap-4 tw:lg:grid-cols-6 tw:lg:auto-rows-[148px]">
          <Reveal className="tw:lg:col-span-2 tw:lg:row-span-2">
            <article className="tw:h-full tw:rounded-[1.75rem] tw:bg-espresso/[0.04] tw:p-1.5 tw:ring-1 tw:ring-ink-line">
              <div className="tw:flex tw:h-full tw:flex-col tw:justify-between tw:rounded-[calc(1.75rem-0.375rem)] tw:bg-espresso tw:p-6 tw:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                <span className="tw:font-display tw:text-5xl tw:text-parchment">
                  <CountUpStat end={12} suffix="+" label="12 plus verified placements" />
                </span>
                <span className="tw:font-sans tw:text-[13px] tw:text-parchment/60">verified university placements currently showcased.</span>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.05} className="tw:lg:col-span-2">
            <article className="tw:h-full tw:rounded-[1.75rem] tw:bg-espresso/[0.04] tw:p-1.5 tw:ring-1 tw:ring-ink-line">
              <div className="tw:flex tw:h-full tw:flex-col tw:justify-center tw:gap-1.5 tw:rounded-[calc(1.75rem-0.375rem)] tw:bg-parchment tw:px-6 tw:shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
                <span className="tw:font-display tw:text-lg tw:italic tw:text-clay">EDGE</span>
                <p className="tw:font-sans tw:text-[13px] tw:text-espresso-soft/70">Small cohorts. Global admissions. One student file.</p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1} className="tw:lg:col-span-2">
            <article className="tw:h-full tw:rounded-[1.75rem] tw:bg-clay tw:p-1.5">
              <a
                href="#testimonials"
                className="tw:group tw:flex tw:h-full tw:items-center tw:justify-between tw:rounded-[calc(1.75rem-0.375rem)] tw:bg-clay tw:px-6 tw:font-sans tw:text-sm tw:font-semibold tw:text-parchment"
              >
                Read student story
                <span className="tw:flex tw:h-8 tw:w-8 tw:items-center tw:justify-center tw:rounded-full tw:bg-parchment/15 tw:transition-transform tw:duration-700 tw:ease-[cubic-bezier(0.32,0.72,0,1)] tw:group-hover:translate-x-0.5 tw:group-hover:-translate-y-0.5">
                  <ArrowUpRight className="tw:h-3.5 tw:w-3.5" strokeWidth={1.5} />
                </span>
              </a>
            </article>
          </Reveal>

          <Reveal delay={0.05} className="tw:lg:col-span-2">
            <article className="tw:h-full tw:rounded-[1.75rem] tw:bg-espresso/[0.04] tw:p-1.5 tw:ring-1 tw:ring-ink-line">
              <div className="tw:flex tw:h-full tw:items-center tw:justify-center tw:rounded-[calc(1.75rem-0.375rem)] tw:bg-parchment tw:shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
                <span className="tw:font-display tw:text-3xl tw:italic tw:text-espresso">Fit</span>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1} className="tw:lg:col-span-4">
            <article className="tw:h-full tw:rounded-[1.75rem] tw:bg-espresso/[0.04] tw:p-1.5 tw:ring-1 tw:ring-ink-line">
              <div className="tw:flex tw:h-full tw:flex-col tw:justify-center tw:gap-3 tw:rounded-[calc(1.75rem-0.375rem)] tw:bg-parchment tw:px-7 tw:py-5 tw:shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
                <p className="tw:font-display tw:text-lg tw:italic tw:leading-snug tw:text-espresso">
                  "Their personalized approach and insight into my strengths helped me stand out."
                </p>
                <div className="tw:flex tw:items-center tw:gap-2 tw:font-sans tw:text-xs">
                  <b className="tw:text-espresso">Isha Chauhan</b>
                  <span className="tw:text-espresso-soft/50">Boston University</span>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.05} className="tw:lg:col-span-2 tw:lg:row-span-2">
            <article className="tw:h-full tw:rounded-[1.75rem] tw:bg-espresso/[0.04] tw:p-1.5 tw:ring-1 tw:ring-ink-line">
              <div className="tw:flex tw:h-full tw:flex-col tw:justify-between tw:rounded-[calc(1.75rem-0.375rem)] tw:bg-gold-soft tw:p-6">
                <span className="tw:font-display tw:text-5xl tw:text-espresso">
                  <CountUpStat end={4} label="4 global destination tracks" />
                </span>
                <span className="tw:font-sans tw:text-[13px] tw:text-espresso-soft/70">global destination tracks with scholarship planning.</span>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
