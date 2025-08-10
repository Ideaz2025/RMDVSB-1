// PDFViewer.js
import React from 'react';
import Pdfurl from './pdfs/11.pdf'; // Adjust the path as necessary

const PDFViewer = () => {
  const filename = Pdfurl.split('/').pop();

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        maxWidth: '100%',
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#f8fbfd'
      }}
    >
      <iframe
        src={Pdfurl}
        title={filename}
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          border: 'none',
          minHeight: 0,
          minWidth: 0,
        }}
        allowFullScreen
      />
    </div>
  );
};

export default PDFViewer;
