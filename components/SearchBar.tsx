"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (text: string) => void;
}) {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search for a country..."
        className="w-full pl-10 pr-4 py-2 rounded-md bg-[var(--color-background)] text-[var(--color-foreground)] shadow-card"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          onSearch(e.target.value);
        }}
      />
      <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
    </div>
  );
}
