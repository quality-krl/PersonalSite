"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "../../components/LanguageProvider";

/**
 * FreeTV iOS QA case study.
 * Historical snapshot: STR-FTV-001 (June 2026), app v1.25.32 (build 142).
 * Displayed numbers describe the documented project execution, not current FreeTV quality.
 * Selected user-supplied evidence is linked as redacted assets, with historical context.
 */

const report = {
  total: 123,
  passed: 99,
  failed: 9,
  blocked: 15,
  apiTotal: 18,
  apiPassed: 16,
  apiFailed: 2,
  issues: 9,
  highIssues: 2,
  mediumIssues: 2,
  lowIssues: 5,
};

const copy = {
  en: {
    back: "Back to portfolio",
    kicker: "PROJECT 02 / MOBILE QUALITY ASSURANCE",
    heading: "FreeTV",
    headingAccent: "iOS QA.",
    description:
      "An evidence-led manual QA investigation of a streaming application, combining functional testing, API investigation, security-oriented scenarios and documented release risks.",
    snapshot: "PROJECT SNAPSHOT · APR–JUN 2026",
    environment: "iPhone 14 Pro · iOS 26.3.1 · FreeTV v1.25.32 (build 142)",
    scopeNote: "Historical portfolio test report, not a live assessment of the current product.",
    metrics: ["Documented test cases", "Passed", "Failed", "Blocked"],
    result: "EXECUTION RESULTS",
    resultTitle: "Results with the blockers visible.",
    resultIntro:
      "The report distinguishes failed checks from tests that could not run. Fifteen blocked scenarios are retained in the totals rather than being quietly excluded.",
    execution: "Reported execution distribution",
    resultLegend: ["Passed", "Failed", "Blocked"],
    suitesLabel: "EXECUTION BY SUITE",
    suiteName: ["Functional", "Non-functional", "API", "Database-related"],
    blockedText:
      "All 14 database-related cases were blocked: no direct database access was available in the production environment. These are not claimed as passed tests.",
    approach: "TEST STRATEGY",
    approachTitle: "Cover user journeys, then challenge assumptions.",
    approachIntro:
      "Coverage spans viewing, onboarding, authentication and profile workflows, plus non-functional risks and protocol-level API behavior.",
    focus: [
      {
        no: "01",
        title: "User journeys",
        detail:
          "Onboarding, sign-in, Live TV, VOD/Catch-Up, search, watchlist, navigation and profiles.",
      },
      {
        no: "02",
        title: "API investigation",
        detail:
          "18 documented API cases covering authentication, content, search, watchlists and error handling.",
      },
      {
        no: "03",
        title: "Risk-led exploration",
        detail:
          "Focus on session behavior, OTP expiry, exposed endpoints, playback recovery and localization.",
      },
      {
        no: "04",
        title: "Traceability",
        detail:
          "Requirements, case design, execution results and defects organized across SRS, STP, STD and STR.",
      },
    ],
    issuesLabel: "DEFECT INVESTIGATION",
    issuesTitle: "Two high-severity risks documented.",
    issuesIntro:
      "The original project report categorized nine findings: two high, two medium and five low severity. These examples are historical findings from that report, not claims about the current FreeTV service.",
    findings: [
      {
        id: "FTV-5",
        category: "AUTHENTICATION / OTP",
        title: "OTP validity exceeds the defined threshold",
        observation:
          "The report records an OTP remaining valid for approximately 60 minutes, beyond its project-defined security requirement.",
        impact:
          "A longer reuse window may increase exposure if a code is disclosed or intercepted.",
        requirement: "FR-007 · NFR-011",
      },
      {
        id: "FTV-8",
        category: "API / ACCESS CONTROL",
        title: "Content endpoints responded without authentication",
        observation:
          "The report describes multiple content endpoints returning data without an authenticated session.",
        impact:
          "Potential unauthorized exposure of content that the project requirements treated as protected.",
        requirement: "FR-013 · NFR-010 / NFR-012",
      },
    ],
    observed: "Documented observation",
    impact: "Why it matters",
    requirements: "Requirement references",
    severity: "HIGH SEVERITY · REPORT CLASSIFICATION",
    constraints: "ENVIRONMENT & LIMITATIONS",
    constraintsTitle: "Testing within real constraints.",
    constraintList: [
      "Production-only environment: no dedicated test server was available.",
      "No direct database access, so database-related checks remained blocked.",
      "Fiddler traffic capture required Wi-Fi, while primary functional execution used cellular data.",
      "Automation, Android, penetration testing and load testing were outside the documented scope.",
    ],
    methods: "TOOLS & DELIVERABLES",
    tools: "Tools used",
    docs: "Documentation",
    docsList: ["SRS — Requirements", "STP — Test Plan", "STD — Test Design", "STR — Test Results"],
    evidence: "EVIDENCE & NEXT ITERATION",
    evidenceTitle: "From documented claims to inspectable evidence.",
    evidenceText:
      "Next we will add approved, redacted TestRail/Jira excerpts and selected API traces from the original project. No links or attachments are represented as available until they are actually published.",
    closing:
      "Quality is measured not only by the tests that pass, but by the risks, gaps and constraints that the report makes visible.",
    backAction: "Explore other projects",
    caseStatus: "Historical report · June 2026",
  },
  he: {
    back: "חזרה לפורטפוליו",
    kicker: "פרויקט 02 / בדיקות איכות למובייל",
    heading: "FreeTV",
    headingAccent: "בדיקות iOS.",
    description:
      "פרויקט בדיקות ידניות לאפליקציית סטרימינג, המשלב בדיקות פונקציונליות, חקירת API, תרחישים מוכווני אבטחה ותיעוד סיכוני שחרור גרסה.",
    snapshot: "תמונת מצב של הפרויקט · אפריל–יוני 2026",
    environment: "iPhone 14 Pro · iOS 26.3.1 · FreeTV v1.25.32 (build 142)",
    scopeNote: "דוח בדיקות היסטורי לתיק העבודות, ולא הערכה עדכנית של המוצר.",
    metrics: ["מקרי בדיקה מתועדים", "עברו", "נכשלו", "נחסמו"],
    result: "תוצאות הביצוע",
    resultTitle: "תמונה מלאה, כולל בדיקות שנחסמו.",
    resultIntro:
      "הדוח מפריד בין בדיקות שנכשלו לבין בדיקות שלא ניתן היה לבצע. 15 הבדיקות החסומות נשארות בסיכום ואינן נעלמות מהנתונים.",
    execution: "התפלגות תוצאות הבדיקות בדוח",
    resultLegend: ["עברו", "נכשלו", "נחסמו"],
    suitesLabel: "תוצאות לפי קבוצת בדיקות",
    suiteName: ["פונקציונליות", "לא פונקציונליות", "API", "בדיקות הקשורות למסד נתונים"],
    blockedText:
      "כל 14 הבדיקות הקשורות למסד הנתונים נחסמו משום שלא הייתה גישה ישירה למסד הנתונים בסביבת הייצור. הן אינן מוצגות כבדיקות שעברו.",
    approach: "אסטרטגיית בדיקות",
    approachTitle: "לכסות תהליכי משתמש — ולבחון גם את ההנחות.",
    approachIntro:
      "כיסוי תהליכי צפייה, הצטרפות, הזדהות וניהול פרופיל, לצד סיכונים לא פונקציונליים והתנהגות ממשקי API.",
    focus: [
      {
        no: "01",
        title: "תהליכי משתמש",
        detail:
          "Onboarding, התחברות, טלוויזיה בשידור חי, VOD/Catch-Up, חיפוש, רשימת צפייה, ניווט ופרופילים.",
      },
      {
        no: "02",
        title: "חקירת API",
        detail:
          "18 מקרי בדיקה מתועדים להזדהות, תוכן, חיפוש, רשימות צפייה וטיפול בשגיאות.",
      },
      {
        no: "03",
        title: "בדיקות מבוססות סיכונים",
        detail:
          "התנהגות Session, תוקף OTP, גישה לנקודות קצה, התאוששות מניגון ולוקליזציה.",
      },
      {
        no: "04",
        title: "עקיבות ותיעוד",
        detail:
          "קישור בין דרישות, תכנון בדיקות, תוצאות וממצאים בעזרת מסמכי SRS, STP, STD ו־STR.",
      },
    ],
    issuesLabel: "חקירת תקלות",
    issuesTitle: "שני סיכונים בחומרה גבוהה שתועדו.",
    issuesIntro:
      "דוח הפרויקט מסווג תשעה ממצאים: שניים בחומרה גבוהה, שניים בבינונית וחמישה בנמוכה. מדובר בממצאים היסטוריים מתוך הדוח, ולא בטענה לגבי השירות כיום.",
    findings: [
      {
        id: "FTV-5",
        category: "הזדהות / OTP",
        title: "תוקף קוד האימות חורג מהדרישה שהוגדרה",
        observation:
          "הדוח מתעד קוד אימות שנותר תקף במשך כ־60 דקות, מעבר לסף האבטחה שנקבע בדרישות הפרויקט.",
        impact:
          "חלון שימוש חוזר ארוך יותר עלול להגדיל חשיפה במקרה שקוד נחשף או יורט.",
        requirement: "FR-007 · NFR-011",
      },
      {
        id: "FTV-8",
        category: "API / בקרת גישה",
        title: "נקודות קצה של תוכן הגיבו ללא הזדהות",
        observation:
          "הדוח מתאר מספר נקודות קצה שהחזירו נתוני תוכן גם ללא Session מאומת.",
        impact:
          "חשיפה אפשרית של תוכן שלפי דרישות הפרויקט אמור להיות מוגן.",
        requirement: "FR-013 · NFR-010 / NFR-012",
      },
    ],
    observed: "התצפית המתועדת",
    impact: "המשמעות העסקית / האבטחתית",
    requirements: "הפניות לדרישות",
    severity: "חומרה גבוהה · לפי סיווג הדוח",
    constraints: "סביבת בדיקה ומגבלות",
    constraintsTitle: "לבדוק בצורה מקצועית גם כשיש מגבלות.",
    constraintList: [
      "סביבת ייצור בלבד, ללא שרת בדיקות ייעודי.",
      "ללא גישה ישירה למסד הנתונים; לכן הבדיקות הקשורות אליו נחסמו.",
      "לכידת תעבורה ב־Fiddler דרשה Wi-Fi, בעוד שהבדיקות הפונקציונליות בוצעו בעיקר ברשת סלולרית.",
      "אוטומציה, Android, בדיקות חדירה ובדיקות עומס לא נכללו בהיקף המתועד.",
    ],
    methods: "כלים ותוצרים",
    tools: "כלים שבהם השתמשתי",
    docs: "מסמכי בדיקות",
    docsList: ["SRS — דרישות", "STP — תוכנית בדיקות", "STD — תכנון בדיקות", "STR — תוצאות הבדיקות"],
    evidence: "ראיות והמשך עבודה",
    evidenceTitle: "מתיעוד מקצועי לראיות שאפשר לבדוק.",
    evidenceText:
      "בשלב הבא נוסיף קטעים מאושרים ומושחרים של TestRail/Jira ודוגמאות נבחרות מתעבורת ה־API המקורית. לא נציג קישורים או קבצים שלא פורסמו בפועל.",
    closing:
      "איכות נמדדת לא רק בבדיקות שעברו, אלא גם בסיכונים, בפערים ובמגבלות שהדוח חושף.",
    backAction: "לפרויקטים נוספים",
    caseStatus: "דוח היסטורי · יוני 2026",
  },
} as const;

const suiteData = [
  { key: "functional", total: 71, passed: 67, failed: 4, blocked: 0 },
  { key: "nonfunctional", total: 20, passed: 16, failed: 3, blocked: 1 },
  { key: "api", total: 18, passed: 16, failed: 2, blocked: 0 },
  { key: "database", total: 14, passed: 0, failed: 0, blocked: 14 },
];

const toolNames = ["TestRail", "Jira", "Fiddler", "Postman", "iOS Screen Recording"];

function PercentageBar({
  passed,
  failed,
  blocked,
  label,
}: {
  passed: number;
  failed: number;
  blocked: number;
  label: string;
}) {
  const total = passed + failed + blocked;
  return (
    <div
      className="flex h-2.5 w-full overflow-hidden rounded-full bg-[#E5EFEC]"
      role="img"
      aria-label={`${label}: ${passed} passed, ${failed} failed, ${blocked} blocked`}
    >
      <div style={{ width: `${(100 * passed) / total}%` }} className="bg-[#0B7770]" />
      <div style={{ width: `${(100 * failed) / total}%` }} className="bg-[#C67A50]" />
      <div style={{ width: `${(100 * blocked) / total}%` }} className="bg-[#A4B8B4]" />
    </div>
  );
}



// User-supplied portfolio evidence, edited for public display. Paths are relative to
// /projects/freetv/ so they work locally and under GitHub Pages /PersonalSite/ basePath.

const mediaUrl = (file: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/media/freetv/${file}`;

const evidenceCopy = {
  en: {
    eyebrow: "REAL PROJECT EVIDENCE",
    title: "See the investigation, not just the claim.",
    intro: "Selected artifacts from the April–June 2026 portfolio test cycle. Recordings are edited demonstrations, not uninterrupted proof of elapsed time. Media has been redacted for public display.",
    clips: "RECORDED TEST WORKFLOWS",
    otpTitle: "OTP expiration investigation",
    otpNote: "Edited 67-second demonstration of the authentication workflow. The timing observations were recorded separately in TestRail and Jira (FTV-5). OTP values and message previews are masked; audio removed.",
    watchTitle: "Profile / watchlist separation",
    watchNote: "Short mobile recording of a user-facing profile and watchlist scenario (TC-WTCH-005). Illustrates the tested UI flow; not a claim about today's app.",
    stills: "INSPECTABLE ARTIFACTS",
    images: [
      {title:"FTV-5 — Jira defect record",detail:"Severity, reproduction steps, observed OTP lifetime and traceability to FR-007 / NFR-011."},
      {title:"TC-API-AUTH-005 — TestRail execution",detail:"Failed test-case record with observed intervals and its connection to FTV-5."},
      {title:"Fiddler — request and headers",detail:"Captured HTTPS PUT request returning HTTP 200; request identifiers and internal values concealed."},
      {title:"Fiddler — response inspection",detail:"Recorded HTTP 200 and an empty response body at this inspected step; neither alone proves OTP lifetime."},
      {title:"Postman — constrained replay",detail:"Replay returned HTTP 400 with DEVICE_CANNOT_BE_ASSIGNED. This was blocked at device validation, not proof of OTP rejection."},
    ],
    lightbox: "Enlarge image",
    close: "Close image",
    limitsTitle: "Evidence boundaries",
    limits: "The report records acceptance at 75 seconds, 2:48, 5:00, 10:10 and 30:00, with rejection at about 61 minutes. The short video does not independently establish those timings. Postman replay was blocked by device/session validation. These observations refer exclusively to the documented 2026 test cycle.",
    safety: "Public-safe copies: identifiers and authentication values masked; original files not bundled.",
    clipLabel: "Video recording",
    screenLabel: "Screenshot",
  },
  he: {
    eyebrow: "ראיות מקוריות מהפרויקט",
    title: "לא רק תיאור הבדיקה — גם תיעוד העבודה.",
    intro: "ראיות נבחרות ממחזור הבדיקות של אפריל–יוני 2026. הסרטונים נערכו להדגמה ואינם מהווים הוכחה להמתנה רציפה. הקבצים עברו השחרה לצורך פרסום.",
    clips: "סרטוני הבדיקות",
    otpTitle: "חקירת תוקף קוד OTP",
    otpNote: "הדגמה ערוכה באורך כ־67 שניות של תהליך ההזדהות. תצפיות הזמנים תועדו בנפרד ב־TestRail וב־Jira, תחת FTV-5. ערכי OTP והודעות הוסתרו; השמע הוסר.",
    watchTitle: "הפרדת רשימות צפייה בין פרופילים",
    watchNote: "הקלטת מובייל קצרה של תרחיש פרופילים ורשימות צפייה (TC-WTCH-005). מציגה את תהליך ה־UI שנבדק ולא טוענת דבר על גרסת האפליקציה כיום.",
    stills: "מסמכי ראיות לצפייה",
    images: [
      {title:"FTV-5 — דיווח תקלה ב־Jira",detail:"חומרה, צעדי שחזור, תצפית על משך תוקף הקוד ועקיבות ל־FR-007 / NFR-011."},
      {title:"TC-API-AUTH-005 — הרצה ב־TestRail",detail:"דיווח על מקרה בדיקה שנכשל, מרווחי זמן שנצפו וקישור לתקלה FTV-5."},
      {title:"Fiddler — בקשה ו־Headers",detail:"בקשת HTTPS מסוג PUT שהחזירה HTTP 200. מזהים וערכי מערכת פנימיים הוסתרו."},
      {title:"Fiddler — בדיקת תגובה",detail:"תיעוד HTTP 200 וגוף תגובה ריק בצעד שנבדק; נתונים אלה לבדם אינם מאמתים את משך תוקף ה־OTP."},
      {title:"Postman — ניסיון שחזור מוגבל",detail:"התקבלה תשובת HTTP 400 עם DEVICE_CANNOT_BE_ASSIGNED. הבקשה נחסמה באימות המכשיר ולא הוכיחה דחיית OTP."},
    ],
    lightbox: "הגדלת תמונה",
    close: "סגירת תמונה",
    limitsTitle: "גבולות הראיות",
    limits: "בדוח מתועדת קבלת OTP לאחר 75 שניות, 2:48, 5:00, 10:10 ו־30:00 דקות, ודחייה לאחר כ־61 דקות. הסרטון הקצר אינו מאמת באופן עצמאי את פרקי הזמן האלה. הבקשה ב־Postman נחסמה עקב אימות מכשיר או Session. הממצאים מתייחסים למחזור הבדיקות שתועד ב־2026 בלבד.",
    safety: "עותקים מותאמים לפרסום: מזהים וערכי הזדהות הוסתרו. קובצי המקור אינם כלולים בחבילה.",
    clipLabel: "סרטון בדיקה",
    screenLabel: "צילום מסך",
  },
} as const;

const evidenceImageFiles = [
  "ftv5-jira.webp",
  "testrail-otp-results.webp",
  "fiddler-headers.webp",
  "fiddler-response.webp",
  "postman-replay.webp",
] as const;

function EvidenceGallery({ language }: { language: "en" | "he" }) {
  const t = evidenceCopy[language];
  const [openImage, setOpenImage] = useState<number | null>(null);
  useEffect(() => {
    if (openImage === null) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenImage(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [openImage]);
  const videos = [
    { file: "otp-expiry-demo.mp4", poster: "otp-poster.webp", title: t.otpTitle, desc: t.otpNote },
    { file: "watchlist-profile-demo.mp4", poster: "watchlist-poster.webp", title: t.watchTitle, desc: t.watchNote },
  ];

  return (
    <section className="mb-12" aria-labelledby="freetv-evidence-title">
      <p className="section-index">{t.eyebrow}</p>
      <h2 id="freetv-evidence-title" className="mt-3 max-w-4xl text-2xl font-extrabold text-[#19343D] md:text-3xl">{t.title}</h2>
      <p className="mt-4 max-w-4xl text-sm leading-7 text-[#637879] md:text-base">{t.intro}</p>

      <h3 className="mt-9 mb-4 text-xs font-extrabold tracking-wide text-[#0B7770]">{t.clips}</h3>
      <div className="grid gap-4 lg:grid-cols-2">
        {videos.map((video, i) => (
          <article key={video.file} className="glass-surface min-w-0 overflow-hidden p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <strong className="text-base text-[#19343D]">{video.title}</strong>
              <span className="rounded-full bg-[#E5F2ED] px-3 py-1.5 text-[11px] font-bold text-[#0B7770]">{t.clipLabel} · 0{i + 1}</span>
            </div>
            <div className="my-5 flex justify-center rounded-2xl bg-[#112D34] p-3 sm:p-5">
              <video
                id={i === 0 ? "freetv-otp-player" : undefined}
                className="block aspect-[9/19.5] max-h-[450px] w-full max-w-[225px] rounded-xl bg-black object-contain shadow-2xl"
                controls
                playsInline
                preload="metadata"
                poster={mediaUrl(video.poster)}
                aria-label={video.title}
              >
                <source src={mediaUrl(video.file)} type="video/mp4" />
              </video>
            </div>
            <p className="text-sm leading-7 text-[#5B7273]">{video.desc}</p>
          </article>
        ))}
      </div>

      <h3 className="mt-9 mb-4 text-xs font-extrabold tracking-wide text-[#0B7770]">{t.stills}</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {evidenceImageFiles.map((file, i) => (
          <article key={file} className="glass-surface min-w-0 overflow-hidden p-4 sm:p-5">
            <button
              type="button"
              onClick={() => setOpenImage(i)}
              aria-label={`${t.lightbox}: ${t.images[i].title}`}
              className="group block w-full overflow-hidden rounded-xl border border-[#D5E5DF] bg-[#F4F8F6] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B7770]"
            >
              {/* Public screenshots are provided as media assets; no Next Image optimization required. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}

<img
  src={mediaUrl(file)}
  alt={t.images[i].title}
  loading="eager"
  className="h-48 w-full object-contain transition-transform duration-300 group-hover:scale-[1.025] sm:h-52"
/>

            </button>
            <span className="mt-4 inline-block text-[10px] font-bold tracking-wider text-[#0B7770]">{t.screenLabel} · 0{i + 1}</span>
            <h4 className="mt-1 font-bold text-[#19343D]">{t.images[i].title}</h4>
            <p className="mt-2 text-xs leading-6 text-[#617879]">{t.images[i].detail}</p>
          </article>
        ))}
      </div>

      <aside className="mt-6 rounded-2xl border border-[#E7D9C0] bg-[#FBF6EC] p-5 sm:p-6">
        <h3 className="font-extrabold text-[#80633F]">{t.limitsTitle}</h3>
        <p className="mt-2 text-sm leading-7 text-[#665F55]">{t.limits}</p>
      </aside>
      <p className="mt-4 text-xs leading-6 text-[#82938F]">{t.safety}</p>

      {openImage !== null && (
        <div
          role="presentation"
          onMouseDown={(event) => { if (event.target === event.currentTarget) setOpenImage(null); }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071C22]/90 p-3 sm:p-7"
        >
          <div role="dialog" aria-modal="true" aria-label={t.images[openImage].title} className="relative flex max-h-[95dvh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white p-3 shadow-2xl sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-sm font-bold text-[#19343D]">{t.images[openImage].title}</h3>
              <button type="button" autoFocus onClick={() => setOpenImage(null)} className="shrink-0 rounded-full border border-[#D6E5DE] bg-[#F1F7F3] px-4 py-2 text-sm font-bold text-[#0B7770]">{t.close} ×</button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mediaUrl(evidenceImageFiles[openImage])} alt={t.images[openImage].title} className="min-h-0 max-h-[75dvh] w-full object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}

export default function FreeTVCaseStudy() {
  const { language } = useLanguage();
  const he = language === "he";
  const t = copy[language];
  const stats = [report.total, report.passed, report.failed, report.blocked];

  return (
    <main
      id="main-content"
      className="inner-page"
      dir={he ? "rtl" : "ltr"}
    >
      <div className="inner-glow inner-glow--left" aria-hidden="true" />
      <div className="page-content mx-auto w-full max-w-6xl pb-8">
        <Link
          href="/#showcase"
          className="mb-9 inline-flex items-center gap-2 text-sm font-bold text-[#0B7770] transition hover:opacity-70"
        >
          <span aria-hidden="true">{he ? "→" : "←"}</span>
          {t.back}
        </Link>

        <header className="mb-9 grid items-center gap-7 lg:grid-cols-[1.2fr_.8fr]">
          <div className="min-w-0">
            <p className="page-kicker">{t.kicker}</p>
            <h1 className="page-title !max-w-none">
              <span dir="ltr" className="inline-block !text-[#19343D]">{t.heading}</span>{" "}
              <span>{t.headingAccent}</span>
            </h1>
            <p className="page-lead !mb-5 !max-w-3xl">{t.description}</p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-[#BFDCD2] bg-white/80 px-3 py-2 text-xs font-semibold text-[#0B7770]">
                {t.caseStatus}
              </span>
              <span className="rounded-full border border-[#DCE7E2] bg-white/80 px-3 py-2 text-xs font-semibold text-[#637879]">
                {t.environment}
              </span>
            </div>
          </div>

          <div className="glass-surface relative flex min-h-[240px] flex-col items-center justify-center gap-3 overflow-hidden !bg-gradient-to-br from-[#F2F9F4] via-[#D7ECE3] to-[#EDE6D9] p-4 sm:p-5">
            {/* Original project report cover; the video evidence remains in the gallery below. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mediaUrl("report-cover.webp")}
              alt={he ? "שער מסמך הבדיקות המקורי של פרויקט FreeTV" : "Cover of the original FreeTV QA documentation report"}
              className="relative max-h-[220px] w-full max-w-[230px] rounded-lg border border-[#D6E4DC] bg-white object-contain shadow-[0_12px_32px_rgba(18,60,53,0.16)]"
              loading="eager"
            />
            <p className="relative text-center text-[10px] font-bold tracking-wide text-[#375D59]">
              {he ? "שער תיעוד הפרויקט · אפריל–יוני 2026" : "Project documentation cover · Apr–Jun 2026"}
            </p>
          </div>
        </header>

        <section className="glass-surface mb-5 p-5 sm:p-7 md:p-9" aria-labelledby="freetv-results-title">
          <p className="section-index">{t.result}</p>
          <h2 id="freetv-results-title" className="mt-3 text-2xl font-extrabold tracking-tight text-[#19343D] md:text-3xl">
            {t.resultTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#637879] md:text-base">{t.resultIntro}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map((value, i) => (
              <div key={i} className="rounded-2xl border border-[#DCEBE6] bg-white/90 px-4 py-5 text-center">
                <div className="text-3xl font-black tabular-nums text-[#19343D] md:text-4xl">{value}</div>
                <div className="mt-2 text-xs font-bold text-[#637879]">{t.metrics[i]}</div>
              </div>
            ))}
          </div>
          <div className="mt-7">
            <div className="mb-3 text-xs font-bold text-[#456B6A]">{t.execution}</div>
            <PercentageBar passed={report.passed} failed={report.failed} blocked={report.blocked} label={t.execution} />
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-[#637879]">
              {t.resultLegend.map((name, i) => (
                <span key={name} className="inline-flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${i === 0 ? "bg-[#0B7770]" : i === 1 ? "bg-[#C67A50]" : "bg-[#A4B8B4]"}`} />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-11 grid gap-4 md:grid-cols-2" aria-labelledby="freetv-suites-title">
          <div className="glass-surface p-6 md:p-8">
            <p className="section-index" id="freetv-suites-title">{t.suitesLabel}</p>
            <div className="mt-5 space-y-5">
              {suiteData.map((suite, i) => (
                <div key={suite.key}>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="font-bold text-[#19343D]">{t.suiteName[i]}</span>
                    <span className="tabular-nums text-[#637879]" dir="ltr">
                      {suite.passed} / {suite.total}
                    </span>
                  </div>
                  <PercentageBar passed={suite.passed} failed={suite.failed} blocked={suite.blocked} label={t.suiteName[i]} />
                </div>
              ))}
            </div>
          </div>
          <div className="glass-surface flex flex-col justify-center p-6 md:p-8">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E5F3ED] text-2xl text-[#0B7770]" aria-hidden="true">!</div>
            <h3 className="text-xl font-bold text-[#19343D]">{t.suiteName[3]}</h3>
            <p className="mt-3 text-sm leading-7 text-[#637879]">{t.blockedText}</p>
            <p className="mt-5 text-xs font-semibold text-[#0B7770]">{t.scopeNote}</p>
          </div>
        </section>

        <section className="mb-11" aria-labelledby="freetv-strategy-title">
          <p className="section-index">{t.approach}</p>
          <h2 id="freetv-strategy-title" className="mt-3 max-w-4xl text-2xl font-extrabold tracking-tight text-[#19343D] md:text-3xl">
            {t.approachTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#637879] md:text-base">{t.approachIntro}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {t.focus.map((item) => (
              <article key={item.no} className="glass-surface min-w-0 p-6">
                <span className="text-sm font-black text-[#0B7770]" dir="ltr">{item.no}</span>
                <h3 className="mt-4 text-lg font-extrabold text-[#19343D]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#637879]">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-11" aria-labelledby="freetv-findings-title">
          <p className="section-index">{t.issuesLabel}</p>
          <h2 id="freetv-findings-title" className="mt-3 max-w-4xl text-2xl font-extrabold tracking-tight text-[#19343D] md:text-3xl">
            {t.issuesTitle}
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-[#637879] md:text-base">{t.issuesIntro}</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {t.findings.map((finding) => (
              <article key={finding.id} className="glass-surface min-w-0 overflow-hidden p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-xl bg-[#FFF3E8] px-3 py-2 text-sm font-black text-[#A66A3D]" dir="ltr">{finding.id}</span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#A66A3D]">{t.severity}</span>
                </div>
                <p className="mt-6 text-xs font-bold tracking-wide text-[#0B7770]">{finding.category}</p>
                <h3 className="mt-2 text-xl font-extrabold text-[#19343D] md:text-2xl">{finding.title}</h3>
                <div className="mt-5 space-y-4 border-t border-[#E2EBE7] pt-5">
                  <div>
                    <p className="text-xs font-bold text-[#0B7770]">{t.observed}</p>
                    <p className="mt-1 text-sm leading-7 text-[#637879]">{finding.observation}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0B7770]">{t.impact}</p>
                    <p className="mt-1 text-sm leading-7 text-[#637879]">{finding.impact}</p>
                  </div>
                  <p className="text-xs text-[#8A9B96]">{t.requirements}: <span dir="ltr">{finding.requirement}</span></p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10 grid gap-4 md:grid-cols-2">
          <div className="glass-surface p-6 md:p-8">
            <p className="section-index">{t.constraints}</p>
            <h2 className="mt-3 text-xl font-extrabold text-[#19343D] md:text-2xl">{t.constraintsTitle}</h2>
            <ul className="mt-5 space-y-3">
              {t.constraintList.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-7 text-[#637879]">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C4A57B]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-surface p-6 md:p-8">
            <p className="section-index">{t.methods}</p>
            <h2 className="mt-3 text-lg font-extrabold text-[#19343D]">{t.tools}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {toolNames.map((name) => (
                <span key={name} dir="ltr" className="rounded-full border border-[#CDE6DC] bg-[#EAF4EF] px-3 py-2 text-xs font-bold text-[#195D58]">{name}</span>
              ))}
            </div>
            <h2 className="mt-8 text-lg font-extrabold text-[#19343D]">{t.docs}</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {t.docsList.map((doc) => (
                <div key={doc} className="rounded-xl border border-[#DFEAE5] bg-white/80 px-3 py-3 text-xs font-semibold leading-5 text-[#456B6A]">{doc}</div>
              ))}
            </div>
          </div>
        </section>

        <EvidenceGallery language={language} />

        <p className="mx-auto mb-9 max-w-3xl text-center text-xl font-bold leading-relaxed text-[#0B7770] md:text-2xl">{t.closing}</p>
        <div className="page-bottom-actions">
          <Link className="action-btn action-btn--primary" href="/#showcase">
            {t.backAction} <span aria-hidden="true">{he ? "→" : "←"}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}