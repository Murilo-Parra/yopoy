import { FiscalProductionRollbackKillSwitchInput } from './FiscalProductionRollbackKillSwitchTypes';

export class FiscalProductionRollbackKillSwitchValidator {
  public static validate(input: FiscalProductionRollbackKillSwitchInput) {
    const blockers: string[] = [];
    const warnings: string[] = [];

    const strJson = JSON.stringify(input || {}).toUpperCase();

    if (strJson.includes('APP.USE(') || strJson.includes('ROUTER.USE(') || strJson.includes('NEXT(')) {
      blockers.push('app.use/router.use/next blocked');
    }

    if (strJson.includes('FETCH(') || strJson.includes('AXIOS') || strJson.includes('REQUEST(')) {
      blockers.push('fetch/axios/request blocked');
    }

    if (strJson.includes('DATABASE_URL') || strJson.includes('PRIVATEKEY') || strJson.includes('PFX') || strJson.includes('CERTIFICATE') || strJson.includes('PASSWORD') || strJson.includes('TOKEN')) {
      blockers.push('DATABASE_URL/privateKey/pfx/certificate/password/token blocked');
    }

    if (strJson.includes('INSERT INTO') || strJson.includes('UPDATE ') || strJson.includes('DELETE ') || strJson.includes('COMMIT')) {
      blockers.push('INSERT/UPDATE/DELETE/COMMIT blocked');
    }

    if (strJson.includes('CREATE TABLE') || strJson.includes('ALTER TABLE') || strJson.includes('DROP TABLE')) {
      blockers.push('CREATE/ALTER/DROP TABLE blocked');
    }

    const lowerJson = strJson.toLowerCase();
    if (lowerJson.includes('<xml') && lowerJson.length > 500) blockers.push('XML bruto blocked');
    if (lowerJson.includes('pdf') || lowerJson.includes('base64')) warnings.push('PDF/base64 extenso mock warning');

    if (input.forceExecuteRollback) blockers.push('forceExecuteRollback blocked');
    if (input.forceInstallKillSwitch) blockers.push('forceInstallKillSwitch blocked');
    if (input.forceActivateKillSwitch) blockers.push('forceActivateKillSwitch blocked');
    if (input.forceFreezeRelease) blockers.push('forceFreezeRelease blocked');
    if (input.forceChangeTraffic) blockers.push('forceChangeTraffic blocked');
    if (input.forceRouteToV2) blockers.push('forceRouteToV2 blocked');
    if (input.forceRouteToLegacy) blockers.push('forceRouteToLegacy blocked');
    if (input.forceCallV2Handler) blockers.push('forceCallV2Handler blocked');
    if (input.forceCallLegacyHandler) blockers.push('forceCallLegacyHandler blocked');
    if (input.forceModifyAppUse) blockers.push('forceModifyAppUse blocked');
    if (input.forceInstallMiddleware) blockers.push('forceInstallMiddleware blocked');
    if (input.forceInstallTap) blockers.push('forceInstallTap blocked');
    if (input.forceCreateWorker) blockers.push('forceCreateWorker blocked');
    if (input.forceCreateScheduler) blockers.push('forceCreateScheduler blocked');
    if (input.forceUnlockGate) blockers.push('forceUnlockGate blocked');
    if (input.forceGrantRealAuthorization) blockers.push('forceGrantRealAuthorization blocked');
    if (input.forceConnectRealDatabase) blockers.push('forceConnectRealDatabase blocked');
    if (input.forceExecuteDml) blockers.push('forceExecuteDml blocked');
    if (input.forceExecuteDdl) blockers.push('forceExecuteDdl blocked');
    if (input.forceCallRealSefaz) blockers.push('forceCallRealSefaz blocked');
    if (input.forceLoadRealCertificate) blockers.push('forceLoadRealCertificate blocked');
    if (input.forceSignRealXml) blockers.push('forceSignRealXml blocked');
    if (input.forceGenerateRealPdf) blockers.push('forceGenerateRealPdf blocked');
    if (input.forceActivateProductionV2) blockers.push('forceActivateProductionV2 blocked');

    return {
      valid: blockers.length === 0,
      blockers,
      warnings
    };
  }
}
