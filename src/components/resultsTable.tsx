import React from 'react';

export interface FileResult {
  fileName: string;
  previewUrl: string;
  result?: string;
  error?: string;
}

interface ResultsTableProps {
  results: FileResult[];
  onPreviewClick?: (result: FileResult) => void;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results, onPreviewClick }) => {
  // Utility function to check if a string is a URL.
  const isUrl = (text: string) => /^(https?:\/\/)/.test(text);

  // Count how many scans were successful (have a result and no error)
  const successCount = results.filter((result) => result.result && !result.error).length;

  return (
    <div className="overflow-x-auto mt-6 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-surfaceHover scrollbar-track-surface">
      <div className="mb-4 text-textPrimary">
        <strong>Successful scans: {successCount}</strong> out of {results.length} images processed.
      </div>
      <table className="min-w-full divide-y divide-surfaceHover">
        <thead className="bg-surface">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
              Preview
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
              File Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
              Result
            </th>
          </tr>
        </thead>
        <tbody className="bg-background divide-y divide-surfaceHover">
          {results.map((result, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={result.previewUrl}
                  alt={result.fileName}
                  className="h-16 w-16 object-cover cursor-pointer rounded"
                  onClick={() => onPreviewClick && onPreviewClick(result)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-textPrimary">{result.fileName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-textPrimary">
                {result.error ? (
                  <span className="text-error">Error: {result.error}</span>
                ) : result.result ? (
                  isUrl(result.result) ? (
                    <a
                      href={result.result}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary underline"
                    >
                      {result.result}
                    </a>
                  ) : (
                    result.result
                  )
                ) : (
                  'N/A'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
