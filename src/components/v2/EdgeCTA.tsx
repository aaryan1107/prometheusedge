import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function EdgeCTA() {
  return (
    <section className="tw:bg-parchment tw:px-6 tw:pb-24 tw:md:pb-32">
      <Reveal className="tw:mx-auto tw:max-w-6xl">
        <div className="tw:relative tw:overflow-hidden tw:rounded-[2.5rem] tw:bg-espresso tw:p-2">
          <div className="tw:pointer-events-none tw:absolute tw:inset-0" aria-hidden="true">
            <div className="tw:absolute tw:right-[-6%] tw:top-[-30%] tw:h-[380px] tw:w-[380px] tw:rounded-full tw:bg-clay/25 tw:blur-[120px]" />
            <div className="tw:absolute tw:left-[-6%] tw:bottom-[-40%] tw:h-[380px] tw:w-[380px] tw:rounded-full tw:bg-gold/15 tw:blur-[120px]" />
          </div>
          <div className="tw:relative tw:rounded-[calc(2.5rem-0.5rem)] tw:px-8 tw:py-16 tw:text-center tw:md:px-12 tw:md:py-24">
            <h2 className="tw:mx-auto tw:max-w-3xl tw:font-display tw:text-[clamp(2.25rem,4.5vw,3.75rem)] tw:leading-[1.06] tw:text-parchment">
              Your future deserves more than guesswork.
            </h2>
            <p className="tw:mx-auto tw:mt-6 tw:max-w-xl tw:font-sans tw:text-[15px] tw:leading-relaxed tw:text-parchment/70">
              Book a free consultation today and start building your roadmap with The Edge Way.
            </p>
            <div className="tw:mt-9 tw:flex tw:justify-center">
              <a
                href="#contact"
                className="tw:group tw:flex tw:items-center tw:gap-3 tw:rounded-full tw:bg-parchment tw:py-2 tw:pl-6 tw:pr-2 tw:font-sans tw:text-sm tw:font-semibold tw:text-espresso tw:transition-all tw:duration-700 tw:ease-[cubic-bezier(0.32,0.72,0,1)] tw:hover:bg-clay tw:hover:text-parchment tw:active:scale-[0.98]"
              >
                Book a Free Consultation
                <span className="tw:flex tw:h-9 tw:w-9 tw:items-center tw:justify-center tw:rounded-full tw:bg-espresso/10 tw:transition-transform tw:duration-700 tw:ease-[cubic-bezier(0.32,0.72,0,1)] tw:group-hover:translate-x-0.5 tw:group-hover:-translate-y-0.5 tw:group-hover:bg-parchment/15">
                  <ArrowUpRight className="tw:h-4 tw:w-4" strokeWidth={1.5} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
