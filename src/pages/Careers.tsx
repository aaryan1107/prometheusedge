import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { PageShell, ResourceHero } from "@/components/v2/PageShell";
import { careerGuides } from "@/data/content";

export default function Careers() {
  const [query, setQuery] = useState("");
  const guides = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return careerGuides;
    return careerGuides.filter((guide) => `${guide.title} ${guide.cluster} ${guide.summary}`.toLowerCase().includes(needle));
  }, [query]);

  return (
    <PageShell>
      <ResourceHero
        index="02"
        title="Explore work before choosing a label."
        intro="Career guides that connect school subjects to real skills, degrees and starter experiences. Use them to ask better questions, not to force an early answer."
      />

      <section className="tw:px-6 tw:py-16 tw:md:py-24">
        <div className="tw:mx-auto tw:max-w-6xl">
          <label className="tw:flex tw:max-w-xl tw:items-center tw:gap-3 tw:border-b tw:border-espresso/25 tw:pb-3 tw:focus-within:border-clay">
            <Search className="tw:h-5 tw:w-5 tw:text-espresso-soft/40" strokeWidth={1.5} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              placeholder="Search a field or interest"
              className="tw:w-full tw:bg-transparent tw:font-sans tw:text-base tw:text-espresso tw:outline-none tw:placeholder:text-espresso-soft/35"
            />
          </label>

          <div className="tw:mt-14 tw:border-t tw:border-espresso">
            {guides.map((guide, index) => (
              <Link
                key={guide.slug}
                to={`/careers/${guide.slug}`}
                className="tw:group tw:grid tw:gap-5 tw:border-b tw:border-ink-line tw:py-8 tw:md:grid-cols-[70px_150px_1fr_auto] tw:md:items-center"
              >
                <span className="tw:font-display tw:text-2xl tw:text-clay/55">{String(index + 1).padStart(2, "0")}</span>
                <span className="tw:font-sans tw:text-[10px] tw:font-semibold tw:uppercase tw:tracking-[0.16em] tw:text-espresso-soft/40">{guide.cluster}</span>
                <div>
                  <h2 className="tw:font-display tw:text-3xl tw:leading-tight tw:text-espresso tw:transition-colors tw:group-hover:text-clay">{guide.title}</h2>
                  <p className="tw:mt-2 tw:max-w-2xl tw:font-sans tw:text-[14px] tw:leading-relaxed tw:text-espresso-soft/60">{guide.summary}</p>
                </div>
                <ArrowUpRight className="tw:hidden tw:h-5 tw:w-5 tw:text-espresso/30 tw:transition-all tw:group-hover:translate-x-1 tw:group-hover:-translate-y-1 tw:group-hover:text-clay tw:md:block" strokeWidth={1.5} />
              </Link>
            ))}
          </div>

          {!guides.length ? <p className="tw:py-16 tw:font-display tw:text-2xl tw:text-espresso-soft/55">No guide matches that search yet.</p> : null}
        </div>
      </section>
    </PageShell>
  );
}
