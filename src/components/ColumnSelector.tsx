import React from 'react';

interface ColumnSelectorProps {
  columns: string[];
  xAxis: string;
  yAxis: string;
  setXAxis: (column: string) => void;
  setYAxis: (column: string) => void;
}

export const ColumnSelector: React.FC<ColumnSelectorProps> = ({ 
  columns, 
  xAxis, 
  yAxis, 
  setXAxis, 
  setYAxis 
}) => {
  if (columns.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="x-axis" className="block text-sm font-medium text-gray-900 mb-2">
          X-Axis
        </label>
        <div className="relative">
          <select
            id="x-axis"
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value)}
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2.5 px-4 bg-white border appearance-none transition-colors duration-200 pr-10"
          >
            <option value="">Select column</option>
            {columns.map((column) => (
              <option key={`x-${column}`} value={column}>
                {column}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      
      <div>
        <label htmlFor="y-axis" className="block text-sm font-medium text-gray-900 mb-2">
          Y-Axis
        </label>
        <div className="relative">
          <select
            id="y-axis"
            value={yAxis}
            onChange={(e) => setYAxis(e.target.value)}
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2.5 px-4 bg-white border appearance-none transition-colors duration-200 pr-10"
          >
            <option value="">Select column</option>
            {columns.map((column) => (
              <option key={`y-${column}`} value={column}>
                {column}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Note: The Y-axis should contain numeric data for proper visualization
        </p>
      </div>
    </div>
  );
};