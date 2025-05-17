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
      <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded-xl border border-gray-200">
        <div className="text-center p-8">
          <div className="bg-gray-100 rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">Select columns to display the chart</p>
        </div>
      </div>
    );
  }

  const chartData = data.map(item => ({
    [xAxis]: item[xAxis],
    [yAxis]: typeof item[yAxis] === 'string' ? parseFloat(item[yAxis]) : item[yAxis]
  })).filter(item => !isNaN(item[yAxis]));

  if (chartData.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded-xl border border-gray-200">
        <div className="text-center p-8">
          <div className="bg-red-100 rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600 text-lg mb-2">Invalid Data Format</p>
          <p className="text-gray-500">No numeric data available for the selected Y-axis</p>
        </div>
      </div>
    );
  }

  const color = plotType === 'line' ? '#3B82F6' : '#8B5CF6';

  return (
    <div className="h-[400px] bg-white rounded-xl border border-gray-200 p-6 shadow-sm" id={chartId} ref={chartRef}>
      <ResponsiveContainer width="100%" height="100%">
        {plotType === 'line' ? (
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.1}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
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
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
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
              fill="url(#colorGradient)"
            />
          </LineChart>
        ) : (
          <BarChart data={chartData}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={color} stopOpacity={0.4}/>
              </linearGradient>
            </defs>
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
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              itemStyle={{ color: '#374151', fontSize: '12px' }}
              labelStyle={{ color: '#111827', fontWeight: 500, marginBottom: '4px' }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', marginTop: '8px' }} />
            <Bar 
              dataKey={yAxis} 
              fill="url(#barGradient)"
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