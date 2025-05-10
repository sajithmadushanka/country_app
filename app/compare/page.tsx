/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Country } from "@/types/country";
import { fetchCountryByName } from "@/services/fetchCountryByName";
import { fetchRegionByName } from "@/services/fetchByRegion";
import { Region } from "@/types/region";
import ComparisonCharts from "@/components/ComparisonCharts";
import RegionComparisonCharts from "@/components/RegionComparisonCharts";

export default function ComparePage() {
  const [activeTab, setActiveTab] = useState<"country" | "region">("country");

  const [query1, setQuery1] = useState("");
  const [query2, setQuery2] = useState("");

  const [country1, setCountry1] = useState<Country | null>(null);
  const [country2, setCountry2] = useState<Country | null>(null);
  const [region1, setRegion1] = useState<Region | null>(null);
  const [region2, setRegion2] = useState<Region | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCompare = async () => {
    setLoading(true);
    setErrorMsg("");

    if (activeTab === "country") {
      const [res1, res2] = await Promise.all([
        fetchCountryByName(query1),
        fetchCountryByName(query2),
      ]);
      setCountry1(res1);
      setCountry2(res2);
      if (!res1 || !res2) setErrorMsg("Invalid country name(s) provided.");
    } else {
      const [res1, res2] = await Promise.all([
        fetchRegionByName(query1),
        fetchRegionByName(query2),
      ]);
      setRegion1(res1);
      setRegion2(res2);
      if (!res1 || !res2) setErrorMsg("Invalid region name(s) provided.");
    }

    setLoading(false);
  };

  const renderCard = (data: Country | Region | null, idx: number) => {
    if (!data) {
      return (
        <div
          key={idx}
          className="bg-[var(--color-background)] text-[var(--color-foreground)] border border-dashed p-6 rounded-lg text-center"
        >
          {idx === 0 ? "First entry missing" : "Second entry missing"}
        </div>
      );
    }

    if ("flags" in data) {
      // It's a country
      return (
        <div
          key={idx}
          className="bg-[var(--color-background)] text-[var(--color-foreground)] shadow-[var(--shadow-card)] p-6 rounded-xl"
        >
          <div className="flex items-center gap-4 mb-4">
            <img
              src={data.flags.png}
              alt={data.name.common}
              className="w-12 h-8 object-cover rounded"
            />
            <h2 className="text-xl font-semibold">{data.name.common}</h2>
          </div>
          <ul className="text-sm space-y-1">
            <li>
              <strong>Capital:</strong> {data.capital}
            </li>
            <li>
              <strong>Region:</strong> {data.region}
            </li>
            <li>
              <strong>Population:</strong> {data.population.toLocaleString()}
            </li>
            <li>
              <strong>Area:</strong> {data.area.toLocaleString()} km²
            </li>
            <li>
              <strong>Gini:</strong>{" "}
              {typeof data.gini === "object"
                ? String(Object.values(data.gini)[0])
                : data.gini}
            </li>
          </ul>
        </div>
      );
    } else {
      // It's a region
      return (
        <div
          key={idx}
          className="bg-[var(--color-background)] text-[var(--color-foreground)] shadow-[var(--shadow-card)] p-6 rounded-xl"
        >
          <h2 className="text-xl font-semibold mb-4">{data.name}</h2>
          <ul className="text-sm space-y-1">
            <li>
              <strong>Countries:</strong> {data.countries?.length || 0}
            </li>
            <li>
              <strong>Total Population:</strong>{" "}
              {data.population?.toLocaleString()}
            </li>
            <li>
              <strong>Total Area:</strong> {data.area?.toLocaleString()} km²
            </li>
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Compare Dashboard
        </h1>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setActiveTab("country")}
            className={`px-4 py-2 rounded-l-md font-medium ${
              activeTab === "country"
                ? "bg-blue-600 text-white"
                : "bg-[var(--color-background)] text-[var(--color-foreground)] border border-[var(--color-foreground)]"
            }`}
          >
            Country Compare
          </button>
          <button
            onClick={() => setActiveTab("region")}
            className={`px-4 py-2 rounded-r-md font-medium ${
              activeTab === "region"
                ? "bg-blue-600 text-white"
                : "bg-[var(--color-background)] text-[var(--color-foreground)] border border-[var(--color-foreground)]"
            }`}
          >
            Region Compare
          </button>
        </div>

        {/* Inputs */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder={`First ${activeTab} name`}
            value={query1}
            onChange={(e) => setQuery1(e.target.value)}
            className="w-full p-3 rounded-md bg-[var(--color-background)] text-[var(--color-foreground)] border border-[var(--color-foreground)]"
          />
          <input
            type="text"
            placeholder={`Second ${activeTab} name`}
            value={query2}
            onChange={(e) => setQuery2(e.target.value)}
            className="w-full p-3 rounded-md bg-[var(--color-background)] text-[var(--color-foreground)] border border-[var(--color-foreground)]"
          />
        </div>

        {/* Compare Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleCompare}
            className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {loading ? "Comparing..." : "Compare"}
          </button>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="text-center text-red-600 font-medium mb-4">
            {errorMsg}
          </div>
        )}

        {/* Results */}
        <div className="grid sm:grid-cols-2 gap-6">
          {activeTab === "country"
            ? [country1, country2].map((c, i) => renderCard(c, i))
            : [region1, region2].map((r, i) => renderCard(r, i))}
        </div>
        {/* Charts */}
        {activeTab === "country" && country1 && country2 && (
          <div className="mt-8">
            <ComparisonCharts country1={country1} country2={country2} />
          </div>
        )}
        {activeTab === "region" && region1 && region2 && (
          <div className="mt-8">
            <RegionComparisonCharts region1={region1} region2={region2} />
          </div>
        )}
      </div>
    </div>
  );
}
