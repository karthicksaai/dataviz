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
        <select
          id="x-axis"
          value={xAxis}
          onChange={(e) => setXAxis(e.target.value)}
          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2.5 px-4 bg-white border transition-colors duration-200"
        >
          <option value="">Select column</option>
          {columns.map((column) => (
            <option key={`x-${column}`} value={column}>
              {column}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="y-axis" className="block text-sm font-medium text-gray-900 mb-2">
          Y-Axis
        </label>
        <select
          id="y-axis"
          value={yAxis}
          onChange={(e) => setYAxis(e.target.value)}
          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-2.5 px-4 bg-white border transition-colors duration-200"
        >
          <option value="">Select column</option>
          {columns.map((column) => (
            <option key={`y-${column}`} value={column}>
              {column}
            </option>
          ))}
        </select>
        <p className="mt-2 text-xs text-gray-500">
          Note: The Y-axis should contain numeric data for proper visualization
        </p>
      </div>
    </div>
  );
};