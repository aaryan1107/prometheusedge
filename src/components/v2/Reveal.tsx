import { useEffect, useRef, type ReactNode } from "react";

/**
 * Resilient scroll reveal. Content is visible by default (opacity 1); when JS
 * is available we hide it and reveal on view via a compositor-driven CSS
 * transition (see .reveal / .is-in in tailwind.css). This survives environments
 * where requestAnimationFrame is throttled, and degrades to fully-visible
 * content if JS never runs.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-in");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.classList.add("is-in");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className ?? ""}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  align = "left",
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <Reveal className={`tw:max-w-2xl ${align === "center" ? "tw:mx-auto tw:text-center" : ""}`}>
      <span className="tw:font-sans tw:text-[11px] tw:font-semibold tw:uppercase tw:tracking-[0.18em] tw:text-clay">
        {eyebrow}
      </span>
      <h2
        className={`tw:mt-4 tw:font-display tw:text-4xl tw:leading-[1.08] tw:md:text-[2.9rem] ${
          dark ? "tw:text-parchment" : "tw:text-espresso"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`tw:mt-5 tw:font-sans tw:text-[15px] tw:leading-relaxed ${
            dark ? "tw:text-parchment/70" : "tw:text-espresso-soft/70"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}
