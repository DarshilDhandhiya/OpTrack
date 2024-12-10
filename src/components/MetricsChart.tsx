import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ServerMetric } from '../types/dashboard';

interface MetricsChartProps {
  data: ServerMetric[];
}

export const MetricsChart: React.FC<MetricsChartProps> = ({ data }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(value) => new Date(value).toLocaleTimeString()} 
          />
          <YAxis />
          <Tooltip 
            labelFormatter={(value) => new Date(value).toLocaleString()}
          />
          <Legend />
          <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU %" />
          <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="Memory %" />
          <Line type="monotone" dataKey="network" stroke="#ffc658" name="Network (MB/s)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};