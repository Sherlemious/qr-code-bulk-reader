import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface DragDropProps {
  onFilesDropped: (files: File[]) => void;
}

const DragDrop: React.FC<DragDropProps> = ({ onFilesDropped }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesDropped(acceptedFiles);
    },
    [onFilesDropped]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-textSecondary p-6 rounded text-center cursor-pointer bg-surface text-textPrimary hover:bg-surfaceHover"
    >
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the files here...</p> : <p>Drag and drop some files here, or click to select files</p>}
    </div>
  );
};

export default DragDrop;
