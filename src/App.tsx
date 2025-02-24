// src/App.tsx
import React, { useState } from 'react';
import DragDrop from './components/dragDrop';
import ResultsTable, { FileResult } from './components/resultsTable';
import ImageModal from './components/imageModal';
import { scanQRCodeUsingZXing } from './utils/qrScanner';

const App: React.FC = () => {
  const [results, setResults] = useState<FileResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<FileResult | null>(null);

  // Process a single file using our ZXing QR scanner
  const processFile = async (file: File): Promise<FileResult> => {
    // Generate a preview URL for the file.
    const previewUrl = URL.createObjectURL(file);

    try {
      const qrData = await scanQRCodeUsingZXing(file);
      if (qrData) {
        return {
          fileName: file.name,
          previewUrl,
          result: qrData,
        };
      } else {
        return {
          fileName: file.name,
          previewUrl,
          error: 'No QR Code found',
        };
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return {
          fileName: file.name,
          previewUrl,
          error: error.message || 'Error processing file',
        };
      } else {
        return {
          fileName: file.name,
          previewUrl,
          error: 'Unknown error occurred',
        };
      }
    }
  };

  // Process multiple files (from input or drag & drop)
  const processFiles = async (files: FileList | File[]) => {
    const filesArray = Array.isArray(files) ? files : Array.from(files);
    const processedResults = await Promise.all(filesArray.map(processFile));
    setResults((prev) => [...prev, ...processedResults]);
  };

  return (
    <div className="container mx-auto p-4 bg-background text-textPrimary min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center text-primary">QR Code Scanner</h1>
      <div className="mb-4">
        <DragDrop onFilesDropped={processFiles} />
      </div>
      <ResultsTable results={results} onPreviewClick={setSelectedResult} />
      <ImageModal
        isOpen={!!selectedResult}
        imageUrl={selectedResult?.previewUrl || ''}
        fileName={selectedResult?.fileName || ''}
        onClose={() => setSelectedResult(null)}
      />
    </div>
  );
};

export default App;
