import CountryCard from "./CountryCard";

interface Country {
  name: string;
  population: number;
  region: string;
  capital: string;
  flags: { png: string };
  cca3: string;
}

export default function CountryList({ countries }: { countries: Country[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {countries.map((country) => (
        <CountryCard
          key={country.cca3}
          code={country.cca3}
          flag={country.flags.png}
          name={country.name}
          population={country.population}
          region={country.region}
          capital={country.capital}
        />
      ))}
    </div>
  );
}
