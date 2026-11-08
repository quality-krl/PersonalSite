import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kirill Kovalevski | QA Automation Engineer",
  description:
    "QA Automation, API testing and risk-based quality engineering. Explore Kirill Kovalevski's portfolio and case studies.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <a className="skip-link" href="#main-content">Skip to content</a>
          <header className="site-header">
            <div className="header-inner">
              <Link className="brand" href="/" aria-label="Kirill Kovalevski — Home">
                <span className="brand-mark" aria-hidden="true"><span>K</span><span className="brand-spark" /></span>
                <span className="brand-copy"><strong>Kirill Kovalevski</strong><small>QUALITY ENGINEERING</small></span>
              </Link>
              <nav className="site-nav" aria-label="Main navigation">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link className="nav-contact" href="/contact">Let's talk <span aria-hidden="true">↗</span></Link>
              </nav>
            </div>
          </header>
          {children}
          <footer className="site-footer">
            <span>© Kirill Kovalevski</span>
            <span className="footer-center">BUILT WITH CURIOSITY · TESTED WITH PURPOSE</span>
            <div className="footer-links">
              <a href="https://github.com/quality-krl" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/kirill-kovalevski/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="mailto:kirill.kovalevski.qa@gmail.com">Email</a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}