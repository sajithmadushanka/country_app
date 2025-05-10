"use client";

import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import CountryList from "../components/CountryList";
import { Country } from "../types/country";
import { fetchAllCountries } from "@/services/countries";
import LoadingCards from "@/components/LoadingCards";

export default function HomePage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filtered, setFiltered] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetchAllCountries()
      .then((data) => {
        if (data) {
          setCountries(data);
          setFiltered(data);
        } else {
          setError("No countries found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load countries.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filteredData = countries;

    if (search) {
      filteredData = filteredData.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (region) {
      filteredData = filteredData.filter((c) => c.region === region);
    }

    setFiltered(filteredData);
  }, [search, region, countries]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <SearchBar onSearch={setSearch} />
          <FilterDropdown onSelect={setRegion} />
        </div>
        {loading ? (
          <LoadingCards />
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <CountryList countries={filtered} />
        )}
      </div>
    </div>
  );
}
