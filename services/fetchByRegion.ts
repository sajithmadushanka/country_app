import { Country } from "@/types/country";
import { Region } from "@/types/region";

export async function fetchRegionByName(region: string): Promise<Region | null> {
  const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
  if (!res.ok) return null;

  const data = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const countries: Country[] = data.map((country: any) => ({
    name: country.name.common,
    population: country.population,
    region: country.region,
    capital: country.capital?.[0] ?? "N/A",
    flags: { png: country.flags.png },
    cca3: country.cca3,
    area: typeof country.area === "number" ? country.area : parseFloat(country.area as string) || 0,
    gini: country.gini ?? "N/A",
  }));

  const totalPopulation = countries.reduce((sum, c) => sum + c.population, 0);
  const totalArea = countries.reduce((sum, c) => sum + c.area, 0);

  return {
    name: region,
    countries,
    population: totalPopulation,
    area: totalArea,
  };
}
