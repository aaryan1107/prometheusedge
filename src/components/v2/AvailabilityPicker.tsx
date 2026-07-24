import { useEffect, useState } from "react";
import { openCalendlyPopup } from "@/lib/calendlyEmbed";

type Slot = { start: string; schedulingUrl: string };

function groupByDay(slots: Slot[]): Array<[string, Slot[]]> {
  const groups = new Map<string, Slot[]>();
  for (const slot of slots) {
    const day = new Date(slot.start).toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    groups.set(day, [...(groups.get(day) ?? []), slot]);
  }
  return Array.from(groups.entries());
}

/**
 * Live availability pulled from Calendly. Purely additive next to the
 * existing "Pick a time on Calendly" button in EdgeContact — if this fails to
 * load (API not yet connected, network error), it just renders nothing and
 * the existing popup button remains the working booking path.
 */
export function AvailabilityPicker() {
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/availability")
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((data: { slots: Slot[] }) => {
        if (!cancelled) setSlots(data.slots);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed || (slots && slots.length === 0)) return null;
  if (!slots) {
    return (
      <div className="tw:mt-6 tw:flex tw:gap-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="tw:h-9 tw:w-20 tw:animate-pulse tw:rounded-full tw:bg-espresso/[0.06]" />
        ))}
      </div>
    );
  }

  const days = groupByDay(slots).slice(0, 4);

  return (
    <div className="tw:mt-6">
      <p className="tw:font-sans tw:text-[11px] tw:font-semibold tw:uppercase tw:tracking-[0.16em] tw:text-espresso-soft/50">
        Or pick a real open slot
      </p>
      <div className="tw:mt-3 tw:flex tw:flex-col tw:gap-3">
        {days.map(([day, daySlots]) => (
          <div key={day} className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
            <span className="tw:w-24 tw:shrink-0 tw:font-sans tw:text-[12.5px] tw:font-semibold tw:text-espresso">
              {day}
            </span>
            {daySlots.slice(0, 5).map((slot) => (
              <button
                key={slot.start}
                type="button"
                onClick={() => openCalendlyPopup(slot.schedulingUrl)}
                className="tw:rounded-full tw:bg-espresso/[0.05] tw:px-3.5 tw:py-1.5 tw:font-sans tw:text-[12.5px] tw:font-semibold tw:text-espresso tw:ring-1 tw:ring-ink-line tw:transition-colors tw:duration-300 tw:hover:bg-clay tw:hover:text-parchment"
              >
                {new Date(slot.start).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
