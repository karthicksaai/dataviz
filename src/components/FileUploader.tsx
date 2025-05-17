import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import Papa from 'papaparse';

interface FileUploaderProps {
  setData: (data: any[]) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ setData }) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [uploadError, setUploadError] = React.useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadError(null);
    
    if (acceptedFiles.length === 0) return;
    
    const selectedFile = acceptedFiles[0];
    
    if (!selectedFile.name.endsWith('.csv')) {
      setUploadError('Please upload a CSV file.');
      return;
    }
    
    setFile(selectedFile);
    
    Papa.parse(selectedFile, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transform: (value) => value?.trim() || '',
      complete: (results) => {
        if (results.errors.length > 0) {
          const nonMissingFieldErrors = results.errors.filter(
            error => error.code !== 'TooFewFields'
          );
          
          if (nonMissingFieldErrors.length > 0) {
            setUploadError('Error parsing CSV file. Please check the format.');
            console.error('CSV parsing errors:', nonMissingFieldErrors);
            return;
          }
        }
        
        // Filter out rows with all null/empty values
        const validData = results.data.filter((row: any) => {
          return Object.values(row).some(value => value !== null && value !== '');
        });
        
        if (validData.length === 0) {
          setUploadError('No valid data found in the CSV file.');
          return;
        }
        
        setData(validData);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        setUploadError('Failed to parse the CSV file.');
      }
    });
  }, [setData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const clearFile = () => {
    setFile(null);
    setData([]);
    setUploadError(null);
  };

  return (
    <div className="space-y-6">
      {!file ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 group ${
            isDragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
          }`}
        >
          <input {...getInputProps()} />
          <div className={`mx-auto h-16 w-16 rounded-xl flex items-center justify-center transition-colors duration-300 ${
            isDragActive ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-blue-100'
          }`}>
            <Upload className={`h-8 w-8 transition-colors duration-300 ${
              isDragActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
            }`} />
          </div>
          <p className="mt-4 text-base font-medium text-gray-900">
            {isDragActive ? 'Drop the file here' : 'Drag and drop a CSV file here, or click to select'}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Only CSV files are supported
          </p>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 rounded-lg p-3">
                <File className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500 mt-1">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <button
              onClick={clearFile}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Remove file"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      )}

      {uploadError && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
          <p className="text-sm text-red-600">{uploadError}</p>
        </div>
      )}

      <div className="text-sm text-gray-500 bg-gray-50 rounded-xl p-4">
        <p className="font-medium mb-2">Sample CSV format:</p>
        <pre className="bg-white p-3 rounded-lg overflow-x-auto text-xs font-mono">
          date,value<br/>
          2023-01-01,10<br/>
          2023-01-02,15<br/>
          2023-01-03,8
        </pre>
      </div>
    </div>
  );
};