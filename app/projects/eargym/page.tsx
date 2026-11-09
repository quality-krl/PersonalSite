"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "../../components/LanguageProvider";
import { ExternalServiceIcon } from "../../components/ExternalServiceLink";

/**
 * EarGym TestLab is an implemented personal ear-training application.
 * The features below are grounded in its public live page.
 * The QA examples are PROPOSED test scenarios, not executed test results.
 * Live: https://quality-krl.github.io/EarGym-TestLab/
 * Repo: https://github.com/quality-krl/EarGym-TestLab
 */

const LIVE_URL = "https://quality-krl.github.io/EarGym-TestLab/";
const REPO_URL = "https://github.com/quality-krl/EarGym-TestLab";
const NOTES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];

const copy = {
  en: {
    back: "Back to portfolio",
    kicker: "PROJECT 05 / LIVE INTERACTIVE WEB APP",
    name: "EarGym",
    accent: "Training the ear. Engineering the feedback.",
    lead: "A bilingual music ear-training app built around a measurable loop: listen to a note, identify it, receive feedback and try again. A personal project that connects musical precision with a quality-engineering mindset.",
    status: "LIVE PERSONAL PROJECT",
    launch: "Try the live ear trainer",
    source: "View source code",
    illustration: "INTERACTION MODEL · NOT A LIVE AUDIO PLAYER",
    play: "PLAY A NOTE",
    choose: "CHOOSE A PITCH",
    verify: "GET FEEDBACK",
    repeat: "REPEAT & IMPROVE",
    graphicNote: "A visual explanation of the interaction. For working sound and controls, open the live app.",
    problemLabel: "THE IDEA",
    problemTitle: "Progress begins when feedback is immediate.",
    problemBody: "When you practice recognizing notes, vague impressions are hard to improve. EarGym makes the activity explicit: present an audible note, capture an answer, evaluate it and let the player continue. The interface puts the decision and its result in one short, repeatable flow.",
    flowLabel: "USER JOURNEY",
    flowTitle: "One input. One decision. Clear feedback.",
    flowBody: "This is the actual product's core interaction, shown as a conceptual flow rather than an embedded audio simulator.",
    flow: [
      { step: "01", title: "Listen", text: "Play or replay a single note." },
      { step: "02", title: "Identify", text: "Select the pitch from the note choices." },
      { step: "03", title: "Verify", text: "Review immediate correctness feedback and updated stats." },
      { step: "04", title: "Continue", text: "Move to the next round, change difficulty or reset." },
    ],
    capabilitiesLabel: "FEATURES IN THE LIVE APPLICATION",
    capabilitiesTitle: "A focused, interactive practice tool.",
    features: [
      { index: "01", title: "Twelve pitch choices", text: "A chromatic note selector supports recognition of the twelve note names, including sharps." },
      { index: "02", title: "Three difficulty levels", text: "Easy removes sharps, Standard provides the regular set, and Hard introduces octave changes." },
      { index: "03", title: "Assist mode", text: "An optional A=440 Hz reference note plays before the question to help orient the ear." },
      { index: "04", title: "Progress feedback", text: "The interface displays score, correct answers, the current streak and a best result." },
      { index: "05", title: "Round controls", text: "Replay, next-round and reset controls keep the exercise repeatable." },
      { index: "06", title: "Bilingual interface", text: "English and Hebrew copy with direction-aware layout for RTL/LTR usage." },
    ],
    qualityLabel: "QA ENGINEERING PERSPECTIVE",
    qualityTitle: "How I would test this product.",
    qualityBody: "The same interaction offers concrete testing opportunities: audio initialization, state transitions, scoring invariants, persistence and localization. Select a scenario to see a proposed test design. These are test ideas, not a claim that an automated suite has been executed.",
    scenarioLabel: "PROPOSED TEST SCENARIO",
    precondition: "Setup / action",
    expected: "Expected behavior",
    why: "Risk addressed",
    scenarios: [
      {
        id: "AUDIO-01",
        title: "First interaction on mobile",
        group: "Audio / interaction",
        action: "Open the trainer on a mobile browser and press Play for the first time, then replay the same round.",
        expected: "Audio starts after the user gesture, and replay does not silently advance the question or corrupt the score.",
        risk: "Mobile autoplay restrictions, silent playback, and unexpected state changes.",
      },
      {
        id: "STATE-02",
        title: "Double submission protection",
        group: "State / correctness",
        action: "Answer one note and rapidly tap several answer buttons before choosing Next.",
        expected: "One round contributes at most one answer to the counters; a repeated tap cannot inflate the score or streak.",
        risk: "Duplicate events and non-idempotent score updates.",
      },
      {
        id: "LEVEL-03",
        title: "Difficulty and note range",
        group: "Boundaries / rules",
        action: "Switch between Easy, Standard and Hard while playing several new rounds.",
        expected: "Easy excludes sharp-note targets; the available note set and octave behavior follow each selected difficulty.",
        risk: "Incorrect data generation and inconsistent difficulty rules.",
      },
      {
        id: "RESET-04",
        title: "Reset and best result",
        group: "State / persistence",
        action: "Complete several rounds, register a best result, then reset and reload the application.",
        expected: "The current session resets consistently, while the best-result behavior follows the product's intended persistence rule.",
        risk: "Stale UI, unexpected data loss or inconsistent local state.",
      },
      {
        id: "I18N-05",
        title: "Hebrew / English switching",
        group: "Localization / responsive",
        action: "Switch languages at narrow mobile widths during a round and navigate the controls with a keyboard.",
        expected: "Labels and direction update coherently, note names remain readable, and interaction remains usable without layout collisions.",
        risk: "RTL/LTR regressions, inaccessible controls and lost state.",
      },
    ],
    technologyLabel: "IMPLEMENTATION & SCOPE",
    technologyTitle: "Simple web technology. Observable behavior.",
    technologyBody: "EarGym is a lightweight client-side project using HTML, CSS and JavaScript. Its public interface is the evidence for the features described here. It is a music-training web app with QA-relevant behaviors, not a formally verified QA automation framework.",
    scopeNote: "No automated pass rates, coverage percentages or test-run outcomes are claimed for EarGym. The scenarios above are a proposed quality plan.",
    proofLabel: "SEE THE REAL PROJECT",
    proofTitle: "Try the sound, not just the description.",
    proofBody: "Open the live application to hear the generated notes, select answers, try assistance and difficulty settings, and experience the bilingual interface. The repository provides the implementation context.",
    footnote: "Personal, independently developed learning project; not an endorsement or a commercial product deployment.",
    return: "Explore other projects",
  },
  he: {
    back: "חזרה לפורטפוליו",
    kicker: "פרויקט 05 / אפליקציית Web אינטראקטיבית פעילה",
    name: "EarGym",
    accent: "מאמנים את האוזן. מדייקים את המשוב.",
    lead: "אפליקציה דו־לשונית לאימון שמיעה מוזיקלית המבוססת על תהליך מדיד: שומעים תו, מזהים אותו, מקבלים משוב וממשיכים. פרויקט אישי שמחבר בין דיוק מוזיקלי לבין חשיבה של הנדסת איכות.",
    status: "פרויקט אישי פעיל",
    launch: "התנסות באפליקציה הפעילה",
    source: "צפייה בקוד המקור",
    illustration: "המחשת האינטראקציה · לא נגן אודיו פעיל",
    play: "ניגון תו",
    choose: "זיהוי הצליל",
    verify: "קבלת משוב",
    repeat: "חזרה ושיפור",
    graphicNote: "התרשים ממחיש את הפעולה. לשמיעת צלילים ולשימוש בכפתורים, פתחו את האפליקציה הפעילה.",
    problemLabel: "הרעיון",
    problemTitle: "שיפור מתחיל כשמקבלים משוב מיידי.",
    problemBody: "באימון זיהוי תווים, קשה להתקדם רק על בסיס תחושה כללית. EarGym הופכת את התרגול לתהליך ברור: משמיעים תו, קולטים תשובה, בודקים אותה ומאפשרים להמשיך. ההחלטה והתוצאה מופיעות כחלק מתרגול קצר שאפשר לחזור עליו.",
    flowLabel: "מסע המשתמש",
    flowTitle: "קלט אחד. החלטה אחת. משוב ברור.",
    flowBody: "זהו התהליך המרכזי של האפליקציה, המוצג כתרשים הסברי ולא כסימולטור אודיו בתוך הפורטפוליו.",
    flow: [
      { step: "01", title: "האזנה", text: "ניגון של תו אחד או השמעה חוזרת." },
      { step: "02", title: "זיהוי", text: "בחירת שם התו מתוך האפשרויות." },
      { step: "03", title: "אימות", text: "קבלת משוב על התשובה ועדכון מדדי התרגול." },
      { step: "04", title: "המשך", text: "מעבר לסיבוב הבא, שינוי קושי או איפוס." },
    ],
    capabilitiesLabel: "יכולות שמופיעות באפליקציה הפעילה",
    capabilitiesTitle: "כלי תרגול קטן עם אינטראקציה ברורה.",
    features: [
      { index: "01", title: "בחירה בין 12 תווים", text: "אפשר לזהות שמות תווים מתוך הסולם הכרומטי, כולל דיאזים." },
      { index: "02", title: "שלוש רמות קושי", text: "רמת Easy מסירה דיאזים, Standard מציעה את הרמה הרגילה, ו־Hard מוסיפה שינויי אוקטבה." },
      { index: "03", title: "מצב עזרה", text: "אפשר לשמוע קודם תו ייחוס בתדר A=440Hz, כדי להתכוונן לפני התשובה." },
      { index: "04", title: "משוב על התקדמות", text: "הממשק מציג ניקוד, מספר תשובות נכונות, רצף הצלחות ושיא." },
      { index: "05", title: "שליטה בסבבי האימון", text: "פעולות של השמעה חוזרת, מעבר לסיבוב הבא ואיפוס מאפשרות תרגול חוזר." },
      { index: "06", title: "ממשק דו־לשוני", text: "עברית ואנגלית עם התאמת הכיווניות לממשק מימין לשמאל ומשמאל לימין." },
    ],
    qualityLabel: "נקודת המבט של QA",
    qualityTitle: "איך הייתי בודק את האפליקציה הזו?",
    qualityBody: "התהליך מאפשר לתכנן בדיקות משמעותיות: אתחול אודיו, שינויי מצב, תקינות הניקוד, שמירת נתונים ולוקליזציה. בחרו תרחיש כדי לראות תכנון בדיקה מוצע. אלו רעיונות לבדיקות — לא טענה שבוצעה הרצת אוטומציה.",
    scenarioLabel: "תרחיש בדיקה מוצע",
    precondition: "שלבים ותנאים",
    expected: "תוצאה צפויה",
    why: "הסיכון הנבדק",
    scenarios: [
      {
        id: "AUDIO-01",
        title: "האינטראקציה הראשונה במובייל",
        group: "אודיו ואינטראקציה",
        action: "לפתוח את האפליקציה בנייד, ללחוץ לראשונה על ניגון ולאחר מכן להשמיע שוב את אותו סיבוב.",
        expected: "הצליל מתחיל בעקבות פעולת המשתמש, וההשמעה החוזרת אינה מקדמת את הסיבוב או משנה את הניקוד.",
        risk: "מגבלות ניגון אוטומטי, אודיו שלא נשמע ושינויי מצב לא רצויים.",
      },
      {
        id: "STATE-02",
        title: "מניעת שליחה כפולה",
        group: "ניהול מצב ותקינות",
        action: "לענות על תו אחד וללחוץ במהירות על מספר תשובות לפני מעבר לסיבוב הבא.",
        expected: "כל סיבוב משפיע על המונים לכל היותר פעם אחת; לחיצות חוזרות אינן מנפחות ניקוד או רצף.",
        risk: "אירועים כפולים ועדכוני ניקוד שאינם אידמפוטנטיים.",
      },
      {
        id: "LEVEL-03",
        title: "טווח התווים לפי רמת קושי",
        group: "ערכי גבול וכללים",
        action: "להחליף בין Easy, Standard ו־Hard ולבצע כמה סיבובים בכל רמה.",
        expected: "ב־Easy לא מופיעים תווים עם דיאז כיעד; קבוצת התווים והאוקטבות תואמת לרמת הקושי שנבחרה.",
        risk: "יצירת נתוני תרגול שגויים וחוסר עקביות בכללי הקושי.",
      },
      {
        id: "RESET-04",
        title: "איפוס ושמירת שיא",
        group: "ניהול מצב ושמירה",
        action: "להשלים כמה סיבובים, לקבוע שיא, לבצע איפוס ואז לרענן את הדף.",
        expected: "המפגש הנוכחי מתאפס באופן עקבי, והתנהגות השיא נשמרת בהתאם למדיניות השמירה המיועדת של המוצר.",
        risk: "ממשק שאינו מסונכרן, אובדן נתונים בלתי צפוי ומצב מקומי לא עקבי.",
      },
      {
        id: "I18N-05",
        title: "החלפת עברית ואנגלית",
        group: "לוקליזציה ורספונסיביות",
        action: "להחליף שפות במהלך סיבוב ברוחב מובייל קטן ולנווט בין הפעולות באמצעות מקלדת.",
        expected: "התוויות והכיווניות משתנות באופן עקבי, שמות התווים קריאים והפעולות נגישות בלי חפיפות.",
        risk: "תקלות RTL/LTR, רכיבים לא נגישים ואובדן מצב תרגול.",
      },
    ],
    technologyLabel: "מימוש וגבולות הפרויקט",
    technologyTitle: "טכנולוגיית Web פשוטה. התנהגות שאפשר לבדוק.",
    technologyBody: "EarGym הוא פרויקט קל משקל בצד הלקוח המבוסס על HTML, CSS ו־JavaScript. האפליקציה הציבורית היא הראיה ליכולות שמתוארות כאן. זהו כלי לאימון שמיעה עם תרחישי QA מעניינים, ולא תשתית אוטומציה שנבדקה באופן פורמלי.",
    scopeNote: "לא הוצגו כאן שיעורי מעבר, אחוזי כיסוי או תוצאות של הרצות אוטומטיות שלא תועדו. התרחישים הם תוכנית בדיקות מוצעת.",
    proofLabel: "צפייה בפרויקט האמיתי",
    proofTitle: "כדאי לשמוע את הצליל — לא רק לקרוא עליו.",
    proofBody: "פתחו את האפליקציה הפעילה כדי לשמוע את התווים, לבחור תשובות, להתנסות בעזרה וברמות הקושי ולבדוק את הממשק בשתי השפות. מאגר הקוד מאפשר לבחון את המימוש.",
    footnote: "פרויקט לימודי אישי שפותח באופן עצמאי; אינו מוצר מסחרי או פרויקט מטעם חברה.",
    return: "לפרויקטים נוספים",
  },
} as const;

export default function EarGymCaseStudy() {
  const { language } = useLanguage();
  const t = copy[language];
  const isHebrew = language === "he";
  const [selectedScenario, setSelectedScenario] = useState(0);
  const scenario = t.scenarios[selectedScenario];

  return (
    <main id="main-content" className="inner-page" dir={isHebrew ? "rtl" : "ltr"}>
      <div className="inner-glow inner-glow--left" aria-hidden="true" />
      <div className="page-content mx-auto max-w-6xl">
        <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#0B7770] hover:opacity-70">
          <span aria-hidden="true">{isHebrew ? "→" : "←"}</span>
          <span>{t.back}</span>
        </Link>

        <header className="mb-10">
          <p className="page-kicker">{t.kicker}</p>
          <h1 className="page-title break-words">{t.name} <span>{t.accent}</span></h1>
          <p className="page-lead">{t.lead}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#BBDDD0] bg-[#E6F3EE] px-4 py-2 text-xs font-bold text-[#0B7770]">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#0B7770]" />
              {t.status}
            </span>
            <span dir="ltr" className="rounded-full border border-[#D6E3DC] bg-white/70 px-4 py-2 text-xs font-semibold text-[#385F60]">
              HTML · CSS · JavaScript
            </span>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" className="action-btn action-btn--primary inline-flex min-h-12 items-center justify-center gap-2 px-6">
              {t.launch}<span aria-hidden="true">↗</span>
            </a>
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="external-brand-link external-brand-link--github inline-flex min-h-12 items-center gap-2 px-5">
              <span className="external-brand-link__icon"><ExternalServiceIcon service="github" /></span>
              <span className="external-brand-link__text">{t.source}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </header>

        <section className="glass-surface mb-6 overflow-hidden rounded-3xl p-5 sm:p-7 md:p-10" aria-labelledby="eargym-visual-title">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p id="eargym-visual-title" className="section-index">{t.illustration}</p>
            <span className="rounded-full border border-[#E8DBC6] bg-[#F8F2E6] px-3 py-1 text-xs font-bold text-[#9B7B42]" dir="ltr">A4 · 440 Hz</span>
          </div>
          <div className="mt-6 rounded-2xl border border-[#DCE9E4] bg-gradient-to-br from-[#F3FAF7] via-white to-[#FFF8ED] p-4 sm:p-7">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#C4E2D9] bg-white shadow-sm" aria-hidden="true">
                <svg viewBox="0 0 64 64" width="46" height="46" fill="none" role="img">
                  <path d="M11 33h9l7-18 11 36 7-18h8" stroke="#0B7770" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex flex-wrap justify-center gap-2" aria-hidden="true">
                {NOTES.map((note, index) => (
                  <span key={note} dir="ltr" className={`flex h-10 w-10 items-center justify-center rounded-lg border text-xs font-bold ${index === 9 ? "border-[#0B7770] bg-[#DAEEE9] text-[#0B7770]" : "border-[#DDE8E4] bg-white text-[#496C6C]"}`}>
                    {note}
                  </span>
                ))}
              </div>
              <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-4">
                {[t.play, t.choose, t.verify, t.repeat].map((item, i) => (
                  <div key={i} className="rounded-xl border border-[#DCE8DF] bg-white/85 px-2 py-3 text-center text-xs font-bold leading-5 text-[#396766]">
                    <span className="mb-1 block text-[10px] text-[#AE8B55]">0{i + 1}</span>{item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs leading-6 text-[#718485]">{t.graphicNote}</p>
        </section>

        <section className="glass-surface mb-6 rounded-3xl p-6 md:p-10">
          <p className="section-index">{t.problemLabel}</p>
          <h2 className="mt-3 max-w-3xl text-2xl font-bold leading-tight text-[#19343D] md:text-3xl">{t.problemTitle}</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[#637879]">{t.problemBody}</p>
        </section>

        <section className="mb-6">
          <p className="section-index">{t.flowLabel}</p>
          <h2 className="mt-3 text-2xl font-bold text-[#19343D] md:text-3xl">{t.flowTitle}</h2>
          <p className="mt-3 mb-6 max-w-3xl text-sm leading-7 text-[#637879]">{t.flowBody}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {t.flow.map((item) => (
              <article key={item.step} className="glass-surface rounded-2xl p-5 md:p-6">
                <span className="text-sm font-bold text-[#0B7770]" dir="ltr">{item.step} / 04</span>
                <h3 className="mt-4 text-lg font-bold text-[#19343D]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#637879]">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <p className="section-index">{t.capabilitiesLabel}</p>
          <h2 className="mt-3 mb-6 text-2xl font-bold text-[#19343D] md:text-3xl">{t.capabilitiesTitle}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.features.map((feature) => (
              <article key={feature.index} className="glass-surface rounded-3xl p-6 md:p-7">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#DAEEE9] text-sm font-bold text-[#0B7770]">{feature.index}</span>
                <h3 className="mt-5 text-lg font-bold text-[#19343D]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#637879]">{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="glass-surface mb-6 rounded-3xl p-6 md:p-10">
          <p className="section-index">{t.qualityLabel}</p>
          <h2 className="mt-3 text-2xl font-bold text-[#19343D] md:text-3xl">{t.qualityTitle}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#637879]">{t.qualityBody}</p>
          <div role="group" aria-label={isHebrew ? "תרחישי בדיקה מוצעים" : "Proposed QA scenarios"} className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {t.scenarios.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={index === selectedScenario}
                onClick={() => setSelectedScenario(index)}
                className={`min-h-24 rounded-2xl border p-4 text-start transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B7770] ${index === selectedScenario ? "border-[#0B7770] bg-[#DAEEE9]" : "border-[#D9EAE3] bg-white/75 hover:bg-[#F2F8F5]"}`}
              >
                <span className="block text-xs font-bold text-[#0B7770]" dir="ltr">{item.id}</span>
                <strong className="mt-2 block text-sm leading-6 text-[#19343D]">{item.title}</strong>
                <span className="mt-1 block text-xs leading-5 text-[#657D7A]">{item.group}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-[#C9E3D9] bg-[#EAF4EE] p-5 md:p-7" aria-live="polite">
            <p className="text-xs font-bold text-[#0B7770]">{t.scenarioLabel}</p>
            <p className="mt-2 text-xs font-bold text-[#26756A]" dir="ltr">{scenario.id}</p>
            <h3 className="mt-2 text-xl font-bold text-[#19343D]">{scenario.title}</h3>
            <dl className="mt-5 grid gap-5 md:grid-cols-3">
              <div>
                <dt className="text-xs font-bold text-[#0B7770]">{t.precondition}</dt>
                <dd className="mt-2 text-sm leading-7 text-[#416865]">{scenario.action}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold text-[#0B7770]">{t.expected}</dt>
                <dd className="mt-2 text-sm leading-7 text-[#416865]">{scenario.expected}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold text-[#0B7770]">{t.why}</dt>
                <dd className="mt-2 text-sm leading-7 text-[#416865]">{scenario.risk}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="glass-surface mb-6 rounded-3xl p-6 md:p-10">
          <p className="section-index">{t.technologyLabel}</p>
          <h2 className="mt-3 text-2xl font-bold text-[#19343D] md:text-3xl">{t.technologyTitle}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-[#637879]">{t.technologyBody}</p>
          <div className="mt-6 flex flex-wrap gap-2" dir="ltr">
            {["HTML5", "CSS3", "Vanilla JavaScript", "Interactive audio", "EN / HE", "RTL / LTR", "Responsive UI"].map((tech) => (
              <span key={tech} className="rounded-full border border-[#C9E3D9] bg-[#E6F3EE] px-4 py-2 text-xs font-bold text-[#166660]">{tech}</span>
            ))}
          </div>
          <p className="mt-5 text-xs leading-6 text-[#667C7D]">{t.scopeNote}</p>
        </section>

        <section className="glass-surface mb-8 rounded-3xl p-6 md:p-10">
          <p className="section-index">{t.proofLabel}</p>
          <h2 className="mt-3 text-2xl font-bold text-[#19343D] md:text-3xl">{t.proofTitle}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-[#637879]">{t.proofBody}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" className="action-btn action-btn--primary inline-flex min-h-12 items-center justify-center gap-2 px-6">
              {t.launch}<span aria-hidden="true">↗</span>
            </a>
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="external-brand-link external-brand-link--github inline-flex min-h-12 items-center gap-2 px-5">
              <span className="external-brand-link__icon"><ExternalServiceIcon service="github" /></span>
              <span className="external-brand-link__text">{t.source}</span><span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="mt-6 text-xs leading-6 text-[#667C7D]">{t.footnote}</p>
        </section>

        <div className="page-bottom-actions mb-4">
          <Link href="/" className="action-btn action-btn--outline">{t.return}<span aria-hidden="true">{isHebrew ? "←" : "→"}</span></Link>
        </div>
      </div>
    </main>
  );
}