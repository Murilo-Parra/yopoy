import { FiscalSafeShapeValidationResult } from "./FiscalSafeShapeTypes";

export class FiscalSafeShapeValidator {
  public validateSanitizedOutput(output: any): FiscalSafeShapeValidationResult {
    const rejectedFields: string[] = [];
    const allowedFields: string[] = [];
    const blockers: string[] = [];
    const warnings: string[] = [];

    const walk = (obj: any, currentPath: string = "") => {
       if (obj && typeof obj === 'object') {
          if (Array.isArray(obj)) {
             obj.forEach((item, index) => walk(item, currentPath ? `${currentPath}[${index}]` : `[${index}]`));
          } else {
             for (const key of Object.keys(obj)) {
                const path = currentPath ? `${currentPath}.${key}` : key;
                const val = obj[key];
                
                if (typeof val === 'string') {
                   const lowerVal = val.toLowerCase();
                   if (lowerVal.includes("<?xml") || lowerVal.includes("<nfe") || val.length > 2000) {
                      blockers.push(`Blocked value at ${path} (potential XML/Base64/Raw)`);
                      rejectedFields.push(path);
                      continue; // skip validation of its contents
                   }
                }

                if (val === "[UNKNOWN_REDACTED]") {
                    rejectedFields.push(path);
                } else {
                    allowedFields.push(path);
                    walk(val, path);
                }
             }
          }
       }
    };

    walk(output);

    return {
      valid: blockers.length === 0,
      sanitized: true,
      rejectedFields,
      allowedFields,
      blockers,
      warnings,
      payloadPersisted: false,
      rawReturned: false
    };
  }
}
