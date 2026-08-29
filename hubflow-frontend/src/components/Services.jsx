const services = [
  {
    category: "WEBSITES",
    title: "Web Development",
    items: [
      "Business Websites",
      "E-Commerce",
      "Landing Pages",
      "Website Redesign",
      "Client Portals",
    ],
  },
  {
    category: "AI SYSTEMS",
    title: "AI Agents & Knowledge Systems",
    items: [
      "AI Chatbots",
      "Knowledge Bases",
      "Document Q&A",
      "Internal AI Assistants",
      "Human Handoff",
    ],
  },
  {
    category: "AUTOMATION",
    title: "CRM & Workflow Automation",
    items: [
      "CRM Setup",
      "Pipeline Automation",
      "Lead Assignment",
      "Task Automation",
      "System Sync",
    ],
  },
  {
    category: "DATA",
    title: "Document & Data Automation",
    items: [
      "PDF Extraction",
      "Invoice Processing",
      "OCR",
      "Data Entry",
      "File Classification",
    ],
  },
];

function Services() {
  return (
    <section
      id="services"
      className="px-6 py-28 lg:px-12"
    >

      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col justify-between gap-8 border-b border-black pb-10 md:flex-row md:items-end">

          <div>

            <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
              What We Do
            </p>

            <h2 className="mt-5 text-5xl font-bold tracking-tight sm:text-6xl">
              Systems built to
              <br />
              move business forward.
            </h2>

          </div>

          <p className="max-w-md text-gray-600">
            We connect websites, CRM, AI, automation and
            business tools into one connected digital system.
          </p>

        </div>

        <div className="mt-16">

          {services.map((service, index) => (

            <div
              key={service.title}
              className="grid gap-8 border-b border-black/10 py-10 md:grid-cols-12"
            >

              <div className="md:col-span-2">

                <span className="text-sm text-gray-400">
                  0{index + 1}
                </span>

                <p className="mt-3 text-xs font-semibold tracking-widest text-gray-500">
                  {service.category}
                </p>

              </div>

              <div className="md:col-span-4">

                <h3 className="text-3xl font-semibold">
                  {service.title}
                </h3>

              </div>

              <div className="md:col-span-6">

                <div className="grid gap-3 sm:grid-cols-2">

                  {service.items.map((item) => (
                    <div
                      key={item}
                      className="border-b border-black/10 pb-3 text-gray-600"
                    >
                      {item}
                    </div>
                  ))}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Services;