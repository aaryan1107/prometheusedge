import { Reveal, SectionHead } from "./Reveal";

const bands = [
  {
    grade: "Grade 8–10",
    label: "Early Foundations",
    theme: "light" as const,
    services: [
      "Early Career Discovery",
      "Subject Selection Guidance",
      "Career Assessments",
      "Psychometric Testing",
      "Career Exploration",
      "Academic Planning",
      "Extracurricular Roadmap",
      "Olympiad Planning",
      "Competition Guidance",
      "Summer School Planning",
      "Leadership Development",
      "Parent Counselling",
    ],
  },
  {
    grade: "Grade 11–12",
    label: "Everything above, plus applications",
    theme: "dark" as const,
    services: [
      "University Shortlisting",
      "Country Selection",
      "Application Strategy",
      "College List Building",
      "Personal Statement Guidance",
      "Essay Reviews",
      "Recommendation Guidance",
      "Interview Preparation",
      "Scholarship Guidance",
      "Portfolio Building",
      "SAT / ACT Planning",
      "IELTS / TOEFL",
      "AP Planning",
      "UCAS Guidance",
      "US / Canada Applications",
      "Europe / Singapore Applications",
      "Australia / Dubai Applications",
      "Gap Year Planning",
    ],
  },
];

export function EdgeServices() {
  return (
    <section id="services" className="tw:bg-parchment-deep tw:py-24 tw:md:py-36">
      <div className="tw:mx-auto tw:max-w-6xl tw:px-6">
        <SectionHead
          eyebrow="Our Services"
          title="A complete plan for every stage."
          intro="What we cover grows with the student — foundations first, then the full application engine as decisions get real."
        />

        <div className="tw:mt-14 tw:grid tw:gap-5 tw:lg:grid-cols-2">
          {bands.map((band, index) => {
            const dark = band.theme === "dark";
            return (
              <Reveal key={band.grade} delay={index * 0.1}>
                <article
                  className="tw:h-full tw:rounded-[2rem] tw:p-2 tw:ring-1"
                  style={{
                    background: dark ? "var(--color-espresso)" : "rgba(35,24,15,0.05)",
                    borderColor: "var(--color-ink-line)",
                  }}
                >
                  <div
                    className="tw:flex tw:h-full tw:flex-col tw:rounded-[calc(2rem-0.5rem)] tw:p-8 tw:md:p-9"
                    style={{
                      background: dark ? "var(--color-espresso)" : "var(--color-parchment)",
                      boxShadow: dark ? "none" : "inset 0 1px 1px rgba(255,255,255,0.7)",
                    }}
                  >
                    <div className="tw:flex tw:items-center tw:justify-between">
                      <div>
                        <h3
                          className="tw:font-display tw:text-3xl"
                          style={{ color: dark ? "var(--color-parchment)" : "var(--color-espresso)" }}
                        >
                          {band.grade}
                        </h3>
                        <p
                          className="tw:mt-1 tw:font-sans tw:text-[12px] tw:uppercase tw:tracking-[0.14em]"
                          style={{ color: dark ? "var(--color-gold)" : "var(--color-clay)" }}
                        >
                          {band.label}
                        </p>
                      </div>
                      <span
                        className="tw:flex tw:h-11 tw:w-11 tw:items-center tw:justify-center tw:rounded-full tw:font-display tw:text-lg"
                        style={{
                          background: dark ? "var(--color-clay)" : "var(--color-espresso)",
                          color: "var(--color-parchment)",
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <ul className="tw:mt-7 tw:flex tw:flex-wrap tw:gap-2">
                      {band.services.map((service) => (
                        <li
                          key={service}
                          className="tw:rounded-full tw:px-3.5 tw:py-1.5 tw:font-sans tw:text-[12.5px] tw:font-medium"
                          style={{
                            background: dark ? "rgba(251,246,238,0.08)" : "rgba(35,24,15,0.05)",
                            color: dark ? "var(--color-parchment)" : "var(--color-espresso-soft)",
                          }}
                        >
                          {service}
                        </li>
                      ))}
                    </ul>
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
