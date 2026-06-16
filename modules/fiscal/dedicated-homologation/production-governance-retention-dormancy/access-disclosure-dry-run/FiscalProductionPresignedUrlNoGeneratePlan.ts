export class FiscalProductionPresignedUrlNoGeneratePlan {
  public static getPlan() {
    return {
      presignedUrlNoGeneratePlanGenerated: true,
      realPresignedUrlGenerated: false,
      realAuthorizationTokenIssued: false,
      description: 'Bloquear presigned URL, temporary token ou signed access URL.'
    };
  }
}
