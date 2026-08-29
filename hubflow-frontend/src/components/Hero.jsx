function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen px-6 pb-20 pt-40 lg:px-12"
    >

      <div className="mx-auto max-w-7xl">

        <p className="mb-8 text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
          Digital Systems • AI • Automation
        </p>

        <h1 className="max-w-6xl text-[14vw] font-black leading-[0.82] tracking-[-0.07em] sm:text-8xl lg:text-[9rem]">

          WE BUILD.
          <br />

          WE AUTOMATE.
          <br />

          <span className="text-gray-400">
            YOU SCALE.
          </span>

        </h1>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">

          <p className="max-w-xl text-xl leading-8 text-gray-600 lg:text-2xl">
            Premium websites and AI automation systems built to
            help businesses capture leads, automate workflows,
            and scale with less manual work.
          </p>

          <div className="flex items-start lg:justify-end">

            <a
              href="#contact"
              className="group flex items-center gap-4 rounded-full bg-black px-7 py-4 text-white"
            >
              Start a Project

              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>

            </a>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;