import { Country } from "@/types/country";


export async function fetchCountryByCode(code: string): Promise<Country | null> {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);

  if (!res.ok) return null;

  const data = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return {
    name: data[0].name.common,
    population: data[0].population,
    region: data[0].region,
    capital: data[0].capital?.[0] ?? "N/A",
    flags: { png: data[0].flags.png },
    cca3: data[0].cca3,
    area: data[0].area,
    gini: data[0].gini ? data[0].gini : "N/A",
    nativeName: data[0].name.nativeName ? (Object.values(data[0].name.nativeName)[0] as { common?: string })?.common || "N/A" : "N/A",
    subregion: data[0].subregion || "N/A",
    topLevelDomain: data[0].tld?.[0] || "N/A",
    currencies: data[0].currencies ? Object.keys(data[0].currencies).map(key => ({
      code: key,
      name: data[0].currencies[key].name,
      symbol: data[0].currencies[key].symbol,
    })) : [],
    languages: data[0].languages ? Object.values(data[0].languages) : [],
    borders: data[0].borders || [],
  };
}