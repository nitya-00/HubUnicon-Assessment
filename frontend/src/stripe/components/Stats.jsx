const stats = [
  {
    value: "135+",
    label: "Countries supported",
  },
  {
    value: "99.99%",
    label: "Platform availability",
  },
  {
    value: "100+",
    label: "Payment methods",
  },
  {
    value: "Millions",
    label: "Businesses served",
  },
];

function Stats() {
  return (
    <section className="bg-white px-6 py-24">

      <div className="mx-auto max-w-7xl">

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((stat) => (

            <div
              key={stat.label}
              className="border-l border-gray-200 pl-6"
            >

              <p className="text-4xl font-bold tracking-tight">
                {stat.value}
              </p>

              <p className="mt-3 text-gray-500">
                {stat.label}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Stats;