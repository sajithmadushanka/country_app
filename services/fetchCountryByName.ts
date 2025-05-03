import { Country } from "@/types/country";

export async function fetchCountryByName(name: string): Promise<Country | null> {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
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
    };
  }