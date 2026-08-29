import { useEffect, useState } from "react";

import AuthPage from "./AuthPage";
import { api, ApiError } from "../lib/api";

const emptyStats = { contact_count: 0, active_campaign_count: 0, messages_sent: 0 };

function DashboardApp() {
  const [token, setToken] = useState(() => window.localStorage.getItem("hubflow_access_token"));
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(emptyStats);
  const [contacts, setContacts] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [plans, setPlans] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));
  const [message, setMessage] = useState("");
  const [contactForm, setContactForm] = useState({ first_name: "", email: "", company: "" });
  const [campaignForm, setCampaignForm] = useState({ name: "", audience_size: 0 });

  async function loadWorkspace(activeToken = token) {
    if (!activeToken) return;
    setLoading(true);
    setMessage("");

    try {
      const [profile, dashboard, contactList, campaignList, planList] = await Promise.all([
        api.me(activeToken),
        api.dashboardStats(activeToken),
        api.contacts(activeToken),
        api.campaigns(activeToken),
        api.plans(),
      ]);
      setUser(profile);
      setStats(dashboard);
      setContacts(contactList);
      setCampaigns(campaignList);
      setPlans(planList);

      try {
        setSubscription(await api.subscription(activeToken));
      } catch (requestError) {
        if (!(requestError instanceof ApiError) || requestError.status !== 404) throw requestError;
        setSubscription(null);
      }
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 401) {
        logout();
        return;
      }
      setMessage(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      loadWorkspace();
    }, 0);

    return () => window.clearTimeout(loadTimer);
  }, []);

  function logout() {
    window.localStorage.removeItem("hubflow_access_token");
    setToken(null);
    setUser(null);
  }

  function authenticated(session) {
    setToken(session.token);
    setUser(session.user);
    loadWorkspace(session.token);
  }

  async function createContact(event) {
    event.preventDefault();
    try {
      await api.createContact(token, contactForm);
      setContactForm({ first_name: "", email: "", company: "" });
      setMessage("Contact added to your CRM.");
      loadWorkspace();
    } catch (requestError) {
      setMessage(requestError.message);
    }
  }

  async function createCampaign(event) {
    event.preventDefault();
    try {
      await api.createCampaign(token, { ...campaignForm, audience_size: Number(campaignForm.audience_size) });
      setCampaignForm({ name: "", audience_size: 0 });
      setMessage("Campaign created.");
      loadWorkspace();
    } catch (requestError) {
      setMessage(requestError.message);
    }
  }

  async function subscribe(planId) {
    try {
      setSubscription(await api.subscribe(token, planId));
      setMessage("Subscription started. A pending payment record was created.");
    } catch (requestError) {
      setMessage(requestError.message);
    }
  }

  if (!token) return <AuthPage onAuthenticated={authenticated} />;

  const statCards = [
    ["CRM contacts", stats.contact_count, "Leads in your active system"],
    ["Active campaigns", stats.active_campaign_count, "Campaigns ready or already sent"],
    ["Messages sent", stats.messages_sent, "Recorded campaign delivery activity"],
  ];

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="/hubflow" className="text-xl font-black tracking-[-0.05em]">HUBFLOW</a>
          <div className="flex items-center gap-4"><span className="hidden text-sm text-slate-500 sm:block">{user?.full_name ?? "Loading workspace…"}</span><button onClick={logout} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100">Sign out</button></div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Operations dashboard</p><h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Your system, in motion.</h1><p className="mt-3 max-w-2xl text-slate-600">A real workspace powered by FastAPI, PostgreSQL, JWT authentication, and user-scoped Redis dashboard caching.</p></div>
          <button onClick={() => loadWorkspace()} className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-700">Refresh data</button>
        </div>

        {message && <p className="mt-6 rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-800">{message}</p>}
        {loading && <p className="mt-6 text-sm text-slate-500">Loading your workspace…</p>}

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {statCards.map(([label, value, detail]) => <article key={label} className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm"><p className="text-sm text-white/60">{label}</p><p className="mt-4 text-5xl font-bold">{value}</p><p className="mt-4 text-sm text-white/70">{detail}</p></article>)}
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-2">
          <article className="rounded-2xl bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><h2 className="text-xl font-bold">CRM contacts</h2><span className="text-sm text-slate-500">{contacts.length} total</span></div><form onSubmit={createContact} className="mt-6 grid gap-3 sm:grid-cols-3"><input placeholder="Name" value={contactForm.first_name} onChange={(event) => setContactForm({ ...contactForm, first_name: event.target.value })} className="rounded-xl border border-slate-200 px-3 py-2" /><input required type="email" placeholder="Email" value={contactForm.email} onChange={(event) => setContactForm({ ...contactForm, email: event.target.value })} className="rounded-xl border border-slate-200 px-3 py-2" /><input placeholder="Company" value={contactForm.company} onChange={(event) => setContactForm({ ...contactForm, company: event.target.value })} className="rounded-xl border border-slate-200 px-3 py-2" /><button className="rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white sm:col-span-3">Add contact</button></form><div className="mt-6 space-y-3">{contacts.slice(0, 4).map((contact) => <div key={contact.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"><span className="font-medium">{contact.first_name || "Unnamed contact"}</span><span className="text-sm text-slate-500">{contact.email || contact.company || "No details"}</span></div>)}{contacts.length === 0 && <p className="text-sm text-slate-500">Add your first lead to begin.</p>}</div></article>

          <article className="rounded-2xl bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><h2 className="text-xl font-bold">Campaigns</h2><span className="text-sm text-slate-500">{campaigns.length} total</span></div><form onSubmit={createCampaign} className="mt-6 grid gap-3 sm:grid-cols-[1fr_140px]"><input required placeholder="Campaign name" value={campaignForm.name} onChange={(event) => setCampaignForm({ ...campaignForm, name: event.target.value })} className="rounded-xl border border-slate-200 px-3 py-2" /><input type="number" min="0" value={campaignForm.audience_size} onChange={(event) => setCampaignForm({ ...campaignForm, audience_size: event.target.value })} className="rounded-xl border border-slate-200 px-3 py-2" /><button className="rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white sm:col-span-2">Create campaign</button></form><div className="mt-6 space-y-3">{campaigns.slice(0, 4).map((campaign) => <div key={campaign.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"><span className="font-medium">{campaign.name}</span><span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">{campaign.status} · {campaign.audience_size} leads</span></div>)}{campaigns.length === 0 && <p className="text-sm text-slate-500">Create a campaign to organize outreach.</p>}</div></article>
        </section>

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><h2 className="text-xl font-bold">Plans & billing</h2><p className="mt-1 text-sm text-slate-500">{subscription ? `Current subscription: ${subscription.status}` : "Choose a plan to activate your workspace."}</p></div>{subscription && <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">Plan #{subscription.plan_id} active</span>}</div><div className="mt-6 grid gap-4 md:grid-cols-3">{plans.map((plan) => <article key={plan.id} className="rounded-2xl border border-slate-200 p-5"><h3 className="font-bold">{plan.name}</h3><p className="mt-3 text-3xl font-bold">₹{Number(plan.price).toLocaleString("en-IN")}</p><p className="mt-3 min-h-10 text-sm text-slate-500">{plan.description}</p><button disabled={Boolean(subscription)} onClick={() => subscribe(plan.id)} className="mt-5 w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40">{subscription ? "Current plan selected" : "Choose plan"}</button></article>)}</div></section>
      </div>
    </main>
  );
}

export default DashboardApp;
