import { BrowserMultiFormatReader, BarcodeFormat, DecodeHintType } from '@zxing/library';
import jsQR from 'jsqr';

/**
 * Primary scanner using ZXing
 */
export const scanQRCodeUsingZXing = async (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const image = new Image();
      image.onload = async () => {
        // Preprocess the image using a canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Unable to get canvas context');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        ctx.drawImage(image, 0, 0);

        // Create a new image element from the canvas
        const processedImage = new Image();
        processedImage.onload = async () => {
          const hints = new Map();
          hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.QR_CODE]);
          const codeReader = new BrowserMultiFormatReader(hints);
          try {
            const result = await codeReader.decodeFromImageElement(processedImage);
            resolve(result.getText());
          } catch {
            // If ZXing scanning fails, resolve with null to trigger fallback.
            resolve(null);
          }
        };
        processedImage.onerror = () => reject('Error processing image');
        processedImage.src = canvas.toDataURL();
      };
      image.onerror = () => reject('Error loading image');
      image.src = fileReader.result as string;
    };
    fileReader.onerror = () => reject('Error reading file');
    fileReader.readAsDataURL(file);
  });
};

/**
 * Fallback scanner using jsQR
 */
export const scanQRCodeUsingJsQR = async (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Unable to get canvas context');
        ctx.drawImage(image, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        resolve(code ? code.data : null);
      };
      image.onerror = () => reject('Error loading image');
      image.src = fileReader.result as string;
    };
    fileReader.onerror = () => reject('Error reading file');
    fileReader.readAsDataURL(file);
  });
};

/**
 * Combined scanner: Try ZXing first, then fallback to jsQR.
 */
export const scanQRCode = async (file: File): Promise<string | null> => {
  // Try primary scanner (ZXing)
  const primaryResult = await scanQRCodeUsingZXing(file);
  if (primaryResult) return primaryResult;

  // Fallback to jsQR if primary did not return a result
  const fallbackResult = await scanQRCodeUsingJsQR(file);
  return fallbackResult;
};
