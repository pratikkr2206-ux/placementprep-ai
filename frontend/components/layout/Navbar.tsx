"use client";

import { useEffect, useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import api from "@/services/api";

interface User {
  id: number;
  full_name: string;
  email: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) return;

        const response = await api.get("/auth/me");

        setUser(response.data);
      } catch (err) {
        console.error("Failed to load user", err);
      }
    }

    fetchUser();
  }, []);

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-10 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-5">
        <button className="rounded-full bg-slate-100 p-2 hover:bg-slate-200 transition">
          <BellIcon className="h-6 w-6 text-slate-700" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
            {user?.full_name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <h3 className="font-semibold">
              {user?.full_name || "User"}
            </h3>

            <p className="text-sm text-slate-500">
              Student
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}