
export default function Home() {
  return (
    <main className="min-h-screen scroll-smooth bg-zinc-950 text-white">

      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-3 px-6 py-4 sm:justify-between"
        >
          <a
            href="#home"
            className="text-xl font-bold text-cyan-400"
          >
            Kirill Kovalevski
          </a>

          <div className="flex flex-wrap justify-center gap-5 text-sm text-zinc-300">
            <a href="#about" className="transition-colors hover:text-cyan-400">
              About
            </a>
            <a href="#skills" className="transition-colors hover:text-cyan-400">
              Skills
            </a>
            <a href="#projects" className="transition-colors hover:text-cyan-400">
              Projects
            </a>
            <a href="#contact" className="transition-colors hover:text-cyan-400">
              Contact
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="flex min-h-screen scroll-mt-24 flex-col items-center justify-center px-6 text-center"
      >
        <h1 className="text-5xl font-bold tracking-tight">
          Kirill Kovalevski
        </h1>

        <h2 className="mt-4 text-2xl font-medium text-cyan-400">
          QA Automation Engineer
        </h2>

        <p className="mt-6 max-w-xl text-lg text-zinc-400">
          Building reliable test automation solutions with Python,
          Playwright, and modern QA practices.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#projects"
            className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-black transition-colors hover:bg-cyan-400"
          >
            View My Projects
          </a>

          <a
            href="#about"
            className="rounded-lg border border-zinc-600 px-6 py-3 font-semibold text-white transition-colors hover:border-cyan-400 hover:text-cyan-400"
          >
            About Me
          </a>

          <a
            href="#skills"
            className="rounded-lg border border-zinc-600 px-6 py-3 font-semibold text-white transition-colors hover:border-cyan-400 hover:text-cyan-400"
          >
            My Skills
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="scroll-mt-24 px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold">
            About Me
          </h2>

          <p className="mt-8 text-lg leading-8 text-zinc-400">
            I am a QA Automation Engineer focused on building
            reliable, maintainable, and scalable test automation
            solutions.
          </p>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            My testing philosophy emphasizes risk-based coverage,
            critical business workflows, and identifying hidden
            defects beyond documented requirements.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="scroll-mt-24 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-4xl font-bold">
            Skills & Technologies
          </h2>

          <p className="mt-4 text-center text-zinc-400">
            Technologies and tools I use in software testing
            and test automation.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              "Python",
              "Playwright",
              "Pytest",
              "REST API",
              "Postman",
              "SQL",
              "Git",
              "GitHub",
            ].map((skill) => (
              <div
                key={skill}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center transition-colors hover:border-cyan-500"
              >
                <span className="font-medium text-zinc-200">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="min-h-screen scroll-mt-24 px-6 py-24"
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-4xl font-bold">
            My Projects
          </h2>

          <p className="mt-4 text-center text-zinc-400">
            Explore my QA automation and software testing projects.
          </p>

          <div className="mt-12 rounded-xl border border-zinc-800 bg-zinc-900 p-8">
            <h3 className="text-2xl font-semibold text-cyan-400">
              Sylius QA Automation
            </h3>

            <p className="mt-4 text-zinc-400">
              An ongoing QA automation project using Python,
              Playwright, Pytest, and API testing.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                "Python",
                "Playwright",
                "Pytest",
                "REST API",
                "Requests",
                "Git",
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href="https://github.com/quality-krl/sylius-automation"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-lg border border-cyan-500 px-6 py-3 font-semibold text-cyan-400 transition-colors hover:bg-cyan-500 hover:text-black"
            >
              View on GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-24 px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold">
            Get In Touch
          </h2>

          <p className="mt-6 text-lg text-zinc-400">
            Interested in discussing QA automation, software testing,
            or potential opportunities? Feel free to connect with me.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/quality-krl"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-black transition-colors hover:bg-cyan-400"
            >
              GitHub Profile ↗
            </a>

            <a
              href="https://www.linkedin.com/in/kirill-kovalevski/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-cyan-500 px-6 py-3 font-semibold text-cyan-400 transition-colors hover:bg-cyan-500 hover:text-black"
            >
              LinkedIn ↗
            </a>

            <a
              href="mailto:kirill.kovalevski.qa@gmail.com"
              className="rounded-lg border border-zinc-600 px-6 py-3 font-semibold text-white transition-colors hover:border-cyan-400 hover:text-cyan-400"
            >
              Send Email ✉
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
