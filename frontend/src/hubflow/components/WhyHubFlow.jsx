const reasons = [
  {
    number: "01",
    title: "Strategy Before Design",
    text: "We understand the business, offer, audience and operational gaps before building the system.",
  },
  {
    number: "02",
    title: "Built Beyond the Website",
    text: "Websites connect with forms, CRM workflows, follow-ups, alerts, email systems and AI.",
  },
  {
    number: "03",
    title: "Designed for Growth",
    text: "Systems are built to improve lead handling, reduce repetitive work and support scale.",
  },
  {
    number: "04",
    title: "Connected by Design",
    text: "Your website, CRM, automation and business tools work together instead of becoming disconnected pieces.",
  },
];

function WhyHubflow() {
  return (
    <section className="bg-black px-6 py-28 text-white lg:px-12">

      <div className="mx-auto max-w-7xl">

        <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
          Why HubFlow
        </p>

        <h2 className="mt-6 max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl">
          Built for businesses
          <span className="text-gray-600">
            {" "}that want systems.
          </span>
        </h2>

        <div className="mt-20 grid gap-0 border-l border-t border-white/20 sm:grid-cols-2">

          {reasons.map((reason) => (

            <div
              key={reason.number}
              className="border-b border-r border-white/20 p-8 md:p-12"
            >

              <span className="text-sm text-gray-500">
                {reason.number}
              </span>

              <h3 className="mt-16 text-2xl font-semibold">
                {reason.title}
              </h3>

              <p className="mt-4 max-w-md leading-7 text-gray-400">
                {reason.text}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyHubflow;