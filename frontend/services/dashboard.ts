import api from "./api";

export async function getDashboardStats() {
  const token = localStorage.getItem("access_token");

  const response = await api.get("/dashboard/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}