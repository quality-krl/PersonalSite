import Link from "next/link";

const ways = [
  { number: "01", label: "EMAIL", title: "Let's start a conversation", detail: "kirill.kovalevski.qa@gmail.com", href: "mailto:kirill.kovalevski.qa@gmail.com", cta: "Write an email" },
  { number: "02", label: "LINKEDIN", title: "Let's connect professionally", detail: "linkedin.com/in/kirill-kovalevski", href: "https://www.linkedin.com/in/kirill-kovalevski/", cta: "Open LinkedIn" },
  { number: "03", label: "GITHUB", title: "Explore the code", detail: "github.com/quality-krl", href: "https://github.com/quality-krl", cta: "Open GitHub" },
];

export default function ContactPage() {
  return (
    <main id="main-content" className="inner-page contact-page">
      <div className="inner-glow" aria-hidden="true" />
      <div className="page-content">
        <p className="page-kicker">SAY HELLO</p>
        <h1 className="page-title">Great work starts with <span>a conversation.</span></h1>
        <p className="page-lead">QA opportunities, automation projects or an interesting technical challenge — I'd be glad to hear from you.</p>
        <div className="contact-grid">
          {ways.map((way) => (
            <article className="contact-card glass-surface" key={way.number}>
              <span className="section-index">{way.number} / {way.label}</span>
              <h2>{way.title}</h2>
              <p>{way.detail}</p>
              <a className="action-btn action-btn--outline" href={way.href} target={way.href.startsWith("https") ? "_blank" : undefined} rel={way.href.startsWith("https") ? "noopener noreferrer" : undefined}>
                {way.cta} <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
        <p className="contact-cv-note">Resume downloads in English and Hebrew will be added when the approved PDF files are ready.</p>
        <div className="page-bottom-actions"><Link href="/" className="action-btn action-btn--primary">Back to projects <span aria-hidden="true">←</span></Link></div>
      </div>
    </main>
  );
}