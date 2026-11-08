
"use client";

import Link from "next/link";

import ProjectCarousel from "./components/ProjectCarousel";
import { useLanguage } from "./components/LanguageProvider";
import { translations } from "./i18n/translations";

export default function Home() {
  const { language } = useLanguage();

  const t = translations[language].home;

  const isHebrew = language === "he";

  return (
    <main
      id="main-content"
      className="home-page"
      dir={isHebrew ? "rtl" : "ltr"}
    >
      {/* Ambient background */}
      <div
        className="ambient ambient-one"
        aria-hidden="true"
      />

      <div
        className="ambient ambient-two"
        aria-hidden="true"
      />

      <div
        className="ambient ambient-three"
        aria-hidden="true"
      />

      <div
        className="tiny-grid"
        aria-hidden="true"
      />

      {/* Hero section */}
      <section
        className="hero-intro"
        aria-labelledby="hero-title"
      >
        {/* Availability */}
        <div className="hero-eyebrow">
          <span className="status-dot" />
          {t.availability}
        </div>

        {/* Greeting */}
        <p className="hero-hello">
          {t.greeting}{" "}
          <span aria-hidden="true">
            ✳
          </span>
        </p>

        {/* Main headline */}
        <h1 id="hero-title">
          {t.headline}{" "}
          <span className="hero-gradient">
            {t.headlineAccent}
          </span>
        </h1>

        {/* Professional role */}
        <div className="role-label">
          <span className="role-line" />
          {t.role}
        </div>

        {/* Introduction */}
        <p className="hero-description">
          {t.description}
        </p>

        {/* Call-to-action buttons */}
        <div className="hero-actions">
          <a
            className="action-btn action-btn--primary"
            href="#showcase"
          >
            <span>{t.explore}</span>

            <span aria-hidden="true">
              ↗
            </span>
          </a>

          <Link
            className="action-btn action-btn--outline"
            href="/about"
          >
            <span>{t.about}</span>

            <span aria-hidden="true">
              {isHebrew ? "←" : "→"}
            </span>
          </Link>
        </div>

        {/* Expertise */}
        <div className="hero-note">
          <span className="hero-note-line" />
          {t.expertise}
        </div>
      </section>

      {/* Projects showcase */}
      <ProjectCarousel />
    </main>
  );
}