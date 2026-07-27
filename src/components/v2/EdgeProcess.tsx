import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { SectionHead } from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Free Consultation",
    body: "We begin with a real conversation about goals, interests, concerns and the decisions already on the table.",
    image: "/images/process/enhanced/free-consultation-4x-enhanced.webp",
    imageAlt: "A counsellor and student talking through goals at a laptop",
    imageLabel: "Begin with context",
    tags: ["Goals", "Interests", "Family priorities"],
  },
  {
    n: "02",
    title: "Career Discovery",
    body: "Psychometric evidence and guided exploration reveal the directions worth experiencing more deeply.",
    image: "/images/process/enhanced/career-discovery-4x-enhanced.webp",
    imageAlt: "A student mapping career ideas across a large wall of sketches",
    imageLabel: "Find the signal",
    tags: ["Psychometrics", "Exploration", "Exposure"],
  },
  {
    n: "03",
    title: "Personal Roadmap",
    body: "The findings become a customised plan across academics, profile development and university preparation.",
    image: "/images/process/enhanced/personal-roadmap-4x-enhanced.webp",
    imageAlt: "Planning a personalised academic roadmap",
    imageLabel: "Shape the plan",
    tags: ["Subjects", "Milestones", "Country logic"],
  },
  {
    n: "04",
    title: "Profile Building",
    body: "Students turn intention into visible evidence through projects, research, leadership and practical experience.",
    image: "/images/process/enhanced/profile-building-4x-enhanced.webp",
    imageAlt: "Students building a profile through projects and collaboration",
    imageLabel: "Make it visible",
    tags: ["Internships", "Research", "Leadership", "Projects"],
  },
  {
    n: "05",
    title: "Applications",
    body: "We execute the final file with care, from shortlisting and essays through interviews, offers and visa guidance.",
    image: "/images/process/enhanced/applications-4x-enhanced.webp",
    imageAlt: "Completing and submitting university applications",
    imageLabel: "Move to decision",
    tags: ["Shortlisting", "Essays", "Offers", "Visa"],
  },
];

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      mass: 1,
      stiffness: 52,
      damping: 17,
      delay: index * 0.06,
    },
  }),
};

export function EdgeProcess() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

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
      { rootMargin: "-30% 0px -44% 0px", threshold: [0.12, 0.28, 0.44, 0.6] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const jumpToStep = (index: number) => {
    setActive(index);
    stepRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="process" className="tw:relative tw:scroll-mt-36 tw:overflow-clip tw:bg-parchment tw:py-24 tw:md:py-36">
      <div className="tw:pointer-events-none tw:absolute tw:inset-0" aria-hidden="true">
        <div className="tw:absolute tw:left-[-10%] tw:top-[12%] tw:h-[360px] tw:w-[360px] tw:rounded-full tw:bg-gold/10 tw:blur-[110px]" />
        <div className="tw:absolute tw:right-[-12%] tw:bottom-[6%] tw:h-[420px] tw:w-[420px] tw:rounded-full tw:bg-clay/10 tw:blur-[120px]" />
      </div>

      <div className="tw:relative tw:mx-auto tw:max-w-6xl tw:px-6">
        <SectionHead
          eyebrow="Our Process"
          title="Five steps from first conversation to offer."
          intro="Follow the process in order. As each step becomes relevant, its picture opens and the rest make room."
        />

        <div className="tw:mt-14 tw:grid tw:gap-12 tw:lg:grid-cols-[1.16fr_0.84fr] tw:lg:items-start tw:lg:gap-16">
          <div className="tw:sticky tw:top-24 tw:z-10 tw:-mx-2 tw:bg-parchment/95 tw:px-2 tw:py-3 tw:backdrop-blur-sm tw:lg:top-32 tw:lg:mx-0 tw:lg:bg-transparent tw:lg:px-0 tw:lg:py-0 tw:lg:backdrop-blur-none">
            <div className="tw:flex tw:h-[40svh] tw:min-h-[300px] tw:w-full tw:gap-1.5 tw:overflow-visible tw:sm:gap-2 tw:lg:h-[560px]">
              {steps.map((step, index) => {
                const isActive = index === active;
                return (
                  <motion.button
                    key={step.n}
                    type="button"
                    onClick={() => jumpToStep(index)}
                    aria-label={`Show ${step.title}`}
                    aria-current={isActive ? "step" : undefined}
                    className="tw:group tw:relative tw:min-w-0 tw:overflow-hidden tw:rounded-lg tw:text-left tw:outline-none tw:ring-clay tw:focus-visible:ring-2 tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-parchment"
                    initial={false}
                    animate={{
                      flexGrow: isActive ? 7 : 0.62,
                      opacity: isActive ? 1 : 0.66,
                    }}
                    transition={{ type: "spring", stiffness: 145, damping: 23, mass: 0.8 }}
                    style={{ flexBasis: 0 }}
                  >
                    {/* Keep the active panel crisp while collapsed panels can
                        stay lazy to avoid loading all five images at once. */}
                    <motion.img
                      src={step.image}
                      srcSet={`${step.image} 2x`}
                      alt={step.imageAlt}
                      loading={isActive ? "eager" : "lazy"}
                      fetchPriority={isActive ? "high" : "auto"}
                      decoding="async"
                      className="tw:absolute tw:inset-0 tw:h-full tw:w-full tw:object-cover"
                      animate={{ scale: isActive ? 1 : 1.08 }}
                      transition={{ duration: 0.75, ease: [0.32, 0.72, 0, 1] }}
                    />
                    <div
                      className="tw:absolute tw:inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(18,33,43,0.01) 34%, rgba(18,33,43,0.82) 70%, rgba(18,33,43,0.97) 100%)",
                      }}
                    />

                    <AnimatePresence initial={false}>
                      {isActive ? (
                        <motion.div
                          key="open"
                          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                          transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                          className="tw:absolute tw:inset-x-0 tw:bottom-0 tw:min-w-[220px] tw:p-5 tw:text-parchment tw:md:p-7"
                        >
                          <div className="tw:font-sans tw:text-[10px] tw:font-semibold tw:uppercase tw:tracking-[0.16em] tw:text-parchment/55">
                            Step {step.n} / {step.imageLabel}
                          </div>
                          <h3 className="tw:mt-2 tw:font-display tw:text-2xl tw:leading-none tw:md:text-4xl">{step.title}</h3>
                        </motion.div>
                      ) : (
                        <motion.span
                          key="closed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="tw:absolute tw:bottom-5 tw:left-1/2 tw:font-sans tw:text-[9px] tw:font-semibold tw:tracking-[0.14em] tw:text-parchment/80"
                          style={{ writingMode: "vertical-rl", transform: "translateX(-50%) rotate(180deg)" }}
                        >
                          {step.n}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>

            <div className="tw:mt-4 tw:flex tw:items-center tw:justify-between tw:font-sans tw:text-[9px] tw:font-semibold tw:uppercase tw:tracking-[0.15em] tw:text-espresso-soft/38">
              <span>Scroll to follow</span>
              <span>{steps[active].n} / 05</span>
            </div>
          </div>

          <div className="tw:flex tw:flex-col">
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
                  viewport={{ once: true, amount: 0.24 }}
                  variants={stepVariants}
                  className="tw:flex tw:min-h-[48svh] tw:items-center tw:border-t tw:border-ink-line tw:py-10 tw:first:border-t-espresso tw:lg:min-h-[54vh]"
                >
                  <article className="tw:w-full">
                    <div className="tw:flex tw:items-center tw:justify-between tw:gap-6">
                      <motion.span
                        className="tw:font-display tw:text-3xl"
                        animate={{ color: isActive ? "#c46f52" : "rgba(36,51,58,0.28)", scale: isActive ? 1.08 : 1 }}
                        transition={{ type: "spring", stiffness: 180, damping: 18 }}
                      >
                        {step.n}
                      </motion.span>
                      <span className={`tw:h-px tw:flex-1 tw:transition-colors tw:duration-500 ${isActive ? "tw:bg-clay/50" : "tw:bg-ink-line"}`} />
                      <span className="tw:font-sans tw:text-[9px] tw:font-semibold tw:uppercase tw:tracking-[0.16em] tw:text-espresso-soft/38">
                        {step.imageLabel}
                      </span>
                    </div>
                    <h3 className={`tw:mt-6 tw:font-display tw:text-4xl tw:leading-none tw:transition-colors tw:duration-500 ${isActive ? "tw:text-clay" : "tw:text-espresso"}`}>
                      {step.title}
                    </h3>
                    <p className="tw:mt-4 tw:max-w-lg tw:font-sans tw:text-[15px] tw:leading-relaxed tw:text-espresso-soft/68">{step.body}</p>
                    <div className="tw:mt-6 tw:flex tw:flex-wrap tw:gap-x-5 tw:gap-y-2">
                      {step.tags.map((tag) => (
                        <span key={tag} className="tw:font-sans tw:text-[10px] tw:font-semibold tw:uppercase tw:tracking-[0.12em] tw:text-espresso-soft/45">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
