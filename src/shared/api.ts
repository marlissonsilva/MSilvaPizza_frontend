import { API_URL } from "./apiURL";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("@MSilvaPizza:isAuthenticated");
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }

  return response;
}
