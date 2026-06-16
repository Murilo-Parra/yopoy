export class FiscalMockDanfeRenderer {
  public static simulateRendering() {
    return {
      simulatedRenderAt: new Date().toISOString(),
      pdfGenerated: false as false,
      realPdfGenerated: false as false,
      status: 'MOCKED_PDF',
      pages: 1,
      sizeBytes: 1024,
      message: 'This is a simulated DANFE generation. No PDFKit/Puppeteer was initialized.'
    };
  }
}
