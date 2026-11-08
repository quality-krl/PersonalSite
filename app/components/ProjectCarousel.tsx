"use client";

import { useEffect, useState } from "react";

type Project = {
  id: string;
  title: string;
  eyebrow: string;
  category: string;
  description: string;
  tags: string[];
  highlights: string[];
  accent: string;
  github?: string;
  demoVideo?: string;
};

const projects: Project[] = [
  {
    id: "sylius",
    title: "Sylius Automation",
    eyebrow: "FEATURED PROJECT",
    category: "END-TO-END AUTOMATION",
    description: "Building maintainable UI and API checks for a real e-commerce platform.",
    tags: ["Playwright", "Python", "Pytest", "REST API"],
    highlights: [
      "Page Object Model and reusable fixtures",
      "Critical shopping journeys and API coverage",
      "Negative cases, test data and lifecycle checks",
    ],
    accent: "violet",
    github: "https://github.com/quality-krl/sylius-automation",
    // Add demoVideo: "/videos/sylius-demo.mp4" when you have a real recording.
  },
  {
    id: "freetv",
    title: "FreeTV iOS QA",
    eyebrow: "MOBILE QUALITY ASSURANCE",
    category: "MOBILE · API · SECURITY",
    description: "Exploring critical streaming flows through manual, API and security-focused testing.",
    tags: ["iOS", "Postman", "TestRail", "Jira"],
    highlights: [
      "123 documented test cases",
      "Streaming, authentication and account scenarios",
      "API investigation and structured defect reporting",
    ],
    accent: "coral",
  },
  {
    id: "ksp",
    title: "KSP E-Commerce QA",
    eyebrow: "MANUAL QA CASE STUDY",
    category: "WEB · E-COMMERCE",
    description: "Risk-driven functional testing of a multi-step online shopping experience.",
    tags: ["Test Design", "DevTools", "Jira", "Web QA"],
    highlights: [
      "65 test cases across key customer flows",
      "Shopping cart, search, login and UX checks",
      "Defect analysis and test summary reporting",
    ],
    accent: "blue",
  },
  {
    id: "precision",
    title: "PrecisionPlaybook",
    eyebrow: "DESIGN CONCEPT",
    category: "QA WORKFLOW TOOL",
    description: "A concept for clearer, structured defect reporting in two languages.",
    tags: ["JavaScript", "HTML", "CSS", "RTL / LTR"],
    highlights: [
      "Structured bug-report workflow concept",
      "Bilingual English / Hebrew experience",
      "Clarity and usability as design priorities",
    ],
    accent: "mint",
  },
  {
    id: "eargym",
    title: "EarGym TestLab",
    eyebrow: "INTERACTIVE CONCEPT",
    category: "INTERACTIVE WEB EXPERIENCE",
    description: "An ear-training application concept bringing music, interaction and QA together.",
    tags: ["JavaScript", "Responsive UI", "Interaction", "QA"],
    highlights: [
      "Interactive ear-training experience concept",
      "Audio-oriented interface and feedback",
      "Responsive design and user-flow testing",
    ],
    accent: "gold",
  },
];

function ProjectArtwork({ id }: { id: Project["id"] }) {
  return (
    <div className={`project-art project-art--${id}`} aria-hidden="true">
      <div className="art-aurora" />
      <svg viewBox="0 0 520 210" role="presentation" focusable="false" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={`glass-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#FFFFFF" stopOpacity=".95" />
            <stop offset="1" stopColor="#E8E3FF" stopOpacity=".85" />
          </linearGradient>
          <linearGradient id={`device-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#6455C8" />
            <stop offset="1" stopColor="#C59BF8" />
          </linearGradient>
        </defs>
        <circle cx="110" cy="86" r="74" fill="#FFFFFF" opacity=".14" />
        <circle cx="413" cy="120" r="110" fill="#FFFFFF" opacity=".15" />
        <path d="M42 155 Q220 50 479 110" fill="none" stroke="#FFF" strokeWidth="2" strokeOpacity=".65" strokeDasharray="7 12" />

        {id === "sylius" && (
          <>
            <g transform="translate(99 23) rotate(-5 163 80)">
              <rect x="0" y="0" width="322" height="169" rx="14" fill={`url(#glass-${id})`} stroke="#FFF" strokeWidth="3" />
              <path d="M0 14 Q0 0 14 0 H308 Q322 0 322 14 V32 H0 Z" fill="#DDD6FE" />
              <circle cx="17" cy="16" r="4" fill="#FA8B9A" /><circle cx="31" cy="16" r="4" fill="#F9CE82" /><circle cx="45" cy="16" r="4" fill="#A4DCCB" />
              <rect x="20" y="47" width="79" height="9" rx="4" fill="#6953BE" opacity=".75" />
              <rect x="20" y="64" width="135" height="5" rx="2" fill="#B4ACD5" />
              <rect x="20" y="74" width="111" height="5" rx="2" fill="#D1CBDF" />
              {[0, 1, 2].map((i) => (
                <g key={i} transform={`translate(${20 + i * 96} 95)`}>
                  <rect width="85" height="56" rx="8" fill={i === 1 ? "#D8D4FF" : "#F3E9F7"} />
                  <rect x="10" y="9" width="65" height="28" rx="5" fill={i === 1 ? "#B9B3EA" : "#E1D6EC"} />
                  <rect x="11" y="44" width="48" height="4" rx="2" fill="#A39CB9" />
                </g>
              ))}
            </g>
            <g transform="translate(376 106)">
              <circle r="31" fill="#fff" stroke="#DCD6FF" strokeWidth="3" />
              <path d="M-17 -11 H-10 L-5 12 H14 L22 -3 H-7" fill="none" stroke="#7054D8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="-2" cy="19" r="4" fill="#7054D8" /><circle cx="15" cy="19" r="4" fill="#7054D8" />
            </g>
          </>
        )}
        {id === "freetv" && (
          <>
            <g transform="translate(178 5) rotate(-8 83 100)">
              <rect x="4" y="3" width="161" height="205" rx="25" fill="#2B245B" opacity=".2" />
              <rect width="160" height="204" rx="25" fill="#272245" stroke="#D0C4FF" strokeWidth="4" />
              <rect x="10" y="12" width="140" height="179" rx="18" fill={`url(#device-${id})`} />
              <path d="M13 75 C55 15 95 140 149 37 V193 H13 Z" fill="#FCB8D4" opacity=".45" />
              <rect x="62" y="17" width="38" height="7" rx="4" fill="#2F2953" />
              <circle cx="80" cy="102" r="39" fill="#fff" opacity=".22" stroke="#fff" strokeWidth="2" />
              <path d="M70 80 L70 124 L106 102 Z" fill="#fff" />
            </g>
            <circle cx="134" cy="78" r="29" fill="#fff" opacity=".76" />
            <path d="M119 80 q15 -25 30 0 M119 88 q15 25 30 0" fill="none" stroke="#8071D9" strokeWidth="4" strokeLinecap="round" />
          </>
        )}
        {id === "ksp" && (
          <>
            <g transform="translate(93 30) rotate(-4 170 80)">
              <rect width="335" height="165" rx="15" fill={`url(#glass-${id})`} stroke="#fff" strokeWidth="3" />
              <path d="M0 15 Q0 0 15 0 H320 Q335 0 335 15 V31 H0Z" fill="#DED9FE" />
              <circle cx="18" cy="16" r="4" fill="#F5A0A9"/><circle cx="32" cy="16" r="4" fill="#F1CA82" />
              <rect x="18" y="46" width="120" height="13" rx="6" fill="#B2AADE" />
              <rect x="18" y="71" width="88" height="72" rx="9" fill="#DAD4F8" />
              <rect x="117" y="71" width="90" height="72" rx="9" fill="#EAE5F7" />
              <rect x="218" y="71" width="98" height="72" rx="9" fill="#D8C9F3" />
            </g>
            <g transform="translate(343 95)">
              <circle r="37" fill="#fff" stroke="#DED2FB" strokeWidth="3" />
              <path d="M-17 -14 H-9 L-4 13 H16 L23 -5 H-7" fill="none" stroke="#7054D8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="-1" cy="21" r="4" fill="#7054D8" /><circle cx="17" cy="21" r="4" fill="#7054D8" />
            </g>
          </>
        )}
        {id === "precision" && (
          <>
            <g transform="translate(116 20) rotate(-5 150 83)">
              <rect width="295" height="176" rx="15" fill={`url(#glass-${id})`} stroke="#fff" strokeWidth="3" />
              <rect x="20" y="18" width="255" height="28" rx="8" fill="#E9E0FD" />
              <rect x="34" y="28" width="82" height="8" rx="4" fill="#8B6DC8" />
              {[0, 1, 2].map((i) => (
                <g key={i} transform={`translate(20 ${58 + i * 36})`}>
                  <rect width="255" height="29" rx="7" fill={i === 1 ? "#E8F4ED" : "#F5EFFB"} />
                  <rect x="10" y="9" width="14" height="12" rx="4" fill={i === 1 ? "#7BBDA3" : "#A79BE5"} />
                  <rect x="34" y="10" width="125" height="6" rx="3" fill="#B5ACC9" />
                  <rect x="182" y="9" width="55" height="9" rx="4" fill={i === 1 ? "#AADEC9" : "#DDCCF3"} />
                </g>
              ))}
            </g>
            <g transform="translate(365 115)">
              <circle r="33" fill="#fff" stroke="#E5DAFF" strokeWidth="3" />
              <path d="M0 -14 C-19 -18 -22 -1 -15 9 C-14 24 14 24 15 9 C22 -1 19 -18 0 -14 Z" fill="#E9DBFF" stroke="#7655CB" strokeWidth="3" />
              <path d="M-23 -3 H23 M-19 15 H19" stroke="#7655CB" strokeWidth="3" />
            </g>
          </>
        )}
        {id === "eargym" && (
          <>
            <g transform="translate(120 36)">
              <rect width="280" height="143" rx="17" fill={`url(#glass-${id})`} stroke="#fff" strokeWidth="3" />
              <path d="M26 74 L42 74 L48 44 L59 102 L71 60 L83 82 L97 29 L110 112 L123 60 L138 84 L151 57 L164 78 L181 43 L196 98 L209 61 L226 74 L251 74" stroke="#8C63D8" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <g transform="translate(337 102)">
              <circle r="48" fill="#fff" opacity=".9" />
              <path d="M-26 9 V-5 A26 26 0 0 1 26 -5 V9" stroke="#6F55D0" strokeWidth="9" strokeLinecap="round" fill="none" />
              <rect x="-35" y="4" width="15" height="33" rx="7" fill="#7657D4" />
              <rect x="20" y="4" width="15" height="33" rx="7" fill="#7657D4" />
            </g>
          </>
        )}
      </svg>
      <span className="art-pill">{id === "sylius" ? "UI + API COVERAGE" : id === "freetv" ? "MOBILE TESTING" : id === "ksp" ? "SHOPPING FLOWS" : id === "precision" ? "REPORTING WORKFLOW" : "INTERACTIVE AUDIO"}</span>
    </div>
  );
}

export default function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const total = projects.length;
  const active = projects[activeIndex];
  const previous = projects[(activeIndex - 1 + total) % total];
  const next = projects[(activeIndex + 1) % total];

  const go = (direction: number) => setActiveIndex((index) => (index + direction + total) % total);

  useEffect(() => {
    if (!detailOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDetailOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [detailOpen]);

  return (
    <section id="showcase" className="showcase" aria-label="Featured QA projects" onKeyDown={(event) => {
      if (detailOpen) return;
      if (event.key === "ArrowLeft") { event.preventDefault(); go(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); go(1); }
    }}>
      <div className="showcase-topline"><span className="sparkle-symbol">✦</span> FEATURED WORK <span className="topline-rule" /> <span className="current-count">0{activeIndex + 1} <span>/ 0{total}</span></span></div>
      <div className="carousel-stage">
        <div className="orbit orbit-one" aria-hidden="true" />
        <div className="orbit orbit-two" aria-hidden="true" />
        <div className="stage-halo" aria-hidden="true" />

        <button className="peek-card peek-card--left" aria-label={`Show ${previous.title}`} onClick={() => go(-1)} type="button">
          <div className="peek-art"><ProjectArtwork id={previous.id} /></div>
          <span className="peek-category">PREVIOUS PROJECT</span>
          <strong>{previous.title}</strong>
        </button>
        <button className="peek-card peek-card--right" aria-label={`Show ${next.title}`} onClick={() => go(1)} type="button">
          <div className="peek-art"><ProjectArtwork id={next.id} /></div>
          <span className="peek-category">NEXT PROJECT</span>
          <strong>{next.title}</strong>
        </button>

        <article key={active.id} className={`spotlight-card spotlight-card--${active.accent}`} aria-live="polite">
          <div className="card-shine" aria-hidden="true" />
          <div className="card-upper"><span className="card-badge"><span>✦</span> {active.eyebrow}</span><span className="card-corner">PORTFOLIO / 0{activeIndex + 1}</span></div>
          <ProjectArtwork id={active.id} />
          <div className="card-copy">
            <span className="card-category">{active.category}</span>
            <h2>{active.title}</h2>
            <p>{active.description}</p>
            <div className="project-tags" aria-label="Technologies">
              {active.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="card-actions">
              <button type="button" className="action-btn action-btn--primary" onClick={() => setDetailOpen(true)}>View case study <span aria-hidden="true">↗</span></button>
              {active.github && <a className="action-btn action-btn--outline" href={active.github} target="_blank" rel="noopener noreferrer">Source code <span aria-hidden="true">↗</span></a>}
              {active.demoVideo && <button type="button" className="action-btn action-btn--outline" onClick={() => setDetailOpen(true)}>Watch demo <span aria-hidden="true">▶</span></button>}
            </div>
          </div>
        </article>
      </div>
      <div className="carousel-controls" aria-label="Project carousel controls">
        <button type="button" className="circle-control" onClick={() => go(-1)} aria-label="Previous project"><span aria-hidden="true">‹</span></button>
        <div className="carousel-dots">
          {projects.map((project, i) => <button key={project.id} type="button" aria-label={`Show ${project.title}`} aria-current={i === activeIndex ? "true" : undefined} className={`carousel-dot ${i === activeIndex ? "is-selected" : ""}`} onClick={() => setActiveIndex(i)} />)}
        </div>
        <button type="button" className="circle-control" onClick={() => go(1)} aria-label="Next project"><span aria-hidden="true">›</span></button>
        <span className="controls-hint">USE ARROWS TO EXPLORE</span>
      </div>

      {detailOpen && (
        <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setDetailOpen(false); }}>
          <div className="case-dialog" role="dialog" aria-modal="true" aria-labelledby="case-title">
            <button className="dialog-close" type="button" aria-label="Close project details" onClick={() => setDetailOpen(false)}>×</button>
            <p className="page-kicker">PROJECT DEEP DIVE</p>
            <h2 id="case-title">{active.title}</h2>
            <p className="dialog-description">{active.description}</p>
            <h3>What this project explores</h3>
            <ul>{active.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="dialog-tags">{active.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            {active.demoVideo && <video className="case-video" src={active.demoVideo} controls playsInline preload="metadata">Your browser does not support video playback.</video>}
            <div className="dialog-actions">
              {active.github && <a className="action-btn action-btn--primary" href={active.github} target="_blank" rel="noopener noreferrer">View repository ↗</a>}
              <button className="action-btn action-btn--outline" type="button" onClick={() => setDetailOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}