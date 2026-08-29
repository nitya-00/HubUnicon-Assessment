import { useState } from "react";

import { api } from "../lib/api";

function AuthPage({ onAuthenticated }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isRegistering = mode === "register";

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isRegistering) {
        await api.register(form);
      }

      const session = await api.login({
        email: form.email,
        password: form.password,
      });
      const user = await api.me(session.access_token);
      window.localStorage.setItem("hubflow_access_token", session.access_token);
      onAuthenticated({ token: session.access_token, user });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#0d1020] px-5 py-10 text-white">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur lg:grid-cols-[1.1fr_0.9fr]">
        <div className="bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 p-8 sm:p-12">
          <a href="/hubflow" className="text-xl font-black tracking-[-0.05em]">HUBFLOW</a>
          <p className="mt-20 text-sm font-semibold uppercase tracking-[0.22em] text-white/70">Automation workspace</p>
          <h1 className="mt-5 max-w-md text-4xl font-bold tracking-tight sm:text-5xl">Turn every lead into a connected system.</h1>
          <p className="mt-6 max-w-md leading-7 text-white/80">Manage contacts, campaigns, subscription plans, and live business stats from one secure workspace.</p>
        </div>

        <div className="bg-[#14182b] p-8 sm:p-12">
          <div className="flex rounded-full bg-white/5 p-1 text-sm">
            {["login", "register"].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => { setMode(value); setError(""); }}
                className={`flex-1 rounded-full px-4 py-2 capitalize transition ${mode === value ? "bg-white text-[#14182b]" : "text-white/65"}`}
              >
                {value}
              </button>
            ))}
          </div>

          <h2 className="mt-10 text-3xl font-bold">{isRegistering ? "Create your workspace" : "Welcome back"}</h2>
          <p className="mt-2 text-sm text-white/60">{isRegistering ? "Start with a secure HubFlow account." : "Sign in to your HubFlow dashboard."}</p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            {isRegistering && (
              <label className="block text-sm font-medium">Full name
                <input name="full_name" value={form.full_name} onChange={updateField} required minLength="1" className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300" />
              </label>
            )}
            <label className="block text-sm font-medium">Email
              <input name="email" type="email" value={form.email} onChange={updateField} required className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300" />
            </label>
            <label className="block text-sm font-medium">Password
              <input name="password" type="password" value={form.password} onChange={updateField} required minLength="8" className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-300" />
            </label>
            {error && <p className="rounded-xl bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>}
            <button disabled={loading} className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-[#14182b] transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? "Please wait…" : isRegistering ? "Create account" : "Sign in"}
            </button>
          </form>
          <a href="/hubflow" className="mt-8 inline-block text-sm text-cyan-200 hover:text-white">← Back to HubFlow</a>
        </div>
      </section>
    </main>
  );
}

export default AuthPage;
