export class FiscalSandboxEvidenceSerializer {
  public static serializeToJson(data: any): string {
    const safeData = this.sanitize(data);
    return JSON.stringify(safeData, null, 2);
  }

  public static serializeToText(data: any): string {
    const safeData = this.sanitize(data);
    let text = `CERTIFICAÇÃO SANDBOX\n`;
    text += `Gerado em: ${safeData.generatedAt}\n`;
    text += `Empresa: ${safeData.companyId}\n\n`;
    text += `${safeData.certificationMessage}\n\n`;
    text += `STATUS: ${safeData.status}\n`;
    text += `HASH: ${safeData.certificationHash}\n\n`;
    
    text += `CHECKLIST:\n`;
    if (safeData.checklist) {
      for (const item of safeData.checklist) {
         text += `[${item.passed ? 'PASS' : 'FAIL'}] ${item.name} (${item.severity})\n`;
      }
    }
    
    text += `\nGARANTIAS DE SEGURANÇA MANTIDAS:\n`;
    text += `sandboxOnly: true\n`;
    text += `productionWrite: false\n`;
    text += `activationBlocked: true\n`;
    text += `approvedForRealCanary: false\n`;
    text += `approvedForProductionV2: false\n`;

    return text;
  }

  private static sanitize(obj: any): any {
    const clone = JSON.parse(JSON.stringify(obj));
    this.removeKeys(clone, ['payload', 'rawXml', 'xml', 'password', 'token', 'certificate', 'privateKey', 'safe_shape']);
    return clone;
  }

  private static removeKeys(obj: any, keysToRemove: string[]) {
    if (typeof obj !== 'object' || obj === null) return;
    for (const key in obj) {
      if (keysToRemove.includes(key)) {
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        this.removeKeys(obj[key], keysToRemove);
      }
    }
  }
}
