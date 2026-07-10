import api from "./api";

export async function getInterviewHistory() {
  const token = localStorage.getItem("access_token");

  const response = await api.get("/history/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}