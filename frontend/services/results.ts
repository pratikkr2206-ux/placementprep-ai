import api from "./api";

export async function getResults(sessionId: number) {
  const token = localStorage.getItem("access_token");

  const response = await api.get(
    `/results/${sessionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}