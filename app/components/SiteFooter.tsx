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
  const displayName = isHebrew ? "קיריל קובלבסקי" : "Kirill Kovalevski";

  return (
    <footer
      className="site-footer site-footer--locale"
      dir={isHebrew ? "rtl" : "ltr"}
    >
      {/* Copyright and static version of the same shield icon */}
      <span
        dir={isHebrew ? "rtl" : "ltr"}
        style={{ display: "inline-flex", alignItems: "center", gap: "9px" }}
      >
        <span
          aria-hidden="true"
          style={{
            width: "30px",
            height: "30px",
            flexShrink: 0,
            display: "inline-grid",
            placeItems: "center",
            borderRadius: "9px",
            background: "#0B7770",
          }}
        >
          <ShieldIcon size={23} />
        </span>

<span>© {displayName}</span>

<span aria-hidden="true">·</span>

<Link
  href="/resume"
  className="font-semibold text-[#0B7770] underline underline-offset-2 hover:text-[#075b55]"
>
  {isHebrew ? "קורות חיים" : "Resume"}
</Link>

      </span>

      {/* Bilingual motto */}
      <span className="footer-center" dir={isHebrew ? "rtl" : "ltr"}>
        {t.motto}
      </span>

      {/* External services */}
      <div className="footer-links footer-links--branded" dir="ltr">
        <ExternalServiceLink service="github" label="GitHub" />
        <ExternalServiceLink service="linkedin" label="LinkedIn" />
        <ExternalServiceLink service="email" label={t.email} />
      </div>
    </footer>
  );
}