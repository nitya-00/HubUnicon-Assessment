const steps = [
  {
    number: "01",
    title: "Discover the System",
    description:
      "We understand your business, customers, workflows and where manual work is slowing you down.",
  },
  {
    number: "02",
    title: "Design the Architecture",
    description:
      "We map the website, CRM, automation and integrations into one connected system.",
  },
  {
    number: "03",
    title: "Build & Automate",
    description:
      "We develop the digital experience and connect the workflows, AI and business tools.",
  },
  {
    number: "04",
    title: "Launch & Optimize",
    description:
      "We test the complete system, launch it and continuously improve the weak points.",
  },
];

function Process() {
  return (
    <section
      id="process"
      className="px-6 py-28 lg:px-12"
    >

      <div className="mx-auto max-w-7xl">

        <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
          The HubFlow Process
        </p>

        <h2 className="mt-6 max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl">
          From idea to
          <span className="text-gray-400">
            {" "}connected system.
          </span>
        </h2>

        <div className="mt-20">

          {steps.map((step) => (

            <div
              key={step.number}
              className="grid gap-6 border-t border-black/15 py-10 md:grid-cols-12"
            >

              <div className="md:col-span-2">

                <span className="text-sm font-bold text-gray-400">
                  {step.number}
                </span>

              </div>

              <div className="md:col-span-4">

                <h3 className="text-3xl font-semibold">
                  {step.title}
                </h3>

              </div>

              <div className="md:col-span-6">

                <p className="max-w-xl text-lg leading-8 text-gray-600">
                  {step.description}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Process;