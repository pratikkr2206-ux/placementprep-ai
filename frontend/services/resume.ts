import api from "./api";

export async function uploadResume(file: File) {
  const token = localStorage.getItem("access_token");

  const formData = new FormData();

  formData.append("resume", file);

  const response = await api.post(
    "/resume/upload",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function startResumeInterview(
  resumeId: number
) {
  const token = localStorage.getItem("access_token");

  const response = await api.post(
    `/resume/${resumeId}/start`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}