import { useState } from "react";
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
};

const files: MethodFile[] = [
  {
    code: "FILE 01",
    tab: "Signal",
    title: "Signal Audit",
    meta: "Aptitude · interests · grades",
    body: "We start by finding the student's real signal — who they are and what genuinely pulls them — before any shortlist or essay enters the room.",
    points: ["Psychometric assessment", "Interest & strength mapping", "Academic baseline"],
    theme: "#23180f",
    ink: "#fbf6ee",
  },
  {
    code: "FILE 02",
    tab: "Profile",
    title: "Profile Evidence",
    meta: "Projects · activities · internships",
    body: "Scattered interests become visible proof — a profile universities can read and believe quickly, built over years rather than crammed in Grade 12.",
    points: ["Extracurricular roadmap", "Internships & research", "Leadership & impact"],
    theme: "#b5502a",
    ink: "#fbf6ee",
  },
  {
    code: "FILE 03",
    tab: "Country",
    title: "Country Logic",
    meta: "US · UK · Canada · Europe · Asia",
    body: "Each destination has its own admissions grammar. The roadmap changes by system so every application speaks the right language.",
    points: ["Country & course fit", "Application strategy", "Testing & timeline plan"],
    theme: "#b8863f",
    ink: "#23180f",
  },
  {
    code: "FILE 04",
    tab: "Story",
    title: "Application Story",
    meta: "Essays · documents · interviews",
    body: "The final file is built like a case: coherent, evidenced and deadline-ready — from personal statement to scholarship and visa guidance.",
    points: ["Essays & personal statement", "Interview preparation", "Scholarships & visa"],
    theme: "#3a2b1c",
    ink: "#fbf6ee",
  },
];

export function EdgeMethodStack() {
  const [active, setActive] = useState(0);
  const file = files[active];

  return (
    <section id="edge-model" className="tw:bg-parchment tw:py-24 tw:md:py-36">
      <div className="tw:mx-auto tw:max-w-6xl tw:px-6">
        <SectionHead
          eyebrow="The EDGE Files"
          title="Our method works like an admissions dossier."
          intro="Each file reveals one part of the student's route — from signal, to evidence, to country logic, to the final application story. Pull one open."
        />

        <div className="tw:mt-14 tw:grid tw:gap-8 tw:lg:grid-cols-[0.9fr_1.1fr] tw:lg:items-start">
          <div className="tw:flex tw:flex-col tw:gap-3">
            {files.map((item, index) => {
              const isActive = index === active;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setActive(index)}
                  onPointerEnter={() => setActive(index)}
                  className="tw:group tw:relative tw:text-left tw:outline-none"
                  style={{ zIndex: isActive ? 20 : 10 - index }}
                >
                  <div
                    className="tw:overflow-hidden tw:rounded-[1.4rem] tw:p-1.5 tw:transition-all tw:duration-500 tw:ease-[cubic-bezier(0.32,0.72,0,1)]"
                    style={{
                      background: isActive ? item.theme : "rgba(35,24,15,0.05)",
                      transform: isActive ? "translateY(-4px)" : "none",
                    }}
                  >
                    <div
                      className="tw:flex tw:items-center tw:gap-4 tw:rounded-[calc(1.4rem-0.375rem)] tw:px-5 tw:py-4 tw:transition-colors tw:duration-500"
                      style={{
                        background: isActive ? item.theme : "var(--color-parchment)",
                        color: isActive ? item.ink : "var(--color-espresso)",
                      }}
                    >
                      <span
                        className="tw:flex tw:h-9 tw:min-w-[2.75rem] tw:items-center tw:justify-center tw:rounded-full tw:px-2 tw:font-sans tw:text-[10px] tw:font-bold tw:uppercase tw:tracking-[0.12em]"
                        style={{
                          background: isActive ? "rgba(255,255,255,0.14)" : item.theme,
                          color: isActive ? item.ink : "#fbf6ee",
                        }}
                      >
                        {item.tab}
                      </span>
                      <div className="tw:flex-1">
                        <div className="tw:font-sans tw:text-[10px] tw:uppercase tw:tracking-[0.16em] tw:opacity-60">
                          {item.code}
                        </div>
                        <div className="tw:font-display tw:text-lg">{item.title}</div>
                      </div>
                      <span
                        className="tw:font-sans tw:text-lg tw:transition-transform tw:duration-500 tw:group-hover:translate-x-1"
                        style={{ opacity: isActive ? 1 : 0.35 }}
                      >
                        →
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="tw:relative tw:min-h-[420px]">
            <div
              className="tw:rounded-[2rem] tw:p-2.5 tw:shadow-[0_40px_80px_-40px_rgba(35,24,15,0.5)] tw:transition-colors tw:duration-500"
              style={{ background: file.theme }}
            >
                <article
                  key={file.code}
                  className="swap-in tw:rounded-[calc(2rem-0.625rem)] tw:bg-parchment tw:p-8 tw:md:p-10"
                  style={{ transform: "rotate(-0.4deg)" }}
                >
                  <div className="tw:flex tw:items-center tw:justify-between tw:font-sans tw:text-[11px] tw:uppercase tw:tracking-[0.16em] tw:text-espresso-soft/50">
                    <span>{file.code}</span>
                    <span>The Edge Way Method</span>
                  </div>
                  <div
                    className="tw:mt-6 tw:h-px tw:w-full"
                    style={{ background: "var(--color-ink-line)" }}
                  />
                  <h3 className="tw:mt-6 tw:font-display tw:text-3xl tw:text-espresso">{file.title}</h3>
                  <p className="tw:mt-2 tw:font-sans tw:text-[12px] tw:uppercase tw:tracking-[0.12em] tw:text-clay">
                    {file.meta}
                  </p>
                  <p className="tw:mt-5 tw:font-sans tw:text-[15px] tw:leading-relaxed tw:text-espresso-soft/75">
                    {file.body}
                  </p>
                  <ul className="tw:mt-7 tw:grid tw:gap-2.5">
                    {file.points.map((point) => (
                      <li
                        key={point}
                        className="tw:flex tw:items-center tw:gap-3 tw:font-sans tw:text-sm tw:text-espresso-soft/85"
                      >
                        <span
                          className="tw:flex tw:h-6 tw:w-6 tw:items-center tw:justify-center tw:rounded-full tw:text-[11px] tw:text-parchment"
                          style={{ background: file.theme }}
                        >
                          ✓
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
