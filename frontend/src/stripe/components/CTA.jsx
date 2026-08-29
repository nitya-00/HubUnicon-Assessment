function CTA() {
  return (
    <section
      id="pricing"
      className="bg-[#635bff] px-6 py-24 text-center text-white"
    >

      <div className="mx-auto max-w-4xl">

        <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
          Ready to build your financial future?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
          Start building with powerful financial infrastructure
          designed to grow with your business.
        </p>

        <div className="mt-10 flex justify-center gap-4">

          <button className="rounded-full bg-white px-7 py-3.5 font-semibold text-gray-900">
            Start now
          </button>

          <button className="rounded-full border border-white/40 px-7 py-3.5 font-semibold">
            Contact sales
          </button>

        </div>

      </div>

    </section>
  );
}

export default CTA;