import { Reveal, SectionHead } from "./Reveal";

const reasons = [
  "Choose the right subjects",
  "Build meaningful extracurriculars",
  "Gain real work experience",
  "Explore careers first-hand",
  "Prepare for standardised tests",
  "Develop strong university applications",
];

export function EdgeWhyEarly() {
  return (
    <section id="why-early" className="tw:bg-parchment tw:py-24 tw:md:py-36">
      <div className="tw:mx-auto tw:max-w-6xl tw:px-6">
        <div className="tw:grid tw:gap-12 tw:lg:grid-cols-[1fr_1fr] tw:lg:items-center">
          <SectionHead
            eyebrow="Why Start Early?"
            title="Universities reward years of consistent growth."
            intro="They don't just evaluate Grade 12 results — they look at years of effort, leadership, impact and academic growth. Starting early gives students the time to build all of it."
          />
          <Reveal delay={0.1}>
            <div className="tw:grid tw:gap-3 tw:sm:grid-cols-2">
              {reasons.map((reason, index) => (
                <div
                  key={reason}
                  className="tw:rounded-2xl tw:bg-espresso/[0.04] tw:p-1.5 tw:ring-1 tw:ring-ink-line"
                >
                  <div className="tw:flex tw:h-full tw:items-center tw:gap-3 tw:rounded-[calc(1rem-2px)] tw:bg-parchment tw:px-4 tw:py-4 tw:shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
                    <span className="tw:font-display tw:text-lg tw:text-clay">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="tw:font-sans tw:text-[14px] tw:text-espresso">{reason}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
