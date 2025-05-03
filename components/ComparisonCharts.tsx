// components/ComparisonCharts.tsx
import { Country } from "@/types/country";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

type Props = {
  country1: Country;
  country2: Country;
};

export default function ComparisonCharts({ country1, country2 }: Props) {
  const populationData = [
    { name: country1.name, value: country1.population },
    { name: country2.name, value: country2.population },
  ];
  const areaData = [
    { name: country1.name, value: country1.area },
    { name: country2.name, value: country2.area },
  ];

  return (
    <div className="bg-white dark:bg-[var(--color-dark)] rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-6 text-center">
        Country Comparison
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* population pic char */}
        <div className="flex flex-col items-center">
          <h4 className="mb-2 font-medium text-amber-100">Population</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={populationData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {populationData.map((_, index) => (
                  <Cell key={`pop-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Area Pie Chart */}
        <div className="flex flex-col items-center">
          <h4 className="mb-2 font-medium text-amber-100">Area</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={areaData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {areaData.map((_, index) => (
                  <Cell key={`area-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
