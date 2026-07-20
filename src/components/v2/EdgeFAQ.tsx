import { useState } from "react";
import { SectionHead } from "./Reveal";

const faqs = [
  {
    q: "When should I start career counselling?",
    a: "Ideally from Grade 8 or 9. Earlier planning creates stronger, more authentic university profiles.",
  },
  {
    q: "Do I need to know what career I want?",
    a: "Not at all. Helping students discover their interests is one of our biggest focuses.",
  },
  {
    q: "Do you provide internships?",
    a: "We connect students with opportunities through our network wherever possible and help them secure meaningful experiences.",
  },
  {
    q: "Which countries do you cover?",
    a: "USA, UK, Canada, Singapore, Australia, UAE, Europe, Hong Kong, India and more.",
  },
  {
    q: "Do you only help students studying abroad?",
    a: "No. We guide students applying both internationally and within India.",
  },
  {
    q: "Can parents attend sessions?",
    a: "Absolutely. Parents are encouraged to be involved throughout the journey.",
  },
];

export function EdgeFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="tw:bg-parchment tw:py-24 tw:md:py-36">
      <div className="tw:mx-auto tw:max-w-3xl tw:px-6">
        <SectionHead eyebrow="FAQs" title="Questions, answered." align="center" />

        <div className="tw:mt-12 tw:flex tw:flex-col tw:gap-3">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div
                key={faq.q}
                className="tw:rounded-[1.4rem] tw:bg-espresso/[0.04] tw:p-1.5 tw:ring-1 tw:ring-ink-line"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="tw:flex tw:w-full tw:items-center tw:justify-between tw:gap-4 tw:rounded-[calc(1.4rem-0.375rem)] tw:bg-parchment tw:px-6 tw:py-5 tw:text-left tw:shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]"
                >
                  <span className="tw:font-display tw:text-lg tw:text-espresso">{faq.q}</span>
                  <span
                    className="tw:flex tw:h-8 tw:w-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:bg-espresso/[0.06] tw:text-lg tw:text-espresso tw:transition-transform tw:duration-500 tw:ease-[cubic-bezier(0.32,0.72,0,1)]"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </button>
                <div className={`faq-panel ${isOpen ? "is-open" : ""}`}>
                  <div className="faq-panel__inner">
                    <p className="tw:px-6 tw:pb-5 tw:pt-3 tw:font-sans tw:text-[14.5px] tw:leading-relaxed tw:text-espresso-soft/70">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
