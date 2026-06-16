import { FiscalSafeShapeSanitizer } from "./FiscalSafeShapeSanitizer";

export class FiscalShadowProxySanitizer {
  private safeSanitizer = new FiscalSafeShapeSanitizer();

  public sanitize(data: any): any {
    return this.safeSanitizer.sanitize(data);
  }
}
