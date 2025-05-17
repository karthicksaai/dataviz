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
    <div className="inline-flex items-center bg-gray-100 rounded-xl p-1.5 shadow-inner">
      <button
        onClick={() => setPlotType('line')}
        className={cn(
          "relative group inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
          plotType === 'line' 
            ? "bg-white text-blue-600 shadow-lg ring-1 ring-gray-200/50" 
            : "text-gray-600 hover:text-gray-900"
        )}
      >
        {plotType === 'line' && (
          <div className="absolute inset-0 bg-blue-100/50 rounded-lg blur-sm"></div>
        )}
        <div className="relative flex items-center">
          <LineChart className="h-4 w-4 mr-2" />
          Line
        </div>
      </button>
      <button
        onClick={() => setPlotType('bar')}
        className={cn(
          "relative group inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
          plotType === 'bar' 
            ? "bg-white text-blue-600 shadow-lg ring-1 ring-gray-200/50" 
            : "text-gray-600 hover:text-gray-900"
        )}
      >
        {plotType === 'bar' && (
          <div className="absolute inset-0 bg-blue-100/50 rounded-lg blur-sm"></div>
        )}
        <div className="relative flex items-center">
          <BarChart2 className="h-4 w-4 mr-2" />
          Bar
        </div>
      </button>
    </div>
  );
};