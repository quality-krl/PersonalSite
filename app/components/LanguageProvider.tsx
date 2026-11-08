
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Language = "en" | "he";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  isRTL: boolean;
};

const LanguageContext =
  createContext<LanguageContextType | null>(null);

const STORAGE_KEY = "personal-site-language";

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguage] =
    useState<Language>("en");

  const [restored, setRestored] = useState(false);

  // Restore the visitor's language preference.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved === "en" || saved === "he") {
        setLanguage(saved);
      }
    } finally {
      setRestored(true);
    }
  }, []);

  // Update the document language and direction.
  useEffect(() => {
    if (!restored) return;

    const direction =
      language === "he" ? "rtl" : "ltr";

    document.documentElement.lang = language;
    document.documentElement.dir = direction;

    localStorage.setItem(STORAGE_KEY, language);
  }, [language, restored]);

  function toggleLanguage() {
    setLanguage((current) =>
      current === "en" ? "he" : "en"
    );
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isRTL: language === "he",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used within LanguageProvider"
    );
  }

  return context;
}
