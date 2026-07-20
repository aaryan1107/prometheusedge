import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { PageShell, ResourceHero } from "@/components/v2/PageShell";
import { countryGuides } from "@/data/content";

export default function Universities() {
  const [query, setQuery] = useState("");
  const countries = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return countryGuides;
    return countryGuides.filter((country) => `${country.name} ${country.system} ${country.universities.map((u) => u.name).join(" ")}`.toLowerCase().includes(needle));
  }, [query]);

  return (
    <PageShell>
      <ResourceHero
        index="03"
        title="Learn the system before making the list."
        intro="Country guides for understanding admissions logic, timing and representative universities. A destination is useful only when its system fits the student."
      />

      <section className="tw:px-6 tw:py-16 tw:md:py-24">
        <div className="tw:mx-auto tw:max-w-6xl">
          <label className="tw:flex tw:max-w-xl tw:items-center tw:gap-3 tw:border-b tw:border-espresso/25 tw:pb-3 tw:focus-within:border-clay">
            <Search className="tw:h-5 tw:w-5 tw:text-espresso-soft/40" strokeWidth={1.5} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search a country or university" className="tw:w-full tw:bg-transparent tw:font-sans tw:text-base tw:text-espresso tw:outline-none tw:placeholder:text-espresso-soft/35" />
          </label>

          <div className="tw:mt-14 tw:border-t tw:border-espresso">
            {countries.map((country) => (
              <Link key={country.slug} to={`/universities/${country.slug}`} className="tw:group tw:grid tw:gap-5 tw:border-b tw:border-ink-line tw:py-8 tw:md:grid-cols-[70px_1fr_220px_130px_auto] tw:md:items-center">
                <span className="tw:text-4xl" aria-hidden="true">{country.flag}</span>
                <div><h2 className="tw:font-display tw:text-3xl tw:text-espresso tw:transition-colors tw:group-hover:text-clay">{country.name}</h2><p className="tw:mt-1 tw:font-sans tw:text-[13px] tw:text-espresso-soft/50">{country.universities.length} universities in this guide</p></div>
                <span className="tw:font-sans tw:text-[12px] tw:leading-relaxed tw:text-espresso-soft/60">{country.system}</span>
                <span className="tw:font-sans tw:text-[10px] tw:font-semibold tw:uppercase tw:tracking-[0.14em] tw:text-clay">{country.intake}</span>
                <ArrowUpRight className="tw:hidden tw:h-5 tw:w-5 tw:text-espresso/30 tw:transition-all tw:group-hover:translate-x-1 tw:group-hover:-translate-y-1 tw:group-hover:text-clay tw:md:block" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
          {!countries.length ? <p className="tw:py-16 tw:font-display tw:text-2xl tw:text-espresso-soft/55">No country or university matches that search yet.</p> : null}
        </div>
      </section>
    </PageShell>
  );
}
