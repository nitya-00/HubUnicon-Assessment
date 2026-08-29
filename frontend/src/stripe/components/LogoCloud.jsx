const companies = [
  "NOVA",
  "SHOPLY",
  "ORBIT",
  "FLOW",
  "VERTEX",
  "LUMA",
];

function LogoCloud() {
  return (
    <section className="bg-white px-6 py-16">

      <div className="mx-auto max-w-7xl">

        <p className="text-center text-sm font-medium text-gray-500">
          Powering businesses around the world
        </p>

        <div className="mt-10 grid grid-cols-2 gap-8 text-center font-semibold text-gray-400 sm:grid-cols-3 lg:grid-cols-6">

          {companies.map((company) => (
            <div key={company}>
              {company}
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default LogoCloud;