import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "motion/react";
import { Reveal, SectionHead } from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Free Consultation",
    body: "Understand goals, interests and aspirations.",
    tags: [],
  },
  {
    n: "02",
    title: "Career Discovery",
    body: "Psychometric testing and career exploration.",
    tags: [],
  },
  {
    n: "03",
    title: "Personal Roadmap",
    body: "A customised action plan across academics, extracurriculars and university preparation.",
    tags: [],
  },
  {
    n: "04",
    title: "Profile Building",
    body: "Turning the plan into visible evidence.",
    tags: ["Internships", "Research", "Leadership", "Community Service", "Projects", "Competitions"],
  },
  {
    n: "05",
    title: "Applications",
    body: "Executing the file through to offers.",
    tags: ["Shortlisting", "Essays", "Scholarships", "Interviews", "Offers", "Visa Guidance"],
  },
];

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      mass: 1,
      stiffness: 52,
      damping: 17,
      delay: index * 0.08,
    },
  }),
};

export function EdgeProcess() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activeStep = steps[active];

  useEffect(() => {
    const nodes = stepRefs.current.filter((node): node is HTMLDivElement => Boolean(node));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const index = Number((visible?.target as HTMLElement | undefined)?.dataset.stepIndex);
        if (Number.isFinite(index)) setActive(index);
      },
      { rootMargin: "-28% 0px -42% 0px", threshold: [0.18, 0.36, 0.54, 0.72] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="tw:relative tw:scroll-mt-36 tw:overflow-hidden tw:bg-parchment tw:py-24 tw:md:py-36">
      <div className="tw:pointer-events-none tw:absolute tw:inset-0" aria-hidden="true">
        <div className="tw:absolute tw:left-[-10%] tw:top-[12%] tw:h-[360px] tw:w-[360px] tw:rounded-full tw:bg-gold/10 tw:blur-[110px]" />
        <div className="tw:absolute tw:right-[-12%] tw:bottom-[6%] tw:h-[420px] tw:w-[420px] tw:rounded-full tw:bg-clay/10 tw:blur-[120px]" />
      </div>
      <div className="tw:mx-auto tw:max-w-5xl tw:px-6">
        <SectionHead
          eyebrow="Our Process"
          title="Five steps from first conversation to offer."
        />

        <div className="tw:relative tw:mt-14 tw:grid tw:gap-10 tw:lg:grid-cols-[0.82fr_1.18fr] tw:lg:items-start">
          <Reveal className="tw:lg:sticky tw:lg:top-32">
            <aside className="tw:rounded-[2rem] tw:bg-espresso tw:p-2 tw:shadow-[0_34px_80px_-40px_rgba(35,24,15,0.65)]">
              <div className="tw:rounded-[calc(2rem-0.5rem)] tw:bg-espresso-soft/35 tw:p-7 tw:text-parchment tw:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                <div className="tw:flex tw:items-center tw:justify-between tw:font-sans tw:text-[11px] tw:uppercase tw:tracking-[0.16em] tw:text-parchment/45">
                  <span>Reading now</span>
                  <span>{activeStep.n} / 05</span>
                </div>
                <motion.div
                  key={activeStep.n}
                  initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ type: "spring", stiffness: 70, damping: 16 }}
                >
                  <h3 className="tw:mt-6 tw:font-display tw:text-4xl tw:leading-none">{activeStep.title}</h3>
                  <p className="tw:mt-4 tw:font-sans tw:text-[14px] tw:leading-relaxed tw:text-parchment/68">
                    {activeStep.body}
                  </p>
                </motion.div>
                <div className="tw:mt-7 tw:grid tw:grid-cols-5 tw:gap-2">
                  {steps.map((step, index) => (
                    <button
                      key={step.n}
                      type="button"
                      onClick={() => stepRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                      aria-label={`Jump to ${step.title}`}
                      className="tw:h-1.5 tw:rounded-full tw:bg-parchment/15 tw:outline-none tw:transition-colors tw:duration-500"
                    >
                      <span
                        className="tw:block tw:h-full tw:rounded-full tw:bg-clay tw:transition-transform tw:duration-500 tw:ease-[cubic-bezier(0.32,0.72,0,1)]"
                        style={{ transform: index <= active ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left" }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </Reveal>

          <div className="tw:flex tw:flex-col tw:gap-7">
            {steps.map((step, index) => {
              const isActive = index === active;
              return (
                <motion.div
                  key={step.n}
                  ref={(node) => {
                    stepRefs.current[index] = node;
                  }}
                  data-step-index={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.32 }}
                  variants={stepVariants}
                  className="tw:relative tw:grid tw:grid-cols-[auto_1fr] tw:gap-5"
                >
                  <div className="tw:flex tw:flex-col tw:items-center">
                    <motion.span
                      className="tw:flex tw:h-12 tw:w-12 tw:items-center tw:justify-center tw:rounded-full tw:font-display tw:text-lg tw:transition-colors tw:duration-500"
                      style={{
                        width: 48,
                        height: 48,
                        backgroundColor: isActive ? "#b5502a" : "#23180f",
                        color: "#fbf6ee",
                      }}
                      animate={{
                        scale: isActive ? 1.08 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 180, damping: 18 }}
                    >
                      {step.n}
                    </motion.span>
                    {index < steps.length - 1 && (
                      <span className="tw:mt-2 tw:w-px tw:flex-1 tw:bg-ink-line">
                        <span
                          className="tw:block tw:w-px tw:bg-clay tw:transition-[height] tw:duration-700"
                          style={{ height: index < active ? "100%" : isActive ? "45%" : "0%" }}
                        />
                      </span>
                    )}
                  </div>
                  <motion.article
                    className="tw:rounded-[1.6rem] tw:p-1.5 tw:ring-1 tw:transition-colors tw:duration-500"
                    style={{
                      backgroundColor: isActive ? "rgba(181,80,42,0.13)" : "rgba(35,24,15,0.04)",
                      borderColor: isActive ? "rgba(181,80,42,0.26)" : "rgba(35,24,15,0.1)",
                    }}
                  >
                    <div className="tw:rounded-[calc(1.6rem-0.375rem)] tw:bg-parchment tw:p-6 tw:shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] tw:md:p-7">
                      <div className="tw:flex tw:flex-wrap tw:items-baseline tw:justify-between tw:gap-3">
                        <h3 className="tw:font-display tw:text-2xl tw:text-espresso">{step.title}</h3>
                        <span className="tw:font-sans tw:text-[11px] tw:uppercase tw:tracking-[0.16em] tw:text-clay/70">
                          Step {step.n}
                        </span>
                      </div>
                      <p className="tw:mt-2 tw:font-sans tw:text-[14px] tw:leading-relaxed tw:text-espresso-soft/70">
                        {step.body}
                      </p>
                      {step.tags.length > 0 && (
                        <div className="tw:mt-4 tw:flex tw:flex-wrap tw:gap-2">
                          {step.tags.map((tag) => (
                            <span
                              key={tag}
                              className="tw:rounded-full tw:bg-clay/10 tw:px-3 tw:py-1 tw:font-sans tw:text-[12px] tw:font-medium tw:text-clay"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.article>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
