"use client";

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="mb-8 px-6 py-2 rounded shadow-card bg-[var(--color-background)] text-sm hover:brightness-110 transition"
    >
      ← Back
    </button>
  );
}
