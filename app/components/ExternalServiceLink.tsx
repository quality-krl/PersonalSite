
"use client";

import { useLanguage } from "./LanguageProvider";

export type ExternalService =
  | "github"
  | "linkedin"
  | "email";

type ExternalServiceLinkProps = {
  service: ExternalService;
  label: string;
  variant?: "footer" | "card";
};

const services = {
  github: {
    href: "https://github.com/quality-krl",
    external: true,
  },
  linkedin: {
    href: "https://www.linkedin.com/in/kirill-kovalevski/",
    external: true,
  },
  email: {
    href: "mailto:kirill.kovalevski.qa@gmail.com",
    external: false,
  },
};

export function ExternalServiceIcon({
  service,
}: {
  service: ExternalService;
}) {
  if (service === "github") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="external-service-icon"
      >
        <path d="M12 .297a12 12 0 0 0-3.793 23.386c.6.111.82-.261.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 1.205.085 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.304-5.466-1.333-5.466-5.93 0-1.311.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 6.006 0c2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.217.694.825.576A12.002 12.002 0 0 0 12 .297z" />
      </svg>
    );
  }

  if (service === "linkedin") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="external-service-icon"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="external-service-icon"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export default function ExternalServiceLink({
  service,
  label,
  variant = "footer",
}: ExternalServiceLinkProps) {
  const { language } = useLanguage();
  const config = services[service];

  const description = config.external
    ? language === "he"
      ? "נפתח בלשונית חדשה"
      : "opens in a new tab"
    : language === "he"
      ? "פתיחת אפליקציית דואר"
      : "opens your email application";

  return (
    <a
      href={config.href}
      target={config.external ? "_blank" : undefined}
      rel={
        config.external
          ? "noopener noreferrer"
          : undefined
      }
      aria-label={`${label} — ${description}`}
      className={[
        "external-brand-link",
        `external-brand-link--${service}`,
        `external-brand-link--${variant}`,
      ].join(" ")}
    >
      <span className="external-brand-link__icon">
        <ExternalServiceIcon service={service} />
      </span>

      <span className="external-brand-link__text">
        {label}
      </span>

      <span
        className="external-brand-link__arrow"
        aria-hidden="true"
      >
        ↗
      </span>
    </a>
  );
}
