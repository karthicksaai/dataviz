import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { toPng } from 'html-to-image';

interface ExportButtonProps {
  chartId: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ chartId }) => {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    const element = document.getElementById(chartId);
    if (!element) return;
    
    try {
      setExporting(true);
      
      const dataUrl = await toPng(element, { 
        quality: 1.0,
        backgroundColor: 'white',
        pixelRatio: 2
      });
      
      const link = document.createElement('a');
      link.download = `chart-export-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error exporting chart:', error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      className="relative group inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
    >
      {exporting ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-10 rounded-xl blur"></div>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-700 mr-2"></div>
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-10 rounded-xl blur transition-opacity duration-300"></div>
          <Download className="h-4 w-4 mr-2" />
        </>
      )}
      <span className="relative">Export PNG</span>
    </button>
  );
};