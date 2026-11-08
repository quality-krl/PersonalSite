import ProjectCarousel from "./components/ProjectCarousel";

export default function Home() {
  return (
    <main id="main-content" className="home-page">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="ambient ambient-three" aria-hidden="true" />
      <div className="tiny-grid" aria-hidden="true" />

      <section className="hero-intro" aria-labelledby="hero-title">
        <div className="hero-eyebrow"><span className="status-dot" /> AVAILABLE FOR QA OPPORTUNITIES</div>
        <p className="hero-hello">Hi, I'm Kirill <span aria-hidden="true">✳</span></p>
        <h1 id="hero-title">Quality is in <span className="hero-gradient">the details.</span></h1>
        <div className="role-label"><span className="role-line" /> QA AUTOMATION ENGINEER</div>
        <p className="hero-description">I turn complex user journeys into reliable, intuitive experiences — through thoughtful testing, automation and a relentless eye for what matters.</p>
        <div className="hero-actions">
          <a className="action-btn action-btn--primary" href="#showcase">Explore work <span aria-hidden="true">↗</span></a>
          <a className="action-btn action-btn--outline" href="/about">About me <span aria-hidden="true">→</span></a>
        </div>
        <div className="hero-note"><span className="hero-note-line" /> AUTOMATION · API · RISK-BASED QA</div>
      </section>

      <ProjectCarousel />
    </main>
  );
}