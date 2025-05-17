import React, { useRef } from 'react';
import { LineChart, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, Bar, ResponsiveContainer } from 'recharts';
import { PlotType } from '../types';

interface PlotContainerProps {
  data: any[];
  plotType: PlotType;
  xAxis: string;
  yAxis: string;
  chartId: string;
}

export const PlotContainer: React.FC<PlotContainerProps> = ({ data, plotType, xAxis, yAxis, chartId }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  if (!data.length || !xAxis || !yAxis) {
    return (
      <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">Select columns to display the chart</p>
      </div>
    );
  }

  // Convert data based on selected columns
  const chartData = data.map(item => ({
    [xAxis]: item[xAxis],
    [yAxis]: typeof item[yAxis] === 'string' ? parseFloat(item[yAxis]) : item[yAxis]
  })).filter(item => !isNaN(item[yAxis]));

  if (chartData.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">No numeric data available for the selected Y-axis</p>
      </div>
    );
  }

  // Determine color based on plot type
  const color = plotType === 'line' ? '#3B82F6' : '#8B5CF6';

  return (
    <div className="h-80 bg-white rounded-lg border border-gray-200 p-4" id={chartId} ref={chartRef}>
      <ResponsiveContainer width="100%" height="100%">
        {plotType === 'line' ? (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey={xAxis} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickMargin={10}
              tickFormatter={(value) => {
                if (typeof value === 'string' && value.length > 10) {
                  return `${value.substring(0, 10)}...`;
                }
                return value;
              }}
            />
            <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E5E7EB',
                borderRadius: '0.375rem',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}
              itemStyle={{ color: '#374151', fontSize: '12px' }}
              labelStyle={{ color: '#111827', fontWeight: 500, marginBottom: '4px' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', marginTop: '8px' }} />
            <Line 
              type="monotone" 
              dataKey={yAxis} 
              stroke={color} 
              strokeWidth={2}
              dot={{ stroke: color, strokeWidth: 2, r: 4, fill: '#FFFFFF' }}
              activeDot={{ stroke: color, strokeWidth: 2, r: 6, fill: '#FFFFFF' }}
              name={yAxis}
              animationDuration={750}
              animationEasing="ease-in-out"
            />
          </LineChart>
        ) : (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey={xAxis} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              tickMargin={10}
              tickFormatter={(value) => {
                if (typeof value === 'string' && value.length > 10) {
                  return `${value.substring(0, 10)}...`;
                }
                return value;
              }}
            />
            <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E5E7EB',
                borderRadius: '0.375rem',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}
              itemStyle={{ color: '#374151', fontSize: '12px' }}
              labelStyle={{ color: '#111827', fontWeight: 500, marginBottom: '4px' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', marginTop: '8px' }} />
            <Bar 
              dataKey={yAxis} 
              fill={color} 
              radius={[4, 4, 0, 0]}
              name={yAxis}
              animationDuration={750}
              animationEasing="ease-in-out"
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};