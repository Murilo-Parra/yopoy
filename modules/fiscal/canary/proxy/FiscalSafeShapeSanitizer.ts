import { FiscalSafeShapeAllowlist } from "./FiscalSafeShapeAllowlist";

export class FiscalSafeShapeSanitizer {
  private allowlist = new FiscalSafeShapeAllowlist();

  public sanitize(input: any): any {
    if (input === null || input === undefined) return input;
    if (typeof input !== "object") return input;

    if (Array.isArray(input)) {
        return { length: input.length, shape: "[ARRAY_LENGTH_ONLY]" }; // arrays don't return raw content
    }

    const sanitizedObj: any = {};
    for (const key of Object.keys(input)) {
      if (this.allowlist.isKeyAllowed(key)) {
         if (typeof input[key] === "object" && input[key] !== null) {
            sanitizedObj[key] = this.sanitize(input[key]);
         } else {
            sanitizedObj[key] = input[key];
         }
      } else {
         sanitizedObj[key] = "[UNKNOWN_REDACTED]";
      }
    }
    return sanitizedObj;
  }
}
