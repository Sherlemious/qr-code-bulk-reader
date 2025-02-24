import React, { useState } from 'react';
import DragDrop from './components/dragDrop';
import ResultsTable, { FileResult } from './components/resultsTable';
import ImageModal from './components/imageModal';
import { scanQRCode } from './utils/qrScanner';

const App: React.FC = () => {
  const [results, setResults] = useState<FileResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<FileResult | null>(null);

  const processFile = async (file: File): Promise<FileResult> => {
    const previewUrl = URL.createObjectURL(file);

    try {
      const qrData = await scanQRCode(file);
      if (qrData) {
        return { fileName: file.name, previewUrl, result: qrData };
      } else {
        return { fileName: file.name, previewUrl, error: 'No QR Code found' };
      }
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
      return { fileName: file.name, previewUrl, error: errorMsg };
    }
  };

  const processFiles = async (files: FileList | File[]) => {
    const filesArray = Array.isArray(files) ? files : Array.from(files);
    const processedResults = await Promise.all(filesArray.map(processFile));
    setResults((prev) => [...prev, ...processedResults]);
  };

  return (
    <div className="container mx-auto p-4 bg-background text-textPrimary min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center text-primary">Bulk QR Code Scanner</h1>
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
