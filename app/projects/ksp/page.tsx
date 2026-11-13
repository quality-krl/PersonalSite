"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "../../components/LanguageProvider";

// KSP manual QA portfolio case study. The recorded observations belong to the
// documented 2026 test cycle; they are not claims about KSP's current website.
const results = { total: 65, passed: 48, failed: 15, notExecuted: 2 };

const mediaUrl = (file: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/media/ksp/${file}`;

const videoFiles = [
  { file: "search-uri-demo.mp4", poster: "search-uri-demo-poster.webp" },
  { file: "cart-counter-demo.mp4", poster: "cart-counter-demo-poster.webp" },
] as const;

const imageFiles = [
  "uri-en.webp",
  "uri-ru.webp",
  "search-mismatch.webp",
  "cls.webp",
  "i18n-en.webp",
  "i18n-ru.webp",
  "registration.webp",
  "worlds-ru.webp",
] as const;

const copy = {
  en: {
    back: "Back to portfolio",
    kicker: "PROJECT 03 / WEB QA",
    headline: "E-commerce quality assurance",
    intro: "Manual QA of KSP's shopping journey: authentication, product search, product details and cart integrity, with reproducible findings.",
    dates: "2026 TEST CYCLE",
    environment: "Windows 11 · Chrome · Production website",
    cover: "Cover of the original KSP test report",
    repository: "View project repository",
    metricsTitle: "Test execution",
    metrics: ["Test cases", "Passed", "Failed", "Not executed"],
    resultNote: "Two product-dependent scenarios could not be executed. Failed test cases do not necessarily represent 15 unique defects.",
    legend: ["Passed", "Failed", "Not executed"],
    featuredLabel: "FEATURED FINDING · KSP-12 · MAJOR",
    featuredTitle: "A search character caused a malformed URI error",
    featuredText: "Searching with the percent character (%) led to an error page instead of a controlled validation or no-results state. The behavior was documented in multiple language modes.",
    featuredImpact: "Unexpected input should not interrupt a customer's search journey.",
    evidenceLabel: "PROJECT EVIDENCE",
    evidenceTitle: "Watch the reproductions",
    evidenceIntro: "Select a recorded test, then inspect the accompanying screenshots. The evidence comes from the documented 2026 project.",
    videoTitles: ["KSP-12 · Search URI failure", "KSP-6 · Cart quantity mismatch"],
    videoNotes: [
      "A percent-character search reaches a malformed URI error page.",
      "The quantity selected in the cart flow does not match its icon counter.",
    ],
    screenshotTitle: "Evidence screenshots",
    galleryHint: "Swipe or scroll to explore all 8 screenshots",
    imageTitles: [
      "KSP-12 · English URI error",
      "KSP-12 · Russian URI error",
      "KSP-5 · Search mismatch",
      "KSP-9 · Layout shift (CLS)",
      "KSP-11 · English localization",
      "KSP-11 · Russian localization",
      "KSP-1 · Registration validation",
      "KSP-19 · Russian-mode layout",
    ],
    imageNotes: [
      "Malformed URI after searching with a percent character in English mode.",
      "The same error type in Russian mode.",
      "Search query and displayed alternative products did not match clearly.",
      "A March 31, 2026 PageSpeed Insights report recorded CLS 0.77; not a current measurement.",
      "Hebrew labels remained in the search suggestions in English mode.",
      "Untranslated Hebrew labels in Russian-mode search suggestions.",
      "Name fields accepted atypical characters in the recorded registration test.",
      "Inconsistent presentation of the Worlds button in Russian mode.",
    ],
    enlarge: "Enlarge evidence",
    close: "Close",
    previous: "Previous image",
    next: "Next image",
    secondaryLabel: "ANOTHER FINDING · KSP-6 · MAJOR",
    secondaryTitle: "The cart counter disagreed with selected quantity",
    secondaryText: "The recorded cart flow showed inconsistent item counts between the selected quantity and the cart indicator, creating uncertainty about what would be purchased.",
    moreFindings: "Explore four additional documented findings",
    findingLabel: "Documented finding",
    observed: "Observed",
    impact: "Why it matters",
    otherFindings: [
      { id: "KSP-3", title: "Product total did not track quantity", observed: "Changing the quantity on the product page did not update the displayed total as expected.", impact: "Inconsistent pricing can mislead shoppers before checkout." },
      { id: "KSP-18", title: "Clear-cart state updated inconsistently", observed: "The cart icon updated only after another interaction and cart-page items were not removed consistently.", impact: "Customers may believe their cart is empty when items remain." },
      { id: "KSP-9", title: "Significant desktop layout shifts", observed: "The project documented excessive cumulative layout shift on the desktop home page.", impact: "Unexpected movement can result in misclicks and reduced usability." },
      { id: "KSP-10", title: "Mixed-language categories", observed: "English category labels appeared while the site was in Russian mode.", impact: "Inconsistent localization can make navigation confusing." },
    ],
    expand: "Test scope, methodology & project limitations",
    scopeTitle: "Scope and test approach",
    scope: "Authentication, registration, search, product information and shopping-cart flows. Positive, negative, boundary and exploratory scenarios focused on risks to the purchase journey.",
    flow: ["Authentication", "Search", "Product details", "Cart"],
    documentsTitle: "Documentation",
    documents: "STD · STR · Test-case/defect traceability",
    releaseTitle: "Project release assessment",
    release: "The original STR recommended a conditional go with fixes and retesting. This was a portfolio project assessment, not an official KSP release decision.",
    constraintsTitle: "Scope boundaries",
    constraints: [
      "Production-site testing without a dedicated test environment or backend/database access.",
      "Product availability and prices varied; two product-dependent cases were not executed.",
      "Payments, shipping, admin tools, native apps and formal accessibility audits were not tested.",
    ],
    reportNote: "The full original STD/STR report is not hosted on this page. These videos and screenshots are selected excerpts, not proof of present-day defects.",
    return: "Explore other projects",
    historical: "Findings describe the documented 2026 test cycle, not the current KSP website.",
  },
  he: {
    back: "חזרה לתיק העבודות",
    kicker: "פרויקט 03 / בדיקות אתר מסחר",
    headline: "בדיקות איכות לאתר מסחר אלקטרוני",
    intro: "בדיקות ידניות לתהליך הקנייה באתר KSP: הזדהות, חיפוש, עמודי מוצר ותקינות עגלת הקניות, עם ממצאים שניתן לשחזר.",
    dates: "מחזור בדיקות 2026",
    environment: "Windows 11 · Chrome · אתר ייצור",
    cover: "שער דוח הבדיקות המקורי של KSP",
    repository: "צפייה במאגר הפרויקט",
    metricsTitle: "תוצאות הבדיקות",
    metrics: ["מקרי בדיקה", "עברו", "נכשלו", "לא בוצעו"],
    resultNote: "שני תרחישים תלויי מוצר לא בוצעו. 15 בדיקות שנכשלו אינן בהכרח 15 תקלות ייחודיות.",
    legend: ["עברו", "נכשלו", "לא בוצעו"],
    featuredLabel: "ממצא מרכזי · KSP-12 · משמעותי",
    featuredTitle: "תו בחיפוש הוביל לשגיאת כתובת לא תקינה",
    featuredText: "חיפוש עם התו אחוז (%) הוביל לעמוד שגיאה במקום להודעת תיקוף או למצב מבוקר של אפס תוצאות. התקלה תועדה במספר מצבי שפה.",
    featuredImpact: "קלט לא צפוי לא אמור להפסיק את רצף חיפוש המוצרים של הלקוח.",
    evidenceLabel: "ראיות מהפרויקט",
    evidenceTitle: "צפייה בשחזורי התקלות",
    evidenceIntro: "בחרו סרטון בדיקה ועיינו בצילומי המסך. הראיות מתייחסות למחזור הבדיקות שתועד בשנת 2026.",
    videoTitles: ["KSP-12 · שגיאת URI בחיפוש", "KSP-6 · מונה עגלה לא מסונכרן"],
    videoNotes: [
      "חיפוש עם תו אחוז מוביל לדף שגיאה של כתובת לא תקינה.",
      "הכמות שנבחרה בתהליך העגלה אינה תואמת למונה בסמל העגלה.",
    ],
    screenshotTitle: "צילומי ראיות",
    galleryHint: "גללו לצד כדי לראות את כל 8 התמונות",
    imageTitles: [
      "KSP-12 · שגיאה באנגלית",
      "KSP-12 · שגיאה ברוסית",
      "KSP-5 · תוצאות חיפוש לא תואמות",
      "KSP-9 · תזוזות פריסה (CLS)",
      "KSP-11 · לוקליזציה באנגלית",
      "KSP-11 · לוקליזציה ברוסית",
      "KSP-1 · תיקוף שדות הרשמה",
      "KSP-19 · תצוגה במצב רוסית",
    ],
    imageNotes: [
      "שגיאת URI לאחר חיפוש עם תו אחוז במצב אנגלית.",
      "אותו סוג כשל גם במצב רוסית.",
      "התוצאות החלופיות שהוצגו לא תאמו בבירור לשאילתה.",
      "דוח PageSpeed Insights מ־31 במרץ 2026 הציג CLS של 0.77; זו לא מדידה עדכנית.",
      "תוויות בעברית נשארו בהצעות החיפוש כשהאתר הוגדר לאנגלית.",
      "תוויות בעברית שלא תורגמו בהצעות החיפוש במצב רוסית.",
      "שדות שם קיבלו תווים חריגים במהלך בדיקת ההרשמה.",
      "חוסר עקביות בתצוגת כפתור Worlds במצב רוסית.",
    ],
    enlarge: "הגדלת ראיה",
    close: "סגירה",
    previous: "תמונה קודמת",
    next: "תמונה הבאה",
    secondaryLabel: "ממצא נוסף · KSP-6 · משמעותי",
    secondaryTitle: "מונה העגלה לא תאם את הכמות שנבחרה",
    secondaryText: "בתהליך העגלה המתועד נמצאו כמויות לא עקביות בין בחירת הפריטים לבין המונה שבסמל העגלה — מצב המקשה לדעת מה עומד להירכש.",
    moreFindings: "ארבעה ממצאים מתועדים נוספים",
    findingLabel: "ממצא מתועד",
    observed: "מה נצפה",
    impact: "הסיכון",
    otherFindings: [
      { id: "KSP-3", title: "המחיר הכולל לא התעדכן עם הכמות", observed: "שינוי הכמות בעמוד המוצר לא עדכן את המחיר הכולל המוצג כצפוי.", impact: "מחיר לא עקבי עלול להטעות לקוחות לפני הרכישה." },
      { id: "KSP-18", title: "ניקוי עגלה התעדכן באופן לא עקבי", observed: "סמל העגלה התעדכן רק אחרי פעולה נוספת ופריטים לא הוסרו מעמוד העגלה באופן עקבי.", impact: "לקוח עלול לחשוב שהעגלה ריקה אף שנותרו בה פריטים." },
      { id: "KSP-9", title: "תזוזות פריסה משמעותיות במחשב", observed: "בפרויקט תועדה אי־יציבות גבוהה של פריסת עמוד הבית במחשב.", impact: "תזוזות בלתי צפויות עלולות לגרום ללחיצות שגויות ולפגוע בשימושיות." },
      { id: "KSP-10", title: "קטגוריות בשפות מעורבות", observed: "תוויות קטגוריות באנגלית הופיעו כשהאתר הוגדר לרוסית.", impact: "לוקליזציה לא עקבית מקשה על הניווט." },
    ],
    expand: "היקף הבדיקות, מתודולוגיה ומגבלות הפרויקט",
    scopeTitle: "היקף ושיטת הבדיקה",
    scope: "הזדהות, הרשמה, חיפוש, פרטי מוצרים ועגלת קניות. תרחישים חיוביים, שליליים, ערכי גבול וחקירה התמקדו בסיכונים בתהליך הרכישה.",
    flow: ["הזדהות", "חיפוש", "פרטי מוצר", "עגלה"],
    documentsTitle: "מסמכי הבדיקות",
    documents: "STD · STR · עקיבות בין בדיקות לממצאים",
    releaseTitle: "הערכת השחרור בפרויקט",
    release: "בדוח STR המקורי הומלץ על Conditional Go בכפוף לתיקונים ובדיקות חוזרות. זו הערכת פרויקט לתיק עבודות, ולא החלטת שחרור רשמית של KSP.",
    constraintsTitle: "מגבלות והחרגות",
    constraints: [
      "בדיקות באתר ייצור ללא סביבת בדיקות ייעודית או גישה לשרת ולמסד הנתונים.",
      "זמינות המוצרים והמחירים השתנתה; שני תרחישים תלויי מוצר לא בוצעו.",
      "תשלומים, משלוחים, ממשק ניהול, אפליקציות וביקורות נגישות רשמיות לא נבדקו.",
    ],
    reportNote: "דוח STD/STR המלא אינו מאוחסן בעמוד זה. הסרטונים והתמונות הם קטעי תיעוד נבחרים, ולא הוכחה לתקלות באתר כיום.",
    return: "לפרויקטים נוספים",
    historical: "הממצאים מתייחסים למחזור הבדיקות של 2026, ולא לאתר KSP כיום.",
  },
} as const;

function ResultsBar({ language }: { language: "en" | "he" }) {
  const t = copy[language];
  return (
    <div
      className="flex h-2.5 w-full overflow-hidden rounded-full bg-[#E5EFEC]"
      role="img"
      aria-label={`${results.passed} ${t.legend[0]}, ${results.failed} ${t.legend[1]}, ${results.notExecuted} ${t.legend[2]}`}
    >
      <div className="bg-[#0B7770]" style={{ width: `${(results.passed / results.total) * 100}%` }} />
      <div className="bg-[#C67A50]" style={{ width: `${(results.failed / results.total) * 100}%` }} />
      <div className="bg-[#A4B8B4]" style={{ width: `${(results.notExecuted / results.total) * 100}%` }} />
    </div>
  );
}

function EvidenceGallery({ language }: { language: "en" | "he" }) {
  const t = copy[language];
  const [activeVideo, setActiveVideo] = useState(0);
  const [openImage, setOpenImage] = useState<number | null>(null);
  const video = videoFiles[activeVideo];

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
    <section className="mb-6" aria-labelledby="ksp-evidence-title">
      <p className="section-index">{t.evidenceLabel}</p>
      <h2 id="ksp-evidence-title" className="mt-2 text-2xl font-extrabold text-[#19343D] md:text-3xl">{t.evidenceTitle}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-[#637879]">{t.evidenceIntro}</p>

      <div className="glass-surface mt-5 p-4 sm:p-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label={t.evidenceTitle}>
          {videoFiles.map((clip, i) => (
            <button
              key={clip.file}
              type="button"
              onClick={() => setActiveVideo(i)}
              aria-pressed={activeVideo === i}
              className={`rounded-xl px-4 py-2.5 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B7770] ${activeVideo === i ? "bg-[#0B7770] text-white" : "border border-[#CDE6DC] bg-white text-[#195D58] hover:bg-[#EDF6F2]"}`}
            >
              {t.videoTitles[i]}
            </button>
          ))}
        </div>
        <div className="mt-4 grid items-center gap-5 md:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)]">
          <div className="flex justify-center rounded-xl bg-[#102930] p-2 sm:p-3">
            <video
              key={video.file}
              controls
              playsInline
              preload="none"
              poster={mediaUrl(video.poster)}
              className="aspect-video w-full max-w-[680px] rounded-lg bg-black object-contain"
              aria-label={t.videoTitles[activeVideo]}
            >
              <source src={mediaUrl(video.file)} type="video/mp4" />
            </video>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#19343D]">{t.videoTitles[activeVideo]}</h3>
            <p className="mt-2 text-sm leading-7 text-[#617879]">{t.videoNotes[activeVideo]}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 className="text-base font-bold text-[#19343D]">{t.screenshotTitle}</h3>
          <p className="text-xs text-[#637879]">{t.galleryHint}</p>
        </div>
        <div className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3" role="group" aria-label={t.screenshotTitle}>
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071C22]/90 p-3 sm:p-7" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpenImage(null); }}>
          <div role="dialog" aria-modal="true" aria-label={t.imageTitles[openImage]} className="flex max-h-[95dvh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white p-3 shadow-2xl sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <strong className="text-sm text-[#19343D]">{t.imageTitles[openImage]}</strong>
              <button type="button" autoFocus onClick={() => setOpenImage(null)} className="shrink-0 rounded-lg bg-[#EAF4EF] px-3 py-2 text-sm font-bold text-[#195D58]">{t.close} ×</button>
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

export default function KSPCaseStudy() {
  const { language } = useLanguage();
  const t = copy[language];
  const he = language === "he";
  const values = [results.total, results.passed, results.failed, results.notExecuted];

  return (
    <main id="main-content" className="inner-page" dir={he ? "rtl" : "ltr"}>
      <div className="inner-glow inner-glow--left" aria-hidden="true" />
      <div className="page-content mx-auto w-full max-w-6xl pb-8">
        <Link href="/#showcase" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#0B7770] hover:opacity-70">
          <span aria-hidden="true">{he ? "→" : "←"}</span> {t.back}
        </Link>

        <header className="mb-5">
          <p className="page-kicker">{t.kicker}</p>
          <div className="mt-3 grid grid-cols-[minmax(0,1fr)_82px] items-start gap-3 sm:grid-cols-[minmax(0,1fr)_116px] sm:gap-6">
            <div className="min-w-0">
              <h1 className="page-title !mb-0 !max-w-none !text-[clamp(2rem,4.8vw,3.6rem)] !leading-[1.05]">
                <span dir="ltr" className="inline-block !text-[#19343D]">KSP</span>
              </h1>
              <p className="mt-1 text-base font-bold leading-6 text-[#0B7770] sm:text-xl">{t.headline}</p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#637879] sm:text-base sm:leading-7">{t.intro}</p>
              <div className="mt-3 space-y-1.5">
                <p className="text-xs font-bold text-[#0B7770]">{t.dates}</p>
                <p dir="ltr" className="text-start text-xs leading-5 text-[#637879]">{t.environment}</p>
              </div>
              <a
                href="https://github.com/quality-krl/KSP-STD-STR"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#0B7770] underline decoration-[#0B7770]/40 underline-offset-4 hover:decoration-current focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B7770]"
              >
                {t.repository} <span aria-hidden="true">↗</span>
              </a>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mediaUrl("report-cover.webp")}
              alt={t.cover}
              loading="eager"
              width={112}
              height={160}
              className="h-auto w-full rounded-lg border border-[#D6E4DC] bg-white object-contain shadow-[0_10px_24px_rgba(18,60,53,0.15)]"
            />
          </div>
        </header>

        <section aria-labelledby="ksp-results-title" className="glass-surface mb-5 p-5 sm:p-7">
          <p className="section-index">{t.metricsTitle}</p>
          <h2 id="ksp-results-title" className="sr-only">{t.metricsTitle}</h2>
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

        <section className="glass-surface mb-6 p-5 sm:p-7" aria-labelledby="ksp-featured-finding">
          <p className="section-index">{t.featuredLabel}</p>
          <h2 id="ksp-featured-finding" className="mt-3 text-xl font-extrabold text-[#19343D] md:text-2xl">{t.featuredTitle}</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-[#637879]">{t.featuredText}</p>
          <p className="mt-2 max-w-4xl text-sm leading-7 text-[#637879]">{t.featuredImpact}</p>
        </section>

        <EvidenceGallery language={language} />

        <section className="glass-surface mb-6 p-5 sm:p-7" aria-labelledby="ksp-secondary-finding">
          <p className="section-index">{t.secondaryLabel}</p>
          <h2 id="ksp-secondary-finding" className="mt-3 text-lg font-extrabold text-[#19343D] md:text-xl">{t.secondaryTitle}</h2>
          <p className="mt-2 max-w-4xl text-sm leading-7 text-[#637879]">{t.secondaryText}</p>
        </section>

        <details className="glass-surface mb-5 overflow-hidden p-5 sm:p-7">
          <summary className="cursor-pointer text-base font-extrabold text-[#19343D] marker:text-[#0B7770]">{t.moreFindings}</summary>
          <div className="mt-5 grid gap-3 border-t border-[#DCEBE6] pt-5 sm:grid-cols-2">
            {t.otherFindings.map((finding) => (
              <article key={finding.id} className="rounded-xl border border-[#DCEBE6] bg-white/85 p-4">
                <p dir="ltr" className="text-start text-xs font-black text-[#0B7770]">{finding.id}</p>
                <h3 className="mt-2 font-extrabold text-[#19343D]">{finding.title}</h3>
                <p className="mt-3 text-xs font-bold text-[#0B7770]">{t.observed}</p>
                <p className="mt-1 text-sm leading-6 text-[#637879]">{finding.observed}</p>
                <p className="mt-3 text-xs font-bold text-[#0B7770]">{t.impact}</p>
                <p className="mt-1 text-sm leading-6 text-[#637879]">{finding.impact}</p>
              </article>
            ))}
          </div>
        </details>

        <details className="glass-surface mb-8 overflow-hidden p-5 sm:p-7">
          <summary className="cursor-pointer text-base font-extrabold text-[#19343D] marker:text-[#0B7770]">{t.expand}</summary>
          <div className="mt-5 border-t border-[#DCEBE6] pt-5">
            <h3 className="text-lg font-bold text-[#19343D]">{t.scopeTitle}</h3>
            <p className="mt-2 text-sm leading-7 text-[#637879]">{t.scope}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {t.flow.map((item) => <span key={item} className="rounded-full border border-[#CDE6DC] bg-[#EAF4EF] px-3 py-2 text-xs font-bold text-[#195D58]">{item}</span>)}
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-bold text-[#19343D]">{t.documentsTitle}</h3>
                <p className="mt-2 text-sm leading-7 text-[#637879]">{t.documents}</p>
                <h3 className="mt-5 font-bold text-[#19343D]">{t.releaseTitle}</h3>
                <p className="mt-2 text-sm leading-7 text-[#637879]">{t.release}</p>
              </div>
              <div>
                <h3 className="font-bold text-[#19343D]">{t.constraintsTitle}</h3>
                <ul className="mt-2 list-disc space-y-2 ps-5 text-sm leading-7 text-[#637879]">
                  {t.constraints.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
            <p className="mt-5 text-xs leading-6 text-[#82938F]">{t.reportNote}</p>
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