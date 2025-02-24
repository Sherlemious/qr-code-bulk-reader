# Bulk QR Code Scanner

A sleek, dark-mode bulk QR code scanning web app built with **Vite**, **React**, **TypeScript**, **Tailwind CSS**, and **ZXing**. Quickly upload multiple images (via file input or drag & drop) to extract QR code data with a modern, responsive interface.

---

## Features

- **Bulk Processing:** Scan multiple images at once.
- **Drag & Drop Upload:** Easy file uploads using drag & drop.
- **Live Previews:** Thumbnail previews with click-to-expand functionality.
- **QR Code Detection:** Uses ZXing to decode QR codes from images.
- **Dark Mode Design:** Clean, modern UI with a custom dark theme.
- **Responsive Layout:** Optimized for both desktop and mobile devices.

---

## Tech Stack

- **Vite** - Fast development and build tool.
- **React & TypeScript** - Robust and maintainable UI code.
- **Tailwind CSS** - Utility-first styling with custom dark mode configuration.
- **ZXing** - Library for QR code scanning.
- **Lucide React** - Modern icons.
- **React Dropzone** - Simplified file drag & drop.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/qr-bulk-reader.git
   cd qr-bulk-reader
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

Deploy the generated `dist` folder to your favorite hosting provider.

---

## Project Structure

```
qr-bulk-reader/
├── src/
│   ├── components/
│   │   ├── dragDrop.tsx
│   │   ├── resultsTable.tsx
│   │   └── imageModal.tsx
│   ├── utils/
│   │   └── qrScanner.ts
│   ├── App.tsx
│   └── index.css
├── tailwind.config.cjs
├── postcss.config.cjs
├── package.json
└── README.md
```

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Contributions, issues, and feature requests are welcome!
