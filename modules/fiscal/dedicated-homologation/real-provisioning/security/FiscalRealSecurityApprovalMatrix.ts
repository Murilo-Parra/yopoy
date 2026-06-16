export class FiscalRealSecurityApprovalMatrix {
  public static getMatrix() {
    return [
      {
        domain: 'IAC_APPLY',
        requiredApprovers: ['Tech Lead Infraestrutura', 'Tech Lead Segurança'],
        minimumApprovals: 2,
        currentApprovals: 0,
        approvalAllowedNow: false,
        approved: false,
        realExecutionAllowed: false,
        blockerReason: 'Aprovação real não autorizada nesta fase.'
      },
      {
        domain: 'INFRASTRUCTURE_PROVISIONING',
        requiredApprovers: ['Tech Lead Infraestrutura'],
        minimumApprovals: 1,
        currentApprovals: 0,
        approvalAllowedNow: false,
        approved: false,
        realExecutionAllowed: false,
        blockerReason: 'Aprovação real não autorizada nesta fase.'
      },
      {
        domain: 'DATABASE_CREATION',
        requiredApprovers: ['DBA Leader'],
        minimumApprovals: 1,
        currentApprovals: 0,
        approvalAllowedNow: false,
        approved: false,
        realExecutionAllowed: false,
        blockerReason: 'Aprovação real não autorizada nesta fase.'
      },
      {
        domain: 'VAULT_CREATION',
        requiredApprovers: ['CISO', 'Tech Lead Infraestrutura'],
        minimumApprovals: 2,
        currentApprovals: 0,
        approvalAllowedNow: false,
        approved: false,
        realExecutionAllowed: false,
        blockerReason: 'Aprovação real não autorizada nesta fase.'
      },
      {
        domain: 'SECRET_WRITE',
        requiredApprovers: ['Tech Lead Operações', 'CISO'],
        minimumApprovals: 2,
        currentApprovals: 0,
        approvalAllowedNow: false,
        approved: false,
        realExecutionAllowed: false,
        blockerReason: 'Aprovação real não autorizada nesta fase.'
      },
      {
        domain: 'CERTIFICATE_LOAD',
        requiredApprovers: ['Diretor Legal', 'Tech Lead Segurança'],
        minimumApprovals: 2,
        currentApprovals: 0,
        approvalAllowedNow: false,
        approved: false,
        realExecutionAllowed: false,
        blockerReason: 'Aprovação real não autorizada nesta fase.'
      },
      {
        domain: 'SEFAZ_CONNECTION',
        requiredApprovers: ['Tech Lead de Integrações'],
        minimumApprovals: 1,
        currentApprovals: 0,
        approvalAllowedNow: false,
        approved: false,
        realExecutionAllowed: false,
        blockerReason: 'Aprovação real não autorizada nesta fase.'
      },
      {
        domain: 'XML_SIGNING',
        requiredApprovers: ['Tech Lead Segurança', 'Tech Lead Fiscal'],
        minimumApprovals: 2,
        currentApprovals: 0,
        approvalAllowedNow: false,
        approved: false,
        realExecutionAllowed: false,
        blockerReason: 'Aprovação real não autorizada nesta fase.'
      },
      {
        domain: 'PDF_GENERATION',
        requiredApprovers: ['Tech Lead Fiscal'],
        minimumApprovals: 1,
        currentApprovals: 0,
        approvalAllowedNow: false,
        approved: false,
        realExecutionAllowed: false,
        blockerReason: 'Aprovação real não autorizada nesta fase.'
      },
      {
        domain: 'PRODUCTION_V2_ACTIVATION',
        requiredApprovers: ['C-Level', 'Diretor Jurídico', 'Head de Produto Fiscal'],
        minimumApprovals: 3,
        currentApprovals: 0,
        approvalAllowedNow: false,
        approved: false,
        realExecutionAllowed: false,
        blockerReason: 'Aprovação real não autorizada nesta fase.'
      }
    ];
  }
}
