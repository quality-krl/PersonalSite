
"use client";

import Link from "next/link";

import { useLanguage } from "../components/LanguageProvider";
import { translations } from "../i18n/translations";

export default function AboutPage() {
  const { language } = useLanguage();

  const t = translations[language].about;

  return (
    <main
      id="main-content"
      className="inner-page"
      dir={language === "he" ? "rtl" : "ltr"}
    >
      <div
        className="inner-glow inner-glow--left"
        aria-hidden="true"
      />

      <div className="page-content">
        {/* Page introduction */}
        <p className="page-kicker">
          {t.kicker}
        </p>

        <h1 className="page-title">
          {t.title}{" "}
          <span>{t.titleAccent}</span>
        </h1>

        <p className="page-lead">
          {t.introduction}
        </p>

        {/* My approach */}
        <div className="about-story glass-surface">
          <div>
            <span className="section-index">
              01 / {t.approachLabel}
            </span>

            <h2>
              {t.approachTitle}
            </h2>
          </div>

          <p>
            {t.approachDescription}
          </p>
        </div>

        {/* Skills and capabilities */}
        <div className="capabilities">
          {t.capabilities.map((item, index) => (
            <article
              className="capability glass-surface"
              key={index}
            >
              <span className="capability-number">
                0{index + 1}
              </span>

              <h3>{item.title}</h3>

              <p>{item.detail}</p>
            </article>
          ))}
        </div>

        {/* Navigation actions */}
        <div className="page-bottom-actions">
          <Link
            href="/"
            className="action-btn action-btn--outline"
          >
            {t.exploreProjects}

            <span aria-hidden="true">
              {language === "he" ? "→" : "←"}
            </span>
          </Link>

          <Link
            href="/contact"
            className="action-btn action-btn--primary"
          >
            {t.getInTouch}

            <span aria-hidden="true">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
