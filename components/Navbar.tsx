/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const classList = document.documentElement.classList;
    darkMode ? classList.add("dark") : classList.remove("dark");
  }, [darkMode]);

  return (
    <nav
      className="flex justify-between items-center px-6 py-4 shadow-md"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-foreground)",
      }}
    >
      <h1 className="text-xl font-bold">REST Countries</h1>
      <Link href="/" className="text-sm text-[var(--color-muted)]">
        Home
      </Link>

      <Link href="/compare" className="text-sm text-[var(--color-muted)]">
        Compare
      </Link>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="flex items-center gap-2"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        <span className="text-sm">{darkMode ? "Light" : "Dark"} Mode</span>
      </button>
    </nav>
  );
}
