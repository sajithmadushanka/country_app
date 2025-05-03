"use client";

import { useState } from "react";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function FilterDropdown({
  onSelect,
}: {
  onSelect: (region: string) => void;
}) {
  const [selected, setSelected] = useState("");

  return (
    <div className="relative w-48">
      <select
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          onSelect(e.target.value);
        }}
        className="w-full bg-[var(--color-background)] text-[var(--color-foreground)] p-2 rounded-md shadow-card"
      >
        <option value="">Filter by Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}
