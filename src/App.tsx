// src/App.tsx
import React, { useState } from 'react';
import FileInput from './components/fileInput';
import DragDrop from './components/dragDrop';
import ResultsTable, { FileResult } from './components/resultsTable';
import { scanQRCodeUsingZXing } from './utils/qrScanner';

const App: React.FC = () => {
  const [results, setResults] = useState<FileResult[]>([]);

  // Process a single file using our ZXing QR scanner
  const processFile = async (file: File): Promise<FileResult> => {
    try {
      const qrData = await scanQRCodeUsingZXing(file);
      if (qrData) {
        return {
          fileName: file.name,
          result: qrData,
        };
      } else {
        return {
          fileName: file.name,
          error: 'No QR Code found',
        };
      }
    } catch (error: any) {
      return {
        fileName: file.name,
        error: error.message || 'Error processing file',
      };
    }
  };

  // Process multiple files (from input or drag & drop)
  const processFiles = async (files: FileList | File[]) => {
    const filesArray = Array.isArray(files) ? files : Array.from(files);
    const processedResults = await Promise.all(filesArray.map(processFile));
    setResults((prev) => [...prev, ...processedResults]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">QR Code Scanner</h1>
      <div className="mb-4">
        <FileInput onFilesSelected={processFiles} />
      </div>
      <div className="mb-4">
        <DragDrop onFilesDropped={processFiles} />
      </div>
      <ResultsTable results={results} />
    </div>
  );
};

export default App;
