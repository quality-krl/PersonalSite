
"use client";

import Link from "next/link";

import { useLanguage } from "../components/LanguageProvider";
import { translations } from "../i18n/translations";

import ExternalServiceLink, {
  ExternalServiceIcon,
  type ExternalService,
} from "../components/ExternalServiceLink";

export default function ContactPage() {
  const { language } = useLanguage();
  const t = translations[language].contact;

  const contactMethods: {
    number: string;
    service: ExternalService;
    label: string;
    title: string;
    detail: string;
    action: string;
  }[] = [
    {
      number: "01",
      service: "email",
      label: t.emailLabel,
      title: t.emailTitle,
      detail: "kirill.kovalevski.qa@gmail.com",
      action: t.emailAction,
    },
    {
      number: "02",
      service: "linkedin",
      label: t.linkedinLabel,
      title: t.linkedinTitle,
      detail: "linkedin.com/in/kirill-kovalevski",
      action: t.linkedinAction,
    },
    {
      number: "03",
      service: "github",
      label: t.githubLabel,
      title: t.githubTitle,
      detail: ".github.com/quality-krl",
      action: t.githubAction,
    },
  ];

  return (
    <main
      id="main-content"
      className="inner-page contact-page"
      dir={language === "he" ? "rtl" : "ltr"}
    >
      <div
        className="inner-glow inner-glow--left"
        aria-hidden="true"
      />

      <div className="page-content">
        <p className="page-kicker">
          {t.kicker}
        </p>

        <h1 className="page-title">
          {t.title}{" "}
          <span>{t.titleAccent}</span>
        </h1>

        <p className="page-lead">
          {t.introduction}
        </p>

        <div className="mt-10 grid w-full grid-cols-1 gap-5 md:grid-cols-3">
          {contactMethods.map((method) => (
            <article
              key={method.service}
              className="
                contact-card glass-surface
                flex h-full flex-col items-center
                rounded-3xl p-7 text-center
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-xl
              "
            >
              <div
                className={
                  "external-service-badge " +
                  `external-service-badge--${method.service}`
                }
              >
                <ExternalServiceIcon
                  service={method.service}
                />
              </div>

              <span className="section-index mt-5">
                {method.number} / {method.label}
              </span>

              <h2 className="mt-4 text-xl font-semibold tracking-tight text-[#19343D]">
                {method.title}
              </h2>

              <p
                dir="ltr"
                className="mt-3 max-w-full break-words text-center text-sm text-[#637879]"
                style={{ overflowWrap: "anywhere" }}
              >
                {method.detail}
              </p>

              <div className="mt-auto w-full pt-8">
                <ExternalServiceLink
                  service={method.service}
                  label={method.action}
                  variant="card"
                />
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-[#637879]">
          {t.resumeNote}
        </p>

        <div className="page-bottom-actions mt-9">
          <Link
            href="/"
            className="action-btn action-btn--primary"
          >
            <span>{t.backToProjects}</span>
            <span aria-hidden="true">←</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
