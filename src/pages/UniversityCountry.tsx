import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { PageShell } from "@/components/v2/PageShell";
import { countryGuides } from "@/data/content";
import NotFound from "./NotFound";

export default function UniversityCountry() {
  const { country: slug } = useParams();
  const country = countryGuides.find((item) => item.slug === slug);
  if (!country) return <NotFound />;

  return (
    <PageShell>
      <header className="tw:px-6 tw:pb-16 tw:pt-12 tw:md:pb-24 tw:md:pt-20">
        <div className="tw:mx-auto tw:max-w-6xl">
          <Link to="/universities" className="tw:inline-flex tw:items-center tw:gap-2 tw:font-sans tw:text-xs tw:font-semibold tw:text-espresso-soft/55 tw:hover:text-clay"><ArrowLeft className="tw:h-4 tw:w-4" strokeWidth={1.5} /> University library</Link>
          <div className="tw:mt-12 tw:grid tw:gap-10 tw:lg:grid-cols-[1fr_0.58fr] tw:lg:items-end">
            <div><span className="tw:text-6xl" aria-hidden="true">{country.flag}</span><h1 className="tw:mt-6 tw:font-display tw:text-[clamp(3.5rem,8vw,7.5rem)] tw:leading-[0.9] tw:text-espresso">{country.name}</h1></div>
            <div className="tw:border-l tw:border-clay tw:pl-6"><p className="tw:font-sans tw:text-[10px] tw:font-semibold tw:uppercase tw:tracking-[0.16em] tw:text-clay">{country.system} / {country.intake}</p><p className="tw:mt-4 tw:font-sans tw:text-base tw:leading-relaxed tw:text-espresso-soft/65">{country.summary}</p></div>
          </div>
        </div>
      </header>

      <section className="tw:bg-espresso tw:px-6 tw:py-16 tw:text-parchment tw:md:py-24">
        <div className="tw:mx-auto tw:grid tw:max-w-6xl tw:gap-14 tw:lg:grid-cols-[0.8fr_1.2fr]">
          <div><span className="tw:font-sans tw:text-[10px] tw:font-semibold tw:uppercase tw:tracking-[0.18em] tw:text-clay">Application logic</span><h2 className="tw:mt-4 tw:max-w-md tw:font-display tw:text-4xl tw:leading-tight">What the system asks from a student.</h2></div>
          <ol className="tw:border-t tw:border-parchment/18">
            {country.applicationLogic.map((item, index) => <li key={item} className="tw:grid tw:grid-cols-[48px_1fr] tw:border-b tw:border-parchment/12 tw:py-5"><span className="tw:font-display tw:text-lg tw:text-clay">{String(index + 1).padStart(2, "0")}</span><span className="tw:font-sans tw:text-[15px] tw:text-parchment/72">{item}</span></li>)}
          </ol>
        </div>
      </section>

      <section className="tw:px-6 tw:py-16 tw:md:py-24">
        <div className="tw:mx-auto tw:max-w-6xl">
          <div className="tw:grid tw:gap-12 tw:lg:grid-cols-[0.7fr_1.3fr]">
            <div><span className="tw:font-sans tw:text-[10px] tw:font-semibold tw:uppercase tw:tracking-[0.18em] tw:text-clay">Planning rhythm</span><h2 className="tw:mt-4 tw:font-display tw:text-4xl tw:text-espresso">A typical timeline.</h2></div>
            <div className="tw:border-t tw:border-espresso">{country.timeline.map((item) => <div key={item.period} className="tw:grid tw:grid-cols-[120px_1fr] tw:gap-5 tw:border-b tw:border-ink-line tw:py-5"><span className="tw:font-sans tw:text-[10px] tw:font-semibold tw:uppercase tw:tracking-[0.13em] tw:text-clay">{item.period}</span><span className="tw:font-sans tw:text-[15px] tw:text-espresso-soft/70">{item.action}</span></div>)}</div>
          </div>

          <div className="tw:mt-24 tw:flex tw:items-end tw:justify-between tw:gap-8 tw:border-b tw:border-espresso tw:pb-5"><div><span className="tw:font-sans tw:text-[10px] tw:font-semibold tw:uppercase tw:tracking-[0.18em] tw:text-clay">Representative universities</span><h2 className="tw:mt-3 tw:font-display tw:text-4xl tw:text-espresso">Start the research here.</h2></div><span className="tw:hidden tw:font-sans tw:text-xs tw:text-espresso-soft/45 tw:sm:block">Not a ranking or guaranteed shortlist</span></div>
          <div className="tw:divide-y tw:divide-ink-line">
            {country.universities.map((university, index) => <div key={university.name} className="tw:grid tw:gap-3 tw:py-7 tw:md:grid-cols-[60px_1fr_180px_1fr] tw:md:items-center"><span className="tw:font-display tw:text-xl tw:text-clay/55">{String(index + 1).padStart(2, "0")}</span><h3 className="tw:font-display tw:text-2xl tw:text-espresso">{university.name}</h3><span className="tw:font-sans tw:text-xs tw:text-espresso-soft/45">{university.location}</span><span className="tw:font-sans tw:text-[13px] tw:text-espresso-soft/65">{university.strengths}</span></div>)}
          </div>

          <Link to="/#contact" className="tw:group tw:mt-16 tw:flex tw:items-end tw:justify-between tw:gap-6 tw:bg-clay tw:p-7 tw:text-parchment tw:md:p-10"><div><span className="tw:font-sans tw:text-[10px] tw:font-semibold tw:uppercase tw:tracking-[0.16em] tw:text-parchment/60">Build your own shortlist</span><h2 className="tw:mt-3 tw:max-w-2xl tw:font-display tw:text-3xl tw:leading-tight tw:md:text-5xl">Turn country research into a student-specific route.</h2></div><ArrowUpRight className="tw:h-8 tw:w-8 tw:shrink-0 tw:transition-transform tw:group-hover:translate-x-1 tw:group-hover:-translate-y-1" strokeWidth={1.25} /></Link>
        </div>
      </section>
    </PageShell>
  );
}
