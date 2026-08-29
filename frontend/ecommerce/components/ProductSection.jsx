function HeroProduct() {
  return (
    <section
      id="store"
      className="overflow-hidden bg-[#f5f5f7] px-5 py-20 text-center md:py-28"
    >

      <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
        New
      </p>

      <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">
        NOVA Phone X
      </h1>

      <p className="mt-5 text-xl text-gray-600 md:text-2xl">
        Built for what's next.
      </p>

      <div className="mt-8 flex justify-center gap-4">

        <button className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
          Learn More
        </button>

        <button className="rounded-full border border-blue-600 px-6 py-3 text-sm font-medium text-blue-600 transition hover:bg-blue-50">
          Buy
        </button>

      </div>

      {/* Product Visual */}
      <div className="mx-auto mt-16 flex h-80 max-w-4xl items-center justify-center rounded-3xl bg-black md:h-[450px]">

        <div className="h-64 w-32 rounded-[2.5rem] border-4 border-gray-700 bg-gray-900 shadow-2xl md:h-80 md:w-40">

          <div className="mx-auto mt-4 h-6 w-20 rounded-full bg-black"></div>

          <div className="mt-20 text-xs text-gray-500">
            NOVA
          </div>

        </div>

      </div>

    </section>
  );
}

export default HeroProduct;