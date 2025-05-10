import { Country } from "../types/country";

export async function fetchAllCountries(): Promise<Country[]> {
  const res = await fetch("https://restcountries.com/v3.1/all");

  if (!res.ok) throw new Error("Failed to fetch countries");

  const data = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((country: any) => ({
    name: country.name,
    population: country.population,
    region: country.region,
    capital: country.capital || [],
    flags: { 
      png: country.flags.png,
      alt: country.flags.alt
    },
    cca3: country.cca3,
    nativeName: country.name.nativeName?.[Object.keys(country.name.nativeName)[0]]?.common || country.name.common,
    subregion: country.subregion,
    area: country.area,
    gini: country.gini ? String(Object.values(country.gini)[0]) : "N/A",
    topLevelDomain: country.tld || [],
    currencies: country.currencies ? Object.values(country.currencies).map((c: any) => ({ name: c.name })) : [],
    languages: country.languages ? Object.values(country.languages).map((l: any) => ({ name: l })) : [],
    borders: country.borders || []
  }));
}
