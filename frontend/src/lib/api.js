const apiBaseUrl = (
  import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000/api"
).replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path, { token, ...options } = {}) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      body?.detail ?? "The request could not be completed.",
      response.status,
    );
  }

  return body;
}

export const api = {
  register: (payload) => request("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  }),
  login: (payload) => request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  }),
  me: (token) => request("/auth/me", { token }),
  dashboardStats: (token) => request("/dashboard/stats", { token }),
  contacts: (token) => request("/contacts", { token }),
  createContact: (token, payload) => request("/contacts", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  }),
  campaigns: (token) => request("/campaigns", { token }),
  createCampaign: (token, payload) => request("/campaigns", {
    method: "POST",
    token,
    body: JSON.stringify(payload),
  }),
  plans: () => request("/billing/plans"),
  subscription: (token) => request("/billing/subscriptions/me", { token }),
  subscribe: (token, planId) => request("/billing/subscriptions", {
    method: "POST",
    token,
    body: JSON.stringify({ plan_id: planId }),
  }),
};
