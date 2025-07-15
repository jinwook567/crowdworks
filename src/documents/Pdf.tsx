import { pdfjs, Document, Page } from "react-pdf";
import { type BaseProps } from "./props";

type Props = BaseProps & {
  type: "pdf";
  file: string | File;
};

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function Pdf({ file, page, width, height, onLoad }: Props) {
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    onLoad && onLoad({ pages: numPages });
  }

  return (
    <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
      <Page
        pageNumber={page}
        width={width}
        height={height}
        renderTextLayer={false}
        renderAnnotationLayer={false}
      />
    </Document>
  );
}

export default Pdf;
