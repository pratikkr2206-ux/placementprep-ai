import api from "./api";

interface QuestionParams {
  role?: string;
  difficulty?: string;
}

export async function getQuestions(
  role?: string,
  difficulty?: string
) {
  const params: QuestionParams = {};

  if (role) {
    params.role = role;
  }

  if (difficulty) {
    params.difficulty = difficulty;
  }

  const response = await api.get("/questions/", {
    params,
  });

  return response.data;
}