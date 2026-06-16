export class FiscalSafeDifferenceBuilder {
   public buildDifferences(safeLegacy: any, safeV2: any): any[] {
     const differences: any[] = [];
     
     const legacyKeys = Object.keys(safeLegacy || {});
     const v2Keys = Object.keys(safeV2 || {});
 
     for (const key of legacyKeys) {
         if (!v2Keys.includes(key)) {
             differences.push({ 
                 path: key, 
                 expectedType: typeof safeLegacy[key], 
                 actualType: "undefined", 
                 differenceType: "MISSING_IN_V2", 
                 severity: "LOW", 
                 safeDescription: "Campo ausente na V2" 
             });
         } else if (typeof safeLegacy[key] !== typeof safeV2[key]) {
             differences.push({ 
                 path: key, 
                 expectedType: typeof safeLegacy[key], 
                 actualType: typeof safeV2[key], 
                 differenceType: "TYPE_MISMATCH", 
                 severity: "MEDIUM", 
                 safeDescription: "Tipos divergentes" 
             });
         }
     }
 
     for (const key of v2Keys) {
         if (!legacyKeys.includes(key)) {
             differences.push({ 
                 path: key, 
                 expectedType: "undefined", 
                 actualType: typeof safeV2[key], 
                 differenceType: "EXTRA_IN_V2", 
                 severity: "LOW", 
                 safeDescription: "Campo extra na V2" 
             });
         }
     }

     return differences;
   }
}
