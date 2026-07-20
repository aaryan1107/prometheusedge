import { Reveal } from "./Reveal";

const helpPoints = [
  "Discover career interests",
  "Explore future opportunities",
  "Build strong academic & extracurricular profiles",
  "Gain practical exposure through internships & projects",
  "Apply strategically to universities worldwide",
];

export function EdgeAbout() {
  return (
    <section id="about" className="tw:bg-parchment-deep tw:py-24 tw:md:py-36">
      <div className="tw:mx-auto tw:max-w-6xl tw:px-6">
        <div className="tw:grid tw:gap-14 tw:lg:grid-cols-[0.95fr_1.05fr] tw:lg:items-center">
          <Reveal>
            <span className="tw:font-sans tw:text-[11px] tw:font-semibold tw:uppercase tw:tracking-[0.18em] tw:text-clay">
              About Us
            </span>
            <h2 className="tw:mt-4 tw:font-display tw:text-4xl tw:leading-[1.08] tw:text-espresso tw:md:text-[2.9rem]">
              Personalised guidance — not generic advice.
            </h2>
            <p className="tw:mt-6 tw:font-sans tw:text-[15px] tw:leading-relaxed tw:text-espresso-soft/75">
              The Edge Way is a boutique career counselling and university guidance platform built on one belief:
              every student deserves guidance shaped around them. Choosing a career is one of the biggest
              decisions a student makes, yet most are expected to decide without truly understanding
              themselves or the opportunities available.
            </p>
            <p className="tw:mt-4 tw:font-sans tw:text-[15px] tw:leading-relaxed tw:text-espresso-soft/75">
              Our goal isn't simply to help students get admitted. It's to help them make informed decisions
              about their future.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="tw:rounded-[2rem] tw:bg-espresso/[0.05] tw:p-2 tw:ring-1 tw:ring-ink-line">
              <div className="tw:rounded-[calc(2rem-0.5rem)] tw:bg-parchment tw:p-8 tw:shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] tw:md:p-10">
                <p className="tw:font-sans tw:text-[12px] tw:font-semibold tw:uppercase tw:tracking-[0.16em] tw:text-clay">
                  We work closely with students to
                </p>
                <ul className="tw:mt-6 tw:flex tw:flex-col tw:divide-y tw:divide-ink-line">
                  {helpPoints.map((point, index) => (
                    <li key={point} className="tw:flex tw:items-center tw:gap-4 tw:py-4">
                      <span className="tw:font-display tw:text-lg tw:text-clay">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="tw:font-sans tw:text-[15px] tw:text-espresso">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
