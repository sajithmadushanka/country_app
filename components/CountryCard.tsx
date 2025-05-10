"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface CountryCardProps {
  country: {
    name: {
      common: string;
    };
    flags: {
      svg: string;
      alt?: string;
    };
    population: number;
    region: string;
    capital: string[];
  };
}

export default function CountryCard({ country }: CountryCardProps) {
  const router = useRouter();

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={() => router.push(`/country/${country.name.common}`)}
    >
      <div className="relative h-48">
        <Image
          src={country.flags.svg}
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
  );
}
