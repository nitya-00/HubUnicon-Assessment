function Footer() {
  return (
    <footer className="border-t border-black/10 px-6 py-10 lg:px-12">

      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">

        <div>

          <h2 className="text-2xl font-black tracking-[-0.05em]">
            HUBFLOW
          </h2>

          <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
            Premium websites and AI automation systems built
            to help businesses capture leads, automate workflows
            and scale.
          </p>

        </div>

        <div className="text-sm text-gray-500">

          <p>
            hello@hubflowhq.com
          </p>

          <p className="mt-2">
            © 2026 HubFlow. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;