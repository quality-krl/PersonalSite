
"use client";

import { useLanguage } from "./LanguageProvider";
import { translations } from "../i18n/translations";
import ExternalServiceLink from "./ExternalServiceLink";

export default function SiteFooter() {
  const { language } = useLanguage();

  const t = translations[language].footer;
  const isHebrew = language === "he";

  const displayName = isHebrew
    ? "קיריל קובלבסקי"
    : "Kirill Kovalevski";

  return (
    <footer
  className="site-footer site-footer--locale"
  dir={isHebrew ? "rtl" : "ltr"}
>
      {/* Copyright */}
      <span dir={isHebrew ? "rtl" : "ltr"}>
        © {displayName}
      </span>

      {/* Bilingual motto */}
      <span
        className="footer-center"
        dir={isHebrew ? "rtl" : "ltr"}
      >
        {t.motto}
      </span>

      {/* External services */}
      <div
  className="footer-links footer-links--branded"
  dir="ltr"
>
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