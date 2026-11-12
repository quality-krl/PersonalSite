
"use client";

import { useLanguage } from "../components/LanguageProvider";

const CV_BASE =
  "https://quality-krl.github.io/Kirill_Kovalevski_QA_CV/";

const GITHUB_RAW =
  "https://github.com/quality-krl/Kirill_Kovalevski_QA_CV/raw/refs/heads/main/";

const cvFiles = {
  en: "Kirill_Kovalevski_CV_EN.pdf",
  he: "Kirill_Kovalevski_CV_HE.pdf",
};

export default function ResumePage() {
  const { language } = useLanguage();

  const isHebrew = language === "he";
  const filename = cvFiles[language];

  const pdfUrl = `${CV_BASE}${filename}`;
  const downloadUrl = `${GITHUB_RAW}${filename}`;

  const content = isHebrew
    ? {
        eyebrow: "PROFESSIONAL RESUME",
        title: "קורות החיים שלי",
        description:
          "בודק תוכנה ואוטומציה | Python · Playwright · Pytest",
        view: "פתיחת PDF",
        download: "הורדת קורות חיים",
        fallback:
          "אם התצוגה אינה זמינה, אפשר לפתוח את הקובץ בחלון חדש.",
      }
    : {
        eyebrow: "PROFESSIONAL RESUME",
        title: "My Resume",
        description:
          "QA Engineer | Python · Playwright · Pytest",
        view: "Open PDF",
        download: "Download Resume",
        fallback:
          "If the preview is unavailable, open the PDF in a new tab.",
      };

  return (
    <main
      id="main-content"
      dir={isHebrew ? "rtl" : "ltr"}
      className="min-h-screen flex-1 px-4 py-12 sm:px-8"
      style={{
        background:
          "radial-gradient(circle at 20% 10%, #eee7ff, transparent 45%), #faf9ff",
      }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-bold tracking-[0.2em] text-violet-600">
            {content.eyebrow}
          </p>

          <h1 className="text-4xl font-extrabold text-slate-800 sm:text-5xl">
            {content.title}
          </h1>

          <p className="mt-4 text-sm text-slate-500 sm:text-base">
            {content.description}
          </p>
        </div>

        <section className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-xl shadow-violet-100/40">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-violet-100 p-5">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                {isHebrew
                  ? "קיריל קובלבסקי"
                  : "Kirill Kovalevski"}
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                PDF · {isHebrew ? "עברית" : "English"}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-violet-300 px-5 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
              >
                {content.view}
              </a>

              <a
                href={downloadUrl}
                className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-700"
              >
                {content.download}
              </a>
            </div>
          </div>

          <div className="bg-slate-100 p-3 sm:p-6">
            <iframe
              key={language}
              src={pdfUrl}
              title={
                isHebrew
                  ? "קורות חיים בעברית"
                  : "English Resume"
              }
              className="h-[70vh] min-h-[500px] w-full rounded-xl border border-slate-200 bg-white sm:h-[85vh]"
            />
          </div>

          <p className="px-5 py-4 text-center text-xs text-slate-500">
            {content.fallback}
          </p>
        </section>
      </div>
    </main>
  );
}