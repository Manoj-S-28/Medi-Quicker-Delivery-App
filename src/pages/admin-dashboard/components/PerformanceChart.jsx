import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const PerformanceChart = () => {
  const data = [
    { day: "Mon", orders: 32, revenue: 1200 },
    { day: "Tue", orders: 28, revenue: 1100 },
    { day: "Wed", orders: 35, revenue: 1300 },
    { day: "Thu", orders: 40, revenue: 1500 },
    { day: "Fri", orders: 45, revenue: 1700 },
    { day: "Sat", orders: 50, revenue: 1900 },
    { day: "Sun", orders: 38, revenue: 1400 },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-display font-semibold text-neutral-800 mb-4">Weekly Performance</h2>
      
      <div className="w-full h-64" aria-label="Weekly Performance Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis yAxisId="left" orientation="left" stroke="#2563eb" />
            <YAxis yAxisId="right" orientation="right" stroke="#16a34a" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="orders" name="Orders" fill="#2563eb" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="revenue" name="Revenue ($)" fill="#16a34a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;