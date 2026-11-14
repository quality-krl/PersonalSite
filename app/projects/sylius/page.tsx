"use client";

import Link from "next/link";
import { useState } from "react";

import { useLanguage } from "../../components/LanguageProvider";
import { translations } from "../../i18n/translations";
import { ExternalServiceIcon } from "../../components/ExternalServiceLink";

type Language = "en" | "he";

const copy = {
  en: {
    back: "Back to projects",
    label: "PROJECT 01 / QA AUTOMATION",
    status: "Regression verified",
    intro: "A portfolio-ready automation suite for a real e-commerce platform, covering UI journeys, API scenarios, end-to-end checkout and reusable test infrastructure.",
    architectureEyebrow: "INSIDE THE PROJECT",
    architectureTitle: "The architecture behind the checks.",
    architectureIntro: "The diagram maps the tracked automation files into UI and API testing layers with shared support infrastructure. Execution results are presented separately and are backed by the captured regression run.",
    ui: "UI test layer",
    uiBody: "Scenarios for user-facing flows, separated from page-specific interactions.",
    uiScenarios: "UI test modules",
    uiPages: "Page Object modules",
    api: "API test layer",
    apiBody: "Dedicated test modules for products, cart and checkout resources.",
    apiScenarios: "API test modules",
    apiClient: "API support",
    sharedEyebrow: "SHARED FOUNDATIONS",
    sharedTitle: "Reusable infrastructure, separate responsibilities.",
    fixtures: "Fixtures & setup",
    fixturesBody: "Centralized Pytest setup entry point.",
    configuration: "Configuration",
    configurationBody: "Configuration reader and runtime settings files.",
    data: "Test data",
    dataBody: "Separate modules for UI and API data.",
    tooling: "Project tooling",
    toolingBody: "Pytest options and dependency declaration.",
    coverageEyebrow: "TEST ORGANIZATION",
    coverageTitle: "Seven dedicated test modules.",
    coverageIntro: "The repository contains four UI test modules and three API test modules. The verified regression executed 65 scenarios in total: 38 UI scenarios and 27 API scenarios, with 64 passed and 1 expected xfail.",
    uiCount: "UI modules",
    apiCount: "API modules",
    pagesCount: "Page modules",
    stdEyebrow: "TEST DESIGN & TRACEABILITY",
    stdTitle: "From 38 logical scenarios to 65 automated executions.",
    stdBody: "The project STD keeps the design layer readable while mapping parameterized and DDT cases to every automated execution. The workbook includes preconditions, steps, test data, expected results, priorities, verified outcomes and one-to-many traceability.",
    stdLogical: "Logical STD scenarios",
    stdExecutions: "Automated executions",
    stdClasses: "Test classes",
    stdDownload: "Download STD (.xlsx)",
    stdCaption: "38 logical scenarios · 65 executions · 7 test classes · 64 passed · 1 expected xfail",
    proofEyebrow: "EXECUTION & SOURCE EVIDENCE",
    proofTitle: "Explore the evidence library.",
    proofBody: "A curated evidence library combining source excerpts with verified execution results. The regression was captured through Pytest terminal output, Allure reporting and a UI automation showcase video.",
    upcoming: "Published evidence",
    upcomingItems: ["Verified Pytest regression", "UI automation showcase video", "Allure report and reproduced known defect"],
    repo: "View source on GitHub",
    note: "Architecture inventory is based on the tracked repository files. Checkout examples are source excerpts from tests/test_api_checkout.py. Execution figures come from the captured regression: 65 total, 64 passed and 1 expected xfail; the checkout sequencing defect reproduced HTTP 500 instead of the expected HTTP 422.",
    viewProjects: "Explore other projects",
    footer: "Designing tests around meaningful risk, not just test volume.",
  },
  he: {
    back: "חזרה לפרויקטים",
    label: "פרויקט 01 / אוטומציה",
    status: "הרצת Regression אומתה",
    intro: "פרויקט אוטומציה ברמת פורטפוליו למערכת מסחר אלקטרוני אמיתית, הכולל תהליכי UI, תרחישי API, Checkout מקצה לקצה ותשתיות בדיקה לשימוש חוזר.",
    architectureEyebrow: "מאחורי הפרויקט",
    architectureTitle: "הארכיטקטורה שמאחורי הבדיקות.",
    architectureIntro: "התרשים מציג את קובצי האוטומציה במאגר בחלוקה לשכבות UI ו־API ולתשתית משותפת. תוצאות ההרצה מוצגות בנפרד ומבוססות על הרצת ה־Regression שתועדה.",
    ui: "שכבת בדיקות הממשק",
    uiBody: "תרחישים לתהליכי משתמש, תוך הפרדה בין הבדיקות לבין הפעולות בעמודים.",
    uiScenarios: "קובצי בדיקות UI",
    uiPages: "קובצי Page Object",
    api: "שכבת בדיקות API",
    apiBody: "קובצי בדיקה ייעודיים למוצרים, לעגלת הקניות ולתהליך התשלום.",
    apiScenarios: "קובצי בדיקות API",
    apiClient: "תשתית API",
    sharedEyebrow: "תשתיות משותפות",
    sharedTitle: "רכיבים לשימוש חוזר, עם אחריות ברורה.",
    fixtures: "Fixtures ואתחול",
    fixturesBody: "נקודת כניסה מרכזית להגדרות Pytest משותפות.",
    configuration: "תצורה",
    configurationBody: "קריאת הגדרות וקובצי תצורה של סביבת הבדיקות.",
    data: "נתוני בדיקה",
    dataBody: "מודולים נפרדים לנתוני UI ו־API.",
    tooling: "כלי הפרויקט",
    toolingBody: "הגדרות Pytest ורשימת תלויות הפרויקט.",
    coverageEyebrow: "ארגון הבדיקות",
    coverageTitle: "שבעה קובצי בדיקות ייעודיים.",
    coverageIntro: "המאגר כולל ארבעה מודולי בדיקות UI ושלושה מודולי API. בהרצת ה־Regression המאומתת בוצעו 65 תרחישים: 38 תרחישי UI ו־27 תרחישי API, עם 64 שעברו ו־xfail צפוי אחד.",
    uiCount: "קובצי UI",
    apiCount: "קובצי API",
    pagesCount: "קובצי עמודים",
    stdEyebrow: "תכנון בדיקות ו־Traceability",
    stdTitle: "מ־38 תרחישי STD ל־65 הרצות אוטומטיות.",
    stdBody: "מסמך ה־STD שומר על שכבת תכנון קריאה וממפה תרחישי DDT ו־parametrization לכל הרצה אוטומטית. הקובץ כולל תנאים מקדימים, שלבים, נתוני בדיקה, תוצאה צפויה, עדיפות, תוצאות מאומתות ומיפוי מלא בין התכנון לקוד.",
    stdLogical: "תרחישי STD לוגיים",
    stdExecutions: "הרצות אוטומטיות",
    stdClasses: "מחלקות בדיקה",
    stdDownload: "הורדת STD (.xlsx)",
    stdCaption: "38 תרחישים לוגיים · 65 הרצות · 7 מחלקות בדיקה · 64 עברו · xfail צפוי אחד",
    proofEyebrow: "ראיות הרצה וקוד מקור",
    proofTitle: "גלריית הראיות של הפרויקט.",
    proofBody: "גלריית ראיות המשלבת מקטעי קוד עם תוצאות הרצה מאומתות. ה־Regression תועד באמצעות פלט Pytest, דוח Allure וסרטון Showcase של אוטומציית ה־UI.",
    upcoming: "ראיות שפורסמו",
    upcomingItems: ["הרצת Pytest מאומתת", "סרטון Showcase של אוטומציית UI", "דוח Allure ושחזור התקלה הידועה"],
    repo: "צפייה בקוד ב־GitHub",
    note: "מפת הקבצים מבוססת על קובצי המאגר. דוגמאות ה־Checkout הן מקטעי מקור מתוך tests/test_api_checkout.py. נתוני ההרצה מבוססים על ה־Regression שתועד: 65 תרחישים, 64 עברו ו־xfail צפוי אחד; בתקלה הידועה שוחזרה תגובת HTTP 500 במקום HTTP 422 הצפוי.",
    viewProjects: "לפרויקטים נוספים",
    footer: "בדיקות שממוקדות בסיכון משמעותי, ולא רק בכמות.",
  },
} satisfies Record<Language, Record<string, string | readonly string[]>>;

const uiTestFiles = [
  "tests/test_login.py",
  "tests/test_registration.py",
  "tests/test_cart.py",
  "tests/test_checkout.py",
];

const pageFiles = [
  "pages/base_page.py",
  "pages/home_page.py",
  "pages/login_page.py",
  "pages/register_page.py",
  "pages/account_page.py",
  "pages/product_page.py",
  "pages/cart_page.py",
  "pages/checkout_page.py",
];

const apiTestFiles = [
  "tests/test_api_products.py",
  "tests/test_api_cart.py",
  "tests/test_api_checkout.py",
];

const sharedFiles = [
  { key: "fixtures", files: ["conftest.py"] },
  { key: "configuration", files: ["config/config_reader.py", "config/config.ini"] },
  { key: "data", files: ["test_data/login_data.py", "test_data/api_data.py"] },
  { key: "tooling", files: ["pytest.ini", "requirements.txt"] },
] as const;

function FileTags({ files }: { files: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-2" dir="ltr">
      {files.map((file) => (
        <code
          key={file}
          className="inline-block max-w-full break-all rounded-lg border border-[#D1E5DE] bg-white/80 px-2.5 py-1.5 text-[11px] font-medium leading-5 text-[#2A565A] shadow-sm sm:text-xs"
        >
          {file}
        </code>
      ))}
    </div>
  );
}

function Track({
  number,
  heading,
  description,
  testsLabel,
  tests,
  supportLabel,
  support,
}: {
  number: string;
  heading: string;
  description: string;
  testsLabel: string;
  tests: readonly string[];
  supportLabel: string;
  support: readonly string[];
}) {
  return (
    <article className="glass-surface flex min-w-0 flex-col gap-5 p-5 sm:p-7">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#DAEEE9] text-sm font-bold text-[#0B7770]">
          {number}
        </span>
        <div className="min-w-0">
          <h3 className="text-xl font-bold tracking-tight text-[#19343D]">{heading}</h3>
          <p className="mt-2 text-sm leading-7 text-[#637879]">{description}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#D9E9E1] bg-[#F8FBF8] p-4">
        <p className="mb-3 text-xs font-bold tracking-wide text-[#0B7770]">{testsLabel}</p>
        <FileTags files={tests} />
      </div>

      <div className="flex justify-center text-[#B39A73]" aria-hidden="true">
        <svg viewBox="0 0 24 36" fill="none" className="h-8 w-6">
          <path d="M12 2v27m0 0-6-6m6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="rounded-2xl border border-[#C7DFD6] bg-[#EAF4EE] p-4">
        <p className="mb-3 text-xs font-bold tracking-wide text-[#0B7770]">{supportLabel}</p>
        <FileTags files={support} />
      </div>
    </article>
  );
}



type StdExampleKey = "login" | "email" | "sequence";

const stdExampleKeys: StdExampleKey[] = ["login", "email", "sequence"];

const stdExamplesCopy = {
  en: {
    eyebrow: "SELECTED STD EXAMPLES",
    title: "Three scenarios that show how the suite was designed.",
    intro: "Select a scenario to inspect the test-design record behind the automation. These examples intentionally cover DDT, negative UI validation and API sequencing/defect handling.",
    openHint: "Select a scenario",
    labels: {
      preconditions: "Preconditions",
      steps: "Test steps",
      data: "Test data",
      expected: "Expected result",
      mapping: "Automation mapping",
      result: "Verified result",
    },
    scenarios: {
      login: {
        id: "STD-UI-LGN-001",
        layer: "UI · LOGIN · DDT",
        title: "Accepted username normalization",
        summary: "One logical STD scenario expands into four automated executions for valid username variants.",
        preconditions: "A registered test account exists and the login page is available.",
        steps: [
          "Open the home page and navigate to Login.",
          "Enter a valid username variant.",
          "Enter the valid password.",
          "Submit the login form.",
        ],
        data: "valid username · leading space · trailing space · uppercase username",
        expected: "Authentication succeeds and the Logout control is visible.",
        mapping: "tests/test_login.py::TestLoginPage::test_login_valid",
        result: "PASS · 4 executions",
      },
      email: {
        id: "STD-UI-REG-005",
        layer: "UI · REGISTRATION · NEGATIVE DDT",
        title: "Reject invalid email formats",
        summary: "Five invalid email datasets verify the registration boundary with one parameterized test design.",
        preconditions: "The registration page is available.",
        steps: [
          "Open Registration.",
          "Fill valid identity and password fields.",
          "Enter the parameterized invalid email value.",
          "Submit the registration form.",
        ],
        data: "test · test@ · test@.com · test@@gmail.com · @gmail.com",
        expected: "Registration is blocked and the email error contains “This email is invalid.”",
        mapping: "tests/test_registration.py::TestRegistration::test_register_invalid_email_format",
        result: "PASS · 5 executions",
      },
      sequence: {
        id: "STD-API-CHK-003",
        layer: "API · CHECKOUT · SEQUENCE",
        title: "Payment cannot be selected before shipping",
        summary: "A state-sequencing negative test exposes the suite's single reproduced known defect.",
        preconditions: "The cart contains an item, valid addresses are applied and shipping has not been selected.",
        steps: [
          "Add an item to the cart.",
          "PUT valid checkout addresses.",
          "PATCH the payment method before selecting shipping.",
        ],
        data: "API-provided payment method before shipping selection",
        expected: "Controlled HTTP 422 rejection. Verified Sylius behavior returned HTTP 500 instead.",
        mapping: "tests/test_api_checkout.py::TestCheckoutApi::test_cannot_select_payment_before_shipping",
        result: "XFAIL · expected 422 / actual 500",
      },
    },
  },
  he: {
    eyebrow: "דוגמאות נבחרות מתוך ה־STD",
    title: "שלושה תרחישים שממחישים איך תוכננה חבילת הבדיקות.",
    intro: "בחרו תרחיש כדי לראות את רשומת ה־STD שמאחורי האוטומציה. הדוגמאות נבחרו בכוונה כדי להציג DDT, בדיקת ולידציה שלילית ב־UI ובדיקת סדר מצבים ב־API עם טיפול בתקלה מתועדת.",
    openHint: "בחרו תרחיש",
    labels: {
      preconditions: "תנאים מקדימים",
      steps: "שלבי הבדיקה",
      data: "נתוני בדיקה",
      expected: "תוצאה צפויה",
      mapping: "מיפוי לאוטומציה",
      result: "תוצאה מאומתת",
    },
    scenarios: {
      login: {
        id: "STD-UI-LGN-001",
        layer: "UI · LOGIN · DDT",
        title: "Normalization תקין של שם משתמש",
        summary: "תרחיש STD לוגי אחד מתרחב לארבע הרצות אוטומטיות עם וריאציות תקינות של שם המשתמש.",
        preconditions: "קיים חשבון בדיקה רשום ועמוד ההתחברות זמין.",
        steps: [
          "פתיחת דף הבית ומעבר לעמוד Login.",
          "הזנת וריאציה תקינה של שם המשתמש.",
          "הזנת הסיסמה התקינה.",
          "שליחת טופס ההתחברות.",
        ],
        data: "שם משתמש תקין · רווח בתחילת הערך · רווח בסוף הערך · אותיות גדולות",
        expected: "ההתחברות מצליחה וכפתור Logout מוצג.",
        mapping: "tests/test_login.py::TestLoginPage::test_login_valid",
        result: "PASS · 4 הרצות",
      },
      email: {
        id: "STD-UI-REG-005",
        layer: "UI · REGISTRATION · NEGATIVE DDT",
        title: "דחיית פורמטים לא תקינים של Email",
        summary: "חמישה ערכי Email לא תקינים בודקים את גבול הוולידציה באמצעות תכנון parameterized אחד.",
        preconditions: "עמוד ההרשמה זמין.",
        steps: [
          "פתיחת Registration.",
          "מילוי פרטי זהות וסיסמה תקינים.",
          "הזנת ערך Email לא תקין מתוך ה־dataset.",
          "שליחת טופס ההרשמה.",
        ],
        data: "test · test@ · test@.com · test@@gmail.com · @gmail.com",
        expected: "ההרשמה נחסמת ומוצגת הודעת השגיאה “This email is invalid.”",
        mapping: "tests/test_registration.py::TestRegistration::test_register_invalid_email_format",
        result: "PASS · 5 הרצות",
      },
      sequence: {
        id: "STD-API-CHK-003",
        layer: "API · CHECKOUT · SEQUENCE",
        title: "אי אפשר לבחור תשלום לפני בחירת משלוח",
        summary: "בדיקה שלילית של סדר המצבים חשפה את התקלה הידועה היחידה ששוחזרה בחבילת הבדיקות.",
        preconditions: "העגלה מכילה פריט, הוגדרו כתובות תקינות ועדיין לא נבחרה שיטת משלוח.",
        steps: [
          "הוספת פריט לעגלה.",
          "שליחת PUT עם כתובות Checkout תקינות.",
          "שליחת PATCH לבחירת תשלום לפני בחירת משלוח.",
        ],
        data: "Payment method שהתקבל מה־API לפני בחירת shipping",
        expected: "דחייה מבוקרת עם HTTP 422. בפועל Sylius החזיר HTTP 500.",
        mapping: "tests/test_api_checkout.py::TestCheckoutApi::test_cannot_select_payment_before_shipping",
        result: "XFAIL · expected 422 / actual 500",
      },
    },
  },
} as const;

function StdExamples({ language }: { language: Language }) {
  const [active, setActive] = useState<StdExampleKey>("login");
  const t = stdExamplesCopy[language];
  const item = t.scenarios[active];
  const knownIssue = active === "sequence";

  return (
    <div className="mt-9 border-t border-[#D5E5DE] pt-8">
      <p className="text-[11px] font-extrabold tracking-[0.14em] text-[#0B7770]">{t.eyebrow}</p>
      <h3 className="mt-2 max-w-3xl text-xl font-bold leading-snug text-[#19343D] sm:text-2xl">{t.title}</h3>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-[#637879]">{t.intro}</p>
      <p className="mt-6 mb-3 text-xs font-bold tracking-wide text-[#0B7770]">{t.openHint}</p>

      <div className="grid gap-3 md:grid-cols-3">
        {stdExampleKeys.map((key) => {
          const scenario = t.scenarios[key];
          const chosen = active === key;
          const defect = key === "sequence";

          return (
            <button
              key={key}
              type="button"
              aria-pressed={chosen}
              onClick={() => setActive(key)}
              className={`min-w-0 rounded-2xl border p-4 text-start transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B7770] ${
                chosen
                  ? defect
                    ? "border-[#B7845D] bg-[#FBF4EA] shadow-[0_8px_26px_rgba(145,95,55,.10)]"
                    : "border-[#0B7770] bg-[#EAF5EF] shadow-[0_8px_26px_rgba(19,89,81,.10)]"
                  : "border-[#D3E4DC] bg-white/80 hover:border-[#86B5A7] hover:bg-[#F7FBF8]"
              }`}
            >
              <div className="flex items-start justify-between gap-3" dir="ltr">
                <code className={`text-[10px] font-bold ${defect ? "text-[#99623D]" : "text-[#0B7770]"}`}>{scenario.id}</code>
                <span className={`rounded-full px-2 py-1 text-[9px] font-extrabold tracking-wide ${
                  defect ? "bg-[#F3E2CF] text-[#8D5E3B]" : "bg-[#DCEFE7] text-[#0B7770]"
                }`}>
                  {defect ? "XFAIL" : "PASS"}
                </span>
              </div>
              <p className="mt-4 text-[10px] font-bold tracking-wide text-[#7A8E89]" dir="ltr">{scenario.layer}</p>
              <span className="mt-1 block text-sm font-bold leading-6 text-[#19343D]">{scenario.title}</span>
              <p className="mt-2 text-xs leading-5 text-[#637879]">{scenario.summary}</p>
            </button>
          );
        })}
      </div>

      <article
        className={`mt-4 overflow-hidden rounded-[22px] border bg-white ${knownIssue ? "border-[#D7B791]" : "border-[#C9DED4]"}`}
        aria-live="polite"
      >
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className={`p-5 sm:p-7 ${knownIssue ? "bg-[#FBF4EA]" : "bg-[#F2F8F4]"}`}>
            <div className="flex flex-wrap items-center gap-2" dir="ltr">
              <code className={`text-xs font-extrabold ${knownIssue ? "text-[#95603A]" : "text-[#0B7770]"}`}>{item.id}</code>
              <span className={`rounded-full px-2.5 py-1 text-[9px] font-extrabold tracking-wide ${knownIssue ? "bg-[#EFDCC6] text-[#8D5E3B]" : "bg-[#D9EEE6] text-[#0B7770]"}`}>
                {item.layer}
              </span>
            </div>
            <h4 className="mt-4 text-xl font-bold leading-snug text-[#19343D]">{item.title}</h4>
            <p className="mt-3 text-sm leading-7 text-[#526E70]">{item.summary}</p>

            <div className="mt-5 rounded-xl border border-white/80 bg-white/80 p-4">
              <p className="text-xs font-bold text-[#0B7770]">{t.labels.preconditions}</p>
              <p className="mt-2 text-sm leading-6 text-[#425F60]">{item.preconditions}</p>
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <div>
              <p className="text-xs font-bold text-[#0B7770]">{t.labels.steps}</p>
              <ol className="mt-3 space-y-2">
                {item.steps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm leading-6 text-[#526E70]">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8F3EE] text-[10px] font-bold text-[#0B7770]" dir="ltr">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-[#DDE9E3] bg-[#FAFCFA] p-4">
                <p className="text-xs font-bold text-[#0B7770]">{t.labels.data}</p>
                <p className="mt-2 text-xs leading-6 text-[#526E70]" dir="auto">{item.data}</p>
              </div>
              <div className={`rounded-xl border p-4 ${knownIssue ? "border-[#E4C9A9] bg-[#FFF9F1]" : "border-[#DDE9E3] bg-[#FAFCFA]"}`}>
                <p className={`text-xs font-bold ${knownIssue ? "text-[#94603B]" : "text-[#0B7770]"}`}>{t.labels.expected}</p>
                <p className="mt-2 text-xs leading-6 text-[#526E70]">{item.expected}</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-[#142D33] p-4" dir="ltr">
              <p className="text-[10px] font-bold tracking-wide text-[#95D7C2]">{t.labels.mapping}</p>
              <code className="mt-2 block break-all text-[11px] leading-5 text-[#D7F0E7]">{item.mapping}</code>
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/15 pt-3">
                <span className="text-[10px] font-bold tracking-wide text-[#A8C2BE]">{t.labels.result}</span>
                <span className={`text-[11px] font-extrabold ${knownIssue ? "text-[#F0C891]" : "text-[#92D6C1]"}`}>{item.result}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

// Exact excerpts from tests/test_api_checkout.py supplied by the project author.
// These are expectations from test code, not test-run results.
type CheckoutScenarioKey = "happy" | "shipping" | "sequence" | "payment";

const checkoutScenarioKeys: CheckoutScenarioKey[] = [
  "happy",
  "shipping",
  "sequence",
  "payment",
];

const checkoutTestFunctions: Record<CheckoutScenarioKey, string> = {
  happy: "test_select_shipping_and_payment",
  shipping: "test_invalid_shipping_method",
  sequence: "test_cannot_select_payment_before_shipping",
  payment: "test_invalid_payment_method",
};

const checkoutCode: Record<CheckoutScenarioKey, string> = {
  happy: `shipping_response = api_client.patch(shipment_endpoint, shipping_payload)
assert shipping_response.status_code == HTTPStatus.OK

shipping_body = shipping_response.json()
assert shipping_body["checkoutState"] == "shipping_selected"

payment = shipping_body["payments"][0]
payment_id = payment["id"]
payment_method = payment["method"]
payment_endpoint = f"shop/orders/{cart_token}/payments/{payment_id}"
payment_payload = {
    "paymentMethod": payment_method
}
payment_response = api_client.patch(payment_endpoint, payment_payload)
assert payment_response.status_code == HTTPStatus.OK

payment_body = payment_response.json()
assert payment_body["checkoutState"] == "payment_selected"`,
  shipping: `shipment_endpoint = f"{order_endpoint}/shipments/{shipment_id}"
shipping_payload = {
    "shippingMethod": "/api/v2/shop/shipping-methods/invalid_method"
}
shipping_response = api_client.patch(shipment_endpoint, shipping_payload)
assert shipping_response.status_code == HTTPStatus.UNPROCESSABLE_ENTITY`,
  sequence: `payment = address_body["payments"][0]
payment_id = payment["id"]
payment_method = payment["method"]
payment_endpoint = f"{order_endpoint}/payments/{payment_id}"
payment_payload = {
    "paymentMethod": payment_method
}
payment_response = api_client.patch(payment_endpoint, payment_payload)
assert payment_response.status_code == HTTPStatus.UNPROCESSABLE_ENTITY`,
  payment: `payment_endpoint = f"{order_endpoint}/payments/{payment_id}"
payment_payload = {"paymentMethod": "/api/v2/shop/payment-methods/invalid_method"}
payment_response = api_client.patch(payment_endpoint, payment_payload)
assert payment_response.status_code == HTTPStatus.UNPROCESSABLE_ENTITY`,
};

const checkoutCopy = {
  en: {
    eyebrow: "INSIDE THE TEST / API CHECKOUT",
    title: "From a request to a verified state.",
    intro: "Four test functions from tests/test_api_checkout.py: one expected checkout progression and three negative or ordering scenarios. The excerpts show the assertions in source; the verified regression results are presented in the evidence section below.",
    flowTitle: "Expected checkout progression",
    flow: [
      { title: "Add item", detail: "POST · 201" },
      { title: "Set addresses", detail: "PUT · 200 · addressed" },
      { title: "Select shipping", detail: "PATCH · 200 · shipping_selected" },
      { title: "Select payment", detail: "PATCH · 200 · payment_selected" },
    ],
    flowNote: "The test also retrieves the cart with GET (200). Reaching payment_selected is not proof that an order was completed or paid.",
    choose: "Choose a checkout test example",
    source: "Source file",
    excerpt: "Verbatim excerpt · Python / Pytest",
    expected: "What the assertion checks",
    risk: "Why this matters",
    notesTitle: "Known defect documented in the test",
    notes: "The payment-before-shipping test expects HTTP 422 and is marked @pytest.mark.xfail(strict=False). In the verified regression, the scenario reproduced HTTP 500 instead of a controlled 4xx response, so it remained the single expected xfail. With strict=False, an unexpected pass (XPASS) would not fail the suite.",
    scenarios: {
      happy: {
        short: "Valid checkout",
        title: "Valid shipping and payment selection",
        marker: "Positive path",
        expected: "Checks HTTP 201/200 along the flow and asserts addressed → shipping_selected → payment_selected.",
        risk: "A checkout can return a successful HTTP response yet remain in the wrong state. State assertions check more than transport success.",
      },
      shipping: {
        short: "Invalid shipping",
        title: "Reject an invalid shipping method",
        marker: "Negative path · expects 422",
        expected: "A PATCH containing an invalid shipping-method resource is expected to return 422 Unprocessable Entity.",
        risk: "Invalid shipping methods should not silently advance an order or cause uncontrolled server errors.",
      },
      sequence: {
        short: "Wrong order",
        title: "Payment before shipping is selected",
        marker: "Known issue · xfail",
        expected: "The test asserts HTTP 422 for an out-of-sequence payment-method PATCH. Its xfail reason documents a reported HTTP 500.",
        risk: "A state-machine violation should be rejected predictably, not fail as an internal server error.",
      },
      payment: {
        short: "Invalid payment",
        title: "Reject an invalid payment method",
        marker: "Negative path · expects 422",
        expected: "After shipping selection, an invalid payment-method resource is expected to return 422.",
        risk: "Protect the payment-selection boundary against invalid references and uncontrolled state transitions.",
      },
    },
  },
  he: {
    eyebrow: "מבט לתוך הבדיקה / API CHECKOUT",
    title: "מקריאת API לאימות מצב המערכת.",
    intro: "ארבע פונקציות בדיקה מתוך tests/test_api_checkout.py: מסלול תקין ושלושה תרחישים שליליים או בדיקות סדר פעולות. המקטעים מציגים את האימותים בקוד, ותוצאות ה־Regression המאומתות מוצגות בהמשך באזור הראיות.",
    flowTitle: "רצף המצבים הצפוי",
    flow: [
      { title: "הוספת פריט", detail: "POST · 201" },
      { title: "הגדרת כתובות", detail: "PUT · 200 · addressed" },
      { title: "בחירת משלוח", detail: "PATCH · 200 · shipping_selected" },
      { title: "בחירת תשלום", detail: "PATCH · 200 · payment_selected" },
    ],
    flowNote: "הבדיקה מבצעת גם GET לעגלה ומצפה ל־200. מצב payment_selected אינו הוכחה שהזמנה הושלמה או שבוצע חיוב.",
    choose: "בחירת דוגמת בדיקת Checkout",
    source: "קובץ מקור",
    excerpt: "מקטע קוד מקורי · Python / Pytest",
    expected: "מה בודק האימות",
    risk: "למה הבדיקה חשובה",
    notesTitle: "תקלה ידועה שמתועדת בקוד",
    notes: "בדיקת תשלום לפני משלוח מצפה ל־HTTP 422 ומסומנת ב־@pytest.mark.xfail(strict=False). בהרצת ה־Regression המאומתת התרחיש שיחזר HTTP 500 במקום שגיאת 4xx מבוקרת, ולכן נשאר ה־xfail הצפוי היחיד. עם strict=False, גם XPASS לא היה מכשיל את החבילה.",
    scenarios: {
      happy: {
        short: "תהליך תקין",
        title: "בחירת משלוח ותשלום בסדר הנכון",
        marker: "תרחיש חיובי",
        expected: "בדיקת קודי HTTP 201/200 לאורך התהליך ואימות המעבר addressed → shipping_selected → payment_selected.",
        risk: "גם אם שרת מחזיר קוד הצלחה, מצב ההזמנה עלול להיות שגוי. אימות המצבים בודק מעבר להצלחת הבקשה עצמה.",
      },
      shipping: {
        short: "משלוח שגוי",
        title: "דחיית שיטת משלוח לא תקינה",
        marker: "תרחיש שלילי · צפוי 422",
        expected: "הבדיקה מצפה ל־422 Unprocessable Entity כאשר נשלח PATCH עם הפניה לשיטת משלוח שאינה קיימת.",
        risk: "שיטת משלוח לא תקינה לא אמורה להתקבל או לגרום לשגיאת שרת בלתי מבוקרת.",
      },
      sequence: {
        short: "סדר שגוי",
        title: "בחירת תשלום לפני בחירת משלוח",
        marker: "תקלה ידועה · xfail",
        expected: "הבדיקה מצפה ל־422 עבור PATCH שלא לפי סדר המצבים. בנימוק ה־xfail מתועדת תגובת 500.",
        risk: "הפרת סדר הפעולות אמורה לקבל דחייה צפויה ולא להסתיים בשגיאת שרת פנימית.",
      },
      payment: {
        short: "תשלום שגוי",
        title: "דחיית אמצעי תשלום לא תקין",
        marker: "תרחיש שלילי · צפוי 422",
        expected: "לאחר בחירת משלוח, הבדיקה מצפה ל־422 עבור הפניה לאמצעי תשלום שאינו קיים.",
        risk: "יש להגן על בחירת התשלום מפני הפניות לא תקינות ושינויי מצב לא מבוקרים.",
      },
    },
  },
} as const;

function CheckoutEvidence({ language }: { language: Language }) {
  const [selected, setSelected] = useState<CheckoutScenarioKey>("happy");
  const t = checkoutCopy[language];
  const item = t.scenarios[selected];

  return (
    <section aria-labelledby="sylius-inside-test" className="mb-12">
      <p className="section-index">{t.eyebrow}</p>
      <h2 id="sylius-inside-test" className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-[#19343D] md:text-4xl">
        {t.title}
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-[#637879]">{t.intro}</p>

      <div className="glass-surface mt-7 p-5 sm:p-7">
        <h3 className="mb-5 text-sm font-bold text-[#19343D]">{t.flowTitle}</h3>
        <ol className="grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 xl:grid-cols-4">
          {t.flow.map((step, i) => (
            <li key={step.detail} className="rounded-2xl border border-[#D3E6DC] bg-[#F1F8F3] px-4 py-4">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0B7770] text-xs font-bold text-white" dir="ltr">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 font-bold text-[#19343D]">{step.title}</p>
              <p dir="ltr" className="mt-1 text-left font-mono text-[10px] font-semibold text-[#0B7770] sm:text-xs">{step.detail}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs leading-6 text-[#637879]">{t.flowNote}</p>
      </div>

      <div className="mt-5 overflow-hidden rounded-[26px] border border-[#C9DFD7] bg-white/90 shadow-[0_20px_60px_rgba(26,75,71,.09)]">
        <div className="border-b border-[#D9E9E1] px-4 py-5 sm:px-7">
          <p className="mb-4 text-xs font-bold text-[#0B7770]">{t.choose}</p>
          <div className="flex flex-wrap gap-2">
            {checkoutScenarioKeys.map((key, i) => (
              <button
                key={key}
                type="button"
                aria-pressed={selected === key}
                onClick={() => setSelected(key)}
                className={`rounded-full border px-4 py-2.5 text-xs font-bold transition-colors sm:text-sm ${
                  selected === key
                    ? "border-[#0B7770] bg-[#0B7770] text-white"
                    : "border-[#D3E6DC] bg-[#F7FAF7] text-[#426260] hover:border-[#0B7770]"
                }`}
              >
                <span className="me-2 opacity-70" dir="ltr">0{i + 1}</span>
                {t.scenarios[key].short}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.13fr)]">
          <div className="min-w-0 p-5 sm:p-7">
            <span className={`inline-flex rounded-full border px-3 py-1.5 text-[11px] font-bold ${
              selected === "sequence"
                ? "border-[#EAD6B9] bg-[#FBF2E7] text-[#90613A]"
                : "border-[#BFDCCE] bg-[#EAF5EE] text-[#0B7770]"
            }`}>{item.marker}</span>
            <h3 className="mt-5 text-xl font-bold leading-snug text-[#19343D] sm:text-2xl">{item.title}</h3>
            <h4 className="mt-6 mb-2 text-xs font-extrabold text-[#0B7770]">{t.expected}</h4>
            <p className="text-sm leading-7 text-[#536F71]">{item.expected}</p>
            <h4 className="mt-6 mb-2 text-xs font-extrabold text-[#0B7770]">{t.risk}</h4>
            <p className="text-sm leading-7 text-[#536F71]">{item.risk}</p>
          </div>

          <div dir="ltr" className="min-w-0 bg-[#142D33] p-4 text-left text-[#E4F5EE] sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-4">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#C88785]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#D8B67A]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#65B7A5]" />
              </div>
              <span className="font-mono text-[11px] text-[#A4C1BD]">tests/test_api_checkout.py</span>
            </div>
            <p className="mb-3 font-mono text-[11px] font-semibold text-[#92D6C1] break-all">{checkoutTestFunctions[selected]}</p>
            <p className="mb-3 text-[11px] text-[#A4C1BD]">{t.excerpt}</p>
            <pre className="max-h-[450px] w-full overflow-auto rounded-xl bg-[#0C2228] p-4 text-[11px] leading-6 text-[#D7F0E7] sm:text-xs">
              <code>{checkoutCode[selected]}</code>
            </pre>
            <p className="mt-3 text-xs text-[#A8C2BE]">{t.source}: <span className="font-mono">tests/test_api_checkout.py</span></p>
          </div>
        </div>
      </div>

      <aside className="mt-5 rounded-2xl border border-[#E8D6BE] bg-[#FBF6ED] px-5 py-5 sm:px-7" aria-label={t.notesTitle}>
        <h3 className="text-sm font-bold text-[#90613A]">{t.notesTitle}</h3>
        <p className="mt-2 text-sm leading-7 text-[#6B645A]">{t.notes}</p>
      </aside>
    </section>
  );
}


// Evidence library: source excerpts plus verified runtime evidence.
type GalleryKey = "state" | "validation" | "knownIssue" | "execution";

const galleryKeys: readonly GalleryKey[] = ["state", "validation", "knownIssue", "execution"];
const gallerySourceUrl = "https://github.com/quality-krl/sylius-automation/blob/main/tests/test_api_checkout.py";

const galleryContent = {
  en: {
    selectionLabel: "SELECT AN ARTIFACT",
    artifactLabel: "Project evidence",
    codeSource: "Open test source",
    noReport: "Verified regression execution",
    noReportBody: "65 automated scenarios were executed across UI and API coverage: 64 passed and 1 completed as an expected xfail.",
    noReportDetail: "The regression was captured with Pytest terminal output and Allure reporting. The expected xfail reproduces the known checkout sequencing defect: expected HTTP 422, actual HTTP 500.",
    snippetLabel: "Source excerpt · Python",
    infoLabel: "What this demonstrates",
    caveatLabel: "Evidence boundary",
    caveat: "The published execution evidence reflects the captured regression run. The payment-before-shipping scenario remains intentionally marked xfail because Sylius returned HTTP 500 instead of the expected controlled HTTP 422 response.",
    cards: {
      state: {
        category: "01 · STATE ASSERTIONS",
        short: "Checkout states",
        title: "Verify the checkout state, not only HTTP 200.",
        summary: "The test checks shipping_selected and payment_selected after the corresponding PATCH requests.",
        takeaway: "A successful HTTP status does not, by itself, prove that checkout progressed correctly.",
        preview: "200  /  shipping_selected",
        status: "SOURCE CODE",
      },
      validation: {
        category: "02 · NEGATIVE VALIDATION",
        short: "Invalid shipping",
        title: "Reject an invalid shipping method predictably.",
        summary: "A negative test sends an invalid shipping-method reference and expects HTTP 422.",
        takeaway: "This guards the input-validation boundary; the scenario passed in the verified regression.",
        preview: "PATCH  →  EXPECT 422",
        status: "SOURCE CODE",
      },
      knownIssue: {
        category: "03 · KNOWN ISSUE",
        short: "Wrong sequence",
        title: "Payment before shipping: expected 422, reproduced 500.",
        summary: "The payment-before-shipping scenario expects a controlled rejection. The verified regression reproduced HTTP 500 instead.",
        takeaway: "The reproduced deviation is kept visible as an expected xfail instead of being hidden from the regression result.",
        preview: "EXPECTED 422  /  ACTUAL 500",
        status: "VERIFIED DEFECT",
      },
      execution: {
        category: "04 · VERIFIED EXECUTION",
        short: "Regression report",
        title: "64 passed · 1 expected xfail",
        summary: "The complete automated regression contains 65 UI and API scenarios, captured through Pytest and Allure.",
        takeaway: "The suite demonstrates both successful regression coverage and transparent handling of a reproducible known defect.",
        preview: "65 TOTAL  /  64 PASSED  /  1 XFAIL",
        status: "VERIFIED RUN",
      },
    },
  },
  he: {
    selectionLabel: "בחרו ראיה לצפייה",
    artifactLabel: "ראיית פרויקט",
    codeSource: "פתיחת קובץ הבדיקה",
    noReport: "הרצת Regression מאומתת",
    noReportBody: "בוצעו 65 תרחישי אוטומציה בכיסוי UI ו-API: 64 עברו בהצלחה ותרחיש אחד הסתיים כ-xfail צפוי.",
    noReportDetail: "ההרצה תועדה באמצעות פלט Pytest ודוח Allure. ה-xfail משחזר את התקלה הידועה בסדר פעולות ה-Checkout: ציפייה ל-HTTP 422 מול תגובת HTTP 500 בפועל.",
    snippetLabel: "מקטע מקוד המקור · Python",
    infoLabel: "מה הראיה מדגימה",
    caveatLabel: "מגבלות הראיה",
    caveat: "ראיות ההרצה המוצגות מבוססות על הרצת ה-Regression שתועדה. תרחיש תשלום לפני בחירת משלוח נשאר מסומן בכוונה כ-xfail משום ש-Sylius החזיר HTTP 500 במקום דחייה מבוקרת מסוג HTTP 422.",
    cards: {
      state: {
        category: "01 · אימות מצב",
        short: "מצבי Checkout",
        title: "לא מסתפקים בקוד HTTP — בודקים גם מצב מערכת.",
        summary: "הבדיקה מאמתת את המצבים shipping_selected ו־payment_selected לאחר בקשות PATCH מתאימות.",
        takeaway: "תגובת HTTP מוצלחת לבדה אינה מוכיחה שתהליך התשלום התקדם למצב הנכון.",
        preview: "200  /  shipping_selected",
        status: "קוד מקור",
      },
      validation: {
        category: "02 · בדיקה שלילית",
        short: "משלוח שגוי",
        title: "דחייה מבוקרת של שיטת משלוח לא תקינה.",
        summary: "בדיקה שלילית שולחת הפניה לשיטת משלוח לא קיימת ומצפה לתגובת HTTP 422.",
        takeaway: "התרחיש בודק את גבול אימות הקלט ועבר בהרצת ה־Regression המאומתת.",
        preview: "PATCH  →  EXPECT 422",
        status: "קוד מקור",
      },
      knownIssue: {
        category: "03 · תקלה מתועדת",
        short: "סדר פעולות",
        title: "תשלום לפני משלוח: ציפייה ל־422 ושחזור 500.",
        summary: "הבדיקה מצפה לדחייה מבוקרת של פעולה שלא לפי סדר המצבים. בהרצת ה־Regression המאומתת שוחזרה תגובת HTTP 500.",
        takeaway: "החריגה ששוחזרה נשארת גלויה כ־xfail צפוי במקום להסתיר אותה מתוצאת ה־Regression.",
        preview: "EXPECTED 422  /  ACTUAL 500",
        status: "תקלה מאומתת",
      },
      execution: {
        category: "04 · הרצה מאומתת",
        short: "דוח Regression",
        title: "64 עברו · 1 xfail צפוי",
        summary: "הרצת האוטומציה המלאה כוללת 65 תרחישי UI ו-API שתועדו באמצעות Pytest ו-Allure.",
        takeaway: "ההרצה מציגה גם כיסוי Regression מוצלח וגם טיפול שקוף בתקלה ידועה שניתנת לשחזור.",
        preview: "65 TOTAL  /  64 PASSED  /  1 XFAIL",
        status: "הרצה מאומתת",
      },
    },
  },
} as const;

function EvidenceGallery({ language }: { language: Language }) {
  const [active, setActive] = useState<GalleryKey>("state");
  const t = galleryContent[language];
  const item = t.cards[active];
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  const code =
    active === "state" ? checkoutCode.happy :
    active === "validation" ? checkoutCode.shipping : null;

  const executionEvidence = [
    {
      src: `${basePath}/media/sylius/evidence/allure-api-full.png`,
      label: language === "he" ? "דוח Allure של הרצת ה־API" : "Allure API regression report",
    },
    {
      src: `${basePath}/media/sylius/evidence/api-terminal-showcase.png`,
      label: language === "he" ? "פלט Pytest מהטרמינל" : "Pytest terminal execution",
    },
  ];

  const defectEvidence = {
    src: `${basePath}/media/sylius/evidence/allure-known-defect.png`,
    label: language === "he" ? "תקלה ידועה מתועדת ב־Allure" : "Known defect captured in Allure",
  };

  return (
    <div className="mt-7">
      <p className="mb-3 text-xs font-bold tracking-wider text-[#0B7770]">{t.selectionLabel}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {galleryKeys.map((key) => {
          const card = t.cards[key];
          const chosen = active === key;
          const hasRuntimeEvidence = key === "knownIssue" || key === "execution";

          return (
            <button
              key={key}
              type="button"
              aria-pressed={chosen}
              onClick={() => setActive(key)}
              className={`group min-w-0 rounded-2xl border p-3 text-start transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B7770] ${
                chosen
                  ? "border-[#0B7770] bg-[#E8F4EE] shadow-[0_7px_24px_rgba(19,89,81,.10)]"
                  : "border-[#D3E4DC] bg-white/80 hover:border-[#84B4A5] hover:bg-[#F6FBF8]"
              }`}
            >
              <div
                className={`mb-3 flex h-20 flex-col justify-between overflow-hidden rounded-xl px-3 py-2.5 ${
                  hasRuntimeEvidence
                    ? "border border-[#BFDCCE] bg-[#EAF5EE]"
                    : "bg-[#172F35]"
                }`}
                dir="ltr"
              >
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className={`h-1.5 w-1.5 rounded-full ${hasRuntimeEvidence ? "bg-[#0B7770]" : "bg-[#C88785]"}`} />
                  <span className={`h-1.5 w-1.5 rounded-full ${hasRuntimeEvidence ? "bg-[#65B7A5]" : "bg-[#D8B67A]"}`} />
                  <span className={`h-1.5 w-1.5 rounded-full ${hasRuntimeEvidence ? "bg-[#C4A57B]" : "bg-[#65B7A5]"}`} />
                </div>
                <span className={`break-words font-mono text-[10px] leading-4 ${
                  hasRuntimeEvidence ? "text-[#17665F]" : "text-[#A7DBCA]"
                }`}>{card.preview}</span>
              </div>
              <p className="text-[10px] font-bold tracking-wide text-[#0B7770]">{card.category}</p>
              <span className="mt-1 block text-sm font-bold text-[#1C3E42]">{card.short}</span>
            </button>
          );
        })}
      </div>

      <article className="mt-4 overflow-hidden rounded-[24px] border border-[#C9DED4] bg-white shadow-[0_18px_50px_rgba(23,77,65,.08)]" aria-live="polite">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-5 sm:p-8">
            <p className="text-[11px] font-extrabold tracking-wide text-[#0B7770]">{item.category}</p>
            <h3 className="mt-3 text-xl font-bold leading-snug text-[#19343D] sm:text-2xl">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-[#526E70]">{item.summary}</p>
            <div className="mt-5 rounded-xl border border-[#D3E7D9] bg-[#F0F8F2] px-4 py-3">
              <p className="text-xs font-bold text-[#0B7770]">{t.infoLabel}</p>
              <p className="mt-1 text-sm leading-6 text-[#365B59]">{item.takeaway}</p>
            </div>
            {active !== "execution" && (
              <a
                href={gallerySourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0B7770] underline underline-offset-4 hover:text-[#19343D]"
              >
                {t.codeSource} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>

          {active === "execution" ? (
            <div dir="ltr" className="min-w-0 border-t border-[#26444A] bg-[#142D33] p-4 text-left sm:p-6 lg:border-s lg:border-t-0">
              <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/15 pb-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-[#C88785]" />
                  <span className="h-2 w-2 rounded-full bg-[#D8B67A]" />
                  <span className="h-2 w-2 rounded-full bg-[#65B7A5]" />
                </div>
                <span className="font-mono text-[10px] font-semibold text-[#95D7C2]">VERIFIED EXECUTION EVIDENCE</span>
              </div>

              <div className="space-y-4">
                {executionEvidence.map((evidence) => (
                  <figure key={evidence.src} className="overflow-hidden rounded-xl border border-white/15 bg-[#0C2228] p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={evidence.src}
                      alt={evidence.label}
                      loading="lazy"
                      className="block h-auto w-full rounded-lg object-contain"
                    />
                    <figcaption className="px-1 pt-2 text-[10px] font-medium text-[#A8C2BE]">{evidence.label}</figcaption>
                  </figure>
                ))}
              </div>

              <p className="mt-4 text-[10px] font-semibold tracking-wide text-[#B2D8C8]">{item.status}</p>
            </div>
          ) : active === "knownIssue" ? (
            <div dir="ltr" className="min-w-0 border-t border-[#5F4936] bg-[#2A231D] p-4 text-left sm:p-6 lg:border-s lg:border-t-0">
              <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/15 pb-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-[#C88785]" />
                  <span className="h-2 w-2 rounded-full bg-[#D8B67A]" />
                  <span className="h-2 w-2 rounded-full bg-[#65B7A5]" />
                </div>
                <span className="font-mono text-[10px] font-semibold text-[#E5C99E]">EXPECTED 422 · ACTUAL 500</span>
              </div>

              <figure className="overflow-hidden rounded-xl border border-white/15 bg-[#16120F] p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={defectEvidence.src}
                  alt={defectEvidence.label}
                  loading="lazy"
                  className="block h-auto w-full rounded-lg object-contain"
                />
                <figcaption className="px-1 pt-2 text-[10px] font-medium text-[#D8C4A6]">{defectEvidence.label}</figcaption>
              </figure>

              <p className="mt-4 text-[10px] font-semibold tracking-wide text-[#E5C99E]">{item.status}</p>
            </div>
          ) : code !== null ? (
            <div dir="ltr" className="min-w-0 bg-[#142D33] p-4 text-left sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/15 pb-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-[#C88785]" />
                  <span className="h-2 w-2 rounded-full bg-[#D8B67A]" />
                  <span className="h-2 w-2 rounded-full bg-[#65B7A5]" />
                </div>
                <span className="break-all text-right font-mono text-[10px] text-[#A7BDB9]">tests/test_api_checkout.py</span>
              </div>
              <p className="mb-2 text-[10px] font-semibold text-[#95D7C2]">{t.snippetLabel}</p>
              <pre className="max-h-[340px] w-full overflow-auto rounded-xl bg-[#0C2228] p-4 text-xs leading-6 text-[#D7F0E7]">
                <code>{code}</code>
              </pre>
              <p className="mt-3 text-[10px] font-semibold tracking-wide text-[#B2D8C8]">{item.status}</p>
            </div>
          ) : null}
        </div>
      </article>

      <p className="mt-4 text-xs leading-6 text-[#7A8B84]"><strong>{t.caveatLabel}:</strong> {t.caveat}</p>
    </div>
  );
}

export default function SyliusCaseStudy() {
  const { language } = useLanguage();
  const t = copy[language];
  const project = translations[language].projects.sylius;
  const stdHref = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/docs/Sylius_Automation_STD.xlsx`;

  const sharedText = {
    fixtures: [t.fixtures, t.fixturesBody],
    configuration: [t.configuration, t.configurationBody],
    data: [t.data, t.dataBody],
    tooling: [t.tooling, t.toolingBody],
  };

  return (
    <main id="main-content" className="inner-page" dir={language === "he" ? "rtl" : "ltr"}>
      <div className="inner-glow inner-glow--left" aria-hidden="true" />
      <div className="page-content mx-auto max-w-6xl">
        <Link
          href="/#showcase"
          className="mb-9 inline-flex items-center gap-2 text-sm font-semibold text-[#0B7770] transition-colors hover:text-[#19343D]"
        >
          <span aria-hidden="true">{language === "he" ? "→" : "←"}</span>
          {t.back}
        </Link>

        <header className="mb-12">
          <p className="page-kicker">{t.label}</p>
          <h1 className="page-title">Sylius <span>Automation</span></h1>
          <p className="page-lead mb-6">{t.intro}</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#BBDDD0] bg-[#E6F3EE] px-4 py-2 text-xs font-bold text-[#0B7770]">
              <span className="h-2 w-2 rounded-full bg-[#0B7770]" aria-hidden="true" />
              {t.status}
            </span>
            <span className="text-xs font-medium text-[#637879]" dir="ltr">Python · Playwright · Pytest · API</span>
          </div>
        </header>

        <section aria-labelledby="sylius-std" className="glass-surface mb-12 overflow-hidden p-6 md:p-9">
          <div className="grid gap-7 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
              <p className="section-index">{t.stdEyebrow}</p>
              <h2 id="sylius-std" className="mt-3 max-w-3xl text-2xl font-bold tracking-tight text-[#19343D] md:text-3xl">
                {t.stdTitle}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#637879] md:text-base md:leading-8">{t.stdBody}</p>
              <p className="mt-4 font-mono text-xs leading-6 text-[#7A8B84]" dir="ltr">{t.stdCaption}</p>
              <a
                href={stdHref}
                download
                className="action-btn action-btn--primary mt-6 inline-flex"
              >
                {t.stdDownload} <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                ["38", t.stdLogical],
                ["65", t.stdExecutions],
                ["07", t.stdClasses],
              ].map(([number, label]) => (
                <div key={label} className="rounded-2xl border border-[#D0E6DC] bg-[#F3FAF5] p-4 text-center">
                  <strong className="block text-3xl font-bold text-[#0B7770] sm:text-4xl">{number}</strong>
                  <span className="mt-2 block text-[11px] font-semibold leading-5 text-[#516F70] sm:text-xs">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <StdExamples language={language} />
        </section>

        <section aria-labelledby="sylius-architecture" className="mb-12">
          <p className="section-index">{t.architectureEyebrow}</p>
          <h2 id="sylius-architecture" className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-[#19343D] md:text-4xl">
            {t.architectureTitle}
          </h2>
          <p className="mt-4 mb-7 max-w-3xl text-base leading-8 text-[#637879]">{t.architectureIntro}</p>
          <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
            <Track
              number="01"
              heading={t.ui}
              description={t.uiBody}
              testsLabel={t.uiScenarios}
              tests={uiTestFiles}
              supportLabel={t.uiPages}
              support={pageFiles}
            />
            <Track
              number="02"
              heading={t.api}
              description={t.apiBody}
              testsLabel={t.apiScenarios}
              tests={apiTestFiles}
              supportLabel={t.apiClient}
              support={["utils/api_client.py", "test_data/api_data.py"]}
            />
          </div>
        </section>

        <CheckoutEvidence language={language} />

        <section aria-labelledby="sylius-shared" className="mb-12">
          <p className="section-index">{t.sharedEyebrow}</p>
          <h2 id="sylius-shared" className="mt-3 mb-6 text-2xl font-bold text-[#19343D] md:text-3xl">{t.sharedTitle}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {sharedFiles.map((group) => (
              <article key={group.key} className="glass-surface p-6">
                <div className="mb-4 flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#C4A57B]" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-bold text-[#19343D]">{sharedText[group.key][0]}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#637879]">{sharedText[group.key][1]}</p>
                  </div>
                </div>
                <FileTags files={group.files} />
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="sylius-coverage" className="glass-surface mb-12 p-6 md:p-9">
          <p className="section-index">{t.coverageEyebrow}</p>
          <h2 id="sylius-coverage" className="mt-3 text-2xl font-bold text-[#19343D] md:text-3xl">{t.coverageTitle}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#637879]">{t.coverageIntro}</p>
          <div className="mt-7 grid grid-cols-3 gap-3">
            {[
              ["04", t.uiCount],
              ["03", t.apiCount],
              ["08", t.pagesCount],
            ].map(([number, label]) => (
              <div key={label} className="rounded-2xl border border-[#D0E6DC] bg-[#F3FAF5] p-4 text-center">
                <strong className="block text-3xl font-bold text-[#0B7770] sm:text-4xl">{number}</strong>
                <span className="mt-2 block text-xs font-semibold text-[#516F70] sm:text-sm">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="sylius-evidence" className="glass-surface mb-10 p-6 md:p-9">
          <p className="section-index">{t.proofEyebrow}</p>
          <h2 id="sylius-evidence" className="mt-3 text-2xl font-bold text-[#19343D] md:text-3xl">{t.proofTitle}</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[#637879]">{t.proofBody}</p>

          <EvidenceGallery language={language} />

          <p className="mt-8 mb-3 text-xs font-bold tracking-wide text-[#0B7770]">{t.upcoming}</p>
          <ul className="grid gap-3 sm:grid-cols-3">
            {t.upcomingItems.map((item) => (
              <li key={item} className="rounded-xl border border-[#D9E9E1] bg-white/75 p-4 text-sm leading-6 text-[#526B6C]">
                <span className="me-2 text-[#C4A57B]" aria-hidden="true">✦</span>{item}
              </li>
            ))}
          </ul>
          <a
            href="https://github.com/quality-krl/sylius-automation"
            target="_blank"
            rel="noopener noreferrer"
            className="external-brand-link external-brand-link--github mt-7"
          >
            <span className="external-brand-link__icon"><ExternalServiceIcon service="github" /></span>
            <span className="external-brand-link__text">{t.repo}</span>
            <span aria-hidden="true">↗</span>
          </a>
          <p className="mt-5 max-w-3xl text-xs leading-6 text-[#7E8D89]">{t.note}</p>
        </section>

        <div className="pb-4 text-center">
          <p className="mx-auto mb-7 max-w-3xl text-xl font-semibold leading-relaxed text-[#0B7770] md:text-2xl">{t.footer}</p>
          <Link href="/#showcase" className="action-btn action-btn--primary">{t.viewProjects}<span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </main>
  );
}
