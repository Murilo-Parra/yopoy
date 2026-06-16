export class FiscalRealDanfeBlueprint {
  public static getBlueprint() {
    return {
      futureIsolatedRenderer: 'Serviço Chromium/Puppeteer ou biblioteca nativa isolada',
      futureTemporaryStorage: 'S3 Bucket com lifecycle de 1 dia',
      temporaryPdfRetention: '24 horas',
      pdfGenerated: false,
      realPdfGenerated: false
    };
  }
}
