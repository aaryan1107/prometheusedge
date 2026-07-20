import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * On SPA route change (pathname), jump to the top. Hash links (#section) are
 * left alone so in-page anchor scrolling still works.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      return;
    }

    const scrollToHash = () => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
    };
    const frame = window.requestAnimationFrame(scrollToHash);
    const settle = window.setTimeout(scrollToHash, 900);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(settle);
    };
  }, [pathname, hash]);

  return null;
}
