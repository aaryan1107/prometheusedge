/**
 * Canonical university logo registry.
 *
 * Logos live in `public/logos/universities/` so they are served as-is rather
 * than bundled. Lookup is by normalised name because the two datasets that
 * render universities (`destinations.ts` for the homepage, `content.ts` for
 * the library pages) spell several institutions differently — e.g.
 * "University of Illinois" vs "University of Illinois Urbana-Champaign".
 *
 * Any university without an entry here falls back to its text mark, so a
 * missing logo degrades quietly instead of rendering a broken image.
 */

const BASE = "/logos/universities";

/** lowercase, drop punctuation/parentheticals, collapse whitespace. */
export function normaliseUniversityName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const LOGOS: Record<string, string> = {
  // United States
  "boston university": `${BASE}/boston-university.png`,
  "northeastern university": `${BASE}/northeastern-university.png`,
  "university of illinois": `${BASE}/university-of-illinois.png`,
  "university of illinois urbana champaign": `${BASE}/university-of-illinois.png`,
  "umass amherst": `${BASE}/umass-amherst.jpg`,
  "university of massachusetts amherst": `${BASE}/umass-amherst.jpg`,

  // United Kingdom
  "university college london": `${BASE}/university-college-london.jpg`,
  ucl: `${BASE}/university-college-london.jpg`,
  "king s college london": `${BASE}/kings-college-london.webp`,
  "university of manchester": `${BASE}/university-of-manchester.gif`,
  "university of warwick": `${BASE}/university-of-warwick.webp`,

  // Canada
  "university of toronto": `${BASE}/university-of-toronto.jpg`,
  "university of british columbia": `${BASE}/university-of-british-columbia.png`,
  "mcgill university": `${BASE}/mcgill-university.png`,
  "university of waterloo": `${BASE}/university-of-waterloo.avif`,

  // Singapore
  "national university of singapore": `${BASE}/national-university-of-singapore.png`,
  "nanyang technological university": `${BASE}/nanyang-technological-university.webp`,
  "singapore management university": `${BASE}/singapore-management-university.webp`,

  // Australia
  "university of melbourne": `${BASE}/university-of-melbourne.webp`,
  "the university of melbourne": `${BASE}/university-of-melbourne.webp`,
  "university of sydney": `${BASE}/university-of-sydney.png`,
  "the university of sydney": `${BASE}/university-of-sydney.png`,
  "monash university": `${BASE}/monash-university.svg`,
  "unsw sydney": `${BASE}/unsw-sydney.webp`,
  "university of new south wales": `${BASE}/unsw-sydney.webp`,

  // New Zealand
  "university of auckland": `${BASE}/university-of-auckland.png`,
  "the university of auckland": `${BASE}/university-of-auckland.png`,
  "university of otago": `${BASE}/university-of-otago.webp`,
  "victoria university of wellington": `${BASE}/victoria-university-of-wellington.png`,

  // UAE
  "nyu abu dhabi": `${BASE}/nyu-abu-dhabi.png`,
  "new york university abu dhabi": `${BASE}/nyu-abu-dhabi.png`,
  "khalifa university": `${BASE}/khalifa-university.png`,
  "american university of sharjah": `${BASE}/american-university-of-sharjah.png`,

  // Continental Europe
  "bocconi university": `${BASE}/bocconi-university.jpg`,
  "universita bocconi": `${BASE}/bocconi-university.jpg`,
  "tu munich": `${BASE}/tu-munich.webp`,
  "technical university of munich": `${BASE}/tu-munich.webp`,
  "sciences po": `${BASE}/sciences-po.jpg`,
  "ie university": `${BASE}/ie-university.webp`,

  // Hong Kong
  "university of hong kong": `${BASE}/university-of-hong-kong.png`,
  "the university of hong kong": `${BASE}/university-of-hong-kong.png`,
  "hong kong university of science and technology": `${BASE}/hkust.png`,
  hkust: `${BASE}/hkust.png`,
  "chinese university of hong kong": `${BASE}/chinese-university-of-hong-kong.png`,
  "the chinese university of hong kong": `${BASE}/chinese-university-of-hong-kong.png`,

  // India
  "ashoka university": `${BASE}/ashoka-university.webp`,
  "flame university": `${BASE}/flame-university.png`,
  "krea university": `${BASE}/krea-university.webp`,
  "op jindal global university": `${BASE}/op-jindal-global-university.webp`,
  "o p jindal global university": `${BASE}/op-jindal-global-university.webp`,
  "jindal global university": `${BASE}/op-jindal-global-university.webp`,
};

/** Returns the logo URL for a university name, or null when none is on file. */
export function getUniversityLogo(name: string): string | null {
  return LOGOS[normaliseUniversityName(name)] ?? null;
}
