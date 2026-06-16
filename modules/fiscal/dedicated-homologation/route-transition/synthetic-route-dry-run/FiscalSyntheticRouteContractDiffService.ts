export class FiscalSyntheticRouteContractDiffService {
  public static generateDiff() {
    return {
      contractDiffGenerated: true,
      payloadIncluded: false,
      sensitiveDataIncluded: false,
      safeShapeOnly: true,
      description: 'Synthetic diff between legacy and V2 shapes. Expressly excludes XML, PDF, base64, tokens, keys or real payloads.'
    };
  }
}
