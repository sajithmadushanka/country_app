
import { Country } from "../types/country";

export async function fetchAllCountries(): Promise<Country[]> {
  const res = await fetch("https://restcountries.com/v3.1/all");

  if (!res.ok) throw new Error("Failed to fetch countries");

  const data = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((country: any) => ({
    name: country.name.common,
    population: country.population,
    region: country.region,
    capital: country.capital?.[0] ?? "N/A",
    flags: { png: country.flags.png },
    cca3: country.cca3,
  }));
}
