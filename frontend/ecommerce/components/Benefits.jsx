const benefits = [
  {
    title: "Free Delivery",
    description: "Free delivery on eligible orders.",
    icon: "🚚",
  },
  {
    title: "Easy Returns",
    description: "Simple returns within 14 days.",
    icon: "↩️",
  },
  {
    title: "Secure Payment",
    description: "Your payments are protected.",
    icon: "🔒",
  },
  {
    title: "Expert Support",
    description: "Get help from our product specialists.",
    icon: "💬",
  },
];

function Benefits() {
  return (
    <section
      id="audio"
      className="bg-[#f5f5f7] px-5 py-20"
    >

      <div className="mx-auto max-w-6xl">

        <h2 className="text-center text-3xl font-bold">
          Why shop NOVA?
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {benefits.map((benefit) => (

            <div
              key={benefit.title}
              className="rounded-2xl bg-white p-7 text-center"
            >

              <div className="text-3xl">
                {benefit.icon}
              </div>

              <h3 className="mt-5 font-semibold">
                {benefit.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {benefit.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Benefits;