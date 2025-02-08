import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const barData1 = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Total Application Forms',
      data: [12, 19, 3, 5, 2],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const barData2 = {
  labels: ['June', 'July', 'August', 'September', 'October'],
  datasets: [
    {
      label: 'Approved Application',
      data: [8, 15, 9, 12, 6],
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    },
    {
      label: 'Rejected Application',
      data: [5, 7, 4, 8, 3],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

const Dashboard = () => {
  return (
    <div class="px-4 md:ml-40 mt-5">
      <h2 class="text-4xl font-bold mb-4">Dashboard</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white rounded shadow-md p-4 h-64">
          <h3 class="text-lg font-bold mb-2">Application Data</h3>
          <div class="h-48">
            <Bar data={barData1} options={{ responsive: true }} />
          </div>
        </div>
        <div class="bg-white rounded shadow-md p-4 h-64">
          <h3 class="text-lg font-bold mb-2">Approved / Rejected Data</h3>
          <div class="h-48">
            <Bar data={barData2} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;