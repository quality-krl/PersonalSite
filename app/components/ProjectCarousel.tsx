"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { translations } from "../i18n/translations";

type ProjectId = keyof typeof translations.en.projects;

type ProjectConfig = {
  id: ProjectId;
  tags: string[];
  accent: string;
  github?: string;
  demoVideo?: string;
};

// Only metadata lives here. All displayed copy comes from translations.ts.
const projects: ProjectConfig[] = [
  {
  id: "sylius",
  tags: ["Playwright", "Python", "Pytest", "REST API"],
  accent: "violet",
  github: "https://github.com/quality-krl/sylius-automation",
  demoVideo: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/media/sylius/sylius-automation-showcase.mp4`,
},

{
  id: "freetv",
  tags: ["iOS", "Postman", "TestRail", "Jira"],
  accent: "coral",
  github: "https://github.com/quality-krl/FreeTV_iOS_E2E_QA_Project_STR_STD_STP_SRS",
},


{
  id: "ksp",
  tags: ["Test Design", "DevTools", "Jira", "Web QA"],
  accent: "blue",
  github: "https://github.com/quality-krl/KSP-STD-STR",
},

  {
    id: "precision",
    tags: ["JavaScript", "HTML", "CSS", "RTL / LTR"],
    accent: "mint",
    github: "https://github.com/quality-krl/PrecisionPlaybook",
  },
  {
    id: "eargym",
    tags: ["JavaScript", "Responsive UI", "Interaction", "QA"],
    accent: "gold",
    github: "https://github.com/quality-krl/EarGym-TestLab",
  },
];

// Every featured project has its own case study page.
const caseStudyRoutes: Partial<Record<ProjectId, string>> = {
  sylius: "/projects/sylius",
  freetv: "/projects/freetv",
  ksp: "/projects/ksp",
  precision: "/projects/precision",
  eargym: "/projects/eargym",
};

// Use real project imagery already stored in public/media.
// Sylius keeps its current cover while the project is in progress.
const projectCoverFiles: Partial<Record<ProjectId, string>> = {
  sylius: "carousel-cover.webp",
  freetv: "report-cover.webp",
  ksp: "report-cover.webp",
  precision: "precision-live-cover.webp",
  eargym: "eargym-intro.webp",
};

const projectCoverBackgrounds: Partial<Record<ProjectId, string>> = {
  sylius: "#142e36",
  freetv: "#14262f",
  ksp: "#e9f0ed",
  precision: "#e8e6f5",
  eargym: "#18251d",
};

function ProjectArtwork({
  id,
  label,
  demoVideo,
}: {
  id: ProjectId;
  label: string;
  demoVideo?: string;
}) {
  const coverFile = projectCoverFiles[id];
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const [playPreview, setPlayPreview] = useState(false);

  if (demoVideo) {
    const imageSrc = coverFile
      ? `${basePath}/media/${id}/${coverFile}`
      : undefined;

    return (
      <div
        className={`project-art project-art--${id}`}
        role="img"
        aria-label={label}
        onMouseEnter={() => setPlayPreview(true)}
        onFocusCapture={() => setPlayPreview(true)}
        onTouchStart={() => setPlayPreview(true)}
        style={{
          border: "none",
          background: projectCoverBackgrounds[id] ?? "#142e36",
        }}
      >
        {playPreview ? (
          <video
            src={demoVideo}
            poster={imageSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            className="relative z-10 block h-full w-full object-cover"
          />
        ) : (
          imageSrc && (
            <img
              src={imageSrc}
              alt=""
              aria-hidden="true"
              draggable={false}
              decoding="async"
              className="relative z-10 block h-full w-full object-cover"
            />
          )
        )}
      </div>
    );
  }
  if (coverFile) {
    const imageSrc = `${basePath}/media/${id}/${coverFile}`;

    return (
      <div
        className={`project-art project-art--${id}`}
        role="img"
        aria-label={label}
        style={{
          border: "none",
          background: projectCoverBackgrounds[id] ?? "#142e36",
        }}
      >
        {/* Matching blurred backdrop: fills the card without grey/white gutters. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover opacity-70 blur-3xl"
        />

        {/* Real project image: never crop report pages or screenshots. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt=""
          loading="eager"
          draggable={false}
          className={`relative z-10 block h-full w-full ${
            id === "sylius" ? "object-cover" : "object-contain"
          }`}
        />
      </div>
    );
  }

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
      <span className="art-pill">{label}</span>
    </div>
  );
}

export default function ProjectCarousel() {
  const { language } = useLanguage();
  const t = translations[language];
  const labels = t.carousel;
  const isHebrew = language === "he";

  const [activeIndex, setActiveIndex] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const total = projects.length;
  const active = projects[activeIndex];
  const previous = projects[(activeIndex - 1 + total) % total];
  const next = projects[(activeIndex + 1) % total];

  const copy = (id: ProjectId) => t.projects[id];
  const activeCopy = copy(active.id);
  const caseStudyHref = caseStudyRoutes[active.id];
  const previousCopy = copy(previous.id);
  const nextCopy = copy(next.id);

  function go(step: number) {
    setActiveIndex((index) => (index + step + total) % total);
  }

  function openDetails() {
    triggerRef.current = document.activeElement instanceof HTMLButtonElement
      ? document.activeElement
      : null;
    setDetailOpen(true);
  }

  function closeDetails() {
    setDetailOpen(false);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!detailOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeDetails();
      }
      // Keep keyboard focus inside the dialog.
      if (event.key === "Tab") {
        const dialog = document.querySelector<HTMLElement>("#project-detail-dialog");
        if (!dialog) return;
        const nodes = Array.from(
          dialog.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], video[controls]'
          )
        );
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [detailOpen]);

  return (
    <>
      <section
        id="showcase"
        className="showcase"
        aria-label={labels.featuredWork}
        onKeyDown={(event) => {
          if (detailOpen || event.target instanceof HTMLButtonElement && event.target.closest(".carousel-controls") === null) return;
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            go(-1);
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            go(1);
          }
        }}
      >
        <div className="showcase-topline">
          <span className="sparkle-symbol" aria-hidden="true">✦</span>
          {labels.featuredWork}
          <span className="topline-rule" />
          <span className="current-count" dir="ltr">
            0{activeIndex + 1} <span>/ 0{total}</span>
          </span>
        </div>

        <div className="carousel-stage">
          <div className="orbit orbit-one" aria-hidden="true" />
          <div className="orbit orbit-two" aria-hidden="true" />
          <div className="stage-halo" aria-hidden="true" />

          <button
            className="peek-card peek-card--left"
            aria-label={`${labels.previousProject}: ${previousCopy.title}`}
            onClick={() => go(-1)}
            type="button"
          >
            <div className="peek-art">
              <ProjectArtwork id={previous.id} label={previousCopy.artLabel} />
            </div>
            <span className="peek-category">{labels.previousProject}</span>
            <strong>{previousCopy.title}</strong>
          </button>

          <button
            className="peek-card peek-card--right"
            aria-label={`${labels.nextProject}: ${nextCopy.title}`}
            onClick={() => go(1)}
            type="button"
          >
            <div className="peek-art">
              <ProjectArtwork id={next.id} label={nextCopy.artLabel} />
            </div>
            <span className="peek-category">{labels.nextProject}</span>
            <strong>{nextCopy.title}</strong>
          </button>

          <article
            key={active.id}
            className={`spotlight-card spotlight-card--${active.accent}`}
            aria-live="polite"
            dir={isHebrew ? "rtl" : "ltr"}
          >
            <div className="card-shine" aria-hidden="true" />
            <div className="card-upper">
              <span className="card-badge">
                <span aria-hidden="true">✦</span> {activeCopy.eyebrow}
              </span>
              <span className="card-corner" dir="ltr">
                PORTFOLIO / 0{activeIndex + 1}
              </span>
            </div>

            <ProjectArtwork
  id={active.id}
  label={activeCopy.artLabel}
  demoVideo={active.demoVideo}
/>

            <div className="card-copy">
              <span className="card-category">{activeCopy.category}</span>
              <h2>{activeCopy.title}</h2>
              <p>{activeCopy.description}</p>
              <div className="project-tags" aria-label={labels.technologies}>
                {active.tags.map((tag) => <span key={tag} dir="auto">{tag}</span>)}
              </div>
              <div className="card-actions">
                {caseStudyHref ? (
                  <Link
                    href={caseStudyHref}
                    className="action-btn action-btn--primary"
                  >
                    {labels.viewCaseStudy} <span aria-hidden="true">↗</span>
                  </Link>
                ) : (
                  <button
                    ref={triggerRef}
                    type="button"
                    className="action-btn action-btn--primary"
                    onClick={openDetails}
                  >
                    {labels.viewCaseStudy} <span aria-hidden="true">↗</span>
                  </button>
                )}
                {active.github && (
                  <a
                    className="action-btn action-btn--outline project-source-link"
                    href={active.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >

{active.id === "freetv" || active.id === "ksp"
  ? isHebrew
    ? "מאגר הפרויקט"
    : "Project Repository"
  : labels.sourceCode}
<span aria-hidden="true">↗</span>

                  </a>
                )}
                {active.demoVideo && (
                  <button
                    type="button"
                    className="action-btn action-btn--outline"
                    onClick={openDetails}
                  >
                    {labels.watchDemo} <span aria-hidden="true">▶</span>
                  </button>
                )}
              </div>
            </div>
          </article>
        </div>

        <div className="carousel-controls" aria-label={labels.featuredWork}>
          <button
            type="button"
            className="circle-control"
            onClick={() => go(-1)}
            aria-label={labels.previousProject}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <div className="carousel-dots">
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                aria-label={`${isHebrew ? "הצגת פרויקט" : "Show project"}: ${copy(project.id).title}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={`carousel-dot ${index === activeIndex ? "is-selected" : ""}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className="circle-control"
            onClick={() => go(1)}
            aria-label={labels.nextProject}
          >
            <span aria-hidden="true">›</span>
          </button>
          <span className="controls-hint">{labels.useArrows}</span>
        </div>
      </section>

      {mounted && detailOpen && createPortal(
        <div
          className="dialog-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDetails();
          }}
        >
          <div
            id="project-detail-dialog"
            className="case-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-title"
            dir={isHebrew ? "rtl" : "ltr"}
          >
            <button
              ref={closeRef}
              className="dialog-close"
              type="button"
              aria-label={labels.close}
              onClick={closeDetails}
            >
              ×
            </button>
            <p className="page-kicker">{labels.deepDive}</p>
            <h2 id="case-title">{activeCopy.title}</h2>
            <p className="dialog-description">{activeCopy.description}</p>
            <h3>{labels.highlights}</h3>
            <ul>
              {activeCopy.highlights.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className="dialog-tags">
              {active.tags.map((tag) => <span key={tag} dir="auto">{tag}</span>)}
            </div>
            {active.demoVideo && (
              <video className="case-video" src={active.demoVideo} controls playsInline preload="metadata">
                Your browser does not support video playback.
              </video>
            )}
            <div className="dialog-actions">
              {active.github && (
                <a
                  className="action-btn action-btn--primary project-source-link"
                  href={active.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {labels.viewRepository} <span aria-hidden="true">↗</span>
                </a>
              )}
              <button
                className="action-btn action-btn--outline"
                type="button"
                onClick={closeDetails}
              >
                {labels.close}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
