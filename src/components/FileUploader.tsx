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
          className={`relative group cursor-pointer transition-all duration-500 ${
            isDragActive ? 'scale-102' : ''
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
          <div className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 ${
            isDragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 group-hover:border-blue-400 group-hover:bg-blue-50'
          }`}>
            <div className="px-8 py-12 text-center">
              <input {...getInputProps()} />
              <div className={`mx-auto h-20 w-20 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
                isDragActive ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-blue-100'
              }`}>
                <Upload className={`h-10 w-10 transition-colors duration-300 ${
                  isDragActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'
                }`} />
              </div>
              <div className="mt-6">
                <p className="text-xl font-medium text-gray-900">
                  {isDragActive ? 'Drop your CSV file here' : 'Drag and drop your CSV file'}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  or click to browse from your computer
                </p>
              </div>
              <div className="mt-6">
                <span className="inline-flex items-center px-4 py-2 text-sm text-gray-500 bg-gray-100 rounded-full">
                  CSV files only
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 rounded-xl p-3">
                <File className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500 mt-1">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <button
              onClick={clearFile}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors group"
              aria-label="Remove file"
            >
              <X className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
            </button>
          </div>
        </div>
      )}

      {uploadError && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
          <p className="text-sm text-red-600">{uploadError}</p>
        </div>
      )}

      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900">Sample CSV Format</h3>
          <div className="bg-white rounded-lg p-4 overflow-x-auto">
            <pre className="text-xs font-mono text-gray-600">
              date,value<br/>
              2023-01-01,10<br/>
              2023-01-02,15<br/>
              2023-01-03,8
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};