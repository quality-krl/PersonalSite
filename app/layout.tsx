
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Sora, Manrope, Heebo } from "next/font/google";

import { LanguageProvider } from "./components/LanguageProvider";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

import "./globals.css";

// Display font: distinctive geometric headings
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Body font: clean and professional
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Hebrew font: refined and highly readable
const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-hebrew",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kirill Kovalevski | QA Automation Engineer",
  description:
    "QA Automation, API testing and risk-based quality engineering. Explore Kirill Kovalevski's portfolio and case studies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={[
          sora.variable,
          manrope.variable,
          heebo.variable,
        ].join(" ")}
      >
        <LanguageProvider>
          <div className="site-shell">
            <SiteHeader />

            {children}

            <SiteFooter />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}