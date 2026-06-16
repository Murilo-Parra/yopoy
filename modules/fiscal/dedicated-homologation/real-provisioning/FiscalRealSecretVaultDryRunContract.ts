export class FiscalRealSecretVaultDryRunContract {
  public static getContract() {
    return {
      plannedProvider: 'AWS Secrets Manager / GCP Secret Manager / HashiCorp Vault',
      plannedEncryptionPolicy: 'KMS CMK vinculada',
      plannedAccessPolicy: 'IAM Roles exclusivas (Principle of Least Privilege)',
      plannedAuditPolicy: 'CloudTrail / Audit Logs habilitados para leitura de secret',
      plannedRotationPolicy: 'Lambda/Function de rotação a cada 90 dias',
      vaultProvisioned: false,
      secretWritten: false,
      secretLoaded: false
    };
  }
}
