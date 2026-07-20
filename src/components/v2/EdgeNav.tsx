import { useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#destinations", label: "Destinations" },
  { href: "#testimonials", label: "Stories" },
  { href: "#contact", label: "Contact" },
];

export function EdgeNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="tw:fixed tw:inset-x-0 tw:top-0 tw:z-40 tw:bg-espresso tw:text-parchment/80 tw:text-[11px] tw:tracking-[0.08em]">
        <div className="tw:mx-auto tw:flex tw:max-w-6xl tw:items-center tw:justify-between tw:px-6 tw:py-2">
          <span>Now welcoming students beyond Delhi NCR — nationwide.</span>
          <span className="tw:hidden tw:md:inline">
            <a className="tw:hover:text-parchment" href="mailto:hello@theedgeway.com">hello@theedgeway.com</a>
            <span className="tw:mx-2 tw:opacity-40">·</span>
            <a className="tw:hover:text-parchment" href="tel:+919667745811">+91 966-774-5811</a>
          </span>
        </div>
      </div>

      <nav className="tw:block tw:fixed tw:inset-x-0 tw:top-10 tw:z-40 tw:mx-auto tw:w-fit tw:max-w-[94vw]">
        <div className="tw:rounded-full tw:bg-espresso/[0.04] tw:p-1.5 tw:ring-1 tw:ring-ink-line tw:backdrop-blur-xl">
          <div className="tw:flex tw:items-center tw:gap-6 tw:rounded-full tw:bg-parchment/90 tw:px-5 tw:py-2 tw:shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] tw:lg:gap-8">
            <a href="#top" className="tw:flex tw:items-baseline tw:gap-1.5 tw:font-display tw:text-lg tw:text-espresso">
              EDGE
              <span className="tw:font-sans tw:text-[11px] tw:font-medium tw:tracking-[0.14em] tw:text-espresso/50 tw:uppercase">way</span>
            </a>

            <div className="tw:hidden tw:items-center tw:gap-7 tw:lg:flex">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="tw:font-sans tw:text-[13px] tw:font-medium tw:text-espresso-soft/80 tw:transition-colors tw:duration-300 tw:hover:text-clay"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="tw:flex tw:items-center tw:gap-2">
              <a
                href="#contact"
                className="tw:group tw:hidden tw:items-center tw:gap-2 tw:rounded-full tw:bg-espresso tw:py-1.5 tw:pl-4 tw:pr-1.5 tw:font-sans tw:text-[13px] tw:font-semibold tw:text-parchment tw:transition-all tw:duration-700 tw:ease-[cubic-bezier(0.32,0.72,0,1)] tw:hover:bg-clay tw:active:scale-[0.98] tw:sm:flex"
              >
                Book a Consultation
                <span className="tw:flex tw:h-6 tw:w-6 tw:items-center tw:justify-center tw:rounded-full tw:bg-parchment/15 tw:transition-transform tw:duration-700 tw:ease-[cubic-bezier(0.32,0.72,0,1)] tw:group-hover:translate-x-0.5 tw:group-hover:-translate-y-0.5">
                  <ArrowUpRight className="tw:h-3.5 tw:w-3.5" strokeWidth={1.5} />
                </span>
              </a>

              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
                className="tw:relative tw:flex tw:h-9 tw:w-9 tw:items-center tw:justify-center tw:rounded-full tw:bg-espresso/[0.06] tw:lg:hidden"
              >
                <span className="tw:relative tw:block tw:h-3 tw:w-4">
                  <span
                    className={`tw:absolute tw:inset-x-0 tw:top-0 tw:h-[1.5px] tw:bg-espresso tw:transition-all tw:duration-500 tw:ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? "tw:top-1/2 tw:-translate-y-1/2 tw:rotate-45" : ""}`}
                  />
                  <span
                    className={`tw:absolute tw:inset-x-0 tw:bottom-0 tw:h-[1.5px] tw:bg-espresso tw:transition-all tw:duration-500 tw:ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? "tw:bottom-1/2 tw:translate-y-1/2 tw:-rotate-45" : ""}`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`tw:fixed tw:inset-0 tw:z-30 tw:bg-espresso/95 tw:backdrop-blur-2xl tw:transition-opacity tw:duration-500 tw:ease-[cubic-bezier(0.32,0.72,0,1)] tw:lg:hidden ${
          open ? "tw:pointer-events-auto tw:opacity-100" : "tw:pointer-events-none tw:opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="tw:absolute tw:right-6 tw:top-6 tw:flex tw:h-10 tw:w-10 tw:items-center tw:justify-center tw:rounded-full tw:bg-parchment/10 tw:text-parchment"
        >
          <X className="tw:h-4 tw:w-4" strokeWidth={1.5} />
        </button>
        <div className="tw:flex tw:h-full tw:flex-col tw:items-start tw:justify-center tw:gap-3 tw:px-10">
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="tw:font-display tw:text-4xl tw:text-parchment tw:transition-all tw:duration-700 tw:ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{
                transitionDelay: open ? `${100 + index * 60}ms` : "0ms",
                transform: open ? "translateY(0)" : "translateY(2.5rem)",
                opacity: open ? 1 : 0,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="tw:mt-6 tw:flex tw:items-center tw:gap-2 tw:rounded-full tw:bg-clay tw:py-3 tw:pl-6 tw:pr-2 tw:font-sans tw:text-sm tw:font-semibold tw:text-parchment tw:transition-all tw:duration-700 tw:ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={{
              transitionDelay: open ? `${100 + links.length * 60}ms` : "0ms",
              transform: open ? "translateY(0)" : "translateY(2.5rem)",
              opacity: open ? 1 : 0,
            }}
          >
            Book a Consultation
            <span className="tw:flex tw:h-7 tw:w-7 tw:items-center tw:justify-center tw:rounded-full tw:bg-parchment/15">
              <ArrowUpRight className="tw:h-3.5 tw:w-3.5" strokeWidth={1.5} />
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
