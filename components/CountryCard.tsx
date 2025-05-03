"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CountryCardProps } from "@/types/CountryCardProps";
import Image from "next/image";

export default function CountryCard({
  flag,
  name,
  population,
  region,
  capital,
  code,
}: CountryCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    router.push(`/country/${code}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-[var(--color-background)] text-[var(--color-foreground)] rounded-2xl shadow-card overflow-hidden transition hover:scale-[1.02] hover:shadow-lg relative"
    >
      {loading && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <Image
        src={flag}
        alt={`Flag of ${name}`}
        width={400}
        height={250}
        className="w-full h-48 object-cover"
        loading="lazy"
      />

      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm text-[var(--color-muted)]">
          <strong>Population:</strong> {population.toLocaleString()}
        </p>
        <p className="text-sm text-[var(--color-muted)]">
          <strong>Region:</strong> {region}
        </p>
        <p className="text-sm text-[var(--color-muted)]">
          <strong>Capital:</strong> {capital}
        </p>
      </div>
    </div>
  );
}
