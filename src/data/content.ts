export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogArticle = {
  slug: string;
  category: "Career Planning" | "University Strategy" | "Profile Building" | "Scholarships";
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  featured?: boolean;
  sections: ArticleSection[];
};

export const blogArticles: BlogArticle[] = [
  {
    slug: "subjects-that-keep-options-open",
    category: "Career Planning",
    title: "Choosing subjects without closing doors too early",
    excerpt: "A practical way for Grades 9 and 10 students to balance strengths, curiosity and future eligibility.",
    date: "18 July 2026",
    readTime: "6 min read",
    featured: true,
    sections: [
      {
        heading: "Start with eligibility, not prestige",
        paragraphs: [
          "Subject decisions feel permanent because students often hear them framed as a verdict on intelligence. They are better understood as eligibility choices: each combination keeps some pathways open and makes others harder to access.",
          "Before choosing, map the prerequisite subjects for three or four broad directions. This creates a boundary without forcing a single career decision too early.",
        ],
      },
      {
        heading: "Use evidence from real work",
        paragraphs: [
          "Marks matter, but they are only one signal. Notice which assignments hold attention, which questions a student asks without prompting, and what kind of difficulty they are willing to tolerate.",
        ],
        bullets: ["Review two years of subject performance", "Compare interest with day-to-day course work", "Try one short project before committing", "Check country-specific prerequisites"],
      },
      {
        heading: "Build a reversible plan",
        paragraphs: [
          "The strongest plan includes a first choice, an adjacent alternative and a checkpoint. Revisit the decision after one term with fresh evidence rather than treating the original choice as irreversible.",
        ],
      },
    ],
  },
  {
    slug: "us-vs-uk-admissions",
    category: "University Strategy",
    title: "US or UK: two admissions systems, two different stories",
    excerpt: "Why the same student should present their profile differently to holistic and course-focused systems.",
    date: "10 July 2026",
    readTime: "7 min read",
    sections: [
      {
        heading: "The core distinction",
        paragraphs: [
          "US admissions usually assess the student across academics, activities, context and personal voice. UK admissions ask a narrower question: are you prepared and motivated for this particular course?",
          "This changes what counts as useful evidence. Breadth can strengthen a US application, while depth and subject relevance carry more weight in a UK application.",
        ],
      },
      {
        heading: "Plan the evidence early",
        paragraphs: ["A single activity can support both systems when the student understands what it proves."],
        bullets: ["US: contribution, initiative and personal growth", "UK: subject knowledge and academic readiness", "Both: sustained commitment and clear reflection"],
      },
    ],
  },
  {
    slug: "profile-building-without-padding",
    category: "Profile Building",
    title: "Profile building without collecting random certificates",
    excerpt: "A coherent student profile is built through connected choices, not a crowded activity list.",
    date: "2 July 2026",
    readTime: "5 min read",
    sections: [
      {
        heading: "Follow a question",
        paragraphs: [
          "The best profiles usually have a visible thread: a question the student kept returning to, explored in different settings and eventually acted upon.",
          "Start with one genuine interest, then add increasing levels of challenge - reading, a course, a project, collaboration and public output.",
        ],
      },
      {
        heading: "Prefer depth over volume",
        paragraphs: ["Admissions readers can distinguish participation from ownership. Fewer experiences with reflection and measurable contribution are usually more persuasive."],
        bullets: ["What did the student initiate?", "What changed because they were involved?", "What did they learn that influenced the next step?"],
      },
    ],
  },
  {
    slug: "scholarship-planning-timeline",
    category: "Scholarships",
    title: "Scholarships need a timeline, not a last-minute search",
    excerpt: "Separate merit, need-aware and external funding early enough to build a realistic university list.",
    date: "24 June 2026",
    readTime: "6 min read",
    sections: [
      {
        heading: "Know what kind of aid you are seeking",
        paragraphs: ["Scholarship is often used as one broad word, but institutional merit awards, need-based financial aid and external funding follow different rules and deadlines."],
        bullets: ["Record total cost, not only tuition", "Check whether international students are eligible", "Track separate scholarship forms", "Keep financial documents ready before deadlines"],
      },
      {
        heading: "Let affordability shape the shortlist",
        paragraphs: ["A balanced list includes financial as well as academic likelihood. This prevents a student from receiving offers that the family cannot responsibly accept."],
      },
    ],
  },
  {
    slug: "internship-before-college",
    category: "Profile Building",
    title: "What a useful school internship should actually teach",
    excerpt: "The value is not the company name. It is the quality of observation, responsibility and reflection.",
    date: "15 June 2026",
    readTime: "4 min read",
    sections: [
      {
        heading: "Choose proximity to real work",
        paragraphs: ["A small organisation that lets a student observe decisions and complete a defined task can be more valuable than a famous company where they remain a spectator."],
      },
      {
        heading: "Leave with evidence",
        paragraphs: ["Students should document the question they explored, the work they produced and how the experience changed their understanding of the field."],
      },
    ],
  },
  {
    slug: "college-list-fit",
    category: "University Strategy",
    title: "A college list should describe a student, not a ranking table",
    excerpt: "Build a shortlist around academic fit, learning environment, cost and outcomes before reputation.",
    date: "5 June 2026",
    readTime: "5 min read",
    sections: [
      {
        heading: "Define fit in observable terms",
        paragraphs: ["Replace vague preferences like 'good campus' with criteria that can be compared: class size, curriculum flexibility, location, internship access, support and total cost."],
      },
      {
        heading: "Balance the list",
        paragraphs: ["A useful shortlist contains a range of admission probabilities without including institutions the student would not genuinely attend."],
        bullets: ["Academic and course fit", "Social and geographic fit", "Financial fit", "A credible mix of reach, target and likely options"],
      },
    ],
  },
];

export type CareerGuide = {
  slug: string;
  title: string;
  cluster: string;
  summary: string;
  outlook: string;
  subjects: string[];
  skills: string[];
  pathways: string[];
  starterExperiences: string[];
};

export const careerGuides: CareerGuide[] = [
  {
    slug: "artificial-intelligence-data",
    title: "Artificial Intelligence & Data",
    cluster: "Technology",
    summary: "For students who enjoy mathematical patterns, systems thinking and building tools from evidence.",
    outlook: "Fast-moving and interdisciplinary, with pathways across computing, healthcare, finance, climate and research.",
    subjects: ["Mathematics", "Computer Science", "Physics", "Statistics"],
    skills: ["Logical reasoning", "Programming", "Data interpretation", "Communication"],
    pathways: ["Computer Science", "Data Science", "Statistics", "Computational Mathematics"],
    starterExperiences: ["Build a small data project", "Complete an introductory Python course", "Join a coding or robotics challenge"],
  },
  {
    slug: "medicine-health-sciences",
    title: "Medicine & Health Sciences",
    cluster: "Health",
    summary: "For students motivated by science, human wellbeing and sustained responsibility for others.",
    outlook: "Extends beyond clinical medicine into public health, biomedical science, research and health technology.",
    subjects: ["Biology", "Chemistry", "Physics", "Mathematics"],
    skills: ["Scientific reasoning", "Empathy", "Precision", "Resilience"],
    pathways: ["Medicine", "Biomedical Sciences", "Public Health", "Allied Health"],
    starterExperiences: ["Shadow a healthcare professional", "Volunteer in a care setting", "Explore a public-health question"],
  },
  {
    slug: "law-public-policy",
    title: "Law & Public Policy",
    cluster: "Society",
    summary: "For students drawn to argument, institutions, language and how rules shape everyday life.",
    outlook: "Careers span legal practice, policy, diplomacy, regulation, research and social impact.",
    subjects: ["English", "History", "Political Science", "Economics"],
    skills: ["Critical reading", "Argumentation", "Research", "Clear writing"],
    pathways: ["Law", "Public Policy", "Politics", "International Relations"],
    starterExperiences: ["Join debate or Model UN", "Analyse a current policy", "Observe a court or civic process"],
  },
  {
    slug: "design-creative-technology",
    title: "Design & Creative Technology",
    cluster: "Creative",
    summary: "For visual thinkers who like turning human needs into useful, expressive products and experiences.",
    outlook: "Combines craft with technology across product, communication, interaction, spatial and service design.",
    subjects: ["Art & Design", "Computer Science", "Mathematics", "English"],
    skills: ["Observation", "Visual communication", "Prototyping", "Iteration"],
    pathways: ["Product Design", "Communication Design", "UX Design", "Architecture"],
    starterExperiences: ["Create a small portfolio", "Redesign an everyday experience", "Learn one prototyping tool"],
  },
  {
    slug: "psychology-behaviour",
    title: "Psychology & Behaviour",
    cluster: "Human Sciences",
    summary: "For students curious about how people think, learn, relate and make decisions.",
    outlook: "Can lead to clinical practice, research, education, organisational work, behavioural science and UX.",
    subjects: ["Psychology", "Biology", "Mathematics", "English"],
    skills: ["Listening", "Research methods", "Statistical literacy", "Ethical judgment"],
    pathways: ["Psychology", "Cognitive Science", "Neuroscience", "Behavioural Economics"],
    starterExperiences: ["Read an introductory research paper", "Design an ethical observation study", "Volunteer in a people-facing role"],
  },
  {
    slug: "business-economics",
    title: "Business & Economics",
    cluster: "Enterprise",
    summary: "For students interested in decisions, markets, organisations and turning ideas into sustainable value.",
    outlook: "Offers broad routes into finance, consulting, entrepreneurship, operations, marketing and policy.",
    subjects: ["Mathematics", "Economics", "Business", "English"],
    skills: ["Quantitative reasoning", "Decision-making", "Collaboration", "Presentation"],
    pathways: ["Economics", "Business Management", "Finance", "Entrepreneurship"],
    starterExperiences: ["Run a small venture or fundraiser", "Analyse a company", "Enter a business case competition"],
  },
];

export type CountryGuide = {
  slug: string;
  name: string;
  flag: string;
  system: string;
  intake: string;
  summary: string;
  applicationLogic: string[];
  timeline: { period: string; action: string }[];
  universities: { name: string; location: string; strengths: string }[];
};

export const countryGuides: CountryGuide[] = [
  {
    slug: "usa",
    name: "United States",
    flag: "🇺🇸",
    system: "Holistic, flexible curriculum",
    intake: "August / September",
    summary: "Best suited to students who value academic flexibility and can build a coherent story across grades, activities, essays and recommendations.",
    applicationLogic: ["Common App or institution portal", "Essays and activity list", "Testing varies by university", "Need-aware and merit funding differ"],
    timeline: [{ period: "Grade 10", action: "Explore interests and build depth" }, { period: "Grade 11", action: "Testing, research and early shortlist" }, { period: "Grade 12", action: "Essays, applications and aid forms" }],
    universities: [{ name: "Boston University", location: "Massachusetts", strengths: "Research, business, communications" }, { name: "Northeastern University", location: "Massachusetts", strengths: "Co-op and experiential learning" }, { name: "University of Illinois Urbana-Champaign", location: "Illinois", strengths: "Engineering and computer science" }, { name: "University of Wisconsin-Madison", location: "Wisconsin", strengths: "Research and broad academics" }],
  },
  {
    slug: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    system: "Course-focused, specialised degrees",
    intake: "September / October",
    summary: "A strong route for students who know what they want to study and can demonstrate sustained academic engagement with that subject.",
    applicationLogic: ["UCAS with up to five choices", "Course-specific personal statement", "Predicted grades are central", "Some courses require tests or interviews"],
    timeline: [{ period: "Grade 10", action: "Confirm prerequisite subjects" }, { period: "Grade 11", action: "Build supercurricular evidence" }, { period: "Grade 12", action: "UCAS submission and interviews" }],
    universities: [{ name: "University College London (UCL)", location: "London", strengths: "Research and interdisciplinary study" }, { name: "King's College London", location: "London", strengths: "Health, law and humanities" }, { name: "University of Manchester", location: "Manchester", strengths: "Engineering and social sciences" }, { name: "University of Warwick", location: "Coventry", strengths: "Economics, business and mathematics" }],
  },
  {
    slug: "canada",
    name: "Canada",
    flag: "🇨🇦",
    system: "Programme-led, academically direct",
    intake: "September",
    summary: "Offers strong public universities, clear programme choices and valuable co-op options, with requirements that vary by province and faculty.",
    applicationLogic: ["Provincial or university portals", "Grades and prerequisites lead", "Supplemental profiles for selected courses", "Co-op availability should be compared"],
    timeline: [{ period: "Grade 11", action: "Check course prerequisites" }, { period: "Aug-Oct", action: "Build programme shortlist" }, { period: "Oct-Jan", action: "Submit portals and supplements" }],
    universities: [{ name: "University of Toronto", location: "Ontario", strengths: "Research and broad programme depth" }, { name: "University of British Columbia", location: "British Columbia", strengths: "Sciences, sustainability and business" }, { name: "University of Waterloo", location: "Ontario", strengths: "Engineering, computing and co-op" }, { name: "McGill University", location: "Quebec", strengths: "Research, medicine and humanities" }],
  },
  {
    slug: "singapore",
    name: "Singapore",
    flag: "🇸🇬",
    system: "Selective, rigorous and global",
    intake: "August",
    summary: "A compact, high-performing ecosystem with strong links to Asian industry and highly selective admissions for international applicants.",
    applicationLogic: ["Institution-specific applications", "Academic strength is essential", "Interviews for selected programmes", "Scholarship applications may be separate"],
    timeline: [{ period: "Grade 11", action: "Build academic and leadership evidence" }, { period: "Oct-Feb", action: "Submit university applications" }, { period: "Mar-May", action: "Interviews and decisions" }],
    universities: [{ name: "National University of Singapore", location: "Kent Ridge", strengths: "Computing, business and sciences" }, { name: "Nanyang Technological University", location: "Jurong West", strengths: "Engineering, technology and communication" }, { name: "Singapore Management University", location: "Downtown", strengths: "Business, economics and law" }],
  },
  {
    slug: "australia",
    name: "Australia",
    flag: "🇦🇺",
    system: "Direct-entry, flexible intakes",
    intake: "February / July",
    summary: "Combines globally recognised universities with clear entry criteria, multiple intakes and strong pathways across professional degrees.",
    applicationLogic: ["Direct or authorised application channels", "Academic requirements are transparent", "Portfolio or interview for some courses", "Plan visa and housing early"],
    timeline: [{ period: "12-15 months", action: "Compare courses and cities" }, { period: "8-10 months", action: "Apply and review offers" }, { period: "3-5 months", action: "Visa, housing and enrolment" }],
    universities: [{ name: "University of Melbourne", location: "Victoria", strengths: "Flexible undergraduate model" }, { name: "University of Sydney", location: "New South Wales", strengths: "Research and professional courses" }, { name: "Monash University", location: "Victoria", strengths: "Pharmacy, business and engineering" }],
  },
  {
    slug: "europe",
    name: "Continental Europe",
    flag: "🇪🇺",
    system: "Country-specific, growing English options",
    intake: "August / September",
    summary: "Requires careful country-by-country research, but can offer excellent English-taught degrees, distinctive teaching models and competitive value.",
    applicationLogic: ["Deadlines vary by country", "English-taught course supply differs", "Some systems require subject equivalence", "Budget for housing and local requirements"],
    timeline: [{ period: "Grade 11", action: "Compare systems and eligibility" }, { period: "Sep-Jan", action: "Prepare documents and portals" }, { period: "Jan-May", action: "Applications and housing planning" }],
    universities: [{ name: "Delft University of Technology", location: "Netherlands", strengths: "Engineering and design" }, { name: "Bocconi University", location: "Italy", strengths: "Economics, finance and management" }, { name: "IE University", location: "Spain", strengths: "Business and global programmes" }],
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    system: "International campuses, regional access",
    intake: "September / January",
    summary: "A growing option for globally oriented students seeking international branch campuses, proximity to India and strong regional industry links.",
    applicationLogic: ["University-specific portals", "Multiple intake options", "Compare home and branch campus degrees", "Merit awards are common but competitive"],
    timeline: [{ period: "Grade 11", action: "Compare campus models" }, { period: "Sep-Mar", action: "Applications and scholarship forms" }, { period: "Apr-Jul", action: "Decisions, visa and housing" }],
    universities: [{ name: "New York University Abu Dhabi", location: "Abu Dhabi", strengths: "Liberal arts and research" }, { name: "University of Birmingham Dubai", location: "Dubai", strengths: "Business, computing and engineering" }, { name: "American University of Sharjah", location: "Sharjah", strengths: "Architecture, engineering and business" }],
  },
  {
    slug: "india",
    name: "India",
    flag: "🇮🇳",
    system: "Entrance-led and institution-specific",
    intake: "July / August",
    summary: "A diverse landscape where entrance examinations, portfolios, interviews and school results carry different weight across disciplines.",
    applicationLogic: ["Track national and private entrance tests", "Institution deadlines differ", "Liberal arts applications may be holistic", "Build parallel pathways to manage uncertainty"],
    timeline: [{ period: "Grade 11", action: "Define exam and non-exam routes" }, { period: "Grade 12", action: "Applications, tests and interviews" }, { period: "May-Jul", action: "Compare offers and enrol" }],
    universities: [{ name: "Ashoka University", location: "Haryana", strengths: "Liberal arts and sciences" }, { name: "FLAME University", location: "Maharashtra", strengths: "Liberal education and business" }, { name: "KREA University", location: "Andhra Pradesh", strengths: "Interwoven arts and sciences" }, { name: "Manipal Academy of Higher Education", location: "Karnataka", strengths: "Health, engineering and design" }],
  },
];
