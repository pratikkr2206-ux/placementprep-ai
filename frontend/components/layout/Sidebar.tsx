"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaMicrophone,
  FaHistory,
  FaQuestionCircle,
  FaChartLine,
  FaUser,
  FaSignOutAlt,
  FaRobot,
} from "react-icons/fa";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: FaHome,
  },
  {
    name: "Mock Interview",
    href: "/interview/start",
    icon: FaMicrophone,
  },
  {
    name: "Resume Interview",
    href: "/resume",
    icon: FaRobot,
  },
  {
    name: "Interview History",
    href: "/history",
    icon: FaHistory,
  },
  {
    name: "Question Bank",
    href: "/questions",
    icon: FaQuestionCircle,
  },
  {
    name: "Performance",
    href: "/performance",
    icon: FaChartLine,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: FaUser,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white">

      {/* Logo */}

      <div className="border-b border-slate-200 p-8">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">

            <FaRobot size={28} />

          </div>

          <div>

            <h1 className="text-xl font-bold text-slate-800">
              PlacementPrep AI
            </h1>

            <p className="text-sm text-slate-500">
              AI Interview Platform
            </p>

          </div>

        </div>

      </div>

      {/* Menu */}

      <nav className="flex-1 space-y-2 p-6">

        {menuItems.map((item) => {

          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (

            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 rounded-xl px-5 py-4 text-[16px] font-medium transition-all duration-200 ${
                active
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >

              <Icon size={20} />

              {item.name}

            </Link>

          );

        })}

      </nav>

      {/* Logout */}

      <div className="border-t border-slate-200 p-6">

        <Link
          href="/login"
          className="flex items-center gap-4 rounded-xl px-5 py-4 font-medium text-red-500 transition hover:bg-red-50"
        >

          <FaSignOutAlt size={20} />

          Logout

        </Link>

      </div>

    </aside>
  );
}