import type { ReactNode } from "react";
import { EdgeFooter } from "./EdgeFooter";
import { EdgeNav } from "./EdgeNav";
import { WhatsAppButton } from "./WhatsAppButton";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <EdgeNav />
      <main id="top" className="tw:min-h-screen tw:overflow-x-clip tw:bg-parchment tw:pt-32 tw:md:pt-36">
        {children}
      </main>
      <EdgeFooter />
      <WhatsAppButton />
    </>
  );
}

export function ResourceHero({
  title,
  intro,
  index,
}: {
  title: string;
  intro: string;
  index: string;
}) {
  return (
    <header className="tw:border-b tw:border-ink-line tw:px-6 tw:pb-16 tw:pt-12 tw:md:pb-24 tw:md:pt-20">
      <div className="tw:mx-auto tw:grid tw:max-w-6xl tw:gap-8 tw:lg:grid-cols-[1fr_auto] tw:lg:items-end">
        <div className="tw:max-w-4xl">
          <h1 className="tw:font-display tw:text-[clamp(3.2rem,7vw,6.8rem)] tw:leading-[0.92] tw:text-espresso">
            {title}
          </h1>
          <p className="tw:mt-7 tw:max-w-2xl tw:font-sans tw:text-base tw:leading-relaxed tw:text-espresso-soft/68 tw:md:text-lg">
            {intro}
          </p>
        </div>
        <span className="tw:font-sans tw:text-[10px] tw:font-semibold tw:uppercase tw:tracking-[0.18em] tw:text-clay">
          The Edge Library / {index}
        </span>
      </div>
    </header>
  );
}
