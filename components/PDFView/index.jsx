// import React, { useState } from 'react';
// import { Document, Page,  } from 'react-pdf';

// export function PDFViewer({ file, ...props }) {

//     // pdfjs.GlobalWorkerOptions.workerSrc = file
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }

//   return (
//     <div>
//       <Document file={file} onLoadSuccess={onDocumentLoadSuccess} {...props}>
//         <Page pageNumber={pageNumber} />
//       </Document>
//       <p>
//         Page {pageNumber} of {numPages}
//       </p>
//     </div>
//   );
// }