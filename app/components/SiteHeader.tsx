
"use client";

import Link from "next/link";

import { useLanguage } from "./LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";
import { translations } from "../i18n/translations";

export default function SiteHeader() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
      <a className="skip-link" href="#main-content">
        {t.navigation.skip}
      </a>

      <header className="site-header">
        <div
          className="header-inner header-inner--language-layout"
          dir="ltr"
        >
          {/* Brand - always on the right */}
          <Link
            className="brand"
            href="/"
            aria-label={`Kirill Kovalevski — ${t.navigation.home}`}
          >
            <span className="brand-mark" aria-hidden="true">
              <span>K</span>
              <span className="brand-spark" />
            </span>

            <span className="brand-copy">
              <strong dir="ltr">
                Kirill Kovalevski
              </strong>
              <small>{t.navigation.tagline}</small>
            </span>
          </Link>

          {/* Navigation - centered independently */}
          <nav
            className="site-nav header-primary-nav"
            aria-label="Main navigation"
            dir={language === "he" ? "rtl" : "ltr"}
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
              <span aria-hidden="true">↗</span>
            </Link>
          </nav>

          {/* Language control - separate from navigation */}
          <div className="header-language-slot">
            <LanguageSwitcher />
          </div>
        </div>
      </header>
    </>
  );
}
