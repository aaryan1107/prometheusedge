import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/v2/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <section className="tw:flex tw:min-h-[65vh] tw:items-center tw:px-6 tw:py-20">
        <div className="tw:mx-auto tw:w-full tw:max-w-6xl">
          <span className="tw:font-display tw:text-8xl tw:text-clay/30">404</span>
          <h1 className="tw:mt-4 tw:max-w-2xl tw:font-display tw:text-5xl tw:leading-tight tw:text-espresso tw:md:text-7xl">This path is not in the roadmap.</h1>
          <p className="tw:mt-5 tw:max-w-xl tw:font-sans tw:text-base tw:leading-relaxed tw:text-espresso-soft/60">The page may have moved, or the route may be incomplete. The main site and resource libraries are still available.</p>
          <Link to="/" className="tw:mt-8 tw:inline-flex tw:items-center tw:gap-2 tw:font-sans tw:text-sm tw:font-semibold tw:text-clay"><ArrowLeft className="tw:h-4 tw:w-4" strokeWidth={1.5} /> Return home</Link>
        </div>
      </section>
    </PageShell>
  );
}
