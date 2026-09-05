import { BarDataProps } from '@/types';
import { Bar } from 'react-chartjs-2';

const BarData = ({data, selectedIndicator, onSelectIndicator}: BarDataProps) => {
   const barData = {
        labels: ["Latest", "Previous"],
        datasets: [
          {
            label: selectedIndicator.Title || "Select an Indicator",
            data: [
              selectedIndicator.LatestValue || 0,
              selectedIndicator.PreviousValue || 0,
            ],
            backgroundColor: ["#36A2EB", "#FF6384"],
          },
        ],
      };
  return (
    <div>
          <h2 className="text-xl font-semibold mb-2">Latest vs Previous Value</h2>
          <select
            className="mb-4 p-2 border rounded w-full"
            onChange={e => {
              const selected = data.find(item => item.Title === e.target.value);
              onSelectIndicator(selected || {});
            }}
            value={selectedIndicator.Title || ""}
          >
            <option value="">Select an Indicator</option>
            {data.map(item => (
              <option key={item.Title} value={item.Title}>
                {item.Title}
              </option>
            ))}
          </select>
          <div className="bg-white p-4 rounded w-full shadow">
            <Bar data={barData} options={{ scales: { y: { beginAtZero: true } } }} />
          </div>
        </div>
  )
}

export default BarData
