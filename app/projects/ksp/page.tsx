"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "../../components/LanguageProvider";

/**
 * Historical, source-grounded portfolio case study:
 * KSP Website — Core Shopping Flow, Software Test Description & Report.
 * 65 planned / 48 passed / 15 failed / 2 not executed.
 * Findings are observations from the documented test cycle, not current claims.
 */

const results = {
  planned: 65,
  passed: 48,
  failed: 15,
  notExecuted: 2,
};

const copy = {
  en: {
    back: "Back to portfolio",
    kicker: "PROJECT 03 / WEB QUALITY ASSURANCE",
    title: "KSP",
    titleAccent: "E-Commerce QA.",
    introduction:
      "A manual QA case study of an e-commerce shopping journey: from authentication and product discovery to product details and cart integrity. The objective was to expose risks that could disrupt a customer's purchase journey.",
    historical: "Documented portfolio test cycle · historical findings",
    environment: "Production website · Windows 11 · Chrome",
    contextLabel: "SCOPE AT A GLANCE",
    contextTitle: "One shopping journey. Several points of failure.",
    contextDescription:
      "The test scope covered login, registration, search, product interactions and cart management. Payment, shipping, native apps and administrative flows were outside this project’s scope.",
    flow: ["Authentication", "Search & discovery", "Product details", "Shopping cart"],
    metrics: ["Planned cases", "Passed", "Failed", "Not executed"],
    resultsLabel: "EXECUTION SNAPSHOT",
    resultsTitle: "Report the outcome — not just the successes.",
    resultsDescription:
      "The final report recorded 48 passed cases, 15 failed cases and two scenarios that could not be executed. Not-executed cases remain visible, rather than being counted as passes.",
    legend: ["Passed", "Failed", "Not executed"],
    noExecutionNote:
      "Two product-related scenarios were not executed because the required product conditions were unavailable in the test environment.",
    approachLabel: "HOW IT WAS TESTED",
    approachTitle: "Risk-led manual testing.",
    approachIntro:
      "Test scenarios were designed around core business operations, with positive, negative, boundary and exploratory checks, supported by traceability from test cases to defects.",
    strategy: [
      {
        number: "01",
        title: "Authentication & input validation",
        body: "Login, registration, missing fields, malformed values, password mismatch and basic access-control checks.",
      },
      {
        number: "02",
        title: "Search & unexpected inputs",
        body: "Valid and partial searches, no-result states, special characters, misleading matches and recovery from invalid queries.",
      },
      {
        number: "03",
        title: "Product data consistency",
        body: "Product title, price, imagery, quantity boundaries, quantity synchronization and availability-dependent behavior.",
      },
      {
        number: "04",
        title: "Cart integrity & usability",
        body: "Adding, removing and clearing items; quantity updates, totals, persistence after refresh, and the cart icon counter.",
      },
    ],
    evidenceLabel: "DEFECT CASE FILES",
    evidenceTitle: "Look beyond the red test result.",
    evidenceIntro:
      "These findings were documented during the original test cycle. Select a finding to see the observed behavior, why it matters and the associated risk. They are not statements about KSP's current production website.",
    findingType: "DOCUMENTED FINDING",
    observed: "Observed during the test cycle",
    impact: "Why it matters",
    severity: "Report classification",
    major: "Major",
    minor: "Minor",
    findings: [
      {
        id: "KSP-12",
        label: "SEARCH / INVALID INPUT",
        title: "A percent character leads to a malformed URI error",
        observed: "The report records a search containing '%' redirecting to an error page associated with a malformed URI in multiple language modes.",
        impact: "Instead of a controlled no-results or validation state, an unusual input disrupts the discovery flow.",
        severity: "Major",
      },
      {
        id: "KSP-3",
        label: "PRODUCT / PRICING",
        title: "The displayed total does not update with quantity",
        observed: "On the product page, changing quantity did not update the displayed total price as expected in the documented test.",
        impact: "Price inconsistency can mislead customers before they add an item to the cart.",
        severity: "Major",
      },
      {
        id: "KSP-6",
        label: "CART / CONSISTENCY",
        title: "Cart icon does not match the selected quantity",
        observed: "The quantity represented by the cart icon was inconsistent with the number of selected items in the cart.",
        impact: "Conflicting UI state undermines customer confidence and makes cart contents harder to verify.",
        severity: "Major",
      },
      {
        id: "KSP-18",
        label: "CART / STATE MANAGEMENT",
        title: "Clear-cart action updates inconsistently",
        observed: "The report documents a clear-cart flow in which the icon updated only after an additional click, while cart-page items were not removed consistently.",
        impact: "A customer may believe the cart is empty while products remain in the order flow.",
        severity: "Major",
      },
      {
        id: "KSP-9",
        label: "PERFORMANCE / LAYOUT",
        title: "Excessive layout instability on desktop",
        observed: "The desktop home page was recorded as showing excessive cumulative layout shift during the project's performance analysis.",
        impact: "Layout movement can cause misclicks, reduce usability and weaken perceived page quality.",
        severity: "Major",
      },
      {
        id: "KSP-10",
        label: "LOCALIZATION",
        title: "English category labels appear in Russian mode",
        observed: "Several category labels were reported in English while the website was set to Russian.",
        impact: "Mixed-language navigation makes the experience less coherent and may confuse users.",
        severity: "Minor",
      },
    ],
    noteLabel: "RELEASE ASSESSMENT",
    noteTitle: "Conditional Go — with follow-up actions.",
    noteBody:
      "The original STR recommended a conditional go: the tested shopping flow worked in many important scenarios, but the identified defects should be fixed and retested before treating the scope as release-ready with high confidence. This was a project assessment, not an official release decision by KSP.",
    constraintsLabel: "TEST ENVIRONMENT & LIMITATIONS",
    constraintsTitle: "What the project did not claim.",
    constraints: [
      "Manual testing in a production website; no controlled test environment was available.",
      "No direct backend, database or server-log access.",
      "Product availability and prices were dynamic; two scenarios could not be executed.",
      "Payment, shipping, order history, accessibility audits and admin flows were outside the stated scope.",
    ],
    deliverablesLabel: "DOCUMENTATION & TRACEABILITY",
    deliverablesTitle: "From scenarios to an actionable report.",
    deliverables:
      ["STD — Software Test Description", "STR — Software Test Report", "Test-case and bug traceability", "Documented defect case files"],
    evidenceNote:
      "Five excerpts from the original project STD/STR are now available above. These are historical report pages, not new executions. The complete report is not publicly downloadable here.",
    closing:
      "Good QA reveals the differences between what a user expects, what the system displays, and what the system actually does.",
    returnButton: "Explore more projects",
  },
  he: {
    back: "חזרה לפורטפוליו",
    kicker: "פרויקט 03 / בדיקות איכות לאתר מסחר",
    title: "KSP",
    titleAccent: "בדיקות מסחר אלקטרוני.",
    introduction:
      "פרויקט בדיקות ידניות לתהליך רכישה באתר מסחר אלקטרוני: מהזדהות וחיפוש מוצרים ועד עמוד מוצר ותקינות עגלת הקניות. המטרה הייתה לזהות סיכונים שעלולים לפגוע בתהליך הרכישה של הלקוח.",
    historical: "מחזור בדיקות מתועד לתיק עבודות · ממצאים היסטוריים",
    environment: "אתר ייצור · Windows 11 · Chrome",
    contextLabel: "היקף הפרויקט",
    contextTitle: "מסע רכישה אחד, כמה נקודות כשל.",
    contextDescription:
      "הכיסוי כלל התחברות, הרשמה, חיפוש, אינטראקציות בעמוד המוצר וניהול עגלת קניות. תשלום, משלוחים, אפליקציות מובייל וממשקי ניהול לא נכללו בהיקף הבדיקה.",
    flow: ["הזדהות", "חיפוש מוצרים", "עמוד מוצר", "עגלת קניות"],
    metrics: ["מקרי בדיקה מתוכננים", "עברו", "נכשלו", "לא בוצעו"],
    resultsLabel: "תוצאות הבדיקות",
    resultsTitle: "להציג את התמונה המלאה — לא רק הצלחות.",
    resultsDescription:
      "הדוח הסופי מתעד 48 מקרי בדיקה שעברו, 15 שנכשלו ושני תרחישים שלא ניתן היה לבצע. מקרים שלא בוצעו נשארים גלויים בסיכום ואינם נספרים כהצלחות.",
    legend: ["עברו", "נכשלו", "לא בוצעו"],
    noExecutionNote:
      "שני תרחישים הקשורים למוצרים לא בוצעו משום שתנאי המוצר הנדרשים לא היו זמינים בסביבת הבדיקה.",
    approachLabel: "אסטרטגיית הבדיקות",
    approachTitle: "בדיקות ידניות ממוקדות סיכונים.",
    approachIntro:
      "תכנון התרחישים התבסס על תהליכים עסקיים מרכזיים וכלל בדיקות חיוביות, שליליות, ערכי גבול וחקירה, לצד עקיבות בין מקרי בדיקה לממצאים.",
    strategy: [
      {
        number: "01",
        title: "הזדהות ואימות קלט",
        body: "התחברות, הרשמה, שדות חובה חסרים, פורמטים שגויים, אי־התאמת סיסמאות ובדיקות בסיסיות של הגבלת גישה.",
      },
      {
        number: "02",
        title: "חיפוש וקלט בלתי צפוי",
        body: "חיפוש מלא וחלקי, היעדר תוצאות, תווים מיוחדים, תוצאות שאינן תואמות לשאילתה והתאוששות מחיפוש לא תקין.",
      },
      {
        number: "03",
        title: "עקביות נתוני מוצר",
        body: "כותרת, מחיר, תמונות, גבולות כמות, סנכרון בין בקרי כמות ותרחישים התלויים בזמינות מלאי.",
      },
      {
        number: "04",
        title: "תקינות עגלה ושימושיות",
        body: "הוספה, הסרה וניקוי מוצרים; עדכון כמות, סיכום מחירים, שמירת מצב לאחר רענון ומונה העגלה.",
      },
    ],
    evidenceLabel: "תיקי ממצאים",
    evidenceTitle: "להבין מה עומד מאחורי בדיקה שנכשלה.",
    evidenceIntro:
      "הממצאים הבאים תועדו במהלך מחזור הבדיקות המקורי. בחר ממצא כדי לראות מה נצפה, מה הסיכון ומה סיווגו בדוח. אלו אינם נתונים על מצב אתר KSP כיום.",
    findingType: "ממצא מתועד",
    observed: "מה נצפה במחזור הבדיקות",
    impact: "מדוע זה חשוב",
    severity: "סיווג בדוח",
    major: "משמעותי",
    minor: "נמוך",
    findings: [
      {
        id: "KSP-12",
        label: "חיפוש / קלט לא תקין",
        title: "התו אחוז מוביל לשגיאת כתובת לא תקינה",
        observed: "הדוח מתעד חיפוש הכולל '%' שהוביל לעמוד שגיאה של כתובת לא תקינה במספר מצבי שפה.",
        impact: "במקום להציג הודעת תיקוף או מצב של אפס תוצאות, קלט חריג משבש את רצף החיפוש.",
        severity: "Major",
      },
      {
        id: "KSP-3",
        label: "מוצר / מחיר",
        title: "המחיר הכולל אינו מתעדכן עם שינוי הכמות",
        observed: "לפי הבדיקה המתועדת, שינוי כמות בעמוד המוצר לא עדכן את המחיר הכולל המוצג כצפוי.",
        impact: "חוסר עקביות במחיר עלול להטעות לקוח לפני הוספת המוצר לעגלה.",
        severity: "Major",
      },
      {
        id: "KSP-6",
        label: "עגלה / עקביות מצב",
        title: "מונה העגלה אינו תואם את הכמות שנבחרה",
        observed: "מונה הפריטים בסמל העגלה לא היה מסונכרן עם מספר הפריטים שנבחרו בפועל.",
        impact: "ייצוגי מצב סותרים פוגעים באמון המשתמש ומקשים לאמת את תוכן העגלה.",
        severity: "Major",
      },
      {
        id: "KSP-18",
        label: "עגלה / ניהול מצב",
        title: "פעולת ניקוי העגלה מתעדכנת באופן לא עקבי",
        observed: "הדוח מתאר מצב שבו סמל העגלה התעדכן רק לאחר לחיצה נוספת, בעוד שמוצרים בעמוד העגלה לא הוסרו בעקביות.",
        impact: "הלקוח עלול לחשוב שהעגלה ריקה בזמן שמוצרים עדיין נוכחים בתהליך הקנייה.",
        severity: "Major",
      },
      {
        id: "KSP-9",
        label: "ביצועים / יציבות פריסה",
        title: "תזוזות פריסה משמעותיות בדסקטופ",
        observed: "בניתוח הביצועים המתועד נמצאה חוסר יציבות של פריסת עמוד הבית במחשב, כולל ערכי CLS חריגים.",
        impact: "תזוזות של רכיבי ממשק עלולות לגרום ללחיצות שגויות ולפגוע בשימושיות.",
        severity: "Major",
      },
      {
        id: "KSP-10",
        label: "לוקליזציה",
        title: "שמות קטגוריות באנגלית במצב שפה רוסית",
        observed: "בדוח נרשמו שמות של מספר קטגוריות באנגלית כשהאתר הוגדר לרוסית.",
        impact: "ניווט בשפות מעורבות פוגע בעקביות חוויית המשתמש ועלול לבלבל.",
        severity: "Minor",
      },
    ],
    noteLabel: "הערכת שחרור",
    noteTitle: "Conditional Go — בכפוף לטיפול בממצאים.",
    noteBody:
      "בדוח ה־STR המקורי ניתנה המלצת Conditional Go: תהליך הקנייה שנבדק פעל בתרחישים מרכזיים רבים, אך הומלץ לתקן את הממצאים ולבצע בדיקות חוזרות לפני קביעה שהיקף הבדיקה מוכן לשחרור ברמת ביטחון גבוהה. זו הערכת פרויקט לימודי, לא החלטת שחרור רשמית של KSP.",
    constraintsLabel: "סביבה ומגבלות",
    constraintsTitle: "מה הפרויקט לא מתיימר לכסות.",
    constraints: [
      "בדיקות ידניות באתר ייצור, ללא סביבת בדיקות מבוקרת.",
      "ללא גישה ישירה לשרת, למסד הנתונים או ללוגים.",
      "זמינות מוצרים ומחירים השתנתה לאורך זמן; שני תרחישים לא בוצעו.",
      "תשלום, משלוחים, היסטוריית הזמנות, בדיקות נגישות וממשק ניהול היו מחוץ להיקף.",
    ],
    deliverablesLabel: "תיעוד ועקיבות",
    deliverablesTitle: "מהתרחיש לדוח שאפשר לפעול לפיו.",
    deliverables:
      ["STD — תיאור ותכנון בדיקות", "STR — דוח תוצאות בדיקה", "עקיבות בין מקרי בדיקה לבאגים", "תיעוד ממצאים ותרחישי שחזור"],
    evidenceNote:
      "חמישה קטעי ראיות מהדוח המקורי זמינים כעת לצפייה בהמשך העמוד. אלה עמודי דוח היסטוריים ולא הרצות חדשות. הדוח המלא אינו זמין להורדה מהאתר.",
    closing:
      "בדיקות איכות טובות חושפות את הפער בין מה שהמשתמש מצפה לראות, מה שהממשק מציג ומה שהמערכת עושה בפועל.",
    returnButton: "לפרויקטים נוספים",
  },
} as const;

function ResultBar({ passed, failed, notExecuted, label }: {
  passed: number;
  failed: number;
  notExecuted: number;
  label: string;
}) {
  const total = passed + failed + notExecuted;
  return (
    <div className="flex h-3 w-full overflow-hidden rounded-full bg-[#E6EFEA]" role="img"
      aria-label={`${label}: ${passed} passed, ${failed} failed, ${notExecuted} not executed`}>
      <div className="bg-[#0B7770]" style={{ width: `${100 * passed / total}%` }} />
      <div className="bg-[#C77A52]" style={{ width: `${100 * failed / total}%` }} />
      <div className="bg-[#A4B6B2]" style={{ width: `${100 * notExecuted / total}%` }} />
    </div>
  );
}



// Evidence extracted from the user's original 73-page KSP STD/STR report.
// Pages are historical report excerpts, not claims about the current KSP site.
const kspMediaUrl = (file: string) => `../../media/ksp/${file}`;

const kspEvidence = {
  en: {
    eyebrow: "TEST EXECUTION / PRIMARY EVIDENCE",
    title: "See the failures, not only the report.",
    intro: "Original recordings and screenshots from the historical KSP manual QA project. These examples describe observations made during the test cycle, not today's production behavior.",
    videoTitle: "RECORDED REPRODUCTIONS",
    imagesTitle: "SCREENSHOT INVESTIGATIONS",
    playLabel: "Recorded test",
    imageLabel: "Evidence image",
    close: "Close",
    enlarge: "Enlarge evidence",
    videos: [
      { file: "cart-counter-demo.mp4", poster: "cart-counter-demo-poster.webp", title: "KSP-6 · Cart counter synchronization", detail: "Recorded shopping-cart flow demonstrating a mismatch between selected quantity and the cart indicator." },
      { file: "search-uri-demo.mp4", poster: "search-uri-demo-poster.webp", title: "KSP-12 · Malformed URI on search", detail: "Reproduction of the percent-character search input leading to a malformed URI error page." },
    ],
    images: [
      { file: "search-mismatch.webp", title: "KSP-5 · Misleading search results", detail: "The query and the presented alternative product results do not correspond clearly." },
      { file: "uri-en.webp", title: "KSP-12 · English error state", detail: "Malformed URI error after submitting a percent character in English mode." },
      { file: "uri-ru.webp", title: "KSP-12 · Russian error state", detail: "Same class of error reproduced in Russian mode." },
      { file: "cls.webp", title: "KSP-9 · Core Web Vitals", detail: "PageSpeed Insights field report from March 31, 2026, showing CLS 0.77; a historical measurement." },
      { file: "i18n-en.webp", title: "KSP-11 · Hebrew in English mode", detail: "Hebrew labels remain in the search suggestions while the website is in English." },
      { file: "i18n-ru.webp", title: "KSP-11 · Hebrew in Russian mode", detail: "The search dropdown contains untranslated Hebrew labels in Russian mode." },
      { file: "registration.webp", title: "KSP-1 · Name-field validation", detail: "Registration name fields accepting atypical special-character input during the recorded test cycle." },
      { file: "worlds-ru.webp", title: "KSP-19 · Worlds layout", detail: "Inconsistent Worlds button presentation in Russian mode, alongside category localization differences." },
    ],
    note: "Images and videos are historical project evidence. They are not evidence of current site defects. Recordings are silent copies and may include public product information. The full original test report is not published here.",
  },
  he: {
    eyebrow: "ביצוע בדיקות / ראיות מקוריות",
    title: "לראות את התקלה, ולא רק לקרוא עליה.",
    intro: "סרטונים וצילומי מסך מקוריים מתוך פרויקט הבדיקות הידניות של KSP. מדובר בממצאים מתקופת הבדיקות, ולא בטענות על מצב האתר כיום.",
    videoTitle: "הקלטות שחזור תקלות",
    imagesTitle: "חקירת ממצאים בצילומי מסך",
    playLabel: "סרטון בדיקה",
    imageLabel: "תמונת ראיה",
    close: "סגירה",
    enlarge: "הגדלת ראיה",
    videos: [
      { file: "cart-counter-demo.mp4", poster: "cart-counter-demo-poster.webp", title: "KSP-6 · מונה העגלה אינו מסונכרן", detail: "תיעוד תהליך בעגלת הקניות וחוסר התאמה בין הכמות שנבחרה למונה בעגלה." },
      { file: "search-uri-demo.mp4", poster: "search-uri-demo-poster.webp", title: "KSP-12 · שגיאת URI בחיפוש", detail: "שחזור חיפוש עם תו אחוז המוביל לדף שגיאה של כתובת לא תקינה." },
    ],
    images: [
      { file: "search-mismatch.webp", title: "KSP-5 · תוצאות חיפוש לא תואמות", detail: "פער בין שאילתת החיפוש לתוצאות חלופיות המוצגות ללא הסבר מספק." },
      { file: "uri-en.webp", title: "KSP-12 · שגיאה במצב אנגלית", detail: "דף שגיאת URI לאחר הזנת תו אחוז במצב אנגלית." },
      { file: "uri-ru.webp", title: "KSP-12 · שגיאה במצב רוסית", detail: "אותו סוג כשל משוחזר גם במצב רוסית." },
      { file: "cls.webp", title: "KSP-9 · מדדי Core Web Vitals", detail: "דוח היסטורי מ־31 במרץ 2026 המציג ערך CLS של 0.77." },
      { file: "i18n-en.webp", title: "KSP-11 · טקסט עברי במצב אנגלית", detail: "תוויות בעברית בתפריט הצעות החיפוש כאשר שפת האתר היא אנגלית." },
      { file: "i18n-ru.webp", title: "KSP-11 · טקסט עברי במצב רוסית", detail: "תוויות בעברית שלא תורגמו בתפריט חיפוש במצב רוסית." },
      { file: "registration.webp", title: "KSP-1 · אימות קלט בהרשמה", detail: "הזנת תווים חריגים בשדות שם פרטי ומשפחה במחזור הבדיקות המתועד." },
      { file: "worlds-ru.webp", title: "KSP-19 · תצוגת Worlds", detail: "חוסר עקביות בתצוגת כפתור Worlds במצב רוסית, לצד פערי לוקליזציה בקטגוריות." },
    ],
    note: "הסרטונים והתמונות הם תיעוד היסטורי של הפרויקט, ולא ראיה למצב האתר כיום. עותקי הסרטונים ללא שמע ומציגים מידע ציבורי על מוצרים. הדוח המלא אינו מפורסם באתר.",
  },
} as const;

function KSPEvidenceGallery({ language }: { language: "en" | "he" }) {
  const t = kspEvidence[language];
  const [selected, setSelected] = useState<number | null>(null);
  useEffect(() => {
    if (selected === null) return;
    const onEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [selected]);
  return (
    <section className="mb-12" aria-labelledby="ksp-evidence-real-title">
      <p className="section-index">{t.eyebrow}</p>
      <h2 id="ksp-evidence-real-title" className="mt-3 text-2xl font-extrabold text-[#19343D] md:text-3xl">{t.title}</h2>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-[#617879] md:text-base">{t.intro}</p>
      <h3 className="mb-4 mt-8 text-xs font-extrabold tracking-wide text-[#0B7770]">{t.videoTitle}</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {t.videos.map((video, i) => (
          <article key={video.file} className="glass-surface min-w-0 overflow-hidden p-4 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-base font-extrabold text-[#19343D]">{video.title}</h4>
              <span className="rounded-full bg-[#E4F3ED] px-3 py-1.5 text-[10px] font-bold text-[#0B7770]">{t.playLabel} · 0{i+1}</span>
            </div>
            <video
              controls
              playsInline
              preload="metadata"
              poster={kspMediaUrl(video.poster)}
              className="aspect-video w-full rounded-xl border border-[#C6D8D1] bg-[#102930] object-contain"
              aria-label={video.title}
            >
              <source src={kspMediaUrl(video.file)} type="video/mp4" />
            </video>
            <p className="mt-3 text-sm leading-6 text-[#617879]">{video.detail}</p>
          </article>
        ))}
      </div>
      <h3 className="mb-4 mt-9 text-xs font-extrabold tracking-wide text-[#0B7770]">{t.imagesTitle}</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.images.map((item, i) => (
          <article key={item.file} className="glass-surface min-w-0 overflow-hidden p-4">
            <button
              type="button"
              onClick={() => setSelected(i)}
              aria-label={`${t.enlarge}: ${item.title}`}
              className="group relative block w-full overflow-hidden rounded-xl border border-[#D7E5DE] bg-[#F2F5F2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B7770]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={kspMediaUrl(item.file)} alt={item.title} loading="lazy" className="h-52 w-full object-contain transition-transform duration-300 group-hover:scale-[1.025]" />
              <span aria-hidden="true" className="absolute bottom-2 end-2 rounded-full bg-[#0B7770]/95 px-3 py-1.5 text-[10px] font-bold text-white">＋</span>
            </button>
            <p className="mt-3 text-[10px] font-bold tracking-wide text-[#0B7770]">{t.imageLabel} · 0{i+1}</p>
            <h4 className="mt-1 text-sm font-extrabold text-[#19343D]">{item.title}</h4>
            <p className="mt-2 text-xs leading-6 text-[#617879]">{item.detail}</p>
          </article>
        ))}
      </div>
      <p className="mt-5 text-xs leading-6 text-[#758B83]">{t.note}</p>
      {selected !== null && (
        <div role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }} className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071C22]/90 p-3 sm:p-7">
          <div role="dialog" aria-modal="true" aria-label={t.images[selected].title} className="relative flex max-h-[95dvh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white p-3 shadow-2xl sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-sm font-bold text-[#19343D]">{t.images[selected].title}</h3>
              <button type="button" autoFocus onClick={() => setSelected(null)} className="shrink-0 rounded-full border border-[#D6E5DE] bg-[#F1F7F3] px-4 py-2 text-sm font-bold text-[#0B7770]">{t.close} ×</button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={kspMediaUrl(t.images[selected].file)} alt={t.images[selected].title} className="min-h-0 max-h-[75dvh] w-full object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}

export default function KSPCaseStudy() {
  const { language } = useLanguage();
  const he = language === "he";
  const t = copy[language];
  const [selectedFinding, setSelectedFinding] = useState(0);
  const finding = t.findings[selectedFinding];
  const metricValues = [results.planned, results.passed, results.failed, results.notExecuted];

  return (
    <main id="main-content" className="inner-page" dir={he ? "rtl" : "ltr"}>
      <div className="inner-glow inner-glow--left" aria-hidden="true" />
      <div className="page-content mx-auto w-full max-w-6xl pb-8">
        <Link href="/#showcase" className="mb-9 inline-flex items-center gap-2 text-sm font-bold text-[#0B7770] transition hover:opacity-70">
          <span aria-hidden="true">{he ? "→" : "←"}</span>{t.back}
        </Link>

        <header className="mb-9 grid items-center gap-7 lg:grid-cols-[1.2fr_.8fr]">
          <div className="min-w-0">
            <p className="page-kicker">{t.kicker}</p>
            <h1 className="page-title !max-w-none">
              <span dir="ltr" className="inline-block !text-[#19343D]">{t.title}</span>{" "}
              <span>{t.titleAccent}</span>
            </h1>
            <p className="page-lead !mb-5 !max-w-3xl">{t.introduction}</p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-[#BFDCD2] bg-white/80 px-3 py-2 text-xs font-semibold text-[#0B7770]">{t.historical}</span>
              <span className="rounded-full border border-[#DCE7E2] bg-white/80 px-3 py-2 text-xs font-semibold text-[#637879]">{t.environment}</span>
            </div>
          </div>
          <div className="glass-surface relative flex min-h-[230px] flex-col items-center justify-center gap-3 overflow-hidden !bg-gradient-to-br from-[#F6FAF6] via-[#D9EEE7] to-[#EDE6D8] p-4 text-center">
            {/* Original report cover, not a screenshot of the present-day KSP website. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={kspMediaUrl("report-cover.webp")}
              alt={he ? "שער דוח בדיקות KSP המקורי" : "Cover of the original KSP software test report"}
              className="relative max-h-[220px] w-full max-w-[185px] rounded-lg border border-[#D6E4DC] bg-white object-contain shadow-[0_12px_32px_rgba(18,60,53,0.16)]"
              loading="eager"
            />
            <p className="text-center text-[10px] font-bold tracking-wide text-[#375D59]">
              {he ? "שער דוח הבדיקות המקורי · 2026" : "Original test report cover · 2026"}
            </p>
          </div>
        </header>

        <section className="glass-surface mb-5 p-5 sm:p-7 md:p-9" aria-labelledby="ksp-results-title">
          <p className="section-index">{t.resultsLabel}</p>
          <h2 id="ksp-results-title" className="mt-3 text-2xl font-extrabold tracking-tight text-[#19343D] md:text-3xl">{t.resultsTitle}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#637879] md:text-base">{t.resultsDescription}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {metricValues.map((value, i) => (
              <div key={i} className="rounded-2xl border border-[#DCEBE6] bg-white/90 px-3 py-5 text-center">
                <div className="text-3xl font-black tabular-nums text-[#19343D] md:text-4xl">{value}</div>
                <div className="mt-2 text-xs font-bold text-[#637879]">{t.metrics[i]}</div>
              </div>
            ))}
          </div>
          <div className="mt-7">
            <ResultBar passed={results.passed} failed={results.failed} notExecuted={results.notExecuted} label={t.resultsLabel} />
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-[#637879]">
              {t.legend.map((name, i) => (
                <span key={name} className="inline-flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${i === 0 ? "bg-[#0B7770]" : i === 1 ? "bg-[#C77A52]" : "bg-[#A4B6B2]"}`} />{name}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs leading-6 text-[#7C8E89]">{t.noExecutionNote}</p>
          </div>
        </section>

        <section className="glass-surface mb-10 p-6 md:p-9" aria-labelledby="ksp-scope-title">
          <p className="section-index">{t.contextLabel}</p>
          <h2 id="ksp-scope-title" className="mt-3 text-2xl font-extrabold text-[#19343D] md:text-3xl">{t.contextTitle}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#637879] md:text-base">{t.contextDescription}</p>
          <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-4">
            {t.flow.map((step, i) => (
              <div key={step} className="flex min-h-[92px] flex-col justify-between gap-2 rounded-2xl border border-[#D4E9E0] bg-[#EAF4EF] p-4">
                <span className="text-xs font-extrabold text-[#0B7770]" dir="ltr">0{i + 1}</span>
                <span className="text-sm font-extrabold text-[#19343D]">{step}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10" aria-labelledby="ksp-approach-title">
          <p className="section-index">{t.approachLabel}</p>
          <h2 id="ksp-approach-title" className="mt-3 text-2xl font-extrabold tracking-tight text-[#19343D] md:text-3xl">{t.approachTitle}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#637879] md:text-base">{t.approachIntro}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {t.strategy.map((item) => (
              <article className="glass-surface min-w-0 p-6" key={item.number}>
                <span className="text-sm font-black text-[#0B7770]" dir="ltr">{item.number}</span>
                <h3 className="mt-4 text-lg font-extrabold leading-snug text-[#19343D]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#637879]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10" aria-labelledby="ksp-findings-title">
          <p className="section-index">{t.evidenceLabel}</p>
          <h2 id="ksp-findings-title" className="mt-3 text-2xl font-extrabold tracking-tight text-[#19343D] md:text-3xl">{t.evidenceTitle}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#637879] md:text-base">{t.evidenceIntro}</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-[.9fr_1.1fr]">
            <div className="glass-surface flex flex-col gap-2 p-3 sm:p-4">
              {t.findings.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedFinding(i)}
                  aria-pressed={selectedFinding === i}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-4 text-start transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B7770] ${
                    selectedFinding === i
                      ? "border-[#8AC7B7] bg-[#E7F4EC]"
                      : "border-transparent bg-white/65 hover:border-[#D3E6DF] hover:bg-white"
                  }`}
                >
                  <span className="shrink-0 rounded-lg bg-white px-2 py-2 text-xs font-black text-[#0B7770]" dir="ltr">{item.id}</span>
                  <span className="min-w-0 flex-1 text-sm font-bold leading-6 text-[#19343D]">{item.title}</span>
                  <span aria-hidden="true" className="text-[#0B7770]">{he ? "←" : "→"}</span>
                </button>
              ))}
            </div>
            <article className="glass-surface min-w-0 p-6 md:p-8" aria-live="polite">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-xl bg-[#E7F3ED] px-3 py-2 text-xs font-black text-[#0B7770]" dir="ltr">{finding.id}</span>
                <span className="text-[10px] font-extrabold tracking-wider text-[#A17645]">{t.findingType}</span>
              </div>
              <p className="mt-6 text-xs font-bold tracking-wide text-[#0B7770]">{finding.label}</p>
              <h3 className="mt-2 text-xl font-extrabold leading-snug text-[#19343D] md:text-2xl">{finding.title}</h3>
              <div className="mt-5 space-y-4 border-t border-[#E2EBE7] pt-5">
                <div>
                  <p className="text-xs font-bold text-[#0B7770]">{t.observed}</p>
                  <p className="mt-1 text-sm leading-7 text-[#637879]">{finding.observed}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0B7770]">{t.impact}</p>
                  <p className="mt-1 text-sm leading-7 text-[#637879]">{finding.impact}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs font-bold text-[#637879]">{t.severity}:</span>
                  <span className="rounded-full border border-[#ECDAC7] bg-[#FFF5EA] px-3 py-1 text-xs font-extrabold text-[#9B6A42]">
                    {finding.severity === "Major" ? t.major : t.minor}
                  </span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <KSPEvidenceGallery language={language} />

        <section className="mb-10 grid gap-4 md:grid-cols-2">
          <div className="glass-surface p-6 md:p-8">
            <p className="section-index">{t.noteLabel}</p>
            <h2 className="mt-3 text-xl font-extrabold leading-snug text-[#19343D] md:text-2xl">{t.noteTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-[#637879]">{t.noteBody}</p>
          </div>
          <div className="glass-surface p-6 md:p-8">
            <p className="section-index">{t.constraintsLabel}</p>
            <h2 className="mt-3 text-xl font-extrabold text-[#19343D] md:text-2xl">{t.constraintsTitle}</h2>
            <ul className="mt-5 space-y-3">
              {t.constraints.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-[#637879]">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C4A57B]" aria-hidden="true" /><span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="glass-surface mb-9 p-6 md:p-9" aria-labelledby="ksp-docs-title">
          <p className="section-index">{t.deliverablesLabel}</p>
          <h2 id="ksp-docs-title" className="mt-3 text-2xl font-extrabold text-[#19343D]">{t.deliverablesTitle}</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {t.deliverables.map((item, i) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-[#DCEBE6] bg-white/85 p-4">
                <span className="rounded-lg bg-[#E8F4EF] px-2.5 py-2 text-xs font-black text-[#0B7770]" dir="ltr">0{i + 1}</span>
                <span className="text-sm font-bold leading-6 text-[#19343D]">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-xs leading-6 text-[#7D918B]">{t.evidenceNote}</p>
        </section>

        <p className="mx-auto mb-9 max-w-3xl text-center text-xl font-bold leading-relaxed text-[#0B7770] md:text-2xl">{t.closing}</p>
        <div className="page-bottom-actions">
          <Link className="action-btn action-btn--primary" href="/#showcase">
            {t.returnButton} <span aria-hidden="true">{he ? "→" : "←"}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}