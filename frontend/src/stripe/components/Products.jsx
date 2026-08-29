const products = [
  {
    title: "Payments",
    description:
      "Accept payments online and in person with a flexible global payment platform.",
    icon: "↗",
  },
  {
    title: "Billing",
    description:
      "Build subscriptions, recurring revenue, invoices, and flexible pricing models.",
    icon: "$",
  },
  {
    title: "Connect",
    description:
      "Build marketplaces and platforms that move money between multiple parties.",
    icon: "◈",
  },
];

function Products() {
  return (
    <section
      id="products"
      className="bg-white px-6 py-24"
    >

      <div className="mx-auto max-w-7xl">

        <div className="max-w-2xl">

          <p className="text-sm font-semibold uppercase tracking-widest text-[#635bff]">
            Products
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            A complete financial toolkit
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-500">
            Everything you need to accept payments, manage revenue,
            and build financial experiences.
          </p>

        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">

          {products.map((product) => (

            <div
              key={product.title}
              className="rounded-3xl border border-gray-200 p-8 transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#635bff] text-xl font-bold text-white">
                {product.icon}
              </div>

              <h3 className="mt-8 text-2xl font-semibold">
                {product.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-500">
                {product.description}
              </p>

              <button className="mt-8 font-semibold text-[#635bff]">
                Learn more →
              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Products;