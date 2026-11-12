
"use client";

import Link from "next/link";

import { useLanguage } from "./LanguageProvider";
import { translations } from "../i18n/translations";
import ExternalServiceLink from "./ExternalServiceLink";
import { ShieldIcon } from "./BrandMark";

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
      {/* Copyright and Resume */}
      <span
        dir={isHebrew ? "rtl" : "ltr"}
        className="
          inline-flex items-center gap-3
          max-[600px]:w-full
          max-[600px]:justify-between
        "
      >
        {/* Logo and name */}
        <span className="inline-flex min-w-0 items-center gap-2">
          <span
            aria-hidden="true"
            className="
              inline-grid h-[30px] w-[30px]
              shrink-0 place-items-center
              rounded-[9px] bg-[#0B7770]
            "
          >
            <ShieldIcon size={23} />
          </span>

          <span className="whitespace-nowrap">
            © {displayName}
          </span>
        </span>

        {/* Resume link */}
        <Link
          href="/resume"
          className="
            shrink-0 whitespace-nowrap
            font-semibold text-[#0B7770]
            underline underline-offset-4
            transition-colors
            hover:text-[#075b55]
          "
        >
          {isHebrew ? "קורות חיים" : "Resume"}
        </Link>
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