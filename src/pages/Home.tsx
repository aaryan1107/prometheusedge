import { useEffect, useState } from "react";
import { EdgeNav } from "@/components/v2/EdgeNav";
import { EdgeHero } from "@/components/v2/EdgeHero";
import { EdgeProof } from "@/components/v2/EdgeProof";
import { EdgeAbout } from "@/components/v2/EdgeAbout";
import { EdgeWhy } from "@/components/v2/EdgeWhy";
import { EdgeServices } from "@/components/v2/EdgeServices";
import { EdgeProcess } from "@/components/v2/EdgeProcess";
import { EdgeMethodStack } from "@/components/v2/EdgeMethodStack";
import { EdgeCountries } from "@/components/v2/EdgeCountries";
import { EdgeWhyEarly } from "@/components/v2/EdgeWhyEarly";
import { EdgeStories } from "@/components/v2/EdgeStories";
import { EdgeFAQ } from "@/components/v2/EdgeFAQ";
import { EdgeCTA } from "@/components/v2/EdgeCTA";
import { EdgeContact } from "@/components/v2/EdgeContact";
import { EdgeFooter } from "@/components/v2/EdgeFooter";
import { WhatsAppButton } from "@/components/v2/WhatsAppButton";
import { BrandMark } from "@/components/v2/BrandMark";

function Preloader() {
  return (
    <div className="tw:fixed tw:inset-0 tw:z-[100] tw:flex tw:items-center tw:justify-center tw:bg-espresso" role="status" aria-live="polite">
      <div className="tw:flex tw:flex-col tw:items-center tw:gap-3">
        <BrandMark className="tw:h-16 tw:w-16 tw:ring-1 tw:ring-gold/35" />
        <span className="tw:font-display tw:text-3xl tw:italic tw:text-parchment">The Edge <span className="tw:text-gold">Way</span></span>
        <span className="tw:font-sans tw:text-[11px] tw:uppercase tw:tracking-[0.28em] tw:text-parchment/50">
          Find Your Edge
        </span>
        <span className="tw:mt-2 tw:block tw:h-px tw:w-24 tw:overflow-hidden tw:bg-parchment/15">
          <span className="tw:block tw:h-full tw:w-full tw:origin-left tw:animate-pulse tw:bg-clay" />
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const startedAt = performance.now();
    const minDuration = 850;

    const finish = () => {
      const remaining = Math.max(0, minDuration - (performance.now() - startedAt));
      window.setTimeout(() => setShowPreloader(false), remaining);
    };

    if (document.readyState === "complete") {
      finish();
      return;
    }

    window.addEventListener("load", finish, { once: true });
    const fallback = window.setTimeout(finish, 2000);

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <>
      {showPreloader && <Preloader />}
      <EdgeNav />

      <main id="top" className="tw:overflow-x-clip">
        <EdgeHero />
        <EdgeProof />
        <EdgeAbout />
        <EdgeWhy />
        <EdgeServices />
        <EdgeProcess />
        <EdgeMethodStack />
        <EdgeCountries />
        <EdgeWhyEarly />
        <EdgeStories />
        <EdgeFAQ />
        <EdgeCTA />
        <EdgeContact />
      </main>

      <EdgeFooter />
      <WhatsAppButton />
    </>
  );
}
