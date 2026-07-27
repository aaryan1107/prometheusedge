import { useState } from "react";
import { getUniversityLogo } from "@/data/universityLogos";

type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, { box: string; pad: string; text: string }> = {
  sm: { box: "tw:h-7 tw:w-[62px]", pad: "tw:p-1", text: "tw:text-[8px]" },
  md: { box: "tw:h-9 tw:w-[86px]", pad: "tw:p-1.5", text: "tw:text-[9px]" },
  lg: { box: "tw:h-12 tw:w-[116px]", pad: "tw:p-2", text: "tw:text-[10px]" },
};

const BARE_SIZES: Record<Size, { box: string; image: string }> = {
  sm: { box: "tw:h-[52px] tw:w-[132px]", image: "tw:max-h-10 tw:max-w-[120px]" },
  md: { box: "tw:h-[58px] tw:w-[150px]", image: "tw:max-h-11 tw:max-w-[138px]" },
  lg: { box: "tw:h-[64px] tw:w-[176px]", image: "tw:max-h-12 tw:max-w-[164px]" },
};

/**
 * Renders a university's logo either as a quiet evidence mark or on a tile.
 *
 * The supplied logos are horizontal lockups in mixed formats — several are
 * JPEGs with an opaque white background. A white tile keeps those visually
 * identical to the transparent PNG/WebP ones, and `object-contain` inside a
 * landscape box preserves each lockup's aspect ratio instead of squashing it
 * into a square badge. Falls back to the text mark when no logo is on file
 * or the image fails to load.
 */
export function UniversityLogo({
  name,
  mark,
  size = "md",
  variant = "tile",
  className = "",
}: {
  name: string;
  mark?: string;
  size?: Size;
  /**
   * "tile" — white rounded chip, for logos sitting on coloured/!white surfaces.
   * "bare" — no chip. Uses `mix-blend-multiply` so the several logos supplied
   *   as opaque-white JPEGs drop their white box and read as transparent on a
   *   light background, matching the transparent PNG/WebP ones.
   */
  variant?: "tile" | "bare";
  className?: string;
}) {
  const src = getUniversityLogo(name);
  const [failed, setFailed] = useState(false);
  const s = SIZES[size];
  const bare = BARE_SIZES[size];

  if (variant === "bare" && src && !failed) {
    return (
      <span className={`tw:flex ${bare.box} tw:shrink-0 tw:items-center tw:justify-center ${className}`}>
        <img
          src={src}
          alt={`${name} logo`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className={`tw:block ${bare.image} tw:scale-[1.04] tw:object-contain tw:mix-blend-multiply tw:contrast-[1.08]`}
        />
      </span>
    );
  }

  if (!src || failed) {
    if (variant === "bare") {
      return (
        <span className={`tw:flex ${bare.box} tw:shrink-0 tw:items-center tw:justify-center tw:font-sans tw:text-[10px] tw:font-bold tw:tracking-[0.04em] tw:text-heritage ${className}`}>
          {mark ?? name.slice(0, 3).toUpperCase()}
        </span>
      );
    }

    return (
      <span
        aria-hidden="true"
        className={`tw:flex tw:shrink-0 tw:items-center tw:justify-center tw:rounded-md tw:bg-heritage/10 tw:font-sans tw:font-bold tw:tracking-[0.04em] tw:text-heritage ${s.box} ${s.text} ${className}`}
      >
        {mark ?? name.slice(0, 3).toUpperCase()}
      </span>
    );
  }

  return (
    <span
      className={`tw:flex tw:shrink-0 tw:items-center tw:justify-center tw:overflow-hidden tw:rounded-md tw:bg-white tw:ring-1 tw:ring-espresso/8 ${s.box} ${s.pad} ${className}`}
    >
      <img
        src={src}
        alt={`${name} logo`}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="tw:h-full tw:w-full tw:object-contain"
      />
    </span>
  );
}
