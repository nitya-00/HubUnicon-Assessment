function Footer() {
  return (
    <footer className="bg-[#0a2540] px-6 py-16 text-white">

      <div className="mx-auto max-w-7xl">

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          <div>
            <h3 className="text-2xl font-bold">
              stripe
            </h3>

            <p className="mt-5 text-sm leading-6 text-white/60">
              Financial infrastructure for modern businesses.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Products</h4>

            <div className="mt-5 space-y-3 text-sm text-white/60">
              <p>Payments</p>
              <p>Billing</p>
              <p>Connect</p>
              <p>Radar</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Resources</h4>

            <div className="mt-5 space-y-3 text-sm text-white/60">
              <p>Documentation</p>
              <p>Guides</p>
              <p>Support</p>
              <p>API Reference</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Company</h4>

            <div className="mt-5 space-y-3 text-sm text-white/60">
              <p>About</p>
              <p>Careers</p>
              <p>Newsroom</p>
              <p>Contact</p>
            </div>
          </div>

        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-sm text-white/50">
          © 2026 Stripe-inspired demo. Built for technical assessment.
        </div>

      </div>

    </footer>
  );
}

export default Footer;