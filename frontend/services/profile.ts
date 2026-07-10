import api from "./api";

export async function getProfile() {
  const token = localStorage.getItem("access_token");

  const response = await api.get("/profile/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function updateProfile(data: {
  full_name: string;
  email: string;
}) {
  const token = localStorage.getItem("access_token");

  const response = await api.put("/profile/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}