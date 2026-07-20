import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PageShell, ResourceHero } from "@/components/v2/PageShell";
import { blogArticles } from "@/data/content";

const categories = ["All", ...new Set(blogArticles.map((article) => article.category))];

export default function Blog() {
  const [category, setCategory] = useState("All");
  const featured = blogArticles.find((article) => article.featured) ?? blogArticles[0];
  const articles = useMemo(
    () => blogArticles.filter((article) => !article.featured && (category === "All" || article.category === category)),
    [category],
  );

  return (
    <PageShell>
      <ResourceHero
        index="01"
        title="Notes for decisions that matter."
        intro="Clear, practical thinking on careers, student profiles, admissions systems and the choices families face before an application begins."
      />

      <section className="tw:px-6 tw:py-16 tw:md:py-24">
        <div className="tw:mx-auto tw:max-w-6xl">
          {featured ? (
            <Link
              to={`/blog/${featured.slug}`}
              className="tw:group tw:grid tw:overflow-hidden tw:rounded-lg tw:bg-espresso tw:text-parchment tw:lg:grid-cols-[0.72fr_1.28fr]"
            >
              <div className="tw:relative tw:min-h-72 tw:overflow-hidden tw:bg-clay tw:p-8 tw:md:p-10">
                <div className="tw:absolute tw:-right-16 tw:-top-20 tw:h-72 tw:w-72 tw:rounded-full tw:bg-gold/50 tw:blur-[80px]" />
                <div className="tw:absolute tw:-bottom-20 tw:-left-16 tw:h-64 tw:w-64 tw:rounded-full tw:bg-parchment/20 tw:blur-[75px]" />
                <div className="tw:relative tw:flex tw:h-full tw:flex-col tw:justify-between">
                  <span className="tw:font-sans tw:text-[10px] tw:font-semibold tw:uppercase tw:tracking-[0.18em]">Featured note</span>
                  <span className="tw:font-display tw:text-7xl tw:text-parchment/80">01</span>
                </div>
              </div>
              <div className="tw:flex tw:flex-col tw:justify-between tw:p-8 tw:md:p-12">
                <div>
                  <div className="tw:flex tw:flex-wrap tw:gap-3 tw:font-sans tw:text-[10px] tw:uppercase tw:tracking-[0.14em] tw:text-parchment/45">
                    <span>{featured.category}</span><span>/</span><span>{featured.readTime}</span>
                  </div>
                  <h2 className="tw:mt-7 tw:max-w-2xl tw:font-display tw:text-4xl tw:leading-[1.02] tw:md:text-5xl">{featured.title}</h2>
                  <p className="tw:mt-5 tw:max-w-xl tw:font-sans tw:text-[15px] tw:leading-relaxed tw:text-parchment/65">{featured.excerpt}</p>
                </div>
                <div className="tw:mt-10 tw:flex tw:items-center tw:justify-between tw:border-t tw:border-parchment/12 tw:pt-5">
                  <span className="tw:font-sans tw:text-xs tw:text-parchment/45">{featured.date}</span>
                  <ArrowUpRight className="tw:h-5 tw:w-5 tw:transition-transform tw:duration-500 tw:group-hover:translate-x-1 tw:group-hover:-translate-y-1" strokeWidth={1.5} />
                </div>
              </div>
            </Link>
          ) : null}

          <div className="tw:mt-16 tw:flex tw:flex-wrap tw:gap-x-7 tw:gap-y-3 tw:border-b tw:border-ink-line tw:pb-5">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`tw:font-sans tw:text-[12px] tw:font-semibold tw:transition-colors ${category === item ? "tw:text-clay" : "tw:text-espresso-soft/45 tw:hover:text-espresso"}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="tw:divide-y tw:divide-ink-line">
            {articles.map((article, index) => (
              <Link key={article.slug} to={`/blog/${article.slug}`} className="tw:group tw:grid tw:gap-5 tw:py-9 tw:md:grid-cols-[72px_1fr_auto] tw:md:items-center">
                <span className="tw:font-display tw:text-2xl tw:text-clay/55">{String(index + 2).padStart(2, "0")}</span>
                <div>
                  <div className="tw:font-sans tw:text-[10px] tw:font-semibold tw:uppercase tw:tracking-[0.15em] tw:text-espresso-soft/42">{article.category} / {article.readTime}</div>
                  <h2 className="tw:mt-2 tw:max-w-3xl tw:font-display tw:text-2xl tw:leading-tight tw:text-espresso tw:transition-colors tw:group-hover:text-clay tw:md:text-3xl">{article.title}</h2>
                  <p className="tw:mt-2 tw:max-w-2xl tw:font-sans tw:text-[14px] tw:leading-relaxed tw:text-espresso-soft/60">{article.excerpt}</p>
                </div>
                <ArrowUpRight className="tw:hidden tw:h-5 tw:w-5 tw:text-espresso/35 tw:transition-all tw:group-hover:translate-x-1 tw:group-hover:-translate-y-1 tw:group-hover:text-clay tw:md:block" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
