"use client";

import Link from "next/link";
import { useLanguage } from "../../components/LanguageProvider";

/**
 * FreeTV iOS QA case study.
 * Historical snapshot: STR-FTV-001 (June 2026), app v1.25.32 (build 142).
 * Displayed numbers describe the documented project execution, not current FreeTV quality.
 * No confidential requests, authentication data, or proprietary screenshots are exposed.
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

          <div className="glass-surface relative flex min-h-[240px] flex-col items-center justify-center overflow-hidden !bg-gradient-to-br from-[#F3FBF7] via-[#D6ECE6] to-[#EAE5D9] p-8 text-center">
            <div className="pointer-events-none absolute -right-12 -top-10 h-48 w-48 rounded-full bg-[#A5DED0]/55 blur-3xl" />
            <div className="relative flex h-28 w-48 items-center justify-center rounded-[24px] border-[5px] border-[#244952] bg-gradient-to-br from-[#19343D] to-[#0C776E] shadow-[0_20px_40px_rgba(16,76,69,0.2)]">
              <span className="text-5xl text-white" aria-hidden="true">▶</span>
              <div className="absolute -bottom-3 h-3 w-16 rounded-b-lg bg-[#244952]" />
            </div>
            <p className="relative mt-7 text-sm font-black tracking-[0.16em] text-[#19343D]" dir="ltr">MOBILE · API · QA</p>
            <p className="relative mt-2 max-w-xs text-xs leading-6 text-[#637879]">{t.snapshot}</p>
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

        <section className="glass-surface mb-9 p-6 md:p-9" aria-labelledby="freetv-evidence-title">
          <p className="section-index">{t.evidence}</p>
          <h2 id="freetv-evidence-title" className="mt-3 text-2xl font-extrabold text-[#19343D]">{t.evidenceTitle}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#637879] md:text-base">{t.evidenceText}</p>
        </section>

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
