// src/components/ImageModal.tsx
import React from 'react';
import { X } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  fileName: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageUrl, fileName, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4" onClick={onClose}>
      <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-2 right-2 p-3 rounded-full bg-surface hover:bg-surfaceHover focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-6 h-6 text-textPrimary" />
        </button>
        <img src={imageUrl} alt={fileName} className="rounded max-w-full max-h-screen object-contain" />
      </div>
    </div>
  );
};

export default ImageModal;
