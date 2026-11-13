"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "../../components/LanguageProvider";
import { ExternalServiceIcon } from "../../components/ExternalServiceLink";

/**
 * EarGym TestLab — an existing personal, bilingual ear-training application.
 * The screenshots show the real interface. The QA scenarios below are proposed,
 * not claims of executed tests or automation coverage.
 */

const LIVE_URL = "https://quality-krl.github.io/EarGym-TestLab/";
const REPO_URL = "https://github.com/quality-krl/EarGym-TestLab";
const mediaUrl = (file: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/media/eargym/${file}`;

const screenshots = ["eargym-practice.webp", "eargym-intro.webp"] as const;

const copy = {
  en: {
    back: "Back to portfolio",
    kicker: "PROJECT 05 / LIVE WEB APPLICATION",
    heading: "EarGym",
    accent: "Ear training with immediate feedback.",
    lead: "A bilingual ear-training app I built to practice pitch recognition through short, repeatable rounds: listen, answer, get feedback and improve.",
    status: "Live personal project",
    live: "Try the application",
    source: "Source code",
    coverAlt: "Actual EarGym pitch-training interface with note choices and score indicators",
    galleryEyebrow: "REAL APPLICATION / SCREENSHOTS",
    galleryTitle: "See the product in action.",
    galleryIntro: "Screenshots from the running application. Switch views or open an image for a closer look. The captured interface is in Hebrew; the app supports English too.",
    viewNames: ["Training interface", "Welcome screen"],
    viewAlts: [
      "Actual EarGym practice screen with Play, Next, Reset, a chromatic note grid and scoring indicators",
      "Actual EarGym introduction explaining the 60-second ear-training exercise",
    ],
    enlarge: "Open full-size screenshot",
    productEyebrow: "WHAT I BUILT",
    productTitle: "A compact practice loop.",
    steps: [
      { title: "Listen", text: "Play a note, with optional A=440 Hz assistance." },
      { title: "Identify", text: "Choose a pitch from the available notes." },
      { title: "Get feedback", text: "See the result, current score and streak." },
      { title: "Try again", text: "Continue, replay or change difficulty." },
    ],
    capabilities: "Key capabilities",
    features: [
      "12 pitch choices, including sharps",
      "Three difficulty levels",
      "Replay, reset and assistance controls",
      "Progress and streak indicators",
      "Hebrew / English and responsive layout",
    ],
    qaEyebrow: "QUALITY-ENGINEERING PERSPECTIVE",
    qaTitle: "How I would test it.",
    qaNote: "The scenarios below are proposed test designs, not completed automated tests or measured coverage.",
    openQA: "Explore five proposed QA scenarios",
    scenarioLabels: ["Steps", "Expected result", "Risk"],
    scenarios: [
      {
        id: "AUDIO-01", title: "First sound on mobile",
        action: "Start the trainer in a mobile browser, tap Play, then replay the same round.",
        expected: "Sound starts after a user gesture; replay does not advance the round or change the score.",
        risk: "Autoplay restrictions and unintended state transitions.",
      },
      {
        id: "STATE-02", title: "Prevent duplicate answers",
        action: "Submit one answer and tap other pitch choices repeatedly before Next.",
        expected: "A round affects score and streak at most once.",
        risk: "Repeated events and inflated results.",
      },
      {
        id: "LEVEL-03", title: "Difficulty boundaries",
        action: "Switch Easy, Standard and Hard and inspect new rounds.",
        expected: "Note selection and octave behavior follow the chosen difficulty rules.",
        risk: "Invalid note generation and level inconsistencies.",
      },
      {
        id: "RESET-04", title: "Reset and best score",
        action: "Complete rounds, reset, then reload the application.",
        expected: "Session state resets and best-score persistence matches the intended behavior.",
        risk: "Stale counters or unintended data loss.",
      },
      {
        id: "I18N-05", title: "Language and mobile layout",
        action: "Switch languages during a round at narrow screen widths.",
        expected: "Layout direction and labels update without clipping or losing the round state.",
        risk: "RTL/LTR layout and state regressions.",
      },
    ],
    built: "Built with",
    scope: "A personal client-side web app, not an enterprise test platform. The QA scenarios above are suggestions for future test coverage.",
    closing: "Want to evaluate the real interaction? Open EarGym and try a round.",
    return: "Explore other projects",
  },
  he: {
    back: "חזרה לפורטפוליו",
    kicker: "פרויקט 05 / אפליקציית Web פעילה",
    heading: "EarGym",
    accent: "אימון שמיעה עם משוב מיידי.",
    lead: "אפליקציה דו־לשונית שפיתחתי לתרגול זיהוי תווים בסבבים קצרים: מקשיבים, בוחרים תשובה, מקבלים משוב ומשתפרים.",
    status: "פרויקט אישי פעיל",
    live: "התנסות באפליקציה",
    source: "קוד המקור",
    coverAlt: "צילום ממשק האימון האמיתי של EarGym עם אפשרויות תווים ומדדי התקדמות",
    galleryEyebrow: "צילומים אמיתיים מהאפליקציה",
    galleryTitle: "האפליקציה בפעולה.",
    galleryIntro: "צילומי מסך מתוך האפליקציה הפעילה. אפשר לעבור ביניהם ולפתוח כל תמונה בגודל מלא.",
    viewNames: ["ממשק התרגול", "מסך הפתיחה"],
    viewAlts: [
      "מסך התרגול של EarGym עם כפתורי ניגון, מעבר ואיפוס, בחירת תווים ומדדי ניקוד",
      "מסך הפתיחה של EarGym המסביר על אימון השמיעה בן 60 השניות",
    ],
    enlarge: "פתיחת התמונה בגודל מלא",
    productEyebrow: "מה פיתחתי",
    productTitle: "תהליך תרגול קצר וברור.",
    steps: [
      { title: "מקשיבים", text: "מנגנים תו, עם אפשרות להיעזר בצליל ייחוס." },
      { title: "מזהים", text: "בוחרים את התו המתאים מבין האפשרויות." },
      { title: "מקבלים משוב", text: "רואים את התוצאה, הניקוד ורצף ההצלחות." },
      { title: "ממשיכים", text: "עוברים לסיבוב נוסף, משמיעים שוב או משנים רמה." },
    ],
    capabilities: "יכולות מרכזיות",
    features: [
      "בחירה בין 12 תווים, כולל דיאזים",
      "שלוש רמות קושי",
      "השמעה חוזרת, איפוס ומצב עזרה",
      "מדדי התקדמות ורצף הצלחות",
      "עברית ואנגלית, עם התאמה למובייל",
    ],
    qaEyebrow: "נקודת המבט של הנדסת איכות",
    qaTitle: "איך הייתי בודק את המוצר?",
    qaNote: "אלה תרחישי בדיקה מוצעים, לא בדיקות אוטומטיות שכבר בוצעו או אחוזי כיסוי שנמדדו.",
    openQA: "הצגת חמישה תרחישי QA מוצעים",
    scenarioLabels: ["צעדים", "תוצאה צפויה", "סיכון"],
    scenarios: [
      {
        id: "AUDIO-01", title: "הפעלת צליל ראשונה במובייל",
        action: "לפתוח את הכלי במובייל, ללחוץ על ניגון ואז להשמיע שוב את אותו סיבוב.",
        expected: "הצליל מתחיל לאחר לחיצת המשתמש, והשמעה חוזרת לא משנה את הסיבוב או הניקוד.",
        risk: "מגבלות ניגון ושינויי מצב לא צפויים.",
      },
      {
        id: "STATE-02", title: "מניעת תשובות כפולות",
        action: "לענות פעם אחת וללחוץ שוב ושוב על אפשרויות נוספות לפני המעבר לסיבוב הבא.",
        expected: "כל סיבוב משנה את הניקוד ואת רצף ההצלחות לכל היותר פעם אחת.",
        risk: "אירועים כפולים וניפוח ניקוד.",
      },
      {
        id: "LEVEL-03", title: "גבולות רמות הקושי",
        action: "לעבור בין שלוש רמות הקושי ולבדוק סיבובים חדשים.",
        expected: "בחירת התווים והתנהגות האוקטבות תואמות לכללים של הרמה הנבחרת.",
        risk: "יצירת תווים שגויים וחוסר עקביות בין רמות.",
      },
      {
        id: "RESET-04", title: "איפוס ושמירת שיא",
        action: "לסיים כמה סיבובים, לאפס ולרענן את האפליקציה.",
        expected: "נתוני הסבב מתאפסים ושמירת השיא מתנהגת לפי הדרישה שהוגדרה.",
        risk: "נתונים ישנים או אובדן מידע בלתי צפוי.",
      },
      {
        id: "I18N-05", title: "שפה ותצוגת מובייל",
        action: "להחליף שפה במהלך תרגול במסך צר.",
        expected: "הכיווניות והטקסט מתעדכנים בלי חפיפות ובלי לאבד את מצב הסיבוב.",
        risk: "תקלות RTL/LTR וניהול מצב.",
      },
    ],
    built: "טכנולוגיות",
    scope: "אפליקציית Web אישית הפועלת בדפדפן, ולא תשתית בדיקות ארגונית. תרחישי ה־QA הם הצעה לכיסוי עתידי.",
    closing: "רוצים לבחון את האינטראקציה האמיתית? פתחו את EarGym ונסו סיבוב.",
    return: "לפרויקטים נוספים",
  },
} as const;

export default function EarGymCaseStudy() {
  const { language } = useLanguage();
  const isHebrew = language === "he";
  const t = copy[language];
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState(0);
  const scenario = t.scenarios[selectedScenario];

  return (
    <main id="main-content" className="inner-page" dir={isHebrew ? "rtl" : "ltr"}>
      <div className="inner-glow inner-glow--left" aria-hidden="true" />
      <div className="page-content mx-auto w-full max-w-6xl pb-8">
        <Link href="/#showcase" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#0B7770] hover:opacity-70">
          <span aria-hidden="true">{isHebrew ? "→" : "←"}</span>
          {t.back}
        </Link>

        <header className="mb-8">
          <div className="grid grid-cols-[minmax(0,1fr)_100px] items-start gap-4 sm:grid-cols-[minmax(0,1fr)_160px] md:grid-cols-[minmax(0,1fr)_220px] md:gap-8">
            <div className="min-w-0">
              <p className="page-kicker">{t.kicker}</p>
              <h1 className="mt-3 break-words text-4xl font-black tracking-tight text-[#19343D] sm:text-5xl lg:text-6xl" dir="ltr" style={{ textAlign: isHebrew ? "right" : "left" }}>
                {t.heading}
              </h1>
              <p className="mt-2 text-lg font-bold leading-snug text-[#0B7770] sm:text-2xl">{t.accent}</p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5B7273] md:text-base">{t.lead}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-[#BBDDD0] bg-[#E6F3EE] px-3 py-2 text-xs font-bold text-[#0B7770]">{t.status}</span>
                <span className="rounded-full border border-[#D6E3DC] bg-white/70 px-3 py-2 text-xs font-semibold text-[#385F60]" dir="ltr">HTML · CSS · JavaScript</span>
              </div>
            </div>
            <a
              href={mediaUrl("eargym-practice.webp")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.coverAlt}
              className="block overflow-hidden rounded-2xl border border-[#28453B] bg-[#17241E] p-1 shadow-[0_12px_30px_rgba(16,37,28,0.14)] transition hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B7770]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mediaUrl("eargym-practice.webp")} alt={t.coverAlt} width={462} height={581} className="block h-auto w-full" loading="eager" />
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" className="action-btn action-btn--primary inline-flex min-h-12 items-center justify-center gap-2 px-6">
              {t.live}<span aria-hidden="true">↗</span>
            </a>
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="external-brand-link external-brand-link--github inline-flex min-h-12 items-center gap-2 px-5">
              <span className="external-brand-link__icon"><ExternalServiceIcon service="github" /></span>
              <span className="external-brand-link__text">{t.source}</span><span aria-hidden="true">↗</span>
            </a>
          </div>
        </header>

        <section className="glass-surface mb-6 overflow-hidden rounded-3xl p-5 sm:p-7" aria-labelledby="eargym-real-demo-title">
          <p className="section-index">{t.galleryEyebrow}</p>
          <h2 id="eargym-real-demo-title" className="mt-3 text-2xl font-extrabold text-[#19343D] md:text-3xl">{t.galleryTitle}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-[#637879]">{t.galleryIntro}</p>
          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label={t.galleryTitle}>
            {t.viewNames.map((label, i) => (
              <button
                type="button"
                key={label}
                aria-pressed={activeScreenshot === i}
                onClick={() => setActiveScreenshot(i)}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B7770] ${activeScreenshot === i ? "border-[#0B7770] bg-[#0B7770] text-white" : "border-[#C8DED5] bg-white/80 text-[#315D58] hover:bg-[#E7F3ED]"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <a
            href={mediaUrl(screenshots[activeScreenshot])}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.enlarge}
            className="mt-4 flex min-h-44 items-center justify-center overflow-hidden rounded-2xl border border-[#31463B] bg-[#14231B] p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B7770] sm:p-5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mediaUrl(screenshots[activeScreenshot])}
              alt={t.viewAlts[activeScreenshot]}
              width={activeScreenshot === 0 ? 462 : 629}
              height={activeScreenshot === 0 ? 581 : 462}
              className="block max-h-[510px] w-auto max-w-full rounded-lg object-contain"
              loading="eager"
            />
          </a>
          <p className="mt-2 text-center text-xs text-[#617879]">{t.enlarge} ↗</p>
        </section>

        <section className="mb-6" aria-labelledby="eargym-capabilities-title">
          <p className="section-index">{t.productEyebrow}</p>
          <h2 id="eargym-capabilities-title" className="mt-3 text-2xl font-extrabold text-[#19343D] md:text-3xl">{t.productTitle}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {t.steps.map((step, i) => (
              <article key={step.title} className="glass-surface rounded-2xl p-5">
                <span className="text-xs font-black text-[#0B7770]" dir="ltr">0{i + 1}</span>
                <h3 className="mt-2 font-extrabold text-[#19343D]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#637879]">{step.text}</p>
              </article>
            ))}
          </div>
          <div className="glass-surface mt-3 rounded-2xl p-5 sm:p-6">
            <h3 className="font-bold text-[#19343D]">{t.capabilities}</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {t.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm leading-6 text-[#526F6D]">
                  <span aria-hidden="true" className="mt-1 font-bold text-[#0B7770]">✓</span><span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="glass-surface mb-7 rounded-3xl p-5 sm:p-7" aria-labelledby="eargym-qa-title">
          <p className="section-index">{t.qaEyebrow}</p>
          <h2 id="eargym-qa-title" className="mt-3 text-2xl font-extrabold text-[#19343D] md:text-3xl">{t.qaTitle}</h2>
          <p className="mt-2 text-sm leading-7 text-[#637879]">{t.qaNote}</p>
          <details className="group mt-5 rounded-2xl border border-[#C9DED6] bg-white/75 p-4 sm:p-5">
            <summary className="cursor-pointer font-bold text-[#0B7770] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B7770]">
              {t.openQA}
            </summary>
            <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3" role="group" aria-label={t.qaTitle}>
              {t.scenarios.map((item, i) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSelectedScenario(i)}
                  aria-pressed={selectedScenario === i}
                  className={`rounded-xl border p-3 text-start transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B7770] ${selectedScenario === i ? "border-[#0B7770] bg-[#E1F1E9]" : "border-[#DBE9E3] bg-white hover:bg-[#F2F8F5]"}`}
                >
                  <span className="block text-xs font-bold text-[#0B7770]" dir="ltr">{item.id}</span>
                  <span className="mt-1 block text-sm font-bold text-[#19343D]">{item.title}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-[#EAF4EE] p-4 sm:p-5" aria-live="polite">
              <p className="text-xs font-bold text-[#0B7770]" dir="ltr">{scenario.id}</p>
              <h3 className="mt-2 text-lg font-bold text-[#19343D]">{scenario.title}</h3>
              <dl className="mt-4 grid gap-3 md:grid-cols-3">
                {[scenario.action, scenario.expected, scenario.risk].map((value, i) => (
                  <div key={t.scenarioLabels[i]}>
                    <dt className="text-xs font-bold text-[#0B7770]">{t.scenarioLabels[i]}</dt>
                    <dd className="mt-1 text-sm leading-6 text-[#4A6F6A]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </details>
        </section>

        <div className="glass-surface mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5 sm:p-6">
          <div className="max-w-2xl">
            <p className="text-sm font-bold text-[#19343D]">{t.closing}</p>
            <p className="mt-2 text-xs leading-6 text-[#708480]">{t.scope}</p>
            <p className="mt-2 text-xs text-[#52736F]">{t.built}: HTML · CSS · JavaScript</p>
          </div>
          <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" className="action-btn action-btn--primary inline-flex min-h-12 items-center justify-center gap-2 px-6">
            {t.live}<span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="page-bottom-actions mb-4">
          <Link href="/#showcase" className="action-btn action-btn--outline">
            {t.return}<span aria-hidden="true">{isHebrew ? "←" : "→"}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}