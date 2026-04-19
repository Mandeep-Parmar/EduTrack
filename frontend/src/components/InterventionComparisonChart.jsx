import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const InterventionComparisonChart = ({ preData, postData }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#9CA3AF', // text-gray-400
          font: {
            family: "'Inter', sans-serif",
          }
        }
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(75, 85, 99, 0.2)', // gray-600 with opacity
        },
        ticks: {
          color: '#9CA3AF',
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
        }
      }
    },
  };

  const data = {
    labels: ['Attendance', 'Marks', 'Assignment', 'LMS', 'Risk Score'],
    datasets: [
      {
        label: 'Pre-Intervention',
        data: [
          preData.attendance || 0,
          preData.marks || 0,
          preData.assignment || 0,
          preData.lms || 0,
          preData.riskScore || 0,
        ],
        backgroundColor: 'rgba(156, 163, 175, 0.5)', // Gray
        borderColor: 'rgba(156, 163, 175, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Post-Intervention (Current)',
        data: [
          postData.attendance || 0,
          postData.marks || 0,
          postData.assignment || 0,
          postData.lms || 0,
          postData.riskScore || 0,
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.8)', // Blue
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="w-full h-64 mt-4">
      <Bar options={options} data={data} />
    </div>
  );
};

export default InterventionComparisonChart;
