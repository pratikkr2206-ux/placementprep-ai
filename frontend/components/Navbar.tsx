"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

interface User {
  id: number;
  full_name: string;
  email: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data);
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    }

    loadUser();
  }, []);

  return (
    <div className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
      <h4>Dashboard</h4>

      <strong>
        👤 {user?.full_name ?? "Loading..."}
      </strong>
    </div>
  );
}