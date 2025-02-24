import React, { useState } from 'react';
import FileInput from './components/fileInput';
import DragDrop from './components/dragDrop';
import ResultsTable, { FileResult } from './components/resultsTable';

const App: React.FC = () => {
  const [results, setResults] = useState<FileResult[]>([]);

  // Dummy function to simulate QR code processing.
  // Replace this with your actual QR code scanning logic.
  const processFile = async (file: File): Promise<FileResult> => {
    try {
      // Simulate a delay for processing
      await new Promise((resolve) => setTimeout(resolve, 500));

      // For demo purposes, we assume if the file name contains "qr", a QR code is detected.
      const isQRFound = file.name.toLowerCase().includes('qr');
      if (isQRFound) {
        return {
          fileName: file.name,
          result: 'QR Code Detected: "example data"',
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

  const processFiles = async (files: FileList | File[]) => {
    const filesArray = Array.isArray(files) ? files : Array.from(files);
    const processedResults = await Promise.all(filesArray.map((file) => processFile(file)));
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
