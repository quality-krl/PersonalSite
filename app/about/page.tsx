
import Link from "next/link";

const capabilities = [
  {
    title: "Automation Engineering",
    detail:
      "Playwright, Python, Pytest, POM, test fixtures and maintainable test suites.",
  },
  {
    title: "API & Integration Testing",
    detail:
      "HTTP, REST, Postman, Requests, CRUD flows, negative scenarios and state validation.",
  },
  {
    title: "Risk-based QA",
    detail:
      "Critical user journeys, boundary conditions, hidden requirements and meaningful coverage.",
  },
  {
    title: "Test Documentation",
    detail:
      "STP, STD, STR, defect reports, traceability and actionable feedback.",
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="inner-page">
      <div
        className="inner-glow inner-glow--left"
        aria-hidden="true"
      />

      <div className="page-content">
        <p className="page-kicker">
          BEYOND THE TEST CASE
        </p>

        <h1 className="page-title">
          Curious by nature.{" "}
          <span>Precise by design.</span>
        </h1>

        <p className="page-lead">
          I&apos;m Kirill — a QA practitioner building
          toward a career in automation engineering.
          I approach quality as a product responsibility,
          not just a checklist.
        </p>

        {/* My Approach */}
        <div className="about-story glass-surface">
          <div>
            <span className="section-index">
              01 / MY APPROACH
            </span>

            <h2>
              Test what matters.
              Question what is missing.
            </h2>
          </div>

          <p>
            My work centers on risk-based coverage:
            protecting important business flows,
            investigating edge cases, and finding
            problems that written requirements may
            not anticipate. I enjoy turning those
            insights into repeatable, maintainable
            automated checks.
          </p>
        </div>

        {/* Skills and Capabilities */}
        <div className="capabilities">
          {capabilities.map((item, index) => (
            <article
              className="capability glass-surface"
              key={item.title}
            >
              <span className="capability-number">
                0{index + 1}
              </span>

              <h3>{item.title}</h3>

              <p>{item.detail}</p>
            </article>
          ))}
        </div>

        {/* Navigation Actions */}
        <div className="page-bottom-actions">
          <Link
            href="/"
            className="action-btn action-btn--outline"
          >
            Explore projects
            <span aria-hidden="true">←</span>
          </Link>

          <Link
            href="/contact"
            className="action-btn action-btn--primary"
          >
            Get in touch
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
