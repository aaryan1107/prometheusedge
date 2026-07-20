import { useState } from "react";
import { SectionHead } from "./Reveal";

type Story = { name: string; meta: string; body: string };

const stories: Story[] = [
  {
    name: "Dhruv",
    meta: "Northeastern University · Computer Science",
    body: "The Edge Way helped me navigate the college application process with ease and confidence. Their support was key in helping me achieve my dream of studying Computer Science in the States.",
  },
  {
    name: "Isha Chauhan",
    meta: "Boston University · Cellular Biology",
    body: "With the help of The Edge Way, I received offers from six top universities. Their personalized approach and insight into my strengths helped me stand out.",
  },
  {
    name: "Tamish Shukla",
    meta: "National University of Singapore · Business",
    body: "The Edge Way made the process so smooth and focused. They helped me identify the right universities, and their support in crafting my application led me to NUS.",
  },
  {
    name: "Navdeep Reyat",
    meta: "Proud Parent",
    body: "As a parent, the clarity and empathy they brought to the process were priceless. We felt supported every step of the way.",
  },
];

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2);
}

export function EdgeStories() {
  const [active, setActive] = useState(0);
  const story = stories[active];

  return (
    <section id="testimonials" className="tw:bg-parchment-deep tw:py-24 tw:md:py-36">
      <div className="tw:mx-auto tw:max-w-6xl tw:px-6">
        <SectionHead eyebrow="Success Stories" title="Real journeys, real results." />

        <div className="tw:mt-14 tw:grid tw:gap-6 tw:lg:grid-cols-[1.15fr_0.85fr] tw:lg:items-stretch">
          <div className="tw:rounded-[2rem] tw:bg-espresso tw:p-2">
              <article
                key={story.name}
                className="swap-in tw:flex tw:h-full tw:flex-col tw:justify-between tw:rounded-[calc(2rem-0.5rem)] tw:bg-espresso tw:p-8 tw:md:p-10"
              >
                <div>
                  <span className="tw:font-sans tw:text-[11px] tw:uppercase tw:tracking-[0.16em] tw:text-parchment/40">
                    {String(active + 1).padStart(2, "0")} / {String(stories.length).padStart(2, "0")}
                  </span>
                  <p className="tw:mt-5 tw:font-display tw:text-2xl tw:italic tw:leading-snug tw:text-parchment tw:md:text-[1.75rem]">
                    "{story.body}"
                  </p>
                </div>
                <div className="tw:mt-8 tw:flex tw:items-center tw:gap-3">
                  <div className="tw:flex tw:h-11 tw:w-11 tw:items-center tw:justify-center tw:rounded-full tw:bg-clay tw:font-sans tw:text-sm tw:font-semibold tw:text-parchment">
                    {initials(story.name)}
                  </div>
                  <div>
                    <p className="tw:font-sans tw:text-sm tw:font-semibold tw:text-parchment">{story.name}</p>
                    <p className="tw:font-sans tw:text-xs tw:text-parchment/50">{story.meta}</p>
                  </div>
                </div>
              </article>
          </div>

          <div className="tw:flex tw:flex-col tw:gap-3">
            {stories.map((s, index) => {
              const isActive = index === active;
              return (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setActive(index)}
                  className="tw:flex tw:items-center tw:gap-3 tw:rounded-[1.4rem] tw:p-1.5 tw:text-left tw:transition-colors tw:duration-500"
                  style={{ background: isActive ? "rgba(181,80,42,0.1)" : "rgba(35,24,15,0.04)" }}
                >
                  <span
                    className="tw:flex tw:h-10 tw:w-10 tw:items-center tw:justify-center tw:rounded-full tw:font-sans tw:text-xs tw:font-semibold"
                    style={{
                      background: isActive ? "var(--color-clay)" : "var(--color-espresso)",
                      color: "var(--color-parchment)",
                    }}
                  >
                    {initials(s.name)}
                  </span>
                  <span className="tw:min-w-0 tw:flex-1 tw:pr-3">
                    <span className="tw:block tw:font-sans tw:text-sm tw:font-semibold tw:text-espresso">{s.name}</span>
                    <span className="tw:block tw:truncate tw:font-sans tw:text-xs tw:text-espresso-soft/60">{s.meta}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
