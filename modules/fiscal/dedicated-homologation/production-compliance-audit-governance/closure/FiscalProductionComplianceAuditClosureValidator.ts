import { FiscalProductionComplianceAuditClosureInput } from './FiscalProductionComplianceAuditClosureTypes';

export class FiscalProductionComplianceAuditClosureValidator {
  public static validate(input: FiscalProductionComplianceAuditClosureInput): string[] {
    const errors: string[] = [];
    if (input.forceExecuteRealClosure) errors.push('forceExecuteRealClosure is not allowed');
    if (input.forceSubmitRealRegulatoryFiling) errors.push('forceSubmitRealRegulatoryFiling is not allowed');
    if (input.forceSendRealAuditorPackage) errors.push('forceSendRealAuditorPackage is not allowed');
    if (input.forceCreateRealAuditDossier) errors.push('forceCreateRealAuditDossier is not allowed');
    if (input.forceGenerateRealProtocolNumber) errors.push('forceGenerateRealProtocolNumber is not allowed');
    if (input.forceCreateRealFinding) errors.push('forceCreateRealFinding is not allowed');
    if (input.forceExecuteRealRemediation) errors.push('forceExecuteRealRemediation is not allowed');
    if (input.forceApproveRealRelease) errors.push('forceApproveRealRelease is not allowed');
    if (input.forceExecuteRealRollback) errors.push('forceExecuteRealRollback is not allowed');
    if (input.forceExecuteRealV2Shutdown) errors.push('forceExecuteRealV2Shutdown is not allowed');
    if (input.forceActivateRealKillSwitch) errors.push('forceActivateRealKillSwitch is not allowed');
    if (input.forceChangeRealTraffic) errors.push('forceChangeRealTraffic is not allowed');
    if (input.forceRouteToV2) errors.push('forceRouteToV2 is not allowed');
    if (input.forceDisableLegacyRoute) errors.push('forceDisableLegacyRoute is not allowed');
    if (input.forceUnlockRealGate) errors.push('forceUnlockRealGate is not allowed');
    if (input.forceGrantRealAuthorization) errors.push('forceGrantRealAuthorization is not allowed');
    if (input.forceIssueRealAuthorizationToken) errors.push('forceIssueRealAuthorizationToken is not allowed');
    if (input.forceReadRealPayload) errors.push('forceReadRealPayload is not allowed');
    if (input.forceReadRealXml) errors.push('forceReadRealXml is not allowed');
    if (input.forceReadRealPdf) errors.push('forceReadRealPdf is not allowed');
    if (input.forceReadRealPfx) errors.push('forceReadRealPfx is not allowed');
    if (input.forceReadRealCertificate) errors.push('forceReadRealCertificate is not allowed');
    if (input.forceReadCertificatePassword) errors.push('forceReadCertificatePassword is not allowed');
    if (input.forceReadRealSecret) errors.push('forceReadRealSecret is not allowed');
    if (input.forceReadPrivateKey) errors.push('forceReadPrivateKey is not allowed');
    if (input.forceReadToken) errors.push('forceReadToken is not allowed');
    if (input.forceUseRealCrypto) errors.push('forceUseRealCrypto is not allowed');
    if (input.forceCalculateRealHash) errors.push('forceCalculateRealHash is not allowed');
    if (input.forceSignRealXml) errors.push('forceSignRealXml is not allowed');
    if (input.forceGenerateRealPdf) errors.push('forceGenerateRealPdf is not allowed');
    if (input.forceWriteFileSystem) errors.push('forceWriteFileSystem is not allowed');
    if (input.forceWriteDatabase) errors.push('forceWriteDatabase is not allowed');
    if (input.forceUploadExternalStorage) errors.push('forceUploadExternalStorage is not allowed');
    if (input.forceConnectRealDatabase) errors.push('forceConnectRealDatabase is not allowed');
    if (input.forceExecuteDml) errors.push('forceExecuteDml is not allowed');
    if (input.forceExecuteDdl) errors.push('forceExecuteDdl is not allowed');
    if (input.forceCallRealSefaz) errors.push('forceCallRealSefaz is not allowed');
    if (input.forceSendWebhook) errors.push('forceSendWebhook is not allowed');
    if (input.forceSendSlack) errors.push('forceSendSlack is not allowed');
    if (input.forceSendWhatsapp) errors.push('forceSendWhatsapp is not allowed');
    if (input.forceSendEmail) errors.push('forceSendEmail is not allowed');
    if (input.forceSendPager) errors.push('forceSendPager is not allowed');
    if (input.forceSendPagerDuty) errors.push('forceSendPagerDuty is not allowed');
    if (input.forceSendOpsgenie) errors.push('forceSendOpsgenie is not allowed');
    if (input.forceNotifyRealAuditor) errors.push('forceNotifyRealAuditor is not allowed');
    if (input.forceNotifyRealRegulator) errors.push('forceNotifyRealRegulator is not allowed');
    if (input.forceNotifyRealStakeholder) errors.push('forceNotifyRealStakeholder is not allowed');
    if (input.forceNotifyRealApprover) errors.push('forceNotifyRealApprover is not allowed');
    if (input.forceNotifyRealCustomer) errors.push('forceNotifyRealCustomer is not allowed');
    return errors;
  }
}
