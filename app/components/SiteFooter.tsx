
"use client";

import { useLanguage } from "./LanguageProvider";
import { translations } from "../i18n/translations";
import ExternalServiceLink from "./ExternalServiceLink";

export default function SiteFooter() {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className="site-footer" dir="ltr">
      <span>© Kirill Kovalevski</span>

      <span
        className="footer-center"
        dir={language === "he" ? "rtl" : "ltr"}
      >
        {t.motto}
      </span>

      <div className="footer-links footer-links--branded">
        <ExternalServiceLink
          service="github"
          label="GitHub"
        />

        <ExternalServiceLink
          service="linkedin"
          label="LinkedIn"
        />

        <ExternalServiceLink
          service="email"
          label={t.email}
        />
      </div>
    </footer>
  );
}
