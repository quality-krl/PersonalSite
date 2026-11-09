
"use client";

import Link from "next/link";

import { useLanguage } from "../../components/LanguageProvider";
import { translations } from "../../i18n/translations";
import { ExternalServiceIcon } from "../../components/ExternalServiceLink";

const content = {
  en: {
    back: "Back to portfolio",
    label: "01 / AUTOMATION CASE STUDY",
    status: "Project in progress",
    overview: "PROJECT OVERVIEW",
    overviewTitle: "Testing beyond the happy path.",
    overviewText:
      "This project explores quality engineering for Sylius, an e-commerce platform. The focus is on building reliable automated checks, understanding API behavior and identifying risks in critical user journeys.",
    strategy: "TESTING STRATEGY",
    strategyTitle: "A risk-first approach.",
    strategyItems: [
      {
        number: "01",
        title: "Critical journeys",
        description:
          "Identify customer workflows where failures would have significant business impact.",
      },
      {
        number: "02",
        title: "API behavior",
        description:
          "Analyze HTTP responses, JSON resources, error conditions and state changes.",
      },
      {
        number: "03",
        title: "Automation design",
        description:
          "Use reusable fixtures, clear locators and maintainable Playwright tests.",
      },
    ],
    technologies: "TOOLS & TECHNOLOGIES",
    evidence: "PROJECT EVIDENCE",
    evidenceTitle: "Built and documented in public.",
    evidenceDescription:
      "The repository contains the evolving automation project. Test reports, screenshots and demonstrations will be added as they are completed and verified.",
    repository: "Explore GitHub repository",
    next: "NEXT STEPS",
    nextTitle: "What comes next?",
    nextDescription:
      "Expand the automated test coverage, strengthen negative scenarios and publish verified execution evidence.",
    closing: "Quality is not only about finding defects. It is about understanding and reducing risk.",
  },
  he: {
    back: "חזרה לפורטפוליו",
    label: "01 / פרויקט אוטומציה",
    status: "הפרויקט בפיתוח",
    overview: "סקירת הפרויקט",
    overviewTitle: "לבדוק מעבר לתרחיש התקין.",
    overviewText:
      "הפרויקט מתמקד בהנדסת איכות עבור Sylius, פלטפורמת מסחר אלקטרוני. הדגש הוא על פיתוח בדיקות אוטומטיות אמינות, הבנת התנהגות ה-API וזיהוי סיכונים בתהליכי משתמש קריטיים.",
    strategy: "אסטרטגיית הבדיקות",
    strategyTitle: "קודם כול — הסיכונים.",
    strategyItems: [
      {
        number: "01",
        title: "תהליכים קריטיים",
        description:
          "זיהוי תהליכי לקוח שבהם תקלה עלולה לגרום לפגיעה עסקית משמעותית.",
      },
      {
        number: "02",
        title: "התנהגות API",
        description:
          "ניתוח תגובות HTTP, משאבי JSON, תרחישי שגיאה ושינויים במצב המערכת.",
      },
      {
        number: "03",
        title: "תכנון אוטומציה",
        description:
          "שימוש ב-Fixtures חוזרים, ב-Locators יציבים ובבדיקות Playwright נוחות לתחזוקה.",
      },
    ],
    technologies: "כלים וטכנולוגיות",
    evidence: "ראיות ותיעוד",
    evidenceTitle: "הפרויקט מתועד ב-GitHub.",
    evidenceDescription:
      "המאגר מציג את פרויקט האוטומציה המתפתח. דוחות הרצה, צילומי מסך והדגמות יתווספו לאחר שיושלמו ויאומתו.",
    repository: "מעבר למאגר GitHub",
    next: "המשך הפיתוח",
    nextTitle: "מה הלאה?",
    nextDescription:
      "הרחבת כיסוי הבדיקות האוטומטיות, חיזוק תרחישים שליליים ופרסום תוצאות הרצה מאומתות.",
    closing: "איכות היא לא רק מציאת באגים, אלא הבנה וצמצום של סיכונים.",
  },
} as const;

const technologies = [
  "Python",
  "Playwright",
  "Pytest",
  "Requests",
  "REST API",
  "Git / GitHub",
];

export default function SyliusCaseStudy() {
  const { language } = useLanguage();

  const t = content[language];
  const project = translations[language].projects.sylius;

  return (
    <main
      id="main-content"
      className="inner-page"
      dir={language === "he" ? "rtl" : "ltr"}
    >
      <div className="inner-glow inner-glow--left" aria-hidden="true" />

      <div className="page-content mx-auto max-w-6xl">

        {/* Back navigation */}
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2
                     text-sm font-semibold text-[#0B7770]
                     transition-opacity hover:opacity-70"
        >
          <span aria-hidden="true">
            {language === "he" ? "→" : "←"}
          </span>
          {t.back}
        </Link>

        {/* Project introduction */}
        <header className="mb-12">
          <p className="page-kicker">{t.label}</p>

          <h1 className="page-title">
            Sylius <span>Automation.</span>
          </h1>

          <p className="page-lead">
            {project.description}
          </p>

          <span
            className="inline-flex items-center gap-2
                       rounded-full border border-[#BBDDD0]
                       bg-[#E6F3EE] px-4 py-2
                       text-xs font-semibold text-[#0B7770]"
          >
            <span
              className="h-2 w-2 rounded-full bg-[#0B7770]"
              aria-hidden="true"
            />
            {t.status}
          </span>
        </header>

        {/* Project overview */}
        <section className="glass-surface mb-6 p-7 md:p-10">
          <p className="section-index">{t.overview}</p>

          <h2
            className="mt-4 text-2xl font-bold
                       tracking-tight text-[#19343D] md:text-3xl"
          >
            {t.overviewTitle}
          </h2>

          <p
            className="mt-5 max-w-3xl text-base leading-8
                       text-[#637879]"
          >
            {t.overviewText}
          </p>
        </section>

        {/* Strategy */}
        <section className="mb-10">
          <div className="mb-6">
            <p className="section-index">{t.strategy}</p>
            <h2
              className="mt-3 text-2xl font-bold
                         tracking-tight text-[#19343D] md:text-3xl"
            >
              {t.strategyTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {t.strategyItems.map((item) => (
              <article
                key={item.number}
                className="glass-surface p-7"
              >
                <span
                  className="text-sm font-bold text-[#0B7770]"
                >
                  {item.number}
                </span>

                <h3
                  className="mt-5 text-xl font-bold text-[#19343D]"
                >
                  {item.title}
                </h3>

                <p
                  className="mt-3 text-sm leading-7 text-[#637879]"
                >
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Technology stack */}
        <section className="glass-surface mb-6 p-7 md:p-10">
          <p className="section-index">{t.technologies}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {technologies.map((technology) => (
              <span
                key={technology}
                dir="ltr"
                className="rounded-full border border-[#C9E3D9]
                           bg-[#E6F3EE] px-4 py-2
                           text-sm font-semibold text-[#166660]"
              >
                {technology}
              </span>
            ))}
          </div>
        </section>

        {/* Evidence */}
        <section className="glass-surface mb-6 p-7 md:p-10">
          <p className="section-index">{t.evidence}</p>

          <h2
            className="mt-4 text-2xl font-bold text-[#19343D]"
          >
            {t.evidenceTitle}
          </h2>

          <p
            className="mt-4 max-w-3xl text-base leading-8
                       text-[#637879]"
          >
            {t.evidenceDescription}
          </p>

          <a
            href="https://github.com/quality-krl/sylius-automation"
            target="_blank"
            rel="noopener noreferrer"
            className="external-brand-link external-brand-link--github
                       mt-7"
          >
            <span className="external-brand-link__icon">
              <ExternalServiceIcon service="github" />
            </span>

            <span className="external-brand-link__text">
              {t.repository}
            </span>

            <span aria-hidden="true">↗</span>
          </a>
        </section>

        {/* Next steps */}
        <section className="glass-surface mb-10 p-7 md:p-10">
          <p className="section-index">{t.next}</p>

          <h2
            className="mt-4 text-2xl font-bold text-[#19343D]"
          >
            {t.nextTitle}
          </h2>

          <p
            className="mt-4 max-w-3xl text-base leading-8
                       text-[#637879]"
          >
            {t.nextDescription}
          </p>
        </section>

        {/* Closing statement */}
        <p
          className="mx-auto mb-10 max-w-3xl text-center
                     text-xl font-semibold leading-relaxed
                     text-[#0B7770] md:text-2xl"
        >
          {t.closing}
        </p>
      </div>
    </main>
  );
}
