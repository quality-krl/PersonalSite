"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "../../components/LanguageProvider";
import { ExternalServiceIcon } from "../../components/ExternalServiceLink";

/**
 * PrecisionPlaybook: an existing bilingual QA bug-report builder.
 * This page describes documented capabilities, not a concept or test report.
 * Demo: https://quality-krl.github.io/PrecisionPlaybook/
 * Repo: https://github.com/quality-krl/PrecisionPlaybook
 */

const LIVE_URL = "https://quality-krl.github.io/PrecisionPlaybook/";
const REPO_URL = "https://github.com/quality-krl/PrecisionPlaybook";

const phases = ["Observe", "Reproduce", "Isolate", "Guard"] as const;

const content = {
  en: {
    eyebrow: "PROJECT 04 / BUILT WEB TOOL",
    back: "Back to portfolio",
    name: "PrecisionPlaybook",
    nameAccent: "Quality, made actionable.",
    lead: "A bilingual bug-report builder that turns an observation into a structured, copy-ready QA report. Built with HTML, CSS and JavaScript, with support for English, Hebrew and RTL/LTR layout.",
    type: "LIVE PROJECT",
    launch: "Open live application",
    source: "View source code",
    introEyebrow: "THE PROBLEM",
    introTitle: "A bug report is useful only when someone can act on it.",
    introBody: "Unstructured findings can leave engineers guessing about reproduction steps, environment, expected behavior and verification. PrecisionPlaybook provides a repeatable reporting workflow instead of relying on memory or loosely written notes.",
    approachEyebrow: "THE 4×4 FRAMEWORK",
    approachTitle: "Observe. Reproduce. Isolate. Guard.",
    approachBody: "The application organizes the reporting process around four named stages. Select a stage to see its purpose in the QA workflow.",
    phases: [
      { label: "Observe", sub: "Capture the symptom", detail: "Describe what happened, where it happened and the user-visible evidence. Separate the observation from an assumption about the underlying cause." },
      { label: "Reproduce", sub: "Make it repeatable", detail: "Express a clear scenario, starting conditions and an actionable sequence, so another person can attempt to reproduce the behavior." },
      { label: "Isolate", sub: "Narrow the conditions", detail: "Record relevant environment details, variations and boundaries that help distinguish a stable issue from an incidental failure." },
      { label: "Guard", sub: "Define verification", detail: "Describe what correct behavior should look like and how the issue could be verified after a fix, reducing the likelihood of regression." },
    ],
    productEyebrow: "PRODUCT CAPABILITIES",
    productTitle: "A small tool built for a real QA workflow.",
    features: [
      { icon: "01", title: "Structured reporting", body: "A focused form for turning a scenario and its symptoms into an organized defect report." },
      { icon: "02", title: "English and Hebrew", body: "Bilingual presentation with right-to-left and left-to-right support." },
      { icon: "03", title: "Copy-ready output", body: "A report that can be copied and reused in an issue-tracking workflow." },
      { icon: "04", title: "Responsive interface", body: "A lightweight vanilla JavaScript interface that adapts to different screen widths." },
    ],
    stackEyebrow: "IMPLEMENTATION",
    stackTitle: "Focused technology, no unnecessary complexity.",
    stackBody: "Built as a client-side web tool. The portfolio illustrates the product flow; the repository and live application provide the direct evidence of the implementation.",
    noMetrics: "No invented automation coverage, defect counts or test-pass metrics are attributed to this project.",
    proofEyebrow: "EXPLORE THE ACTUAL PROJECT",
    proofTitle: "Try the workflow yourself.",
    proofBody: "Open the running application to inspect the interactions and language switching. View the public repository to review the source instead of relying only on screenshots.",
    return: "Explore other projects",
    note: "An implemented personal web project — not an enterprise bug tracker or a claim of production deployment at a company.",
  },
  he: {
    eyebrow: "פרויקט 04 / כלי Web שפותח בפועל",
    back: "חזרה לפורטפוליו",
    name: "PrecisionPlaybook",
    nameAccent: "להפוך ממצא לפעולה.",
    lead: "כלי דו־לשוני ליצירת דיווחי באגים מובנים שאפשר להעתיק ולהשתמש בהם. פותח באמצעות HTML, CSS ו־JavaScript, עם תמיכה בעברית, באנגלית ובכיווניות RTL/LTR.",
    type: "פרויקט פעיל",
    launch: "פתיחת הכלי הפעיל",
    source: "צפייה בקוד המקור",
    introEyebrow: "הבעיה",
    introTitle: "דיווח באג מועיל רק כשאפשר לפעול לפיו.",
    introBody: "דיווח לא מובנה עלול להשאיר למפתחים שאלות על שלבי שחזור, סביבה, התנהגות צפויה ואימות התיקון. PrecisionPlaybook מספק תהליך עבודה חוזר ומסודר במקום להסתמך על זיכרון או הערות חופשיות.",
    approachEyebrow: "מסגרת העבודה 4×4",
    approachTitle: "Observe. Reproduce. Isolate. Guard.",
    approachBody: "היישום מארגן את תהליך הדיווח בארבעה שלבים מוגדרים. בחר שלב כדי לראות את תפקידו בתהליך ה־QA.",
    phases: [
      { label: "Observe", sub: "תיעוד התסמין", detail: "מתעדים מה התרחש, היכן והראיות הנראות למשתמש. מבדילים בין תצפית לבין השערה על שורש התקלה." },
      { label: "Reproduce", sub: "שחזור עקבי", detail: "מנסחים תרחיש, תנאי התחלה ושלבים ברורים כך שאדם אחר יוכל לנסות לשחזר את ההתנהגות." },
      { label: "Isolate", sub: "בידוד התנאים", detail: "מתעדים פרטי סביבה, וריאציות וגבולות כדי להבחין בין תקלה עקבית לבין כשל מקרי." },
      { label: "Guard", sub: "אימות התיקון", detail: "מגדירים כיצד התנהגות תקינה צריכה להיראות ואיך לבדוק את התיקון, כדי להפחית סיכון לרגרסיה." },
    ],
    productEyebrow: "יכולות הכלי",
    productTitle: "כלי קטן שנבנה לתהליך QA אמיתי.",
    features: [
      { icon: "01", title: "דיווח מובנה", body: "טופס ממוקד להפיכת תרחיש ותסמיניו לדיווח תקלה מסודר." },
      { icon: "02", title: "עברית ואנגלית", body: "ממשק דו־לשוני עם תמיכה בכיווניות ימין־לשמאל ושמאל־לימין." },
      { icon: "03", title: "תוצר מוכן להעתקה", body: "דיווח שניתן להעתיק ולהשתמש בו בתהליך ניהול תקלות." },
      { icon: "04", title: "ממשק רספונסיבי", body: "ממשק קל משקל ב־JavaScript טהור שמתאים לרוחבי מסך שונים." },
    ],
    stackEyebrow: "מימוש טכנולוגי",
    stackTitle: "טכנולוגיה ממוקדת, בלי מורכבות מיותרת.",
    stackBody: "הפרויקט נבנה ככלי Web בצד הלקוח. העמוד מציג את הרעיון, ואילו היישום הפעיל והמאגר הציבורי מאפשרים לבדוק את המימוש עצמו.",
    noMetrics: "העמוד אינו מייחס לפרויקט מספרי טסטים, שיעורי מעבר או היקף אוטומציה שלא תועדו.",
    proofEyebrow: "צפייה בפרויקט האמיתי",
    proofTitle: "אפשר להתנסות בתהליך ישירות.",
    proofBody: "פתח את הכלי הפעיל כדי לבדוק את האינטראקציות והחלפת השפה. המאגר הציבורי מאפשר לבחון את קוד המקור ולא להסתמך רק על תמונות.",
    return: "לפרויקטים נוספים",
    note: "פרויקט Web אישי שמומש בפועל — לא מערכת ניהול תקלות ארגונית או טענה לשימוש בחברת מוצר.",
  },
} as const;

export default function PrecisionPlaybookCaseStudy() {
  const { language } = useLanguage();
  const isHebrew = language === "he";
  const t = content[language];
  const [selectedPhase, setSelectedPhase] = useState(0);

  return (
    <main id="main-content" className="inner-page" dir={isHebrew ? "rtl" : "ltr"}>
      <div className="inner-glow inner-glow--left" aria-hidden="true" />
      <div className="page-content mx-auto max-w-6xl">
        <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#0B7770] hover:opacity-70">
          <span aria-hidden="true">{isHebrew ? "→" : "←"}</span>
          <span>{t.back}</span>
        </Link>

        <header className="mb-8">
          <p className="page-kicker">{t.eyebrow}</p>

          {/* RTL places the cover to the left of the heading; LTR places it to the right. */}
          <div className="mt-3 grid grid-cols-[minmax(0,1fr)_104px] items-center gap-3 sm:grid-cols-[minmax(0,1fr)_180px] sm:gap-6 md:grid-cols-[minmax(0,1fr)_240px]">
            <h1 className="min-w-0 text-[clamp(1.5rem,4.4vw,3.5rem)] font-extrabold leading-tight tracking-tight text-[#19343D] [overflow-wrap:anywhere]">
              <span className="block" dir="ltr">{t.name}</span>
              <span className="mt-1 block text-[#0B7770]">{t.nameAccent}</span>
            </h1>

            {/* Real screenshot from the live PrecisionPlaybook homepage. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/media/precision/precision-live-cover.webp`}
              alt={isHebrew ? "צילום מסך אמיתי של עמוד הבית של PrecisionPlaybook" : "Actual screenshot of the PrecisionPlaybook homepage in Hebrew"}
              className="block h-auto w-full rounded-xl border border-[#E4E0ED] shadow-[0_10px_25px_rgba(18,60,53,0.11)]"
              loading="eager"
            />
          </div>

          <p className="page-lead mt-5 max-w-3xl">{t.lead}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#BBDDD0] bg-[#E6F3EE] px-4 py-2 text-xs font-bold text-[#0B7770]">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#0B7770]" />{t.type}
            </span>
            <span className="rounded-full border border-[#D6E3DC] bg-white/70 px-4 py-2 text-xs font-semibold text-[#385F60]" dir="ltr">HTML · CSS · JavaScript</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" className="action-btn action-btn--primary inline-flex min-h-12 items-center justify-center gap-2 px-6">
              {t.launch}<span aria-hidden="true">↗</span>
            </a>
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="external-brand-link external-brand-link--github inline-flex min-h-12 items-center gap-2 px-5">
              <span className="external-brand-link__icon"><ExternalServiceIcon service="github" /></span>
              <span className="external-brand-link__text">{t.source}</span><span aria-hidden="true">↗</span>
            </a>
          </div>
        </header>

        <section
          className="glass-surface mb-6 overflow-hidden rounded-3xl p-4 sm:p-6 md:p-8"
          aria-labelledby="precision-demo-title"
        >
          <p className="section-index">
            {isHebrew ? "הכלי בפעולה" : "REAL PRODUCT DEMO"}
          </p>
          <h2
            id="precision-demo-title"
            className="mt-3 text-xl font-extrabold text-[#19343D] md:text-2xl"
          >
            {isHebrew
              ? "מתצפית לפרוטוקול QA מובנה"
              : "From an observation to a structured QA protocol"}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-[#637879]">
            {isHebrew
              ? "דוגמה מהממשק הפעיל: מזינים ממצא ופרטי סביבה ומקבלים פרוטוקול מסודר להעתקה."
              : "A real example from the live tool: enter a finding and environment details to generate a copy-ready QA protocol."}
          </p>
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/media/precision/precision-generator-demo.png`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 block overflow-hidden rounded-2xl border border-[#D9E6E1] bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B7770]"
            aria-label={isHebrew ? "פתיחת צילום המסך בגודל מלא" : "Open full-size screenshot"}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/media/precision/precision-generator-demo.png`}
              alt={
                isHebrew
                  ? "ממשק PrecisionPlaybook לצד פרוטוקול QA שנוצר מדיווח לדוגמה"
                  : "PrecisionPlaybook interface alongside a QA protocol generated from a sample finding"
              }
              className="block h-auto w-full"
              loading="eager"
            />
          </a>
          <p className="mt-3 text-xs text-[#617879]">
            {isHebrew
              ? "לחיצה על התמונה תפתח אותה בגודל מלא."
              : "Select the image to view it at full size."}
          </p>
        </section>

        <section className="glass-surface mb-6 rounded-3xl p-6 md:p-10">
          <p className="section-index">{t.introEyebrow}</p>
          <h2 className="mt-4 max-w-3xl text-2xl font-bold leading-tight text-[#19343D] md:text-3xl">{t.introTitle}</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#637879]">{t.introBody}</p>
        </section>

        <section className="glass-surface mb-6 rounded-3xl p-6 md:p-10">
          <p className="section-index">{t.approachEyebrow}</p>
          <h2 className="mt-3 text-2xl font-bold text-[#19343D] md:text-3xl">{t.approachTitle}</h2>
          <p className="mt-4 max-w-3xl leading-8 text-[#637879]">{t.approachBody}</p>

          <div className="mt-7 grid grid-cols-2 gap-2 md:grid-cols-4" role="group" aria-label="Four-stage quality reporting workflow">
            {phases.map((phase, i) => (
              <button
                key={phase}
                type="button"
                aria-pressed={selectedPhase === i}
                onClick={() => setSelectedPhase(i)}
                className={`min-h-24 rounded-2xl border p-3 text-start transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B7770] ${selectedPhase === i ? "border-[#0B7770] bg-[#DAEEE9] text-[#0B7770]" : "border-[#D9EAE3] bg-white/70 text-[#19343D] hover:bg-[#F2F8F5]"}`}
              >
                <span className="block text-xs font-bold opacity-70" dir="ltr">0{i + 1}</span>
                <strong className="mt-2 block text-sm sm:text-base" dir="ltr">{phase}</strong>
                <span className="mt-1 block text-xs leading-5">{t.phases[i].sub}</span>
              </button>
            ))}
          </div>

          <div aria-live="polite" className="mt-4 rounded-2xl border border-[#C9E3D9] bg-[#EAF4EE] p-5 md:p-7">
            <p className="text-xs font-bold text-[#0B7770]" dir="ltr">{String(selectedPhase + 1).padStart(2, "0")} / 04 · {t.phases[selectedPhase].label}</p>
            <h3 className="mt-2 text-xl font-bold text-[#19343D]">{t.phases[selectedPhase].sub}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#496E6C]">{t.phases[selectedPhase].detail}</p>
          </div>
        </section>

        <section className="mb-6">
          <p className="section-index">{t.productEyebrow}</p>
          <h2 className="mt-3 mb-6 text-2xl font-bold text-[#19343D] md:text-3xl">{t.productTitle}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {t.features.map((feature) => (
              <article className="glass-surface rounded-3xl p-6 md:p-8" key={feature.icon}>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#DAEEE9] text-sm font-bold text-[#0B7770]">{feature.icon}</span>
                <h3 className="mt-5 text-xl font-bold text-[#19343D]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#637879]">{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="glass-surface mb-6 rounded-3xl p-6 md:p-10">
          <p className="section-index">{t.stackEyebrow}</p>
          <h2 className="mt-3 text-2xl font-bold text-[#19343D] md:text-3xl">{t.stackTitle}</h2>
          <p className="mt-4 max-w-3xl leading-8 text-[#637879]">{t.stackBody}</p>
          <div className="mt-6 flex flex-wrap gap-2" dir="ltr">
            {["Vanilla JavaScript", "HTML5", "CSS3", "HE / EN", "RTL / LTR", "Responsive UI"].map((tag) => (
              <span key={tag} className="rounded-full border border-[#C9E3D9] bg-[#E6F3EE] px-4 py-2 text-xs font-bold text-[#166660]">{tag}</span>
            ))}
          </div>
          <p className="mt-5 text-xs leading-6 text-[#667C7D]">{t.noMetrics}</p>
        </section>

        <section className="glass-surface mb-8 rounded-3xl p-6 md:p-10">
          <p className="section-index">{t.proofEyebrow}</p>
          <h2 className="mt-3 text-2xl font-bold text-[#19343D] md:text-3xl">{t.proofTitle}</h2>
          <p className="mt-4 max-w-3xl leading-8 text-[#637879]">{t.proofBody}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" className="action-btn action-btn--primary inline-flex min-h-12 items-center gap-2 px-6">{t.launch}<span aria-hidden="true">↗</span></a>
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="external-brand-link external-brand-link--github inline-flex min-h-12 items-center gap-2 px-5">
              <span className="external-brand-link__icon"><ExternalServiceIcon service="github" /></span><span className="external-brand-link__text">{t.source}</span><span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="mt-6 text-xs leading-6 text-[#667C7D]">{t.note}</p>
        </section>

        <div className="page-bottom-actions mb-4">
          <Link href="/" className="action-btn action-btn--outline">{t.return}<span aria-hidden="true">{isHebrew ? "←" : "→"}</span></Link>
        </div>
      </div>
    </main>
  );
}