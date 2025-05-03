import BackButton from "@/components/BackButton";
import Navbar from "@/components/Navbar";
import { fetchCountryByCode } from "@/services/fetchCountryByCode";
import Image from "next/image";
import { notFound } from "next/navigation";

type CountryPageProps = {
  params: {
    code: string;
  };
};

export default async function CountryPage({ params }: CountryPageProps) {
  const country = await fetchCountryByCode(params.code);

  if (!country) return notFound();

  return (
    <div className="bg-light dark:bg-very-dark min-h-screen text-[var(--color-foreground)]">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <BackButton />

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-1/2">
            <Image
              src={country.flags.png}
              alt={`Flag of ${country.name}`}
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow"
              priority
            />
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-3xl font-bold">{country.name}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[var(--color-muted)]">
              <p>
                <strong>Population:</strong>{" "}
                {country.population.toLocaleString()}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
              <p>
                <strong>Capital:</strong> {country.capital}
              </p>
              <p>
                <strong>Country Code:</strong> {country.cca3}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
