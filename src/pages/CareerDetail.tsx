import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { PageShell } from "@/components/v2/PageShell";
import { careerGuides } from "@/data/content";
import NotFound from "./NotFound";

function DetailList({ number, title, items }: { number: string; title: string; items: string[] }) {
  return (
    <section className="tw:border-t tw:border-espresso tw:pt-5">
      <div className="tw:flex tw:items-baseline tw:justify-between tw:gap-4">
        <h2 className="tw:font-display tw:text-2xl tw:text-espresso">{title}</h2>
        <span className="tw:font-sans tw:text-[10px] tw:font-semibold tw:tracking-[0.15em] tw:text-clay">{number}</span>
      </div>
      <ul className="tw:mt-5 tw:divide-y tw:divide-ink-line">
        {items.map((item) => <li key={item} className="tw:flex tw:items-center tw:gap-3 tw:py-3 tw:font-sans tw:text-[14px] tw:text-espresso-soft/72"><span className="tw:h-1.5 tw:w-1.5 tw:rounded-full tw:bg-clay" />{item}</li>)}
      </ul>
    </section>
  );
}

export default function CareerDetail() {
  const { slug } = useParams();
  const guide = careerGuides.find((item) => item.slug === slug);
  if (!guide) return <NotFound />;

  const next = careerGuides[(careerGuides.indexOf(guide) + 1) % careerGuides.length];

  return (
    <PageShell>
      <header className="tw:px-6 tw:pb-16 tw:pt-12 tw:md:pb-24 tw:md:pt-20">
        <div className="tw:mx-auto tw:max-w-6xl">
          <Link to="/careers" className="tw:inline-flex tw:items-center tw:gap-2 tw:font-sans tw:text-xs tw:font-semibold tw:text-espresso-soft/55 tw:hover:text-clay"><ArrowLeft className="tw:h-4 tw:w-4" strokeWidth={1.5} /> Career library</Link>
          <div className="tw:mt-12 tw:grid tw:gap-10 tw:lg:grid-cols-[1fr_0.55fr] tw:lg:items-end">
            <div>
              <span className="tw:font-sans tw:text-[10px] tw:font-semibold tw:uppercase tw:tracking-[0.18em] tw:text-clay">{guide.cluster}</span>
              <h1 className="tw:mt-5 tw:max-w-4xl tw:font-display tw:text-[clamp(3.3rem,7vw,6.7rem)] tw:leading-[0.92] tw:text-espresso">{guide.title}</h1>
            </div>
            <div className="tw:border-l tw:border-clay tw:pl-6">
              <p className="tw:font-sans tw:text-base tw:leading-relaxed tw:text-espresso-soft/68">{guide.summary}</p>
              <p className="tw:mt-4 tw:font-sans tw:text-sm tw:leading-relaxed tw:text-espresso-soft/48">{guide.outlook}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="tw:bg-parchment-deep tw:px-6 tw:py-16 tw:md:py-24">
        <div className="tw:mx-auto tw:grid tw:max-w-6xl tw:gap-x-12 tw:gap-y-14 tw:md:grid-cols-2">
          <DetailList number="01" title="Useful school subjects" items={guide.subjects} />
          <DetailList number="02" title="Skills the field rewards" items={guide.skills} />
          <DetailList number="03" title="Degree pathways" items={guide.pathways} />
          <DetailList number="04" title="Try it before choosing it" items={guide.starterExperiences} />
        </div>
      </section>

      <section className="tw:px-6 tw:py-16 tw:md:py-24">
        <Link to={`/careers/${next.slug}`} className="tw:group tw:mx-auto tw:flex tw:max-w-6xl tw:items-end tw:justify-between tw:gap-8 tw:border-b tw:border-espresso tw:pb-7">
          <div><span className="tw:font-sans tw:text-[10px] tw:font-semibold tw:uppercase tw:tracking-[0.16em] tw:text-clay">Explore another field</span><h2 className="tw:mt-3 tw:font-display tw:text-3xl tw:text-espresso tw:group-hover:text-clay tw:md:text-5xl">{next.title}</h2></div>
          <ArrowUpRight className="tw:h-7 tw:w-7 tw:shrink-0 tw:text-clay tw:transition-transform tw:group-hover:translate-x-1 tw:group-hover:-translate-y-1" strokeWidth={1.25} />
        </Link>
      </section>
    </PageShell>
  );
}
