import React, { useState, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Printer, Copy, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface BarcodeOptions {
  format: 'CODE128' | 'EAN13' | 'UPC' | 'EAN8';
  width: number;
  height: number;
  displayValue: boolean;
}

const BarcodeGenerator: React.FC = () => {
  const [productId, setProductId] = useState('');
  const [barcodeValue, setBarcodeValue] = useState('');
  const [barcodeFormat, setBarcodeFormat] = useState<BarcodeOptions['format']>('CODE128');
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(100);
  const [displayValue, setDisplayValue] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const barcodeRef = useRef<HTMLCanvasElement>(null);

  const generateBarcode = () => {
    if (!barcodeValue || !barcodeRef.current) {
      toast.error('Please enter a barcode value');
      return;
    }

    setIsGenerating(true);
    try {
      JsBarcode(barcodeRef.current, barcodeValue, {
        format: barcodeFormat,
        width,
        height,
        displayValue,
      });
      toast.success('Barcode generated successfully');
    } catch (error) {
      toast.error('Failed to generate barcode');
      console.error(error);
    }
    setIsGenerating(false);
  };

  const downloadPNG = async () => {
    if (!barcodeRef.current) {
      toast.error('No barcode to download');
      return;
    }
    const link = document.createElement('a');
    link.download = `barcode-${barcodeValue}.png`;
    link.href = barcodeRef.current.toDataURL();
    link.click();
    toast.success('Barcode downloaded as PNG');
  };

  const downloadPDF = async () => {
    if (!barcodeRef.current) {
      toast.error('No barcode to download');
      return;
    }
    const canvas = barcodeRef.current;
    const pdf = new jsPDF();
    pdf.addImage(canvas.toDataURL(), 'PNG', 10, 10, 190, 50);
    pdf.save(`barcode-${barcodeValue}.pdf`);
    toast.success('Barcode downloaded as PDF');
  };

  const printBarcode = () => {
    if (!barcodeRef.current) {
      toast.error('No barcode to print');
      return;
    }
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) {
      toast.error('Failed to open print window');
      return;
    }
    printWindow.document.write(`
      <html>
        <head><title>Print Barcode</title></head>
        <body style="margin: 20px;">
          <img src="${barcodeRef.current.toDataURL()}" />
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const copyBarcode = async () => {
    if (!barcodeRef.current) {
      toast.error('No barcode to copy');
      return;
    }
    try {
      const blob = await new Promise<Blob>((resolve) => 
        barcodeRef.current!.toBlob((blob) => resolve(blob!))
      );
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      toast.success('Barcode copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy barcode');
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Barcode Generator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Generate Barcode</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product ID
              </label>
              <input
                type="text"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Barcode Value
              </label>
              <input
                type="text"
                value={barcodeValue}
                onChange={(e) => setBarcodeValue(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Format
                </label>
                <select
                  value={barcodeFormat}
                  onChange={(e) => setBarcodeFormat(e.target.value as BarcodeOptions['format'])}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="CODE128">CODE 128</option>
                  <option value="EAN13">EAN-13</option>
                  <option value="UPC">UPC</option>
                  <option value="EAN8">EAN-8</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Width
                </label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="displayValue"
                checked={displayValue}
                onChange={(e) => setDisplayValue(e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="displayValue" className="ml-2 block text-sm text-gray-900">
                Display Value Below Barcode
              </label>
            </div>

            <button
              onClick={generateBarcode}
              disabled={isGenerating}
              className="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className={`h-5 w-5 ${isGenerating ? 'animate-spin' : ''}`} />
              Generate
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Barcode Preview</h2>
            <div className="flex gap-2">
              <button
                onClick={downloadPNG}
                className="text-gray-600 hover:text-gray-900"
                title="Download PNG"
              >
                <Download className="h-5 w-5" />
              </button>
              <button
                onClick={downloadPDF}
                className="text-gray-600 hover:text-gray-900"
                title="Download PDF"
              >
                <Download className="h-5 w-5" />
              </button>
              <button
                onClick={printBarcode}
                className="text-gray-600 hover:text-gray-900"
                title="Print"
              >
                <Printer className="h-5 w-5" />
              </button>
              <button
                onClick={copyBarcode}
                className="text-gray-600 hover:text-gray-900"
                title="Copy"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center bg-gray-50 rounded-lg p-8 min-h-[200px]">
            {barcodeValue ? (
              <canvas ref={barcodeRef} />
            ) : (
              <p className="text-gray-500 text-center">
                Generate a barcode to see the preview
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeGenerator;