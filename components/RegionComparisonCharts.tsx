import { Region } from "@/types/region";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Props = {
  region1: Region;
  region2: Region;
};

const COLORS = ["#10b981", "#ef4444"];

export default function RegionComparisonCharts({ region1, region2 }: Props) {
  const populationData = [
    { name: region1.name, value: region1.population },
    { name: region2.name, value: region2.population },
  ];

  const areaData = [
    { name: region1.name, value: region1.area },
    { name: region2.name, value: region2.area },
  ];

  return (
    <div className="bg-white dark:bg-[var(--color-dark)] rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-6 text-center">
        Region Comparison
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Population Pie Chart */}
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
          <h4 className="mb-2 font-medium text-amber-100">Area (km²)</h4>
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
