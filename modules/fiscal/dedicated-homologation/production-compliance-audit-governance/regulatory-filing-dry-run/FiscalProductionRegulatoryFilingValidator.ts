export class FiscalProductionRegulatoryFilingValidator {
  public static validate(input: any) {
    if (!input) return;

    const blockedKeywords = [
      'app.use(', 'router.use(', 'fetch(', 'axios', 'request(', 'webhook', 'slack', 'whatsapp',
      'email.send', 'nodemailer', 'pager', 'pagerduty', 'opsgenie', 'fs.write', 'writeFile',
      'appendFile', 'createWriteStream', 'upload', 's3', 'bucket', 'storage', 'DATABASE_URL',
      'privateKey', 'pfx', 'certificate', 'password', 'token', 'secret', 'INSERT INTO', 'UPDATE',
      'DELETE', 'COMMIT', 'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE', 'request.body', 'response.body',
      'req.rawBody', 'res.send', 'res.json', 'submitRealRegulatoryFiling', 'sendRealSubmissionPayload',
      'generateRealProtocolNumber', 'createRealFilingFile', 'attachRealXml', 'attachRealPdf',
      'attachRealPfx', 'attachRealCertificate', 'readRealPayload', 'readRealXml', 'readRealPdf',
      'readRealPfx', 'readRealCertificate', 'readCertificatePassword', 'readRealSecret', 'readPrivateKey',
      'readToken', 'useRealCrypto', 'calculateRealHash', 'signXml', 'generatePdf', 'persistRealFilingRecord',
      'persistRealProtocolRecord', 'persistRealAuditRecord', 'writeFileSystem', 'writeDatabase',
      'uploadExternalStorage', 'connectDatabase', 'executeDml', 'executeDdl', 'callRealSefaz',
      'sendWebhook', 'sendSlack', 'sendEmail', 'sendPager', 'notifyRealAuditor', 'notifyRealRegulator',
      'notifyRealStakeholder', 'notifyRealApprover', 'notifyRealCustomer', 'unlockRealGate',
      'grantAuthorization', 'issueRealAuthorizationToken', 'activateProduction', 'activateV2',
      'routeToV2', 'disableLegacy', 'changeTraffic'
    ];

    const stringifiedInput = JSON.stringify(input);

    for (const keyword of blockedKeywords) {
      if (stringifiedInput.includes(keyword)) {
        throw new Error(`Validation Error: Blocked action detected: ${keyword}`);
      }
    }

    if (input && typeof input === 'object') {
        for (const key in input) {
            if (key.startsWith('force')) {
                throw new Error(`Validation Error: Force flag detected: ${key}`);
            }
        }
    }
  }
}
