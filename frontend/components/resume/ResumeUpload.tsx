"use client";

import { useState } from "react";
import { uploadResume, startResumeInterview } from "@/services/resume";

interface ResumeAnalysis {
  name: string;
  skills: string[];
  projects: string[];
  technologies: string[];
  strengths: string[];
  recommended_role: string;
  experience_level: string;
}

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [resumeId, setResumeId] = useState<number | null>(null);

  const [analysis, setAnalysis] =
    useState<ResumeAnalysis | null>(null);

  const [message, setMessage] = useState("");

  async function handleUpload() {
    if (!file) {
      alert("Please select a resume.");
      return;
    }

    try {
      setLoading(true);

      const data = await uploadResume(file);

      setResumeId(data.resume_id);

      setAnalysis(data.analysis);

      setMessage("Resume uploaded successfully.");
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleStartInterview() {
    if (!resumeId) return;

    try {
      const response = await startResumeInterview(
        resumeId
      );

      window.location.href =
        `/interview/${response.session_id}`;

    } catch (error) {
      console.error(error);
      alert("Unable to start interview.");
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      {/* Upload Card */}

      <div className="rounded-xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold">
          Resume Interview
        </h2>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
          className="mb-5 w-full rounded-lg border p-3"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          {loading
            ? "Uploading..."
            : "Upload Resume"}
        </button>

        {message && (
          <p className="mt-5 text-green-600">
            {message}
          </p>
        )}

      </div>

      {/* AI Analysis */}

      {analysis && (

        <div className="rounded-xl bg-white p-8 shadow">

          <h2 className="mb-5 text-2xl font-bold">
            AI Resume Analysis
          </h2>

          <div className="space-y-4">

            <div>
              <strong>Name:</strong>

              <p>{analysis.name}</p>
            </div>

            <div>
              <strong>Recommended Role:</strong>

              <p>{analysis.recommended_role}</p>
            </div>

            <div>
              <strong>Experience:</strong>

              <p>{analysis.experience_level}</p>
            </div>

            <div>

              <strong>Skills</strong>

              <div className="mt-2 flex flex-wrap gap-2">

                {analysis.skills.map((skill) => (

                  <span
                    key={skill}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>

            <div>

              <strong>Projects</strong>

              <ul className="mt-2 list-disc pl-5">

                {analysis.projects.map((project) => (

                  <li key={project}>
                    {project}
                  </li>

                ))}

              </ul>

            </div>

            <button
              onClick={handleStartInterview}
              className="mt-6 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Start Resume Interview
            </button>

          </div>

        </div>

      )}

    </div>
  );
}