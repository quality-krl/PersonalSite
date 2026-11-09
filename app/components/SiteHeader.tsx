
"use client";

import Link from "next/link";

import { useLanguage } from "./LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import { translations } from "../i18n/translations";

export default function SiteHeader() {
  const { language } = useLanguage();

  const t = translations[language];

  const isHebrew = language === "he";

  const displayName = isHebrew
    ? "קיריל קובלבסקי"
    : "Kirill Kovalevski";

  return (
    <>
      {/* Accessibility */}
      <a
        className="skip-link"
        href="#main-content"
      >
        {t.navigation.skip}
      </a>

      {/* Site header */}
      <header className="site-header">

<div
  className={`header-inner header-inner--language-layout ${
    isHebrew ? "header-inner--hebrew" : "header-inner--english"
  }`}
  dir="ltr"
>

          {/* Brand */}
          <Link
            className="brand"
            href="/"
            aria-label={`${displayName} — ${t.navigation.home}`}
          >
            <span
              className="brand-mark"
              aria-hidden="true"
            >
              <span>K</span>
              <span className="brand-spark" />
            </span>

            <span className="brand-copy">
              <strong dir={isHebrew ? "rtl" : "ltr"}>
                {displayName}
              </strong>

              <small dir={isHebrew ? "rtl" : "ltr"}>
                {t.navigation.tagline}
              </small>
            </span>
          </Link>

          {/* Centered navigation */}
          <nav
            className="site-nav header-primary-nav"
            aria-label={
              isHebrew
                ? "ניווט ראשי"
                : "Main navigation"
            }
            dir={isHebrew ? "rtl" : "ltr"}
          >
            <Link href="/">
              {t.navigation.home}
            </Link>

            <Link href="/about">
              {t.navigation.about}
            </Link>

            <Link
              className="nav-contact"
              href="/contact"
            >
              {t.navigation.contact}

              <span aria-hidden="true">
                ↗
              </span>
            </Link>
          </nav>

          {/* Independent language switcher */}
          <div className="header-language-slot">
            <LanguageSwitcher />
          </div>
        </div>
      </header>
    </>
  );
}
