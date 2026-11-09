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
    status: "Work in progress",
    intro: "A practical automation project for an e-commerce platform, organized around UI journeys, API scenarios and reusable test infrastructure.",
    architectureEyebrow: "INSIDE THE PROJECT",
    architectureTitle: "The architecture behind the checks.",
    architectureIntro: "The diagram below maps the actual tracked files into two testing areas and a shared support layer. It describes the repository structure, not a claim about completed test results.",
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
    coverageTitle: "Six dedicated test modules.",
    coverageIntro: "A file inventory is not a count of test cases or passing tests. Verified execution results will be added separately.",
    uiCount: "UI modules",
    apiCount: "API modules",
    pagesCount: "Page modules",
    proofEyebrow: "EVIDENCE & NEXT STEPS",
    proofTitle: "Source first. Evidence next.",
    proofBody: "A real checkout test excerpt is now documented above. The repository contains the evolving implementation; verified execution reports and demonstrations remain future additions.",
    upcoming: "Planned evidence",
    upcomingItems: ["Verified Pytest run", "Screenshots or video demonstration", "Confirmed defect reproduction details"],
    repo: "View source on GitHub",
    note: "Architecture inventory based on git ls-files. Checkout examples are excerpts from the supplied tests/test_api_checkout.py. No execution result or current defect status is claimed here.",
    viewProjects: "Explore other projects",
    footer: "Designing tests around meaningful risk, not just test volume.",
  },
  he: {
    back: "חזרה לפרויקטים",
    label: "פרויקט 01 / אוטומציה",
    status: "הפרויקט בתהליך פיתוח",
    intro: "פרויקט אוטומציה מעשי למערכת מסחר אלקטרוני, עם הפרדה בין תהליכי UI, תרחישי API ותשתיות בדיקה משותפות.",
    architectureEyebrow: "מאחורי הפרויקט",
    architectureTitle: "הארכיטקטורה שמאחורי הבדיקות.",
    architectureIntro: "התרשים מציג את הקבצים שנמצאים במאגר, בחלוקה לשני תחומי בדיקה ולשכבת תשתית משותפת. הוא מתאר את מבנה הפרויקט ולא טוען שכל הבדיקות עברו בהצלחה.",
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
    coverageTitle: "שישה קובצי בדיקות ייעודיים.",
    coverageIntro: "מספר הקבצים אינו מספר מקרי הבדיקה או כמות הבדיקות שעברו. נוסיף תוצאות הרצה רק אחרי שנאמת אותן.",
    uiCount: "קובצי UI",
    apiCount: "קובצי API",
    pagesCount: "קובצי עמודים",
    proofEyebrow: "ראיות והמשך פיתוח",
    proofTitle: "קודם הקוד. אחר כך הראיות.",
    proofBody: "למעלה מוצגת כבר דוגמת קוד אמיתית מתוך בדיקות תהליך הרכישה. מאגר GitHub מכיל את הפרויקט המתפתח; נוסיף דוחות הרצה מאומתים והדגמות בהמשך.",
    upcoming: "ראיות שנוסיף בהמשך",
    upcomingItems: ["הרצת Pytest מאומתת", "צילומי מסך או סרטון הדגמה", "פרטי שחזור מאומתים של תקלה"],
    repo: "צפייה בקוד ב־GitHub",
    note: "מפת הקבצים מבוססת על git ls-files. דוגמאות Checkout נלקחו מתוך tests/test_api_checkout.py שסופק לשיחה. תוצאות הרצה ומצב התקלה כיום טרם אומתו.",
    viewProjects: "לפרויקטים נוספים",
    footer: "בדיקות שממוקדות בסיכון משמעותי, ולא רק בכמות.",
  },
} satisfies Record<Language, Record<string, string | readonly string[]>>;

const uiTestFiles = [
  "tests/test_login.py",
  "tests/test_registration.py",
  "tests/test_cart.py",
];

const pageFiles = [
  "pages/base_page.py",
  "pages/home_page.py",
  "pages/login_page.py",
  "pages/register_page.py",
  "pages/account_page.py",
  "pages/product_page.py",
  "pages/cart_page.py",
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
    intro: "Four test functions from tests/test_api_checkout.py: one expected checkout progression and three negative or ordering scenarios. The assertions below show intended behavior—not fresh execution results.",
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
    notes: "The payment-before-shipping test expects HTTP 422 but is marked @pytest.mark.xfail(strict=False). Its reason records a reported HTTP 500 response instead of a controlled 4xx. This is a documented expectation and defect note, not a verified current run. With strict=False, an unexpected pass (XPASS) does not fail the suite.",
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
    intro: "ארבע פונקציות בדיקה מתוך tests/test_api_checkout.py: מסלול תקין ושלושה תרחישים שליליים או בדיקות סדר פעולות. האימותים מייצגים ציפיות בקוד, לא תוצאות הרצה חדשות.",
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
    notes: "בדיקת תשלום לפני משלוח מצפה ל־HTTP 422, אך מסומנת ב־@pytest.mark.xfail(strict=False). בנימוק הסימון מתועדת תגובת HTTP 500 במקום שגיאת 4xx מבוקרת. זה תיעוד של ציפייה ותקלה, לא אימות מחדש בהרצה הנוכחית. עם strict=False, גם XPASS לא מכשיל את חבילת הבדיקות.",
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

export default function SyliusCaseStudy() {
  const { language } = useLanguage();
  const t = copy[language];
  const project = translations[language].projects.sylius;

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
          <h1 className="page-title">Sylius <span>Automation.</span></h1>
          <p className="page-lead mb-6">{t.intro}</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#BBDDD0] bg-[#E6F3EE] px-4 py-2 text-xs font-bold text-[#0B7770]">
              <span className="h-2 w-2 rounded-full bg-[#0B7770]" aria-hidden="true" />
              {t.status}
            </span>
            <span className="text-xs font-medium text-[#637879]" dir="ltr">Python · Playwright · Pytest · API</span>
          </div>
        </header>

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
              ["03", t.uiCount],
              ["03", t.apiCount],
              ["07", t.pagesCount],
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
          <p className="mt-7 mb-3 text-xs font-bold tracking-wide text-[#0B7770]">{t.upcoming}</p>
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
