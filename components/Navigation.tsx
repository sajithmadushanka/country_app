/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navigation() {
  const { data: session, status } = useSession();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const classList = document.documentElement.classList;
    darkMode ? classList.add("dark") : classList.remove("dark");
  }, [darkMode]);

  return (
    <nav className="bg-[var(--color-background)] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="text-xl font-bold text-[var(--color-foreground)]"
              >
                Countries App
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="text-[var(--color-foreground)] inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/compare"
                className="text-[var(--color-foreground)] inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Compare
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 text-[var(--color-foreground)]"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              <span className="text-sm">
                {darkMode ? "Light" : "Dark"} Mode
              </span>
            </button>
            {status === "loading" ? (
              <div className="text-[var(--color-foreground)]">Loading...</div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <span className="text-[var(--color-foreground)]">
                  Welcome, {session.user?.name || "User"}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
