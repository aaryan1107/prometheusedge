import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { PageShell } from "@/components/v2/PageShell";
import { blogArticles } from "@/data/content";
import NotFound from "./NotFound";

export default function BlogPost() {
  const { slug } = useParams();
  const article = blogArticles.find((item) => item.slug === slug);

  if (!article) return <NotFound />;

  const related = blogArticles.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <PageShell>
      <article>
        <header className="tw:border-b tw:border-ink-line tw:px-6 tw:pb-16 tw:pt-12 tw:md:pb-24 tw:md:pt-20">
          <div className="tw:mx-auto tw:max-w-5xl">
            <Link to="/blog" className="tw:inline-flex tw:items-center tw:gap-2 tw:font-sans tw:text-xs tw:font-semibold tw:text-espresso-soft/55 tw:hover:text-clay">
              <ArrowLeft className="tw:h-4 tw:w-4" strokeWidth={1.5} /> Back to notes
            </Link>
            <div className="tw:mt-12 tw:flex tw:flex-wrap tw:gap-3 tw:font-sans tw:text-[10px] tw:font-semibold tw:uppercase tw:tracking-[0.16em] tw:text-clay">
              <span>{article.category}</span><span>/</span><span>{article.date}</span><span>/</span><span>{article.readTime}</span>
            </div>
            <h1 className="tw:mt-6 tw:max-w-4xl tw:font-display tw:text-[clamp(3rem,6vw,5.8rem)] tw:leading-[0.96] tw:text-espresso">{article.title}</h1>
            <p className="tw:mt-7 tw:max-w-2xl tw:font-sans tw:text-lg tw:leading-relaxed tw:text-espresso-soft/65">{article.excerpt}</p>
          </div>
        </header>

        <div className="tw:px-6 tw:py-16 tw:md:py-24">
          <div className="tw:mx-auto tw:grid tw:max-w-5xl tw:gap-16 tw:lg:grid-cols-[1fr_240px]">
            <div className="tw:max-w-2xl">
              {article.sections.map((section, index) => (
                <section key={section.heading} className={index ? "tw:mt-14" : ""}>
                  <span className="tw:font-display tw:text-xl tw:text-clay/55">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="tw:mt-3 tw:font-display tw:text-3xl tw:leading-tight tw:text-espresso">{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph} className="tw:mt-5 tw:font-sans tw:text-[16px] tw:leading-[1.8] tw:text-espresso-soft/72">{paragraph}</p>)}
                  {section.bullets ? (
                    <ul className="tw:mt-6 tw:border-y tw:border-ink-line tw:py-3">
                      {section.bullets.map((bullet) => <li key={bullet} className="tw:flex tw:gap-4 tw:border-b tw:border-ink-line tw:py-3 tw:last:border-b-0"><span className="tw:text-clay">+</span><span className="tw:font-sans tw:text-[14px] tw:text-espresso-soft/75">{bullet}</span></li>)}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
            <aside className="tw:h-fit tw:border-t tw:border-espresso tw:pt-5 tw:lg:sticky tw:lg:top-36">
              <p className="tw:font-sans tw:text-[10px] tw:font-semibold tw:uppercase tw:tracking-[0.16em] tw:text-espresso-soft/45">Continue reading</p>
              <div className="tw:mt-4 tw:divide-y tw:divide-ink-line">
                {related.map((item) => (
                  <Link key={item.slug} to={`/blog/${item.slug}`} className="tw:group tw:flex tw:items-start tw:justify-between tw:gap-3 tw:py-4">
                    <span className="tw:font-display tw:text-lg tw:leading-tight tw:text-espresso tw:group-hover:text-clay">{item.title}</span>
                    <ArrowUpRight className="tw:mt-1 tw:h-4 tw:w-4 tw:shrink-0 tw:text-clay" strokeWidth={1.5} />
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
