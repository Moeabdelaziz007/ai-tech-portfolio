import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ResultChartProps } from "../types";
import { QuantumStateViz } from "./QuantumStateViz";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const ResultChart: React.FC<ResultChartProps> = ({
  counts,
  title = "Measurement Results",
}) => {
  if (!counts || Object.keys(counts).length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          {title}
        </h3>
        <div className="text-center text-gray-500 py-8">
          No measurement data available. Run a simulation first.
        </div>
      </div>
    );
  }

  const labels = Object.keys(counts);
  const data = Object.values(counts);
  const total = data.reduce((sum, count) => sum + count, 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Counts",
        data,
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
      {
        label: "Probability (%)",
        data: data.map((count) => (count / total) * 100),
        backgroundColor: "rgba(16, 185, 129, 0.8)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 1,
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        callbacks: {
          afterLabel: function (context: any) {
            const count = context.parsed.y;
            const probability = ((count / total) * 100).toFixed(2);
            return `Probability: ${probability}%`;
          },
        },
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "Counts",
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: {
          display: true,
          text: "Probability (%)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-6 result-chart"
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {title}
        </h3>
        <div className="text-sm text-gray-600">
          <p>
            <strong>Total measurements:</strong> {total}
          </p>
          <p>
            <strong>Unique states:</strong> {labels.length}
          </p>
        </div>
      </div>

      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>

      {/* 3D Visualization */}
      <div className="mt-8">
        <h4 className="font-semibold text-gray-800 mb-3">
          Quantum State Visualization
        </h4>
        <QuantumStateViz counts={counts} />
      </div>

      {/* Results table */}
      <div className="mt-6">
        <h4 className="font-semibold text-gray-800 mb-3">
          Detailed Results
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th
                  className="px-3 py-2 text-left font-medium text-gray-700"
                >
                  State
                </th>
                <th
                  className="px-3 py-2 text-left font-medium text-gray-700"
                >
                  Count
                </th>
                <th
                  className="px-3 py-2 text-left font-medium text-gray-700"
                >
                  Probability
                </th>
              </tr>
            </thead>
            <tbody>
              {labels.map((state, index) => (
                <tr
                  key={state}
                  className="border-b border-gray-200"
                >
                  <td
                    className="px-3 py-2 font-mono text-gray-800"
                  >
                    |{state}⟩
                  </td>
                  <td className="px-3 py-2 text-gray-600">
                    {data[index]}
                  </td>
                  <td className="px-3 py-2 text-gray-600">
                    {((data[index] / total) * 100).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
