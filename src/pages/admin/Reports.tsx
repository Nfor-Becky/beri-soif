// src/pages/admin/Report.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  date: string;
}

interface Sale {
  id: string;
  productName: string;
  quantitySold: number;
  salesDate: string;
}

interface ReportProps {
  inventoryItems: InventoryItem[];
  salesItems: Sale[];
}

const Report: React.FC<ReportProps> = ({ inventoryItems, salesItems }) => {
  // Data for Inventory Chart
  const inventoryChartData = {
    labels: inventoryItems.map(item => item.name),
    datasets: [
      {
        label: 'Inventory Quantity',
        data: inventoryItems.map(item => item.quantity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Data for Sales Chart
  const salesChartData = {
    labels: salesItems.map(item => item.productName),
    datasets: [
      {
        label: 'Sales Quantity Sold',
        data: salesItems.map(item => item.quantitySold),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Inventory Report</h2>
      <Bar data={inventoryChartData} options={options} />

      <h2 className="text-xl font-bold mt-8">Sales Report</h2>
      <Bar data={salesChartData} options={options} />
    </div>
  );
};

export default Report;