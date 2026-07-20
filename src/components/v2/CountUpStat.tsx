import { useEffect, useRef, useState } from "react";

export function CountUpStat({
  end,
  label,
  prefix = "",
  suffix = "",
  duration = 780,
}: {
  end: number;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let raf = 0;
    let failsafe = 0;
    let started = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = (time: number) => {
      if (!started) started = time;
      const progress = Math.min((time - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));
      if (progress < 1) {
        raf = window.requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      if (reduceMotion) {
        setValue(end);
      } else {
        raf = window.requestAnimationFrame(animate);
        // Failsafe: if rAF is throttled/frozen, still land on the final value.
        failsafe = window.setTimeout(() => setValue(end), duration + 400);
      }
      observer.disconnect();
    }, { rootMargin: "120px 0px", threshold: 0.05 });

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
      if (failsafe) window.clearTimeout(failsafe);
    };
  }, [duration, end]);

  return (
    <strong ref={ref} aria-label={label}>
      {prefix}{value}{suffix}
    </strong>
  );
}
