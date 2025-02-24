import React from 'react';

export interface FileResult {
  fileName: string;
  result?: string;
  error?: string;
}

interface ResultsTableProps {
  results: FileResult[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full divide-y divide-surfaceHover">
        <thead className="bg-surface">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
              File Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
              QR Code Data
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-background divide-y divide-surfaceHover">
          {results.map((result, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-textPrimary">{result.fileName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-textPrimary">{result.result || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {result.error ? (
                  <span className="text-error">Error: {result.error}</span>
                ) : (
                  <span className="text-secondary">Success</span>
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
