import CountryCard from "./CountryCard";
import { Country } from "@/types/country";

export default function CountryList({ countries }: { countries: Country[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {countries.map((country) => (
        <CountryCard
          key={country.cca3}
          country={country}
        />
      ))}
    </div>
  );
}
