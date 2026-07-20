import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHead } from "./Reveal";

type MethodFile = {
  code: string;
  tab: string;
  title: string;
  meta: string;
  body: string;
  points: string[];
  theme: string;
  ink: string;
  accent: string;
};

const files: MethodFile[] = [
  {
    code: "FILE 01",
    tab: "Signal",
    title: "Signal Audit",
    meta: "Aptitude · interests · grades",
    body: "We start by finding the student's real signal - who they are and what genuinely pulls them - before any shortlist or essay enters the room.",
    points: ["Psychometric assessment", "Interest & strength mapping", "Academic baseline"],
    theme: "var(--color-graphite)",
    ink: "var(--color-ivory)",
    accent: "var(--color-gold)",
  },
  {
    code: "FILE 02",
    tab: "Profile",
    title: "Profile Evidence",
    meta: "Projects · activities · internships",
    body: "Scattered interests become visible proof - a profile universities can read and believe quickly, built over years rather than crammed in Grade 12.",
    points: ["Extracurricular roadmap", "Internships & research", "Leadership & impact"],
    theme: "var(--color-muted-teal)",
    ink: "var(--color-ivory)",
    accent: "var(--color-gold)",
  },
  {
    code: "FILE 03",
    tab: "Country",
    title: "Country Logic",
    meta: "US · UK · Canada · Europe · Asia",
    body: "Each destination has its own admissions grammar. The roadmap changes by system so every application speaks the right language.",
    points: ["Country & course fit", "Application strategy", "Testing & timeline plan"],
    theme: "var(--color-terracotta)",
    ink: "var(--color-ivory)",
    accent: "var(--color-gold-soft)",
  },
  {
    code: "FILE 04",
    tab: "Story",
    title: "Application Story",
    meta: "Essays · documents · interviews",
    body: "The final file is built like a case: coherent, evidenced and deadline-ready - from personal statement to scholarship and visa guidance.",
    points: ["Essays & personal statement", "Interview preparation", "Scholarships & visa"],
    theme: "var(--color-heritage)",
    ink: "var(--color-ivory)",
    accent: "var(--color-rose-clay)",
  },
];

export function EdgeMethodStack() {
  const [active, setActive] = useState(0);
  const file = files[active];
  const backFile = files[(active + 1) % files.length];
  const middleFile = files[(active + 2) % files.length];

  return (
    <section id="edge-model" className="tw:bg-parchment tw:py-24 tw:md:py-36">
      <div className="tw:mx-auto tw:max-w-6xl tw:px-6">
        <SectionHead
          eyebrow="The EDGE Files"
          title="Our method works like an admissions dossier."
          intro="Each file reveals one part of the student's route - from signal, to evidence, to country logic, to the final application story. Pull one open."
        />

        <div className="tw:mt-14 tw:grid tw:gap-10 tw:lg:grid-cols-[0.78fr_1.22fr] tw:lg:items-center">
          <div className="tw:border-y tw:border-espresso/10">
            {files.map((item, index) => {
              const isActive = index === active;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  aria-pressed={isActive}
                  className="tw:group tw:relative tw:grid tw:w-full tw:grid-cols-[2.5rem_1fr_auto] tw:items-center tw:gap-4 tw:border-b tw:border-espresso/10 tw:px-3 tw:py-5 tw:text-left tw:outline-none tw:transition-all tw:duration-300 tw:last:border-b-0 tw:focus-visible:ring-2 tw:focus-visible:ring-clay tw:focus-visible:ring-inset tw:md:px-4"
                  style={{
                    background: isActive
                      ? item.theme
                      : `color-mix(in oklab, ${item.theme} 7%, var(--color-parchment))`,
                    color: isActive ? item.ink : "var(--color-graphite)",
                    transform: isActive ? "translateX(8px)" : "translateX(0)",
                  }}
                >
                  <span
                    className="tw:font-display tw:text-2xl tw:leading-none tw:transition-opacity"
                    style={{ color: isActive ? item.accent : item.theme, opacity: isActive ? 1 : 0.66 }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>
                    <span
                      className="tw:block tw:font-sans tw:text-[9px] tw:font-bold tw:uppercase tw:tracking-[0.18em]"
                      style={{ color: isActive ? item.accent : item.theme }}
                    >
                      {item.tab} · {item.code}
                    </span>
                    <span className="tw:mt-1 tw:block tw:font-display tw:text-xl tw:leading-tight">
                      {item.title}
                    </span>
                  </span>

                  <ArrowUpRight
                    aria-hidden="true"
                    className="tw:h-5 tw:w-5 tw:transition-transform tw:duration-300 tw:group-hover:translate-x-0.5 tw:group-hover:-translate-y-0.5"
                    strokeWidth={1.6}
                    style={{ color: isActive ? item.accent : item.theme }}
                  />
                </button>
              );
            })}
          </div>

          <div className="tw:relative tw:min-h-[470px] tw:pb-5 tw:pl-3 tw:pt-3 tw:sm:pl-5">
            <div
              aria-hidden="true"
              className="tw:absolute tw:inset-x-2 tw:bottom-1 tw:top-6 tw:rounded-lg tw:opacity-30 tw:transition-colors tw:duration-500"
              style={{ background: middleFile.theme, transform: "rotate(1.2deg) translate(9px, 7px)" }}
            />
            <div
              aria-hidden="true"
              className="tw:absolute tw:inset-x-2 tw:bottom-2 tw:top-5 tw:rounded-lg tw:opacity-55 tw:transition-colors tw:duration-500"
              style={{ background: backFile.theme, transform: "rotate(-0.8deg) translate(-3px, 3px)" }}
            />

            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={file.code}
                initial={{ opacity: 0, y: 18, rotate: -0.6, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, rotate: 0.4, filter: "blur(4px)" }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="tw:relative tw:z-10 tw:flex tw:min-h-[450px] tw:flex-col tw:overflow-hidden tw:rounded-lg tw:p-7 tw:shadow-[0_38px_80px_-42px_rgba(36,51,58,0.7)] tw:md:p-10"
                style={{ background: file.theme, color: file.ink }}
              >
                <div className="tw:flex tw:items-center tw:justify-between tw:font-sans tw:text-[10px] tw:font-bold tw:uppercase tw:tracking-[0.18em] tw:opacity-65">
                  <span>{file.code}</span>
                  <span>The Edge Way Method</span>
                </div>

                <div className="tw:mt-7 tw:h-px tw:w-full tw:bg-white/18" />

                <div className="tw:mt-9 tw:grid tw:gap-8 tw:md:grid-cols-[1fr_8.5rem]">
                  <div>
                    <p
                      className="tw:font-sans tw:text-[10px] tw:font-bold tw:uppercase tw:tracking-[0.18em]"
                      style={{ color: file.accent }}
                    >
                      {file.meta}
                    </p>
                    <h3 className="tw:mt-3 tw:max-w-md tw:font-display tw:text-4xl tw:leading-[1.05] tw:md:text-5xl">
                      {file.title}
                    </h3>
                  </div>
                  <span
                    aria-hidden="true"
                    className="tw:hidden tw:text-right tw:font-display tw:text-7xl tw:leading-none tw:opacity-15 tw:md:block"
                  >
                    {String(active + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="tw:mt-7 tw:max-w-xl tw:font-sans tw:text-[15px] tw:leading-relaxed tw:opacity-76">
                  {file.body}
                </p>

                <ul className="tw:mt-auto tw:grid tw:gap-4 tw:pt-10 tw:sm:grid-cols-3">
                  {file.points.map((point) => (
                    <li
                      key={point}
                      className="tw:border-t tw:border-white/20 tw:pt-3 tw:font-sans tw:text-[12px] tw:font-semibold tw:leading-snug"
                    >
                      <Check
                        aria-hidden="true"
                        className="tw:mb-3 tw:h-4 tw:w-4"
                        strokeWidth={2}
                        style={{ color: file.accent }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
