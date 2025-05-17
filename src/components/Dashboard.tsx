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
    <div className="space-y-8">
      {!data.length && (
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Transform Your Data into Beautiful Visualizations
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
            Upload your CSV file and create stunning, interactive charts in seconds. Perfect for data analysis and presentations.
          </p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-gray-300/50">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
            Upload Dataset
            <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              CSV Only
            </span>
          </h2>
          <FileUploader setData={setData} />
        </div>
      </div>

      {data.length > 0 && (
        <>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-gray-300/50">
            <div className="p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Data Visualization</h2>
                  <p className="text-gray-500 mt-1">Create interactive charts from your data</p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                  <ChartSelector plotType={plotType} setPlotType={setPlotType} />
                  <ExportButton chartId="visualization-chart" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                  <div className="sticky top-24 bg-gray-50 rounded-xl p-6 border border-gray-200/50">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Chart Configuration</h3>
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
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-gray-300/50">
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Data Preview</h2>
              <DataTable data={data} />
            </div>
          </div>
        </>
      )}

      {loading && (
        <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-200/50">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <p className="text-gray-600 font-medium">Processing your data...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-red-100">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-red-800">Error Processing Data</h3>
              <p className="mt-1 text-red-600">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};