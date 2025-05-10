import { Country } from "@/types/country";

export default function RegionStats({ countries }: { countries: Country[] }) {
  const totalPopulation = countries.reduce((sum, c) => sum + c.population, 0);
  const mostPopulous = countries.reduce((a, b) =>
    a.population > b.population ? a : b
  );

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
      <p>
        <strong>Total Countries:</strong> {countries.length}
      </p>
      <p>
        <strong>Total Population:</strong> {totalPopulation.toLocaleString()}
      </p>
      <p>
        <strong>Most Populous:</strong> {mostPopulous.name.common} (
        {mostPopulous.population.toLocaleString()})
      </p>
    </div>
  );
}
