export class FiscalProductionArchiveReclassificationNoOpMatrix {
  public static getMatrix() {
    return {
      archiveReclassificationNoOpMatrixGenerated: true,
      realArchiveMoved: false,
      realArchiveCompacted: false,
      realArchiveReclassified: false,
      description: 'Bloquear movimentação, compactação e reclassificação real.'
    };
  }
}
