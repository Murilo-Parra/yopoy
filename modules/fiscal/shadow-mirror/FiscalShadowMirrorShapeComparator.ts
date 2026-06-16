export class FiscalShadowMirrorShapeComparator {
  public static compare(safeLegacyShape: any, safeV2Shape: any): any[] {
    const differences: any[] = [];
    
    this.compareObjects(safeLegacyShape, safeV2Shape, 'root', differences);
    
    return differences;
  }

  private static compareObjects(legacy: any, v2: any, path: string, diffs: any[]) {
    if (typeof legacy !== typeof v2) {
      diffs.push({ path, type: 'TYPE_MISMATCH', legacyType: typeof legacy, v2Type: typeof v2 });
      return;
    }

    if (typeof legacy === 'object' && legacy !== null && v2 !== null) {
      if (Array.isArray(legacy) && Array.isArray(v2)) {
         if (legacy.length > 0 && v2.length === 0) diffs.push({ path, type: 'ARRAY_STRUCTURE_MISMATCH' });
         else if (legacy.length > 0 && v2.length > 0) this.compareObjects(legacy[0], v2[0], `${path}[]`, diffs);
         return;
      }
      
      const legacyKeys = Object.keys(legacy);
      const v2Keys = Object.keys(v2);

      for (const key of legacyKeys) {
        if (!v2Keys.includes(key)) {
          diffs.push({ path: `${path}.${key}`, type: 'MISSING_FIELD' });
        } else {
          this.compareObjects(legacy[key], v2[key], `${path}.${key}`, diffs);
        }
      }

      for (const key of v2Keys) {
        if (!legacyKeys.includes(key)) {
          diffs.push({ path: `${path}.${key}`, type: 'EXTRA_FIELD' });
        }
      }
    }
  }
}
