import { FiscalShadowTapMode } from "./FiscalShadowTapTypes";

export class FiscalShadowTapConfig {
  public static getMode(): FiscalShadowTapMode {
    return FiscalShadowTapMode.HARD_OFF;
  }

  public static isCaptureRequestEnabled(): boolean {
    return false; // Hard-off na Fase 5.1
  }

  public static isCaptureResponseEnabled(): boolean {
    return false; // Hard-off na Fase 5.1
  }

  public static getCapturePercentage(): number {
    return 0;
  }

  public static getBlockedRoutes(): string[] {
    return ["/api/fiscal/send", "/api/fiscal/cancel", "/api/fiscal/inutilize"];
  }

  public static getBlockedOperations(): string[] {
    return ["SEFAZ_SEND", "SEFAZ_CANCEL", "XML_SIGN", "PDF_GENERATE"];
  }
}
