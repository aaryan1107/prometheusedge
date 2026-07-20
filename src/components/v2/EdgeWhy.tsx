import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "./gsapConfig";

type Reason = {
  number: string;
  title: string;
  body: string;
  kicker: string;
  background: string;
  color: string;
  accent: string;
};

const reasons: Reason[] = [
  {
    number: "01",
    title: "Personalised Guidance",
    body: "Every roadmap is built around the student. No copy-paste university lists and no generic advice.",
    kicker: "Built around you",
    background: "#23180f",
    color: "#fbf6ee",
    accent: "#b5502a",
  },
  {
    number: "02",
    title: "Career First. University Second.",
    body: "We understand who you are before deciding where you should study. Direction comes before destination.",
    kicker: "Direction before destination",
    background: "#b5502a",
    color: "#fbf6ee",
    accent: "#e7d3bf",
  },
  {
    number: "03",
    title: "Long-Term Planning",
    body: "Subject choices, projects, leadership and experience are shaped over years, not assembled in Grade 12.",
    kicker: "Years, not weeks",
    background: "#b8863f",
    color: "#23180f",
    accent: "#fbf6ee",
  },
  {
    number: "04",
    title: "Real Exposure",
    body: "Internships, job shadowing and industry conversations let students experience a career before choosing it.",
    kicker: "Experience before choice",
    background: "#3a2b1c",
    color: "#fbf6ee",
    accent: "#b8863f",
  },
  {
    number: "05",
    title: "Independent Advice",
    body: "Recommendations are based solely on student fit, never university partnerships or commissions.",
    kicker: "Your fit is the filter",
    background: "#f3ead9",
    color: "#23180f",
    accent: "#b5502a",
  },
];

const desktopPositions = [
  { x: "-32vw", y: "-19vh", rotation: -4.5 },
  { x: "0vw", y: "-21vh", rotation: 1.5 },
  { x: "32vw", y: "-18vh", rotation: 4 },
  { x: "-17vw", y: "20vh", rotation: -2.5 },
  { x: "17vw", y: "20vh", rotation: 3 },
];

const mobilePositions = [
  { x: "-19vw", y: "-25vh", rotation: -3 },
  { x: "18vw", y: "-11vh", rotation: 2.5 },
  { x: "-17vw", y: "3vh", rotation: -2 },
  { x: "18vw", y: "17vh", rotation: 2 },
  { x: "-15vw", y: "31vh", rotation: -1.5 },
];

export function EdgeWhy() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const stackLabelRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLElement | null>>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const intro = introRef.current;
      const stackLabel = stackLabelRef.current;
      const cards = cardsRef.current.filter(Boolean) as HTMLElement[];

      if (!section || !intro || !stackLabel || cards.length === 0) return;

      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 900px)",
          mobile: "(max-width: 899px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, reduceMotion } = context.conditions as {
            desktop: boolean;
            mobile: boolean;
            reduceMotion: boolean;
          };
          const positions = desktop ? desktopPositions : mobilePositions;
          const finalScale = desktop ? 1 : 0.72;

          gsap.set(cards, {
            x: 0,
            y: desktop ? 34 : 54,
            scale: desktop ? 0.82 : 0.7,
            rotation: (index) => [-5, 3, -2, 4, 0][index],
            autoAlpha: reduceMotion ? 1 : 0,
            transformOrigin: "50% 70%",
          });
          gsap.set(stackLabel, { autoAlpha: reduceMotion ? 0 : 0, y: 12 });

          if (reduceMotion) {
            gsap.set(intro, { autoAlpha: 0 });
            cards.forEach((card, index) => {
              gsap.set(card, {
                x: positions[index].x,
                y: positions[index].y,
                rotation: positions[index].rotation,
                scale: finalScale,
              });
            });
            return;
          }

          const timeline = gsap.timeline({
            defaults: { ease: "power3.inOut" },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.85,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .addLabel("read", 0)
            .to(
              intro,
              {
                autoAlpha: 0,
                y: -72,
                scale: 0.94,
                filter: "blur(10px)",
                duration: 0.22,
              },
              0.16,
            )
            .addLabel("stack", 0.34)
            .to(
              cards,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.13,
                stagger: { each: 0.018, from: "end" },
              },
              "stack",
            )
            .to(stackLabel, { autoAlpha: 1, y: 0, duration: 0.1 }, "stack+=0.04")
            .to(stackLabel, { autoAlpha: 0, y: -12, duration: 0.08 }, 0.48)
            .addLabel("unfold", 0.52);

          cards.forEach((card, index) => {
            timeline.to(
              card,
              {
                x: positions[index].x,
                y: positions[index].y,
                rotation: positions[index].rotation,
                scale: finalScale,
                duration: 0.36,
                ease: "power3.inOut",
              },
              `unfold+=${index * 0.018}`,
            );
          });

          timeline.to(
            cards,
            {
              boxShadow: "0 32px 70px -34px rgba(35, 24, 15, 0.48)",
              duration: 0.12,
            },
            0.86,
          );
        },
      );

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="why"
      className="tw:relative tw:h-[360vh] tw:bg-parchment"
      aria-label="Why The Edge Way"
    >
      <div
        ref={stageRef}
        className="tw:sticky tw:top-0 tw:h-[100svh] tw:overflow-hidden tw:bg-parchment"
      >
        <div className="tw:pointer-events-none tw:absolute tw:inset-0 tw:opacity-55" aria-hidden="true">
          <div className="tw:absolute tw:-left-[10vw] tw:top-[5vh] tw:h-[40vw] tw:w-[40vw] tw:max-h-[580px] tw:max-w-[580px] tw:rounded-full tw:bg-clay/12 tw:blur-[110px]" />
          <div className="tw:absolute tw:-right-[5vw] tw:bottom-[-10vh] tw:h-[38vw] tw:w-[38vw] tw:max-h-[520px] tw:max-w-[520px] tw:rounded-full tw:bg-gold/16 tw:blur-[120px]" />
        </div>

        <div
          ref={introRef}
          className="tw:absolute tw:inset-0 tw:z-20 tw:flex tw:items-center tw:justify-center tw:px-6 tw:will-change-transform"
        >
          <div className="tw:max-w-4xl tw:text-center">
            <span className="tw:font-sans tw:text-[11px] tw:font-bold tw:uppercase tw:tracking-[0.22em] tw:text-clay">
              Why The Edge Way
            </span>
            <h2 className="tw:mt-6 tw:font-display tw:text-5xl tw:leading-[0.98] tw:text-espresso tw:sm:text-6xl tw:lg:text-8xl">
              We begin with the student.
            </h2>
            <p className="tw:mx-auto tw:mt-6 tw:max-w-2xl tw:font-sans tw:text-base tw:leading-relaxed tw:text-espresso-soft/65 tw:md:text-lg">
              Then every decision unfolds around who they are, where they can grow, and what kind of future actually fits.
            </p>
            <div className="tw:mx-auto tw:mt-9 tw:flex tw:w-fit tw:items-center tw:gap-3 tw:font-sans tw:text-[10px] tw:font-semibold tw:uppercase tw:tracking-[0.16em] tw:text-espresso-soft/45">
              <span className="tw:h-px tw:w-8 tw:bg-clay/50" />
              Scroll to unfold
              <span className="tw:h-px tw:w-8 tw:bg-clay/50" />
            </div>
          </div>
        </div>

        <div className="tw:absolute tw:inset-0 tw:z-10 tw:flex tw:items-center tw:justify-center">
          <div
            ref={stackLabelRef}
            className="tw:absolute tw:top-[16vh] tw:z-30 tw:font-sans tw:text-[10px] tw:font-bold tw:uppercase tw:tracking-[0.2em] tw:text-espresso-soft/50"
          >
            One student. Five layers of guidance.
          </div>

          {reasons.map((reason, index) => (
            <article
              key={reason.number}
              ref={(element) => {
                cardsRef.current[index] = element;
              }}
              className="tw:absolute tw:left-1/2 tw:top-1/2 tw:h-[250px] tw:w-[min(300px,76vw)] tw:-translate-x-1/2 tw:-translate-y-1/2 tw:overflow-hidden tw:rounded-[1.35rem] tw:border tw:border-white/15 tw:p-6 tw:will-change-transform tw:md:h-[270px] tw:md:w-[310px]"
              style={{
                background: reason.background,
                color: reason.color,
                zIndex: 20 + index,
                boxShadow: "0 18px 42px -28px rgba(35, 24, 15, 0.36)",
              }}
            >
              <div
                className="tw:absolute tw:-right-12 tw:-top-12 tw:h-36 tw:w-36 tw:rounded-full tw:opacity-25 tw:blur-2xl"
                style={{ background: reason.accent }}
                aria-hidden="true"
              />
              <div className="tw:relative tw:flex tw:h-full tw:flex-col">
                <div className="tw:flex tw:items-center tw:justify-between tw:font-sans tw:text-[10px] tw:font-bold tw:uppercase tw:tracking-[0.16em] tw:opacity-65">
                  <span>{reason.number}</span>
                  <span>{reason.kicker}</span>
                </div>
                <div className="tw:mt-auto">
                  <span
                    className="tw:mb-5 tw:block tw:h-1 tw:w-10 tw:rounded-full"
                    style={{ background: reason.accent }}
                  />
                  <h3 className="tw:font-display tw:text-[1.65rem] tw:leading-[1.02] tw:tracking-normal">
                    {reason.title}
                  </h3>
                  <p className="tw:mt-3 tw:font-sans tw:text-[12px] tw:leading-relaxed tw:opacity-[0.72]">
                    {reason.body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="tw:absolute tw:bottom-6 tw:left-1/2 tw:z-30 tw:-translate-x-1/2 tw:font-sans tw:text-[9px] tw:uppercase tw:tracking-[0.18em] tw:text-espresso-soft/35">
          The Edge Way / 01—05
        </div>
      </div>
    </section>
  );
}
