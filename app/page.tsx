
export default function Home() {
  return (
    <main className="min-h-screen scroll-smooth bg-zinc-950 text-white">

      {/* Hero Section */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">

        <h1 className="text-5xl font-bold tracking-tight">
          Kirill Kovalevski
        </h1>

        <h2 className="mt-4 text-2xl font-medium text-cyan-400">
          QA Automation Engineer
        </h2>

        <p className="mt-6 max-w-xl text-lg text-zinc-400">
          Building reliable test automation solutions
          with Python, Playwright, and modern QA practices.
        </p>

        <a
          href="#projects"
          className="mt-8 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-black transition-colors hover:bg-cyan-400"
        >
          View My Projects
        </a>

      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="min-h-screen px-6 py-24"
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

          </div>

        </div>
      </section>

    </main>
  );
}
