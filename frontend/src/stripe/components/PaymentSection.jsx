function PaymentSection() {
  return (
    <section
      id="solutions"
      className="bg-[#f6f9fc] px-6 py-24"
    >

      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

        <div>

          <p className="text-sm font-semibold uppercase tracking-widest text-[#635bff]">
            Payments
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
            Increase your revenue with smarter payments
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-500">
            Give customers a fast and reliable checkout experience
            while gaining the tools you need to optimize payments.
          </p>

          <button className="mt-8 rounded-full bg-[#635bff] px-6 py-3 font-semibold text-white transition hover:opacity-90">
            Explore payments
          </button>

        </div>

        <div className="rounded-3xl bg-white p-6 shadow-xl">

          <div className="rounded-2xl border border-gray-200 p-6">

            <div className="flex items-center justify-between">
              <span className="font-semibold">
                Checkout
              </span>

              <span className="text-sm text-gray-400">
                Secure
              </span>
            </div>

            <div className="mt-8 space-y-4">

              <div>
                <label className="text-sm text-gray-500">
                  Email
                </label>

                <div className="mt-2 rounded-lg border border-gray-200 p-3 text-sm">
                  customer@example.com
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">
                  Card
                </label>

                <div className="mt-2 rounded-lg border border-gray-200 p-3 text-sm">
                  •••• •••• •••• 4242
                </div>
              </div>

              <button className="w-full rounded-lg bg-[#635bff] py-3 font-semibold text-white">
                Pay $49.00
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default PaymentSection;