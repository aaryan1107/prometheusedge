import { useState } from "react";
import { ArrowUpRight, Calendar } from "lucide-react";
import { Reveal } from "./Reveal";
import { AvailabilityPicker } from "./AvailabilityPicker";
import { openCalendlyPopup } from "@/lib/calendlyEmbed";
import { CONTACT } from "@/data/contactDetails";

export function EdgeContact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="tw:bg-parchment-deep tw:py-24 tw:md:py-36">
      <div className="tw:mx-auto tw:max-w-6xl tw:px-6">
        <div className="tw:grid tw:gap-12 tw:lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <span className="tw:font-sans tw:text-[11px] tw:font-semibold tw:uppercase tw:tracking-[0.18em] tw:text-clay">
              Book a Free Consultation
            </span>
            <h2 className="tw:mt-4 tw:font-display tw:text-4xl tw:leading-[1.08] tw:text-espresso tw:md:text-[2.9rem]">
              Start building your roadmap.
            </h2>
            <p className="tw:mt-6 tw:font-sans tw:text-[15px] tw:leading-relaxed tw:text-espresso-soft/75">
              Use the first conversation to understand fit, timelines, scholarship possibilities, country
              choices and what your child should focus on next.
            </p>

            <button
              type="button"
              onClick={() => openCalendlyPopup()}
              className="tw:group tw:mt-8 tw:flex tw:items-center tw:gap-3 tw:rounded-full tw:bg-espresso tw:py-2 tw:pl-6 tw:pr-2 tw:font-sans tw:text-sm tw:font-semibold tw:text-parchment tw:transition-all tw:duration-700 tw:ease-[cubic-bezier(0.32,0.72,0,1)] tw:hover:bg-clay tw:active:scale-[0.98]"
            >
              <Calendar className="tw:h-4 tw:w-4" strokeWidth={1.5} />
              Pick a time on Calendly
              <span className="tw:flex tw:h-9 tw:w-9 tw:items-center tw:justify-center tw:rounded-full tw:bg-parchment/15 tw:transition-transform tw:duration-700 tw:ease-[cubic-bezier(0.32,0.72,0,1)] tw:group-hover:translate-x-0.5 tw:group-hover:-translate-y-0.5">
                <ArrowUpRight className="tw:h-4 tw:w-4" strokeWidth={1.5} />
              </span>
            </button>

            {/* Additive: real live slots when the Calendly API connection is set up.
                Renders nothing if unavailable, so the button above always works. */}
            <AvailabilityPicker />

            <ul className="tw:mt-10 tw:flex tw:flex-col tw:gap-3 tw:font-sans tw:text-[14px] tw:text-espresso-soft/80">
              <li><b className="tw:text-espresso">Email:</b> {CONTACT.email}</li>
              <li><b className="tw:text-espresso">Phone:</b> {CONTACT.phoneDisplay}</li>
              <li><b className="tw:text-espresso">Location:</b> {CONTACT.address.full}</li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="tw:rounded-[2rem] tw:bg-espresso/[0.05] tw:p-2 tw:ring-1 tw:ring-ink-line">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSent(true);
                }}
                className="tw:rounded-[calc(2rem-0.5rem)] tw:bg-parchment tw:p-7 tw:shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] tw:md:p-9"
              >
                {sent ? (
                  <div className="tw:flex tw:min-h-[360px] tw:flex-col tw:items-center tw:justify-center tw:text-center">
                    <span className="tw:flex tw:h-14 tw:w-14 tw:items-center tw:justify-center tw:rounded-full tw:bg-clay tw:text-2xl tw:text-parchment">✓</span>
                    <h3 className="tw:mt-5 tw:font-display tw:text-2xl tw:text-espresso">Thank you.</h3>
                    <p className="tw:mt-2 tw:max-w-xs tw:font-sans tw:text-[14px] tw:text-espresso-soft/70">
                      We've received your details and will be in touch shortly to schedule your free consultation.
                    </p>
                  </div>
                ) : (
                  <div className="tw:flex tw:flex-col tw:gap-3">
                    <div className="tw:grid tw:gap-3 tw:sm:grid-cols-2">
                      <FormField placeholder="Parent / Student Name" />
                      <FormField placeholder="Current Grade" />
                      <FormField placeholder="Phone" type="tel" />
                      <FormField placeholder="Email" type="email" />
                    </div>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share the student's grade, interests, target countries or biggest question."
                      className="tw:w-full tw:rounded-2xl tw:bg-espresso/[0.04] tw:px-4 tw:py-3 tw:font-sans tw:text-[14px] tw:text-espresso tw:outline-none tw:ring-1 tw:ring-ink-line tw:transition-shadow tw:duration-300 tw:placeholder:text-espresso-soft/45 tw:focus:ring-clay/50"
                    />
                    <button
                      type="submit"
                      className="tw:group tw:mt-1 tw:flex tw:items-center tw:justify-center tw:gap-2 tw:rounded-full tw:bg-espresso tw:py-3.5 tw:font-sans tw:text-sm tw:font-semibold tw:text-parchment tw:transition-all tw:duration-700 tw:ease-[cubic-bezier(0.32,0.72,0,1)] tw:hover:bg-clay tw:active:scale-[0.98]"
                    >
                      Send My Question
                      <ArrowUpRight className="tw:h-4 tw:w-4 tw:transition-transform tw:duration-700 tw:group-hover:translate-x-0.5 tw:group-hover:-translate-y-0.5" strokeWidth={1.5} />
                    </button>
                  </div>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FormField({ placeholder, type = "text" }: { placeholder: string; type?: string }) {
  return (
    <input
      required
      type={type}
      placeholder={placeholder}
      className="tw:w-full tw:rounded-2xl tw:bg-espresso/[0.04] tw:px-4 tw:py-3 tw:font-sans tw:text-[14px] tw:text-espresso tw:outline-none tw:ring-1 tw:ring-ink-line tw:transition-shadow tw:duration-300 tw:placeholder:text-espresso-soft/45 tw:focus:ring-clay/50"
    />
  );
}
