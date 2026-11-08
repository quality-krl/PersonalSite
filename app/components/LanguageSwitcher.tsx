
"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  const isEnglish = language === "en";

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={
        isEnglish
          ? "Switch website to Hebrew"
          : "Switch website to English"
      }
      title={
        isEnglish
          ? "Switch to Hebrew"
          : "Switch to English"
      }
      dir="ltr"
      className="
        inline-flex
        h-11
        min-w-28
        items-center
        justify-center
        gap-2
        rounded-full
        border
        border-[#A8CBC0]
        bg-white/75
        px-4
        text-sm
        font-semibold
        text-[#19343D]
        shadow-sm
        backdrop-blur-md
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-[#0B7770]
        hover:bg-[#E6F3EE]
        hover:shadow-md
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-[#0B7770]
      "
    >
      <span aria-hidden="true" className="text-base">
        {isEnglish ? "🇮🇱" : "🇬🇧"}
      </span>

      <span>
        {isEnglish ? "עברית" : "English"}
      </span>

      <span
        aria-hidden="true"
        className="text-[#0B7770]"
      >
        ↔
      </span>
    </button>
  );
}
