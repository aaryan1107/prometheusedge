import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { BrandMark } from "./BrandMark";

type FooterLink =
  | { label: string; type: "section"; hash: string }
  | { label: string; type: "page"; to: string };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "About", type: "section", hash: "about" },
      { label: "Why The Edge Way", type: "section", hash: "why" },
      { label: "Services", type: "section", hash: "services" },
      { label: "Our Process", type: "section", hash: "process" },
    ],
  },
  {
    title: "Libraries",
    links: [
      { label: "Admissions Notes", type: "page", to: "/blog" },
      { label: "Career Guides", type: "page", to: "/careers" },
      { label: "University Guides", type: "page", to: "/universities" },
      { label: "Destinations", type: "section", hash: "destinations" },
    ],
  },
];

export function EdgeFooter() {
  const [subscribed, setSubscribed] = useState(false);
  const { pathname } = useLocation();
  const sectionHref = (hash: string) => (pathname === "/" ? `#${hash}` : `/#${hash}`);

  return (
    <footer className="tw:bg-espresso tw:px-6 tw:pt-20 tw:pb-10">
      <div className="tw:mx-auto tw:max-w-6xl">
        <div className="tw:grid tw:gap-12 tw:lg:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr]">
          <div>
            <Link to="/" className="tw:flex tw:items-center tw:gap-3 tw:font-display tw:text-2xl tw:text-parchment">
              <BrandMark className="tw:h-11 tw:w-11 tw:ring-1 tw:ring-gold/30" />
              <span>The Edge <span className="tw:text-gold">Way</span></span>
            </Link>
            <p className="tw:mt-4 tw:max-w-xs tw:font-sans tw:text-[14px] tw:leading-relaxed tw:text-parchment/55">
              Boutique career counselling and university guidance - personalised to every student, from Grade 8 onward.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="tw:font-sans tw:text-[12px] tw:font-semibold tw:uppercase tw:tracking-[0.16em] tw:text-parchment/40">{column.title}</p>
              <ul className="tw:mt-4 tw:flex tw:flex-col tw:gap-2.5">
                {column.links.map((item) => (
                  <li key={item.label}>
                    {item.type === "page" ? (
                      <Link to={item.to} className="tw:font-sans tw:text-[14px] tw:text-parchment/70 tw:transition-colors tw:duration-300 tw:hover:text-clay">{item.label}</Link>
                    ) : (
                      <a href={sectionHref(item.hash)} className="tw:font-sans tw:text-[14px] tw:text-parchment/70 tw:transition-colors tw:duration-300 tw:hover:text-clay">{item.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="tw:font-sans tw:text-[12px] tw:font-semibold tw:uppercase tw:tracking-[0.16em] tw:text-parchment/40">Newsletter</p>
            <p className="tw:mt-4 tw:font-sans tw:text-[13px] tw:leading-relaxed tw:text-parchment/55">University deadlines, scholarship alerts and admissions insight - a few times a month.</p>
            {subscribed ? (
              <p className="tw:mt-4 tw:font-sans tw:text-[14px] tw:text-gold">You're subscribed - welcome aboard.</p>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubscribed(true);
                }}
                className="tw:mt-4 tw:flex tw:items-center tw:gap-1.5 tw:rounded-full tw:bg-parchment/[0.06] tw:p-1.5 tw:ring-1 tw:ring-parchment/10"
              >
                <input required type="email" placeholder="Your email" className="tw:min-w-0 tw:flex-1 tw:bg-transparent tw:px-4 tw:font-sans tw:text-[14px] tw:text-parchment tw:outline-none tw:placeholder:text-parchment/40" />
                <button type="submit" aria-label="Subscribe" className="tw:flex tw:h-9 tw:w-9 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:bg-clay tw:text-parchment tw:transition-transform tw:duration-500 tw:hover:scale-105">
                  <ArrowUpRight className="tw:h-4 tw:w-4" strokeWidth={1.5} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="tw:mt-16 tw:flex tw:flex-col tw:items-start tw:justify-between tw:gap-4 tw:border-t tw:border-parchment/10 tw:pt-6 tw:font-sans tw:text-[12.5px] tw:text-parchment/45 tw:sm:flex-row tw:sm:items-center">
          <span>© {new Date().getFullYear()} The Edge Way. Find your edge.</span>
          <span>hello@theedgeway.com / +91 966-774-5811</span>
        </div>
      </div>
    </footer>
  );
}
