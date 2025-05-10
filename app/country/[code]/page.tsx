"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Country } from "@/types/country";
import { fetchCountryByCode } from "@/services/fetchCountryByCode";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function CountryPage() {
  const { code } = useParams();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (code) {
      setLoading(true);
      setError("");
      fetchCountryByCode(code as string)
        .then((data) => {
          if (data) {
            setCountry(data);
          } else {
            setError("Country not found.");
          }
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to load country details.");
          setLoading(false);
        });
    }
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] p-8">
        <div className="container mx-auto">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] p-8">
        <div className="container mx-auto">
          <div className="text-center text-red-500 py-10">{error || "Country not found"}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] p-8">
      <div className="container mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2 bg-[var(--color-elements)] shadow-md rounded-md mb-12 hover:bg-[var(--color-elements-hover)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <Image
              src={country.flags.svg}
              alt={country.flags.alt || `${country.name.common} flag`}
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-6">{country.name.common}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Native Name:</span>{" "}
                  {country.nativeName}
                </p>
                <p>
                  <span className="font-semibold">Population:</span>{" "}
                  {country.population.toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Region:</span> {country.region}
                </p>
                <p>
                  <span className="font-semibold">Sub Region:</span>{" "}
                  {country.subregion}
                </p>
                <p>
                  <span className="font-semibold">Capital:</span>{" "}
                  {country.capital}
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Top Level Domain:</span>{" "}
                  {country.topLevelDomain.join(", ")}
                </p>
                <p>
                  <span className="font-semibold">Currencies:</span>{" "}
                  {country.currencies
                    .map((currency) => currency.name)
                    .join(", ")}
                </p>
                <p>
                  <span className="font-semibold">Languages:</span>{" "}
                  {country.languages
                    .map((language) => language.name)
                    .join(", ")}
                </p>
              </div>
            </div>

            {country.borders && country.borders.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Border Countries:</h2>
                <div className="flex flex-wrap gap-2">
                  {country.borders.map((border) => (
                    <Link
                      key={border}
                      href={`/country/${border}`}
                      className="px-4 py-1 bg-[var(--color-elements)] shadow-md rounded-md hover:bg-[var(--color-elements-hover)] transition-colors"
                    >
                      {border}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
