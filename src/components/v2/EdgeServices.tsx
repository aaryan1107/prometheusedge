import { Reveal, SectionHead } from "./Reveal";

type ServiceBand = {
  grade: string;
  label: string;
  summary: string;
  theme: "foundation" | "application";
  groups: Array<{
    title: string;
    services: string[];
  }>;
};

const bands: ServiceBand[] = [
  {
    grade: "Grade 8-10",
    label: "Early foundations",
    summary: "A considered start, built around self-awareness, strong choices and time to explore.",
    theme: "foundation",
    groups: [
      {
        title: "Discover",
        services: [
          "Early Career Discovery",
          "Career Assessments",
          "Psychometric Testing",
          "Career Exploration",
        ],
      },
      {
        title: "Plan",
        services: [
          "Subject Selection Guidance",
          "Academic Planning",
          "Olympiad Planning",
          "Competition Guidance",
        ],
      },
      {
        title: "Build",
        services: [
          "Extracurricular Roadmap",
          "Summer School Planning",
          "Leadership Development",
          "Parent Counselling",
        ],
      },
    ],
  },
  {
    grade: "Grade 11-12",
    label: "Everything above, plus applications",
    summary: "The full application engine, coordinated across countries, testing and deadlines.",
    theme: "application",
    groups: [
      {
        title: "Direction",
        services: [
          "University Shortlisting",
          "Country Selection",
          "Application Strategy",
          "College List Building",
        ],
      },
      {
        title: "Story & Case",
        services: [
          "Personal Statement Guidance",
          "Essay Reviews",
          "Recommendation Guidance",
          "Interview Preparation",
          "Portfolio Building",
        ],
      },
      {
        title: "Testing & Funding",
        services: [
          "SAT / ACT Planning",
          "IELTS / TOEFL",
          "AP Planning",
          "Scholarship Guidance",
        ],
      },
      {
        title: "Application Routes",
        services: [
          "US / Canada Applications",
          "UCAS Guidance",
          "Europe / Singapore Applications",
          "Australia / Dubai Applications",
          "Gap Year Planning",
        ],
      },
    ],
  },
];

export function EdgeServices() {
  return (
    <section id="services" className="tw:bg-mineral tw:py-24 tw:md:py-36">
      <div className="tw:mx-auto tw:max-w-6xl tw:px-6">
        <SectionHead
          eyebrow="Our Services"
          title="A complete plan for every stage."
          intro="What we cover grows with the student - foundations first, then the full application engine as decisions get real."
        />

        <div className="tw:mt-14 tw:grid tw:gap-5 tw:lg:grid-cols-[0.9fr_1.1fr]">
          {bands.map((band, index) => {
            const foundation = band.theme === "foundation";
            const foreground = foundation ? "var(--color-graphite)" : "var(--color-chalk)";
            const muted = foundation ? "rgba(36,51,58,0.68)" : "rgba(251,250,246,0.68)";
            const line = foundation ? "rgba(36,51,58,0.16)" : "rgba(251,250,246,0.16)";
            const accent = foundation ? "var(--color-terracotta)" : "var(--color-gold)";

            return (
              <Reveal key={band.grade} delay={index * 0.1} className="tw:h-full">
                <article
                  className="tw:relative tw:h-full tw:overflow-hidden tw:rounded-lg tw:p-7 tw:shadow-[0_28px_60px_-42px_rgba(36,51,58,0.48)] tw:md:p-9"
                  style={{
                    background: foundation ? "var(--color-rose-clay)" : "var(--color-muted-teal)",
                    color: foreground,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="tw:absolute tw:inset-x-0 tw:top-0 tw:h-1"
                    style={{ background: accent }}
                  />

                  <header className="tw:grid tw:grid-cols-[1fr_auto] tw:gap-6 tw:border-b tw:pb-7" style={{ borderColor: line }}>
                    <div>
                      <p
                        className="tw:font-sans tw:text-[10px] tw:font-bold tw:uppercase tw:tracking-[0.18em]"
                        style={{ color: accent }}
                      >
                        Stage {String(index + 1).padStart(2, "0")} · {band.label}
                      </p>
                      <h3 className="tw:mt-3 tw:font-display tw:text-4xl tw:leading-none tw:md:text-[2.7rem]">
                        {band.grade}
                      </h3>
                      <p className="tw:mt-4 tw:max-w-md tw:font-sans tw:text-[13px] tw:leading-relaxed" style={{ color: muted }}>
                        {band.summary}
                      </p>
                    </div>
                    <span
                      className="tw:font-display tw:text-5xl tw:leading-none tw:opacity-20"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </header>

                  <div className={`tw:mt-7 tw:grid tw:gap-x-8 tw:gap-y-7 ${foundation ? "" : "tw:sm:grid-cols-2"}`}>
                    {band.groups.map((group) => (
                      <section key={group.title}>
                        <h4
                          className="tw:font-sans tw:text-[10px] tw:font-bold tw:uppercase tw:tracking-[0.18em]"
                          style={{ color: accent }}
                        >
                          {group.title}
                        </h4>
                        <ul className="tw:mt-2.5">
                          {group.services.map((service) => (
                            <li
                              key={service}
                              className="tw:flex tw:min-h-9 tw:items-center tw:gap-2.5 tw:border-t tw:py-2 tw:font-sans tw:text-[12.5px] tw:font-medium tw:leading-snug"
                              style={{ borderColor: line, color: foreground }}
                            >
                              <span
                                aria-hidden="true"
                                className="tw:h-1.5 tw:w-1.5 tw:shrink-0 tw:rounded-full"
                                style={{ background: accent }}
                              />
                              {service}
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
