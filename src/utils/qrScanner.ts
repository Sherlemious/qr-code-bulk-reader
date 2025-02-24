// src/utils/qrScanner.ts
import { BrowserMultiFormatReader, BarcodeFormat, DecodeHintType } from '@zxing/library';

export const scanQRCodeUsingZXing = async (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const image = new Image();
      image.onload = async () => {
        // Optionally, if needed, perform pre-processing here (e.g., drawing to a canvas).
        // For now, we use the loaded image element directly.

        // Configure hints to only look for QR codes.
        const hints = new Map();
        hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE]);

        // Initialize the multi-format reader with the hints.
        const codeReader = new BrowserMultiFormatReader(hints);
        try {
          // Use decodeFromImageElement instead of decodeFromCanvas.
          const result = await codeReader.decodeFromImageElement(image);
          resolve(result.getText());
        } catch {
          resolve(null);
        }
      };

      image.onerror = () => reject('Error loading image');
      image.src = fileReader.result as string;
    };

    fileReader.onerror = () => reject('Error reading file');
    fileReader.readAsDataURL(file);
  });
};
