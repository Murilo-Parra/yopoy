import { FiscalSafeShapeContract, FiscalSafeShapeMode } from "./FiscalSafeShapeTypes";

export class FiscalSafeShapeAllowlist {
  private allowedKeys = [
    "legacymethod", "legacypath", "legacyshape", "v2shape", "companyid", "operation",
    "id", "status", "documenttype", "route", "method", 
    "createdat", "updatedat", "totalcount", "itemcount", "hasitems", 
    "environment", "providertype", "uf", "municipalitycode", 
    "responsestatus", "errorcode", "errorcategory", "protocolstatus", "shapeversion"
  ];

  public getContractForOperation(operation: string): FiscalSafeShapeContract {
    return {
      operation,
      allowedFields: [...this.allowedKeys],
      blockedFields: [
        "xml", "signedxml", "rawxml", "certificate", "pfx", "password", "senha", 
        "privatekey", "token", "authorization", "payload", "raw", "session", 
        "secret", "pixkey", "chavepix", "accesskey", "nfekey", "nfcekey", 
        "qrcode", "digestvalue", "signaturevalue"
      ],
      mode: FiscalSafeShapeMode.DEFAULT_DENY,
      version: "1.0.0"
    };
  }

  public isKeyAllowed(key: string): boolean {
    const lowerKey = key.toLowerCase();
    // Default-deny: se não estiver na allowlist, está bloqueado
    return this.allowedKeys.includes(lowerKey);
  }
}
