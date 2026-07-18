import { lazy, Suspense, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { motion } from "framer-motion";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HoverExpand_002 } from "@/components/ui/skiper-ui/skiper53";

type TextPair = [string, string];
type Testimonial = [string, string, string];
type Stage = [string, string, string, string[]];

const Skiper49Carousel = lazy(() =>
  import("@/components/ui/skiper-ui/skiper49").then((module) => ({
    default: module.Carousel_003,
  })),
);

const services: TextPair[] = [
  ["Personalized Strategy", "One roadmap for the student's academic choices, profile, goals and target destinations."],
  ["Academic Guidance", "Subject selection, academic positioning and grade-by-grade planning from Grade 8 onward."],
  ["Test Prep Support", "Testing strategy and timeline guidance for applications that need standardized scores."],
  ["College Selection", "Curated shortlists by academic fit, cost, geography, culture and outcomes."],
  ["Stellar Applications", "Essay, story and application support that reflects the student's real strengths."],
  ["Document Preparation", "Support for resumes, portfolios, recommendation planning and submission checklists."],
  ["Interview Prep", "Practice, feedback and confidence-building for university and visa interviews."],
  ["Continuous Support", "Parent-aware mentoring from exploration through admission decisions, visa and housing."],
  ["Internships", "Structured pathways into corporate, research and NGO internships."],
  ["Summer & Winter Programs", "Selection and application support for pre-college and enrichment programs."],
  ["Digital Presence", "Building a credible online footprint through portfolio work, LinkedIn and more."],
  ["Institutional Services", "B2B guidance programs, workshops and parent sessions for schools and learning communities."],
];

const servicePhases = [
  {
    phase: "01 / Strategy",
    title: "Diagnose the Fit",
    body: "Interests, academic choices, family priorities and target countries become one working brief.",
    items: ["Personalized Strategy", "Academic Guidance", "College Selection"],
  },
  {
    phase: "02 / Profile",
    title: "Build the Evidence",
    body: "Students turn interests into proof through activities, projects, internships and digital presence.",
    items: ["Internships", "Summer & Winter Programs", "Digital Presence"],
  },
  {
    phase: "03 / Applications",
    title: "Shape the File",
    body: "The application story is built through essays, documents, interviews and deadline control.",
    items: ["Stellar Applications", "Document Preparation", "Interview Prep"],
  },
  {
    phase: "04 / Support",
    title: "Move to Decision",
    body: "Families keep one steady lane for testing choices, scholarship conversations and enrollment next steps.",
    items: ["Test Prep Support", "Continuous Support", "Institutional Services"],
  },
];

const universities = [
  "University of Illinois",
  "NUS Singapore",
  "UMass Amherst",
  "University of Toronto",
  "University of Wisconsin",
  "FLAME University",
  "King's College London",
  "UCL",
  "Boston University",
  "UC Irvine",
  "Ashoka University",
  "Northeastern University",
];

const testimonials: Testimonial[] = [
  ["Dhruv", "Northeastern University, Computer Science", "PrometheusEDGE helped me navigate the college application process with such ease and confidence. Their support was key in helping me achieve my dream of studying Computer Science in the States."],
  ["Isha Chauhan", "Boston University, Cellular Biology", "With the help of PrometheusEDGE, I received offers from six top universities. Their personalized approach and insight into my strengths helped me stand out."],
  ["Tamish Shukla", "National University of Singapore, Business Studies", "PrometheusEDGE made the college application process so smooth and focused for me. They helped me identify the right universities, and their support in crafting my application led me to NUS."],
  ["Navdeep Reyat", "Proud Parent", "As a parent, the clarity and empathy they brought to the process were priceless. We felt supported every step of the way."],
];

const stages: Stage[] = [
  ["9", "Discover & Assess", "Start with aptitude, interests and exposure so the student has language for what excites them.", ["Psychometric assessments", "Interdisciplinary exploration", "Early profile habits"]],
  ["10", "Explore & Build", "Turn scattered interests into visible work through academic choices, projects and internships.", ["Subject direction", "Extracurricular depth", "First college research pass"]],
  ["11", "Shortlist & Prepare", "Shape a realistic global shortlist and begin the application story before deadlines get loud.", ["University connects", "Testing strategy", "Essay and portfolio architecture"]],
  ["12", "Apply & Enroll", "Execute applications, compare outcomes and move through visa, housing and enrollment support.", ["Applications and interviews", "Scholarship conversations", "Visa and housing readiness"]],
];

const calendarItems: TextPair[] = [
  ["Grade 9", "Psychometric testing, interdisciplinary exposure, early profile building."],
  ["Grade 10", "Research exposure, extracurricular depth, first college research pass."],
  ["Grade 11", "University connects, testing strategy, early application drafting."],
  ["Grade 12", "Applications, interviews, decisions, visa and housing support."],
  ["US Track", "Common App planning, essay architecture, scholarship and aid guidance."],
  ["UK Track", "UCAS timeline, personal statement support and Russell Group guidance."],
  ["Canada Track", "Program comparisons, documentation and housing next steps."],
  ["Scholarships", "Merit and need-aware planning with deadline visibility."],
];

const storyChapters: TextPair[] = [
  ["01 / Promise", "A student is not choosing a college list yet. They are choosing the right kind of future."],
  ["02 / Proof", "Families see outcomes early, before the process asks for trust."],
  ["03 / Method", "The EDGE model shows how counsellors convert ambition into a working plan."],
  ["04 / Journey", "Grades 9-12 become one continuous runway: discover, build, shortlist, apply."],
  ["05 / Execute", "Services, calendars, country tracks and scholarships turn the plan into action."],
  ["06 / Decide", "Placements, testimonials and contact make the final step feel informed, not rushed."],
];

const methodFiles = [
  {
    code: "FILE 01",
    title: "Signal Audit",
    meta: "Aptitude, interests, grades",
    body: "We start by finding the student's real signal before shortlists or essays enter the room.",
  },
  {
    code: "FILE 02",
    title: "Profile Evidence",
    meta: "Projects, activities, internships",
    body: "Scattered interests become visible proof: a profile universities can understand quickly.",
  },
  {
    code: "FILE 03",
    title: "Country Logic",
    meta: "US, UK, Canada, Europe, Asia",
    body: "Each destination has a different admissions grammar, so the roadmap changes by system.",
  },
  {
    code: "FILE 04",
    title: "Application Story",
    meta: "Essays, documents, interviews",
    body: "The final file is built like a case: coherent, evidenced and deadline-ready.",
  },
];

const destinationTracks: TextPair[] = [
  ["US Admissions", "Common App planning, essays, activity strategy, testing timelines and scholarship conversations."],
  ["UK Admissions", "UCAS guidance, personal statement development, course fit and Russell Group positioning."],
  ["Canada Admissions", "Program comparisons, documentation readiness, co-op fit and housing next steps."],
  ["Scholarship Desk", "A dedicated planning lane for merit, need-aware possibilities and deadline visibility."],
];

const pathwayImages = [
  {
    src: "/images/pathways/discover.svg",
    alt: "Discover stage abstract admissions file",
    code: "Grade 09 / Discover",
  },
  {
    src: "/images/pathways/build.svg",
    alt: "Build stage abstract admissions file",
    code: "Grade 10 / Build",
  },
  {
    src: "/images/pathways/shortlist.svg",
    alt: "Shortlist stage abstract admissions file",
    code: "Grade 11 / Shortlist",
  },
  {
    src: "/images/pathways/apply.svg",
    alt: "Apply stage abstract admissions file",
    code: "Grade 12 / Apply",
  },
];

const carouselImages = pathwayImages.map(({ src, alt }) => ({ src, alt }));

const trustLogos = [
  "University of Toronto",
  "NUS Singapore",
  "Boston University",
  "UCL",
  "Ashoka University",
  "Northeastern University",
];

function DotField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let dots: Array<{ x: number; y: number; lane: number }> = [];
    let raf = 0;
    let size = { w: 0, h: 0, left: 0, top: 0 };
    let pointer = { x: -9999, y: -9999, active: false };

    const buildDots = () => {
      const step = 18;
      const cols = Math.ceil(size.w / step);
      const rows = Math.ceil(size.h / step);
      const padX = (size.w % step) / 2;
      const padY = (size.h % step) / 2;
      dots = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          dots.push({
            x: padX + col * step + step / 2,
            y: padY + row * step + step / 2,
            lane: (row + col) % 4,
          });
        }
      }
    };

    const draw = () => {
      raf = 0;
      ctx.clearRect(0, 0, size.w, size.h);
      ctx.fillStyle = "rgba(11, 53, 88, 0.18)";
      ctx.beginPath();

      dots.forEach((dot) => {
        const dx = pointer.x - dot.x;
        const dy = pointer.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const lift = pointer.active && distance < 220 ? 1 - distance / 220 : 0;
        const radius = 0.72 + lift * 1.45 + dot.lane * 0.04;
        ctx.moveTo(dot.x + radius, dot.y);
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
      });

      ctx.fill();

      if (pointer.active) {
        const glow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 260);
        glow.addColorStop(0, "rgba(0, 107, 255, 0.16)");
        glow.addColorStop(0.45, "rgba(229, 92, 255, 0.08)");
        glow.addColorStop(1, "rgba(0, 107, 255, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, size.w, size.h);
      }
    };

    const scheduleDraw = () => {
      if (!raf) {
        raf = window.requestAnimationFrame(draw);
      }
    };

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      size = { w: rect.width, h: rect.height, left: rect.left + window.scrollX, top: rect.top + window.scrollY };
      canvas.width = Math.max(1, size.w * dpr);
      canvas.height = Math.max(1, size.h * dpr);
      canvas.style.width = `${size.w}px`;
      canvas.style.height = `${size.h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
      scheduleDraw();
    };

    const onMove = (event: PointerEvent) => {
      pointer = {
        x: event.pageX - size.left,
        y: event.pageY - size.top,
        active: true,
      };
      scheduleDraw();
    };

    const onLeave = () => {
      pointer = { x: -9999, y: -9999, active: false };
      scheduleDraw();
    };

    const hero = canvas.closest(".hero");
    resize();
    window.addEventListener("resize", resize);
    hero?.addEventListener("pointermove", onMove as EventListener, { passive: true });
    hero?.addEventListener("pointerleave", onLeave);
    return () => {
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
      window.removeEventListener("resize", resize);
      hero?.removeEventListener("pointermove", onMove as EventListener);
      hero?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas className="dot-field" ref={canvasRef} aria-hidden="true" />;
}

function CountUpStat({
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
      }
      observer.disconnect();
    }, { rootMargin: "120px 0px", threshold: 0.05 });

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [duration, end]);

  return (
    <strong ref={ref} aria-label={label}>
      {prefix}{value}{suffix}
    </strong>
  );
}

function ProofBoard() {
  return (
    <div className="container proof-board">
      <article className="proof-tile proof-metric proof-blue">
        <CountUpStat end={12} suffix="+" label="12 plus verified placements" />
        <span>verified university placements currently showcased.</span>
      </article>
      <article className="proof-tile proof-brand">
        <span className="proof-logo">EDGE</span>
        <p>Small cohorts. Global admissions. One student file.</p>
      </article>
      <article className="proof-tile proof-action">
        <a href="#testimonials">Read student story <span>»</span></a>
      </article>
      <article className="proof-tile proof-serif">
        <span>Fit</span>
      </article>
      <article className="proof-tile proof-quote">
        <p>"Their personalized approach and insight into my strengths helped me stand out."</p>
        <div><b>Isha Chauhan</b><small>Boston University</small></div>
      </article>
      <article className="proof-tile proof-metric proof-sand">
        <CountUpStat end={4} label="4 global destination tracks" />
        <span>global destination tracks with scholarship planning.</span>
      </article>
    </div>
  );
}

function ServicesStructure() {
  return (
    <div className="container service-structure">
      {servicePhases.map((phase, index) => (
        <motion.article
          className="service-phase"
          key={phase.phase}
          initial={{ opacity: 0.62, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.14 }}
          transition={{ duration: 0.38, delay: index * 0.06 }}
        >
          <span>{phase.phase}</span>
          <h3>{phase.title}</h3>
          <p>{phase.body}</p>
          <ul>
            {phase.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.article>
      ))}
    </div>
  );
}

function BlobCursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const positions = useRef([
    { x: -220, y: -220 },
    { x: -220, y: -220 },
    { x: -220, y: -220 },
  ]);
  const target = useRef({ x: -220, y: -220 });

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const blobs = Array.from(container.querySelectorAll<HTMLSpanElement>(".blob"));
    const speeds = [0.22, 0.09, 0.14];
    let raf = 0;
    let active = false;

    const move = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      container.classList.add("is-active");
      target.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      active = true;
      start();
    };
    const tick = () => {
      if (!active) {
        raf = 0;
        return;
      }
      blobs.forEach((blob, index) => {
        positions.current[index].x += (target.current.x - positions.current[index].x) * speeds[index];
        positions.current[index].y += (target.current.y - positions.current[index].y) * speeds[index];
        blob.style.transform = `translate(${positions.current[index].x - blob.offsetWidth / 2}px, ${positions.current[index].y - blob.offsetHeight / 2}px)`;
      });
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!raf) {
        raf = requestAnimationFrame(tick);
      }
    };
    const leave = () => {
      active = false;
      container.classList.remove("is-active");
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const hero = container.closest(".hero");
    hero?.addEventListener("mousemove", move as EventListener, { passive: true });
    hero?.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      hero?.removeEventListener("mousemove", move as EventListener);
      hero?.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div className="blob-cursor" ref={ref} aria-hidden="true">
      <span className="blob blob-a" />
      <span className="blob blob-b" />
      <span className="blob blob-c" />
    </div>
  );
}

function StoryCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (coarsePointer.matches || reducedMotion.matches || navigator.maxTouchPoints > 0) {
      cursor.hidden = true;
      return;
    }

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let active = false;

    const interactiveSelector = [
      "a",
      "button",
      "input",
      "textarea",
      ".story-placard",
      ".stage-card",
      ".logo-chip",
      ".hover-expand-shell",
      ".feed-tile",
      ".case-file",
      ".method-files",
      ".file-tabs button",
      ".student-story-tabs button",
    ].join(",");

    const paint = () => {
      frame = 0;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      cursor.classList.toggle("is-active", active);
    };

    const queuePaint = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(paint);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      const target = event.target instanceof Element ? event.target : null;
      active = Boolean(target?.closest(interactiveSelector));
      queuePaint();
    };

    const onPointerLeave = () => {
      cursor.classList.remove("is-active");
      cursor.classList.add("is-hidden");
    };

    const onPointerEnter = () => {
      cursor.classList.remove("is-hidden");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("pointerenter", onPointerEnter);
    paint();

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("pointerenter", onPointerEnter);
    };
  }, []);

  return (
    <div className="story-cursor" ref={cursorRef} aria-hidden="true">
      <span />
    </div>
  );
}

function StageStory() {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const focus = window.innerHeight * 0.46;
      let next = 0;
      let best = Infinity;
      refs.current.forEach((node, index) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - focus);
        if (distance < best) {
          best = distance;
          next = index;
        }
      });
      setActive((current) => (current === next ? current : next));
    };
    const scheduleUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <section className="stage-story">
      <div className="container stage-grid">
        <div className="stage-copy">
          <span className="kicker">The Continuous Path</span>
          <h2>A Four-Year Runway, Not a Last-Minute Rush</h2>
          <p>Each grade becomes one chapter in the same application story. As students move forward, the work shifts from discovery to evidence, then from evidence to decisions.</p>
          <div className="progress"><span style={{ width: `${((active + 1) / stages.length) * 100}%` }} /></div>
        </div>
        <div className="stage-cards">
          {stages.map(([grade, title, body, items], index) => (
            <article
              id={`programs-grade-${grade}`}
              className={`stage-card ${active === index ? "active" : ""}`}
              key={grade}
              ref={(node) => { refs.current[index] = node; }}
            >
              <div className="stage-orb">{grade}</div>
              <div>
                <h3>Grade {grade}: {title}</h3>
                <p>{body}</p>
                <ul>{(items as string[]).map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MethodFiles() {
  const [active, setActive] = useState(0);
  const file = methodFiles[active];

  return (
    <div className="method-files">
      <div className="file-tabs" aria-label="EDGE method files">
        {methodFiles.map((item, index) => (
          <button
            type="button"
            className={active === index ? "active" : ""}
            key={item.code}
            onClick={() => setActive(index)}
            onPointerEnter={() => setActive(index)}
          >
            <span>{item.code}</span>
            <b>{item.title}</b>
          </button>
        ))}
      </div>
      <article className="file-view">
        <div className="file-view-head">
          <span>{file.code}</span>
          <small>PrometheusEDGE Method</small>
        </div>
        <h3>{file.title}</h3>
        <p>{file.body}</p>
        <dl>
          <div><dt>Evidence</dt><dd>{file.meta}</dd></div>
          <div><dt>Mode</dt><dd>1:1 counsellor file</dd></div>
          <div><dt>Next Step</dt><dd>{methodFiles[(active + 1) % methodFiles.length].title}</dd></div>
        </dl>
      </article>
    </div>
  );
}

function StudentStoryDeck() {
  const [active, setActive] = useState(0);
  const [name, meta, body] = testimonials[active];

  return (
    <div className="container student-story-deck">
      <article className="student-story-card">
        <span>{String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span>
        <p>"{body}"</p>
        <div className="person">
          <div className="avatar">{name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div>
          <div><b>{name}</b><small>{meta}</small></div>
        </div>
      </article>
      <div className="student-story-tabs" aria-label="Student and parent stories">
        {testimonials.map(([itemName, itemMeta], index) => (
          <button
            type="button"
            className={active === index ? "active" : ""}
            key={itemName}
            onClick={() => setActive(index)}
          >
            <span>{itemName.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span>
            <b>{itemName}</b>
            <small>{itemMeta}</small>
          </button>
        ))}
      </div>
    </div>
  );
}

function CalendarScrollPanel() {
  return (
    <div className="calendar-scroll-card">
      <div className="scroll-cue">See the fade while scroll</div>
      <ScrollArea className="calendar-scroll-area">
        <div className="calendar-scroll-list">
          {calendarItems.map(([label, body], index) => (
            <div className="calendar-row" key={label}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <div><strong>{label}</strong><span>{body}</span></div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function StoryMap() {
  return (
    <section id="story-map" className="story-map soft">
      <div className="container story-map-grid">
        <div>
          <span className="kicker">Journey Index</span>
          <h2>From Question to Decision, One Chapter at a Time</h2>
          <p>The page now follows the way families actually decide: first confidence, then method, then the grade-wise path, then execution and proof.</p>
        </div>
        <div className="story-placards">
          {storyChapters.map(([title, body], index) => (
            <motion.article
              className="story-placard"
              key={title}
              initial={{ opacity: 0, y: 26, rotateX: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
            >
              <strong>{title}</strong>
              <span>{body}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlacementCarousel() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setShouldLoad(true);
      observer.disconnect();
    }, { rootMargin: "480px" });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="container placement-carousel-shell" ref={ref}>
      {shouldLoad ? (
        <Suspense fallback={<div className="carousel-placeholder" />}>
          <Skiper49Carousel images={carouselImages} showPagination loop={false} />
        </Suspense>
      ) : (
        <div className="carousel-placeholder" />
      )}
    </div>
  );
}

function Preloader() {
  return (
    <div className="preloader" role="status" aria-live="polite">
      <div className="preloader-prism" aria-hidden="true" />
      <div className="preloader-noise" aria-hidden="true" />
      <div className="preloader-content">
        <span className="brand-mark">EDGE</span>
        <span>PrometheusEDGE</span>
      </div>
    </div>
  );
}

function TrustStrip() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const lastPointer = useRef({ x: 0, time: 0 });
  const loopItems = [...trustLogos, ...trustLogos, ...trustLogos];

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const now = performance.now();
    const elapsed = Math.max(now - lastPointer.current.time, 16);
    const distance = Math.abs(event.clientX - lastPointer.current.x);
    const velocity = distance / elapsed;
    const duration = Math.max(8, Math.min(32, 30 - velocity * 18));
    marqueeRef.current?.style.setProperty("--marquee-duration", `${duration}s`);
    lastPointer.current = { x: event.clientX, time: now };
  };

  return (
    <section className="trust-strip" aria-label="University placement highlights">
      <div
        className="trust-marquee"
        ref={marqueeRef}
        onPointerEnter={(event) => {
          lastPointer.current = { x: event.clientX, time: performance.now() };
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => marqueeRef.current?.style.setProperty("--marquee-duration", "30s")}
      >
        <div className="trust-track">
          {loopItems.map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
        </div>
      </div>
    </section>
  );
}

function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const startedAt = performance.now();
    const minDuration = 950;

    const finish = () => {
      const remaining = Math.max(0, minDuration - (performance.now() - startedAt));
      window.setTimeout(() => setShowPreloader(false), remaining);
    };

    if (document.readyState === "complete") {
      finish();
      return;
    }

    window.addEventListener("load", finish, { once: true });
    const fallback = window.setTimeout(finish, 2200);

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <>
      {showPreloader && <Preloader />}
      {!showPreloader && <StoryCursor />}
      <header className="site-header">
        <div className="topbar">
          <div className="container">
            <span>Now welcoming students beyond Delhi NCR — nationwide.</span>
            <span><a href="mailto:info@prometheusedge.com">info@prometheusedge.com</a> · <a href="tel:+919667745811">+91 966-774-5811</a></span>
          </div>
        </div>
        <div className="container nav-wrap">
          <a className="brand" href="#top"><span className="brand-mark">EDGE</span><small>way</small></a>
          <nav>
            <a href="#proof">Proof</a>
            <a href="#story-map">Path</a>
            <a href="#programs-grade-9">Journey</a>
            <a href="#services">Services</a>
            <a href="#placements">Outcomes</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="liquid-link small" href="#contact"><LiquidButton type="button">Book a Consultation</LiquidButton></a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <DotField />
          <div className="task-mode-panel">
            <span>Task Mode</span>
            <b>Find the right-fit route</b>
            <small>Move through the field. Each section unlocks the next decision.</small>
          </div>
          <div className="container hero-grid">
            <div>
              <span className="kicker on-dark">Boutique College & Career Counselling · Grades 9-12</span>
              <h1>Your Roadmap to <span>Global</span> Universities — Built Around You</h1>
              <p className="lead">The EDGE Way is a niche, hands-on mentorship program that guides ambitious students from any school, any city toward the right-fit university across the US, UK, Europe and Asia.</p>
              <div className="actions">
                <a className="liquid-link" href="#contact"><LiquidButton type="button">Book a Consultation</LiquidButton></a>
                <a className="btn outline" href="#programs-grade-9">Explore Programs</a>
              </div>
              <div className="hero-stats">
                <div><CountUpStat end={4} label="4 global destinations" /><span>Global Destinations</span></div>
                <div><CountUpStat end={12} suffix="+" label="12 plus verified placements" /><span>Verified Placements</span></div>
                <div><CountUpStat end={9} suffix="-12" label="Grades 9 to 12 four-year runway" /><span>Four-Year Runway</span></div>
                <div><CountUpStat end={1} suffix=":1" label="1 to 1 counsellor model" /><span>Counsellor Model</span></div>
              </div>
            </div>
            <aside className="case-file">
              <div className="case-file-head">
                <span className="kicker on-dark">PrometheusEDGE File 01</span>
                <div className="case-sleep-cue"><b>00 / 06</b><span>Find the insight</span></div>
              </div>
              <p className="quote">"I believe that education isn't just about degrees — it's about building real, meaningful futures."</p>
              <div className="person"><div className="avatar">MS</div><div><b>Mukesh Sharma</b><small>Founder, The EDGE Way</small></div></div>
              <dl>
                <div><dt>Case Type</dt><dd>College & Career Roadmap</dd></div>
                <div><dt>Student Window</dt><dd>Grades 9-12</dd></div>
                <div><dt>Destinations</dt><dd>US · UK · Europe · Asia</dd></div>
                <div><dt>Method</dt><dd>1:1 mentorship, not mass coaching</dd></div>
              </dl>
            </aside>
          </div>
        </section>

        <TrustStrip />

        <section id="proof" className="proof-section">
          <div className="container section-head">
            <span className="kicker">Results Snapshot</span>
            <h2>Proof Before Process</h2>
            <p>The first proof layer is intentionally early: families should not wait until the footer to understand outcomes and scale.</p>
          </div>
          <ProofBoard />
        </section>

        <StoryMap />

        <section id="about">
          <div className="container section-head">
            <span className="kicker">Our Philosophy</span>
            <h2>Niche, Not Mass</h2>
            <p>Three commitments shape every student's journey with us.</p>
          </div>
          <div className="container grid three">
            {["Niche, Not Mass", "Hands-On Mentorship", "Global University Reach"].map((title, index) => (
              <motion.div
                className="pillar"
                key={title}
                initial={{ opacity: 0.45, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <h3>{title}</h3>
                <p>{title === "Niche, Not Mass" ? "Small, selective cohorts instead of one-size-fits-all coaching." : title === "Hands-On Mentorship" ? "Direct 1:1 access to counsellors who know each student's story." : "Deep expertise across US, UK, European and Asian admissions systems."}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="edge-model" className="particle-band">
          <div className="container particle-grid">
            <div>
              <span className="kicker">The EDGE Files</span>
              <h2>The Method Works Like an Admissions Dossier</h2>
              <p>Inspired by the Mosby case-file rhythm: each file reveals one part of the student's route, from signal to evidence to country logic to the final application story.</p>
            </div>
            <MethodFiles />
          </div>
        </section>

        <StageStory />

        <section id="services">
          <div className="container section-head">
            <span className="kicker">What We Do</span>
            <h2>The Support Engine Around the Student</h2>
            <p>Once the grade-wise story is clear, the services read as the operating system around the student: strategy, profile, applications and support.</p>
          </div>
          <ServicesStructure />
        </section>

        <section id="pathway-files" className="pathway-files">
          <div className="container pathway-grid">
            <div>
              <span className="kicker">Pathway Files</span>
              <h2>Hover Through the Four Chapters</h2>
              <p>The Skiper53 stack now acts like a case-file drawer: each card is one grade chapter in the same long admissions story.</p>
            </div>
            <div className="hover-expand-shell">
              <HoverExpand_002 images={pathwayImages} />
            </div>
          </div>
        </section>

        <section id="admissions-calendar" className="soft calendar-section">
          <div className="container calendar-grid">
            <div>
              <span className="kicker">Admissions Calendar</span>
              <h2>Scroll the Roadmap</h2>
              <p>The calendar comes after the grade journey so deadlines feel like execution details, not the whole story.</p>
            </div>
            <CalendarScrollPanel />
          </div>
        </section>

        <section id="destinations" className="soft destination-section">
          <div className="container section-head">
            <span className="kicker">Country Tracks & Scholarships</span>
            <h2>One Roadmap, Different Admissions Systems</h2>
            <p>The site now separates destination strategy and scholarship planning instead of hiding them in a single FAQ-style mention.</p>
          </div>
          <div className="container grid four">
            {destinationTracks.map(([title, body], index) => (
              <motion.article
                className="destination-card"
                key={title}
                initial={{ opacity: 0.58, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.42, delay: index * 0.06 }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="placements" className="dark">
          <div className="container section-head">
            <span className="kicker on-dark">Where Our Students Go</span>
            <h2>Verified University Placements</h2>
            <p>The Skiper49 coverflow now sits here because motion belongs with outcomes: it gives the placements area a stronger proof-wall moment.</p>
          </div>
          <div className="container logo-strip">
            {universities.map((item) => <span className="logo-chip dark-chip" key={item}>{item}</span>)}
          </div>
          <PlacementCarousel />
        </section>

        <section id="testimonials">
          <div className="container section-head">
            <span className="kicker">Students & Parents</span>
            <h2>Real Journeys, Real Results</h2>
          </div>
          <StudentStoryDeck />
        </section>

        <section id="awards-media">
          <div className="container section-head">
            <span className="kicker">Press, Media & Recognition</span>
            <h2>A Proof Wall Ready for Features, Awards and Speaking Moments</h2>
            <p>The current PrometheusEDGE site does not publish press logos or awards yet, so these slots are prepared for verified links, logos and photos before launch.</p>
          </div>
          <div className="container logo-strip">
            {["Press Feature Link", "Founder Interview", "School Workshop", "Award Logo", "Conference Panel", "Media Mention"].map((item) => <span className="logo-chip placeholder" key={item}>{item}</span>)}
          </div>
        </section>

        <section className="soft">
          <div className="container social-grid">
            <div>
              <span className="kicker">Social Feed</span>
              <h2>Make the Front Page Feel Alive</h2>
              <p>Use this area for a live Instagram embed or recent manually curated posts: student wins, application deadlines, campus visits, parent sessions and blog launches.</p>
              <div className="social-row"><a>IG</a><a>in</a><a>YT</a><a>FB</a></div>
            </div>
            <div className="feed-grid">{["Campus shortlist checklist", "Parent guidance session", "Application deadline reminder", "Student story", "Blog insight", "Live Instagram Embed"].map((item) => <div className="feed-tile" key={item}>{item}</div>)}</div>
          </div>
        </section>

        <section id="contact" className="soft">
          <div className="container contact-grid">
            <div>
              <span className="kicker">Questions Before You Decide?</span>
              <h2>Talk to PrometheusEDGE</h2>
              <p>Use the first conversation to understand fit, timelines, scholarship possibilities, country choices and what your child should focus on next.</p>
              <ul className="contact-list">
                <li><b>Email:</b> info@prometheusedge.com</li>
                <li><b>Phone:</b> +91 966-774-5811</li>
                <li><b>Address:</b> Sector 122, Noida, Uttar Pradesh 201301</li>
              </ul>
            </div>
            <form className="form" onSubmit={(event) => event.preventDefault()}>
              <input placeholder="Parent / Student Name" />
              <input placeholder="Current Grade" />
              <input placeholder="Phone" />
              <input placeholder="Email" />
              <textarea placeholder="Share the student's grade, interests, target countries or biggest question." rows={5} />
              <LiquidButton type="submit">Send My Question</LiquidButton>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-grid">
          <div><a className="brand" href="#top"><span className="brand-mark">EDGE</span><small>way</small></a><p>Boutique college and career counselling for Grades 9-12.</p></div>
          <div><b>Explore</b><a href="#proof">Proof</a><a href="#story-map">Path</a><a href="#about">Philosophy</a><a href="#services">Services</a></div>
          <div><b>Programs</b><a href="#programs-grade-9">Grade 9</a><a href="#programs-grade-10">Grade 10</a><a href="#programs-grade-11">Grade 11</a><a href="#programs-grade-12">Grade 12</a></div>
          <div><b>Get in Touch</b><span>info@prometheusedge.com</span><span>+91 966-774-5811</span><span>Sector 122, Noida</span></div>
        </div>
      </footer>
    </>
  );
}

export default App;
