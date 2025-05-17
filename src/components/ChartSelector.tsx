import React from 'react';
import { BarChart2, LineChart } from 'lucide-react';
import { PlotType } from '../types';
import { cn } from '../utils/cn';

interface ChartSelectorProps {
  plotType: PlotType;
  setPlotType: (type: PlotType) => void;
}

export const ChartSelector: React.FC<ChartSelectorProps> = ({ plotType, setPlotType }) => {
  return (
    <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 shadow-inner">
      <button
        onClick={() => setPlotType('line')}
        className={cn(
          "inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
          plotType === 'line' 
            ? "bg-white text-blue-600 shadow-sm ring-1 ring-gray-200/50" 
            : "text-gray-600 hover:text-gray-900"
        )}
      >
        <LineChart className="h-4 w-4 mr-2" />
        Line
      </button>
      <button
        onClick={() => setPlotType('bar')}
        className={cn(
          "inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
          plotType === 'bar' 
            ? "bg-white text-blue-600 shadow-sm ring-1 ring-gray-200/50" 
            : "text-gray-600 hover:text-gray-900"
        )}
      >
        <BarChart2 className="h-4 w-4 mr-2" />
        Bar
      </button>
    </div>
  );
};