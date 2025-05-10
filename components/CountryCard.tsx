"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CountryCardProps } from "@/types/CountryCardProps";
import Image from "next/image";
import Link from 'next/link'
import { Country } from '@/types/country'

interface CountryCardProps {
  country: Country
}

export default function CountryCard({ country }: CountryCardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    router.push(`/country/${country.cca3}`);
  };

  return (
    <Link href={`/country/${country.cca3}`}>
      <div className="bg-white dark:bg-dark-elements rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48 w-full">
          <Image
            src={country.flags.png}
            alt={country.flags.alt || `${country.name.common} flag`}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">{country.name.common}</h2>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Population:</span>{' '}
              {country.population.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Region:</span> {country.region}
            </p>
            <p>
              <span className="font-semibold">Capital:</span>{' '}
              {country.capital?.[0] || 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
