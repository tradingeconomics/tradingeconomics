import { PieDataProps } from "@/types";
import { Pie } from "react-chartjs-2";

const PieCart = ({data}: PieDataProps) => {

     // Pie chart data (distribution by CategoryGroup)
  const pieCategoryGroups = data.reduce((acc: Record<string, number>, item) => {
    acc[item.CategoryGroup] = (acc[item.CategoryGroup] || 0) + 1;
    return acc;
  }, {});
  const pieData = {
    labels: Object.keys(pieCategoryGroups),
    datasets: [
      {
        data: Object.values(pieCategoryGroups),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#C9CBFF",
          "#FF5733",
          "#33FF57",
          "#3357FF",
        ],
      },
    ],
  };
  return (
    <div>
          <h2 className="text-xl font-semibold mb-2">Indicators by Category Group</h2>
          <div className="bg-white p-4 rounded shadow">
            <Pie data={pieData} />
          </div>
        </div>
  )
}

export default PieCart
