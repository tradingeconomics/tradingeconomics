'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { TimeSeriesData } from "@/utils/types";

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
}

export default function TimeSeriesChart({ data }: TimeSeriesChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="#CECECE"/>
        <YAxis stroke="#CECECE" tickFormatter={(value) => `$${value}B`} />
        <Tooltip 
          formatter={(value) => [`$${value}B`, 'Value']}
          labelFormatter={(label) => `Year: ${label}`}
          contentStyle={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #404040',
            color: '#ffffff',
            borderRadius: '6px'
          }}
        />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}