"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "../../components/LanguageProvider";

// Historical FreeTV iOS QA case study (April–June 2026).
// These are documented project results, not current claims about FreeTV.
const report = { total: 123, passed: 99, failed: 9, blocked: 15 };

const suites = [
  { key: "functional", total: 71, passed: 67, failed: 4, blocked: 0 },
  { key: "nonfunctional", total: 20, passed: 16, failed: 3, blocked: 1 },
  { key: "api", total: 18, passed: 16, failed: 2, blocked: 0 },
  { key: "database", total: 14, passed: 0, failed: 0, blocked: 14 },
] as const;

const imageFiles = [
  "ftv5-jira.webp",
  "testrail-otp-results.webp",
  "fiddler-headers.webp",
  "fiddler-response.webp",
  "postman-replay.webp",
] as const;

const clips = [
  { file: "otp-expiry-demo.mp4", poster: "otp-poster.webp" },
  { file: "watchlist-profile-demo.mp4", poster: "watchlist-poster.webp" },
] as const;

const mediaUrl = (file: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/media/freetv/${file}`;

const copy = {
  en: {
    back: "Back to portfolio",
    kicker: "PROJECT 02 / MOBILE QA",
    headline: "iOS quality assurance",
    intro:
      "Manual QA of FreeTV's iOS app: user journeys, API behavior, and security-oriented scenarios, supported by documented findings.",
    dates: "APR–JUN 2026",
    environment: "iPhone 14 Pro · iOS 26.3.1 · FreeTV v1.25.32 (build 142)",
    cover: "Cover of the original project QA report",
    repository: "GitHub repository",
    fullReport: "View full QA report (PDF)",
    metricsTitle: "Test execution",
    metrics: ["Test cases", "Passed", "Failed", "Blocked"],
    resultNote:
      "15 cases were blocked (14 needed unavailable database access). Failed tests and distinct defects are different metrics.",
    legend: ["Passed", "Failed", "Blocked"],
    findingLabel: "FEATURED FINDING · FTV-5 · HIGH",
    findingTitle: "OTP remained valid beyond the specified threshold",
    findingText:
      "The report documents successful OTP use at 30 minutes and rejection at approximately 61 minutes. The precise expiration point was not established.",
    findingImpact:
      "A longer reuse window can increase risk if an authentication code is exposed.",
    findingRefs: "FR-007 · NFR-011",
    evidenceLabel: "PROJECT EVIDENCE",
    evidenceTitle: "Watch the investigation",
    evidenceIntro:
      "Choose a recording, then inspect the supporting artifacts. All media is edited and redacted for public display.",
    videoTitles: ["OTP investigation", "Profiles & watchlist"],
    videoNotes: [
      "Edited 67-second demonstration. TestRail/Jira records contain the timing observations; this video does not independently prove elapsed time.",
      "Recorded profile and watchlist workflow (TC-WTCH-005).",
    ],
    imagesLabel: "Evidence screenshots",
    galleryHint: "Scroll to view all 5 screenshots",
    imageTitles: [
      "FTV-5 · Jira defect",
      "OTP test · TestRail",
      "Fiddler · Request",
      "Fiddler · Response",
      "Postman · Replay",
    ],
    imageNotes: [
      "Defect severity, reproduction steps, and requirement links.",
      "Execution notes and observed OTP intervals.",
      "Captured PUT request with an HTTP 200 response.",
      "Inspected HTTP 200 and empty response body; not proof of OTP expiry.",
      "HTTP 400 DEVICE_CANNOT_BE_ASSIGNED: device validation blocked replay; not evidence of OTP rejection.",
    ],
    enlarge: "Enlarge screenshot",
    close: "Close",
    previous: "Previous image",
    next: "Next image",
    secondaryLabel: "ANOTHER HIGH-SEVERITY FINDING · FTV-8",
    secondaryTitle: "Content endpoints responded without an authenticated session",
    secondaryText:
      "The report recorded responses from endpoints classified as protected in the project requirements. This indicates a potential access-control risk, not a confirmed exploit.",
    secondaryRefs: "FR-013 · NFR-010 / NFR-012",
    findingsSummary: "9 documented findings: 2 high · 2 medium · 5 low",
    expand: "Explore test coverage, breakdown & limitations",
    breakdown: "Results by test suite",
    columns: ["Suite", "Total", "Pass", "Fail", "Blocked"],
    suiteNames: ["Functional", "Non-functional", "API", "Database-related"],
    scopeTitle: "Coverage and method",
    scope:
      "Onboarding, authentication, live TV, VOD, search, profiles, watchlists, localization and API error handling. Requirements and results were tracked across SRS, STP, STD and STR.",
    constraintsTitle: "Constraints and scope boundaries",
    constraints: [
      "Production-only environment; no dedicated test server or direct database access.",
      "Fiddler capture required Wi-Fi; primary functional testing used cellular data.",
      "Automation, Android, penetration testing, and load testing were outside scope.",
    ],
    tools: "Tools",
    documentation: "Documents",
    return: "Explore other projects",
    historical: "Findings describe the documented 2026 test cycle, not the current service.",
  },
  he: {
    back: "חזרה לתיק העבודות",
    kicker: "פרויקט 02 / בדיקות מובייל",
    headline: "בדיקות איכות לאפליקציית iOS",
    intro:
      "בדיקות ידניות לאפליקציית FreeTV: תהליכי משתמש, ממשקי API וסיכונים אבטחתיים, עם ממצאים מתועדים.",
    dates: "אפריל–יוני 2026",
    environment: "iPhone 14 Pro · iOS 26.3.1 · FreeTV v1.25.32 (build 142)",
    cover: "שער דוח הבדיקות המקורי",
    repository: "מאגר הפרויקט ב־GitHub",
    fullReport: "צפייה בדוח הבדיקות המלא (PDF)",
    metricsTitle: "תוצאות הבדיקות",
    metrics: ["מקרי בדיקה", "עברו", "נכשלו", "נחסמו"],
    resultNote:
      "15 בדיקות נחסמו (14 ללא גישה למסד הנתונים). בדיקות שנכשלו ומספר תקלות ייחודיות הם שני מדדים שונים.",
    legend: ["עברו", "נכשלו", "נחסמו"],
    findingLabel: "ממצא מרכזי · FTV-5 · חומרה גבוהה",
    findingTitle: "קוד האימות נשאר תקף מעבר לסף שהוגדר",
    findingText:
      "בדוח מתועד שימוש מוצלח בקוד גם לאחר 30 דקות ודחייה לאחר כ־61 דקות. מועד פקיעת התוקף המדויק לא נמדד.",
    findingImpact:
      "חלון שימוש חוזר ארוך יותר עלול להגדיל סיכון במקרה שקוד אימות נחשף.",
    findingRefs: "FR-007 · NFR-011",
    evidenceLabel: "ראיות מהפרויקט",
    evidenceTitle: "צפייה בתהליך הבדיקה",
    evidenceIntro:
      "בחרו סרטון וצפו בתיעוד התומך. המדיה נערכה ועברה השחרה לצורך פרסום.",
    videoTitles: ["חקירת תוקף OTP", "פרופילים ורשימת צפייה"],
    videoNotes: [
      "הדגמה ערוכה באורך 67 שניות. תצפיות הזמנים מופיעות ברישומי TestRail ו־Jira; הסרטון לבדו אינו מוכיח את משך הזמן שחלף.",
      "הדגמה מצולמת של תרחיש פרופילים ורשימת צפייה (TC-WTCH-005).",
    ],
    imagesLabel: "צילומי ראיות",
    galleryHint: "גללו לצד כדי לראות את כל 5 התמונות",
    imageTitles: [
      "FTV-5 · דיווח ב־Jira",
      "בדיקת OTP · TestRail",
      "Fiddler · בקשה",
      "Fiddler · תגובה",
      "Postman · ניסיון שחזור",
    ],
    imageNotes: [
      "חומרת התקלה, צעדי שחזור והפניות לדרישות.",
      "תיעוד ההרצה ומרווחי הזמן שנצפו.",
      "בקשת PUT שנלכדה עם תשובת HTTP 200.",
      "תשובת HTTP 200 וגוף תגובה ריק; אין בכך הוכחה לתוקף ה־OTP.",
      "HTTP 400 DEVICE_CANNOT_BE_ASSIGNED: השחזור נחסם בבדיקת המכשיר, ולא הוכיח דחיית OTP.",
    ],
    enlarge: "הגדלת צילום",
    close: "סגירה",
    previous: "תמונה קודמת",
    next: "תמונה הבאה",
    secondaryLabel: "ממצא נוסף בחומרה גבוהה · FTV-8",
    secondaryTitle: "נקודות קצה של תוכן הגיבו ללא התחברות מאומתת",
    secondaryText:
      "בדוח תועדו תגובות מנקודות קצה שהדרישות סיווגו כמוגנות. זהו סיכון אפשרי בבקרת הגישה, ולא הוכחה לניצול חולשה.",
    secondaryRefs: "FR-013 · NFR-010 / NFR-012",
    findingsSummary: "9 ממצאים מתועדים: 2 בחומרה גבוהה · 2 בינונית · 5 נמוכה",
    expand: "פירוט כיסוי הבדיקות, התוצאות והמגבלות",
    breakdown: "תוצאות לפי קבוצת בדיקות",
    columns: ["קבוצה", "סה״כ", "עברו", "נכשלו", "נחסמו"],
    suiteNames: ["פונקציונליות", "לא פונקציונליות", "API", "מסד נתונים"],
    scopeTitle: "כיסוי ומתודולוגיה",
    scope:
      "הצטרפות, הזדהות, שידור חי, VOD, חיפוש, פרופילים, רשימות צפייה, לוקליזציה וטיפול בשגיאות API. הדרישות והתוצאות תועדו במסמכי SRS, STP, STD ו־STR.",
    constraintsTitle: "מגבלות והיקף הבדיקות",
    constraints: [
      "סביבת ייצור בלבד, ללא שרת בדיקות נפרד או גישה ישירה למסד הנתונים.",
      "לכידת תעבורה ב־Fiddler דרשה Wi-Fi; הבדיקות הפונקציונליות בוצעו בעיקר בסלולר.",
      "אוטומציה, Android, בדיקות חדירה ובדיקות עומס לא נכללו בהיקף.",
    ],
    tools: "כלים",
    documentation: "מסמכים",
    return: "לפרויקטים נוספים",
    historical: "הממצאים מתייחסים למחזור הבדיקות של 2026, ולא לגרסה הנוכחית של השירות.",
  },
} as const;

function ResultsBar({ language }: { language: "en" | "he" }) {
  const t = copy[language];
  return (
    <div
      className="flex h-2.5 w-full overflow-hidden rounded-full bg-[#E5EFEC]"
      role="img"
      aria-label={`${report.passed} ${t.legend[0]}, ${report.failed} ${t.legend[1]}, ${report.blocked} ${t.legend[2]}`}
    >
      <div className="bg-[#0B7770]" style={{ width: `${(report.passed / report.total) * 100}%` }} />
      <div className="bg-[#C67A50]" style={{ width: `${(report.failed / report.total) * 100}%` }} />
      <div className="bg-[#A4B8B4]" style={{ width: `${(report.blocked / report.total) * 100}%` }} />
    </div>
  );
}

function EvidenceGallery({ language }: { language: "en" | "he" }) {
  const t = copy[language];
  const [activeVideo, setActiveVideo] = useState(0);
  const [openImage, setOpenImage] = useState<number | null>(null);
  const clip = clips[activeVideo];

  useEffect(() => {
    if (openImage === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenImage(null);
      if (event.key === "ArrowRight") setOpenImage((i) => i === null ? null : (i + 1) % imageFiles.length);
      if (event.key === "ArrowLeft") setOpenImage((i) => i === null ? null : (i - 1 + imageFiles.length) % imageFiles.length);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openImage]);

  return (
    <section className="mb-6" aria-labelledby="freetv-evidence-title">
      <p className="section-index">{t.evidenceLabel}</p>
      <h2 id="freetv-evidence-title" className="mt-2 text-2xl font-extrabold text-[#19343D] md:text-3xl">
        {t.evidenceTitle}
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-[#637879]">{t.evidenceIntro}</p>

      <div className="glass-surface mt-5 p-4 sm:p-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label={t.evidenceTitle}>
          {clips.map((video, i) => (
            <button
              key={video.file}
              type="button"
              aria-pressed={activeVideo === i}
              onClick={() => setActiveVideo(i)}
              className={`rounded-xl px-4 py-2.5 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B7770] ${activeVideo === i ? "bg-[#0B7770] text-white" : "border border-[#CDE6DC] bg-white text-[#195D58] hover:bg-[#EDF6F2]"}`}
            >
              {t.videoTitles[i]}
            </button>
          ))}
        </div>
        <div className="mt-4 grid items-center gap-4 md:grid-cols-[minmax(0,260px)_1fr]">
          <div className="flex justify-center rounded-xl bg-[#112D34] p-3">
            <video
              key={clip.file}
              id={activeVideo === 0 ? "freetv-otp-player" : undefined}
              className="block aspect-[9/19.5] max-h-[380px] w-full max-w-[185px] rounded-lg bg-black object-contain"
              controls
              playsInline
              preload="none"
              poster={mediaUrl(clip.poster)}
              aria-label={t.videoTitles[activeVideo]}
            >
              <source src={mediaUrl(clip.file)} type="video/mp4" />
            </video>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#19343D]">{t.videoTitles[activeVideo]}</h3>
            <p className="mt-2 max-w-xl text-sm leading-7 text-[#617879]">{t.videoNotes[activeVideo]}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 className="text-base font-bold text-[#19343D]">{t.imagesLabel}</h3>
          <p className="text-xs text-[#637879]">{t.galleryHint}</p>
        </div>
        <div className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3" role="group" aria-label={t.imagesLabel}>
          {imageFiles.map((file, i) => (
            <button
              key={file}
              type="button"
              onClick={() => setOpenImage(i)}
              aria-label={`${t.enlarge}: ${t.imageTitles[i]}`}
              className="w-44 shrink-0 snap-start overflow-hidden rounded-xl border border-[#DCEBE6] bg-white p-2 text-start transition hover:border-[#0B7770] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B7770] sm:w-52"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mediaUrl(file)} alt="" loading={i < 2 ? "eager" : "lazy"} className="h-28 w-full rounded-lg bg-[#F4F8F6] object-contain" />
              <span className="mt-2 block text-xs font-bold leading-5 text-[#19343D]">{t.imageTitles[i]}</span>
            </button>
          ))}
        </div>
      </div>

      {openImage !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071C22]/90 p-3 sm:p-7"
          onMouseDown={(event) => { if (event.target === event.currentTarget) setOpenImage(null); }}
        >
          <div role="dialog" aria-modal="true" aria-label={t.imageTitles[openImage]} className="flex max-h-[95dvh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white p-3 shadow-2xl sm:p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <strong className="text-sm text-[#19343D]">{t.imageTitles[openImage]}</strong>
              <button type="button" autoFocus onClick={() => setOpenImage(null)} className="rounded-lg bg-[#EAF4EF] px-3 py-2 text-sm font-bold text-[#195D58]">{t.close} ×</button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mediaUrl(imageFiles[openImage])} alt={t.imageTitles[openImage]} className="min-h-0 max-h-[65dvh] w-full object-contain" />
            <p className="mt-3 text-xs leading-6 text-[#617879]">{t.imageNotes[openImage]}</p>
            <div className="mt-3 flex justify-between gap-3">
              <button type="button" onClick={() => setOpenImage((openImage - 1 + imageFiles.length) % imageFiles.length)} className="rounded-lg border border-[#DCEBE6] px-4 py-2 text-sm font-semibold text-[#195D58]">{t.previous}</button>
              <button type="button" onClick={() => setOpenImage((openImage + 1) % imageFiles.length)} className="rounded-lg border border-[#DCEBE6] px-4 py-2 text-sm font-semibold text-[#195D58]">{t.next}</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default function FreeTVCaseStudy() {
  const { language } = useLanguage();
  const t = copy[language];
  const he = language === "he";
  const values = [report.total, report.passed, report.failed, report.blocked];

  return (
    <main id="main-content" className="inner-page" dir={he ? "rtl" : "ltr"}>
      <div className="inner-glow inner-glow--left" aria-hidden="true" />
      <div className="page-content mx-auto w-full max-w-6xl pb-8">
        <Link href="/#showcase" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#0B7770] hover:opacity-70">
          <span aria-hidden="true">{he ? "→" : "←"}</span> {t.back}
        </Link>

        {/* 1. Compact project hero: cover and all key context share one row. */}
        <header className="mb-5">
          <p className="page-kicker">{t.kicker}</p>
          <div className="mt-3 grid grid-cols-[minmax(0,1fr)_82px] items-start gap-3 sm:grid-cols-[minmax(0,1fr)_116px] sm:gap-6">
            <div className="min-w-0">
              <h1 className="page-title !mb-0 !max-w-none !text-[clamp(2rem,4.8vw,3.6rem)] !leading-[1.05]">
                <span dir="ltr" className="inline-block !text-[#19343D]">FreeTV</span>
              </h1>
              <p className="mt-1 text-base font-bold leading-6 text-[#0B7770] sm:text-xl">
                {t.headline}
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#637879] sm:text-base sm:leading-7">
                {t.intro}
              </p>
              <div className="mt-3 space-y-1.5">
                <p className="text-xs font-bold text-[#0B7770]">{t.dates}</p>
                <p dir="ltr" className="text-start text-xs leading-5 text-[#637879]">
                  {t.environment}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                <a
                  href="https://quality-krl.github.io/FreeTV_iOS_E2E_QA_Project_STR_STD_STP_SRS/docs/FreeTV_QA_Documentation.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-bold text-[#0B7770] underline decoration-[#0B7770]/40 underline-offset-4 hover:decoration-current focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B7770]"
                >
                  {t.fullReport} <span aria-hidden="true">↗</span>
                </a>
                <a
                  href="https://github.com/quality-krl/FreeTV_iOS_E2E_QA_Project_STR_STD_STP_SRS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#456B6A] underline decoration-[#456B6A]/40 underline-offset-4 hover:decoration-current focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B7770]"
                >
                  {t.repository} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <a
              href="https://quality-krl.github.io/FreeTV_iOS_E2E_QA_Project_STR_STD_STP_SRS/docs/FreeTV_QA_Documentation.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.fullReport}
              className="block rounded-lg transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B7770]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mediaUrl("report-cover.webp")}
                alt={t.cover}
                loading="eager"
                width={112}
                height={160}
                className="h-auto w-full rounded-lg border border-[#D6E4DC] bg-white object-contain shadow-[0_10px_24px_rgba(18,60,53,0.15)]"
              />
            </a>
          </div>
        </header>

        {/* 2. Results before media: fastest way to understand the project. */}
        <section aria-labelledby="freetv-results-title" className="glass-surface mb-5 p-5 sm:p-7">
          <p className="section-index">{t.metricsTitle}</p>
          <h2 id="freetv-results-title" className="sr-only">{t.metricsTitle}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {values.map((value, i) => (
              <div key={i} className="rounded-xl border border-[#DCEBE6] bg-white/90 px-3 py-4 text-center">
                <div className="text-3xl font-black tabular-nums text-[#19343D]">{value}</div>
                <p className="mt-1 text-xs font-bold text-[#637879]">{t.metrics[i]}</p>
              </div>
            ))}
          </div>
          <div className="mt-5"><ResultsBar language={language} /></div>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#637879]">
            {t.legend.map((label, i) => (
              <span key={label} className="inline-flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${i === 0 ? "bg-[#0B7770]" : i === 1 ? "bg-[#C67A50]" : "bg-[#A4B8B4]"}`} />
                {label}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs leading-6 text-[#637879]">{t.resultNote}</p>
        </section>

        {/* 3. The most significant documented finding. */}
        <section className="glass-surface mb-6 p-5 sm:p-7" aria-labelledby="freetv-featured-finding">
          <p className="section-index">{t.findingLabel}</p>
          <h2 id="freetv-featured-finding" className="mt-3 text-xl font-extrabold text-[#19343D] md:text-2xl">{t.findingTitle}</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-[#637879]">{t.findingText}</p>
          <p className="mt-2 max-w-4xl text-sm leading-7 text-[#637879]">{t.findingImpact}</p>
          <p dir="ltr" className="mt-2 text-start text-xs text-[#8A9B96]">{t.findingRefs}</p>
        </section>

        {/* 4. One video at a time; screenshots in a compact horizontal strip. */}
        <EvidenceGallery language={language} />

        {/* 5. Second important finding, without repeating FTV-5. */}
        <section className="glass-surface mb-6 p-5 sm:p-7" aria-labelledby="freetv-secondary-finding">
          <p className="section-index">{t.secondaryLabel}</p>
          <h2 id="freetv-secondary-finding" className="mt-3 text-lg font-extrabold text-[#19343D] md:text-xl">{t.secondaryTitle}</h2>
          <p className="mt-2 max-w-4xl text-sm leading-7 text-[#637879]">{t.secondaryText}</p>
          <p dir="ltr" className="mt-2 text-start text-xs text-[#8A9B96]">{t.secondaryRefs}</p>
          <p className="mt-3 text-xs font-semibold text-[#0B7770]">{t.findingsSummary}</p>
        </section>

        {/* 6. Technical detail is available on demand, not a long default scroll. */}
        <details className="glass-surface mb-8 overflow-hidden p-5 sm:p-7">
          <summary className="cursor-pointer text-base font-extrabold text-[#19343D] marker:text-[#0B7770]">{t.expand}</summary>
          <div className="mt-6 border-t border-[#DCEBE6] pt-5">
            <h3 className="text-lg font-bold text-[#19343D]">{t.breakdown}</h3>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[500px] border-collapse text-start text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#DCEBE6] text-[#456B6A]">
                    {t.columns.map((column) => <th key={column} scope="col" className="px-2 py-3 text-start font-bold">{column}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {suites.map((suite, i) => (
                    <tr key={suite.key} className="border-b border-[#E9F0EC] text-[#19343D]">
                      <th scope="row" className="px-2 py-3 text-start font-semibold">{t.suiteNames[i]}</th>
                      <td className="px-2 py-3 tabular-nums">{suite.total}</td>
                      <td className="px-2 py-3 tabular-nums">{suite.passed}</td>
                      <td className="px-2 py-3 tabular-nums">{suite.failed}</td>
                      <td className="px-2 py-3 tabular-nums">{suite.blocked}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-bold text-[#19343D]">{t.scopeTitle}</h3>
                <p className="mt-2 text-sm leading-7 text-[#637879]">{t.scope}</p>
                <h3 className="mt-5 font-bold text-[#19343D]">{t.tools}</h3>
                <p dir="ltr" className="mt-2 text-start text-sm leading-7 text-[#637879]">TestRail · Jira · Fiddler · Postman · iOS Screen Recording</p>
                <h3 className="mt-5 font-bold text-[#19343D]">{t.documentation}</h3>
                <p dir="ltr" className="mt-2 text-start text-sm leading-7 text-[#637879]">SRS · STP · STD · STR</p>
              </div>
              <div>
                <h3 className="font-bold text-[#19343D]">{t.constraintsTitle}</h3>
                <ul className="mt-2 list-disc space-y-2 ps-5 text-sm leading-7 text-[#637879]">
                  {t.constraints.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </details>

        <p className="mb-6 text-center text-xs leading-6 text-[#82938F]">{t.historical}</p>
        <div className="page-bottom-actions">
          <Link href="/#showcase" className="action-btn action-btn--primary">{t.return} <span aria-hidden="true">{he ? "→" : "←"}</span></Link>
        </div>
      </div>
    </main>
  );
}