function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#635bff] px-6 pb-24 pt-36 text-white">

      {/* Decorative shapes */}
      <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#80e9ff] opacity-40 blur-3xl" />

      <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#ff80ff] opacity-30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        <div className="max-w-4xl">

          <p className="mb-6 text-sm font-semibold uppercase tracking-widest">
            Financial infrastructure
          </p>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Financial infrastructure for the internet
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
            Build, run, and scale your business with a complete
            payments and financial platform designed for modern
            companies.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <button className="rounded-full bg-white px-7 py-3.5 font-semibold text-gray-900 transition hover:bg-gray-100">
              Start now
            </button>

            <button className="rounded-full border border-white/40 px-7 py-3.5 font-semibold transition hover:bg-white/10">
              Contact sales →
            </button>

          </div>

        </div>

        {/* Payment Card Visual */}
        <div className="relative mt-20 flex justify-center lg:justify-end">

          <div className="w-full max-w-md rotate-[-4deg] rounded-3xl bg-white p-7 text-gray-900 shadow-2xl">

            <div className="flex items-center justify-between">

              <span className="font-semibold">
                Payment
              </span>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Successful
              </span>

            </div>

            <div className="mt-10">

              <p className="text-sm text-gray-500">
                Amount
              </p>

              <p className="mt-2 text-4xl font-bold">
                $2,450.00
              </p>

            </div>

            <div className="mt-10 h-3 overflow-hidden rounded-full bg-gray-100">

              <div className="h-full w-3/4 rounded-full bg-[#635bff]" />

            </div>

            <div className="mt-6 flex justify-between text-sm text-gray-500">
              <span>Payment processed</span>
              <span>100%</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;