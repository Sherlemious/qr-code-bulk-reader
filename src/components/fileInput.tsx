import React, { ChangeEvent } from 'react';

interface FileInputProps {
  onFilesSelected: (files: FileList) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onFilesSelected }) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesSelected(e.target.files);
    }
  };

  return (
    <div>
      <input type="file" multiple accept="image/*" onChange={handleFileChange} className="border p-2 rounded w-full" />
    </div>
  );
};

export default FileInput;
