"use client"; // Required in Next.js App Router

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import A4DocumentToPrint from "./PDFDocument/A4DocumentToPrint";

export default function PdfComponentToPrint() {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef, 
    documentTitle: "A4_Print_Document",
    pageStyle: `
      @page {
        size: A4;
        margin: 0mm;
      }
      body {
        font-family: Arial, sans-serif;
      }
    `,
  });

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handlePrint}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Print 
      </button>

      {/* Render the A4 Document but hide it on screen */}
      <div  >
        <A4DocumentToPrint ref={componentRef} />
      </div>
    </div>
  );
}
