import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

const AttendanceChart = ({ value }) => {
  const data = {
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: ["#22c55e", "#1f2937"],
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="relative w-32 h-32">
      <Doughnut data={data} options={options} />

      {/* Center Text */}
      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
        {value}%
      </div>
    </div>
  );
};

export default AttendanceChart;
