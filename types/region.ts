// types/region.ts
import { Country } from "./country";

export type Region = {
  name: string;
  countries: Country[];
  population: number;
  area: number;
};
