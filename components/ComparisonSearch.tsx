import { Country } from "@/types/country";
import { useState } from "react";

type Props = {
  countries: Country[];
  onSelect1: (c: Country) => void;
  onSelect2: (c: Country) => void;
};

export default function ComparisonSearch({ countries, onSelect1, onSelect2 }: Props) {
  const [query1, setQuery1] = useState("");
  const [query2, setQuery2] = useState("");

  const handleSelect = (query: string, set: (c: Country) => void) => {
    const match = countries.find(c => c.name.toLowerCase() === query.toLowerCase());
    if (match) set(match);
  };

  return (
    <div className="grid sm:grid-cols-2 gap-4 mb-8">
      <div>
        <input
          type="text"
          placeholder="Search first country or region"
          value={query1}
          onChange={(e) => setQuery1(e.target.value)}
          onBlur={() => handleSelect(query1, onSelect1)}
          className="w-full p-3 border rounded shadow-sm bg-white dark:bg-[var(--color-dark)] text-[var(--color-foreground)]"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Search second country or region"
          value={query2}
          onChange={(e) => setQuery2(e.target.value)}
          onBlur={() => handleSelect(query2, onSelect2)}
          className="w-full p-3 border rounded shadow-sm bg-white dark:bg-[var(--color-dark)] text-[var(--color-foreground)]"
        />
      </div>
    </div>
  );
}
