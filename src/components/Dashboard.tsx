import React, { useState } from 'react';
import { FileUploader } from './FileUploader';
import { PlotContainer } from './PlotContainer';
import { DataTable } from './DataTable';
import { ChartSelector } from './ChartSelector';
import { ExportButton } from './ExportButton';
import { ColumnSelector } from './ColumnSelector';
import { useCSVData } from '../hooks/useCSVData';
import { PlotType } from '../types';

export const Dashboard: React.FC = () => {
  const { data, columns, loading, error, setData } = useCSVData();
  const [plotType, setPlotType] = useState<PlotType>('line');
  const [xAxis, setXAxis] = useState<string>('');
  const [yAxis, setYAxis] = useState<string>('');
  
  React.useEffect(() => {
    if (columns.length > 0 && !xAxis && !yAxis) {
      setXAxis(columns[0]);
      if (columns.length > 1) setYAxis(columns[1]);
    }
  }, [columns, xAxis, yAxis]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200/50 transition-all duration-300 hover:shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload Dataset</h2>
        <FileUploader setData={setData} />
      </div>

      {data.length > 0 && (
        <>
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200/50 transition-all duration-300 hover:shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <h2 className="text-xl font-semibold text-gray-900">Data Visualization</h2>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                <ChartSelector plotType={plotType} setPlotType={setPlotType} />
                <ExportButton chartId="visualization-chart" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <ColumnSelector 
                    columns={columns} 
                    xAxis={xAxis} 
                    yAxis={yAxis} 
                    setXAxis={setXAxis} 
                    setYAxis={setYAxis} 
                  />
                </div>
              </div>
              <div className="lg:col-span-3">
                <PlotContainer 
                  data={data} 
                  plotType={plotType} 
                  xAxis={xAxis} 
                  yAxis={yAxis}
                  chartId="visualization-chart"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200/50 transition-all duration-300 hover:shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Data Preview</h2>
            <DataTable data={data} />
          </div>
        </>
      )}

      {loading && (
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200/50 flex justify-center items-center">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
            <span className="text-gray-600 font-medium">Processing data...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-white rounded-xl shadow-sm p-8 border-2 border-red-100 text-red-600">
          <h2 className="text-xl font-semibold mb-3">Error</h2>
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
};