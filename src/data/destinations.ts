export type GlobeCamera = {
  phi: number;
  theta: number;
};

export type DestinationUniversity = {
  name: string;
  mark: string;
};

export type Destination = {
  code: string;
  name: string;
  label: string;
  flag: string;
  location: [number, number];
  camera: GlobeCamera;
  universities: DestinationUniversity[];
};

export const INDIA_ORIGIN = {
  id: "origin-india",
  name: "India",
  flag: "🇮🇳",
  location: [20.5937, 78.9629] as [number, number],
  camera: { phi: -2.949, theta: 0.2 },
};

export const DESTINATIONS: Destination[] = [
  {
    code: "US",
    name: "USA",
    label: "United States",
    flag: "🇺🇸",
    location: [39.8283, -98.5795],
    camera: { phi: 0.15, theta: 0.34 },
    universities: [
      { name: "Boston University", mark: "BU" },
      { name: "Northeastern University", mark: "NEU" },
      { name: "University of Illinois", mark: "UI" },
      { name: "UMass Amherst", mark: "UMA" },
    ],
  },
  {
    code: "UK",
    name: "UK",
    label: "United Kingdom",
    flag: "🇬🇧",
    location: [51.5074, -0.1278],
    camera: { phi: -1.569, theta: 0.42 },
    universities: [
      { name: "University College London", mark: "UCL" },
      { name: "King's College London", mark: "KCL" },
      { name: "University of Manchester", mark: "UOM" },
      { name: "University of Warwick", mark: "WAR" },
    ],
  },
  {
    code: "CA",
    name: "Canada",
    label: "Canada",
    flag: "🇨🇦",
    location: [45.4215, -75.6972],
    camera: { phi: 0.08, theta: 0.42 },
    universities: [
      { name: "University of Toronto", mark: "UOFT" },
      { name: "University of British Columbia", mark: "UBC" },
      { name: "McGill University", mark: "MCG" },
      { name: "University of Waterloo", mark: "UW" },
    ],
  },
  {
    code: "SG",
    name: "Singapore",
    label: "Singapore",
    flag: "🇸🇬",
    location: [1.3521, 103.8198],
    camera: { phi: 2.9, theta: 0.04 },
    universities: [
      { name: "National University of Singapore", mark: "NUS" },
      { name: "Nanyang Technological University", mark: "NTU" },
      { name: "Singapore Management University", mark: "SMU" },
    ],
  },
  {
    code: "AU",
    name: "Australia",
    label: "Australia",
    flag: "🇦🇺",
    location: [-25.2744, 133.7751],
    camera: { phi: 2.377, theta: -0.26 },
    universities: [
      { name: "University of Melbourne", mark: "UM" },
      { name: "University of Sydney", mark: "USYD" },
      { name: "Monash University", mark: "MON" },
      { name: "UNSW Sydney", mark: "UNSW" },
    ],
  },
  {
    code: "NZ",
    name: "New Zealand",
    label: "New Zealand",
    flag: "🇳🇿",
    location: [-41.2866, 174.7756],
    camera: { phi: 1.662, theta: -0.37 },
    universities: [
      { name: "University of Auckland", mark: "UOA" },
      { name: "University of Otago", mark: "OTG" },
      { name: "Victoria University of Wellington", mark: "VUW" },
    ],
  },
  {
    code: "AE",
    name: "UAE",
    label: "United Arab Emirates",
    flag: "🇦🇪",
    location: [24.4539, 54.3773],
    camera: { phi: -2.52, theta: 0.22 },
    universities: [
      { name: "NYU Abu Dhabi", mark: "NYUAD" },
      { name: "Khalifa University", mark: "KU" },
      { name: "American University of Sharjah", mark: "AUS" },
    ],
  },
  {
    code: "EU",
    name: "Europe",
    label: "Continental Europe",
    flag: "🇪🇺",
    location: [48.8566, 2.3522],
    camera: { phi: -1.612, theta: 0.4 },
    universities: [
      { name: "Bocconi University", mark: "BOC" },
      { name: "TU Munich", mark: "TUM" },
      { name: "Sciences Po", mark: "SP" },
      { name: "IE University", mark: "IE" },
    ],
  },
  {
    code: "HK",
    name: "Hong Kong",
    label: "Hong Kong",
    flag: "🇭🇰",
    location: [22.3193, 114.1694],
    camera: { phi: 2.72, theta: 0.2 },
    universities: [
      { name: "University of Hong Kong", mark: "HKU" },
      { name: "Hong Kong University of Science and Technology", mark: "HKUST" },
      { name: "Chinese University of Hong Kong", mark: "CUHK" },
    ],
  },
  {
    code: "IN",
    name: "India",
    label: "India",
    flag: "🇮🇳",
    location: INDIA_ORIGIN.location,
    camera: INDIA_ORIGIN.camera,
    universities: [
      { name: "Ashoka University", mark: "AU" },
      { name: "FLAME University", mark: "FLAME" },
      { name: "Krea University", mark: "KREA" },
      { name: "OP Jindal Global University", mark: "JGU" },
    ],
  },
];
