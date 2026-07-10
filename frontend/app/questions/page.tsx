"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import EmptyState from "@/components/ui/EmptyState";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

import { getQuestions } from "@/services/questions";

interface Question {
  id: number;
  question: string;
  answer: string;
  category: string;
  role: string;
  difficulty: string;
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const loadQuestions = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getQuestions(
        role || undefined,
        difficulty || undefined
      );

      setQuestions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [role, difficulty]);

  useEffect(() => {
    void loadQuestions();
  }, [loadQuestions]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) =>
      question.question
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [questions, search]);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Question Bank
        </h1>

        <p className="mt-2 text-slate-500">
          Browse interview questions by role and
          difficulty.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-md">
        <div className="grid gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Search question..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="rounded-xl border p-3"
          />

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="rounded-xl border p-3"
          >
            <option value="">All Roles</option>
            <option>Java Developer</option>
            <option>Python Developer</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Full Stack Developer</option>
          </select>

          <select
            value={difficulty}
            onChange={(e) =>
              setDifficulty(e.target.value)
            }
            className="rounded-xl border p-3"
          >
            <option value="">
              All Difficulty
            </option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : filteredQuestions.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="No Questions Found"
            description="Try changing your search keywords or selected filters."
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-6">
          {filteredQuestions.map((question) => (
            <div
              key={question.id}
              className="rounded-2xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                  {question.role}
                </span>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  {question.difficulty}
                </span>

                <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                  {question.category}
                </span>
              </div>

              <h2 className="text-xl font-semibold">
                {question.question}
              </h2>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}