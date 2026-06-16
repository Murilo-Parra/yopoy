import { FiscalDedicatedReplaySanitizer } from './FiscalDedicatedReplaySanitizer';

export class FiscalDedicatedReplayShapeComparator {
  public static compare(left: any, right: any): any[] {
    const sLeft = FiscalDedicatedReplaySanitizer.sanitize(left);
    const sRight = FiscalDedicatedReplaySanitizer.sanitize(right);

    const differences: any[] = [];

    // Dummy comparison just for mock purposes
    const keys = new Set([...Object.keys(sLeft || {}), ...Object.keys(sRight || {})]);

    keys.forEach(key => {
      const leftVal = sLeft[key];
      const rightVal = sRight[key];
      
      if (JSON.stringify(leftVal) !== JSON.stringify(rightVal)) {
         differences.push({
           path: key,
           differenceType: typeof leftVal === 'undefined' ? 'ADDED' : (typeof rightVal === 'undefined' ? 'REMOVED' : 'MODIFIED'),
           severity: 'INFO',
           message: `Difference found in ${key}`
         });
      }
    });

    return differences;
  }
}
