export class FiscalRealSegregationOfDutiesMatrix {
  public static getMatrix() {
    return [
      {
        domain: 'IaC',
        proposerRole: 'Cloud Engineer',
        reviewerRole: 'Tech Lead Infraestrutura',
        futureApproverRole: 'Head de Infraestrutura',
        executorRole: 'CI/CD Pipeline (Automação)',
        samePersonCanApproveAndExecute: false,
        executionAllowedNow: false,
        requiresExternalApproval: true
      },
      {
        domain: 'Banco de dados',
        proposerRole: 'Database Engineer',
        reviewerRole: 'DBA Leader',
        futureApproverRole: 'Head de Operações',
        executorRole: 'Database Migration Pipeline',
        samePersonCanApproveAndExecute: false,
        executionAllowedNow: false,
        requiresExternalApproval: true
      },
      {
        domain: 'Vault',
        proposerRole: 'Security Engineer',
        reviewerRole: 'Tech Lead Segurança',
        futureApproverRole: 'CISO',
        executorRole: 'Security Automation',
        samePersonCanApproveAndExecute: false,
        executionAllowedNow: false,
        requiresExternalApproval: true
      },
      {
        domain: 'Certificado A1',
        proposerRole: 'Responsável Legal Contabilidade',
        reviewerRole: 'Tech Lead Segurança',
        futureApproverRole: 'Diretor',
        executorRole: 'Security Administrator',
        samePersonCanApproveAndExecute: false,
        executionAllowedNow: false,
        requiresExternalApproval: true
      },
      {
        domain: 'SEFAZ',
        proposerRole: 'Integração Dev',
        reviewerRole: 'Tech Lead Integrações',
        futureApproverRole: 'Head de Engenharia',
        executorRole: 'CI/CD Pipeline',
        samePersonCanApproveAndExecute: false,
        executionAllowedNow: false,
        requiresExternalApproval: true
      },
      {
        domain: 'XML signer',
        proposerRole: 'Fiscal Dev',
        reviewerRole: 'Tech Lead Segurança',
        futureApproverRole: 'Head de Engenharia',
        executorRole: 'CI/CD Pipeline',
        samePersonCanApproveAndExecute: false,
        executionAllowedNow: false,
        requiresExternalApproval: true
      },
      {
        domain: 'DANFE renderer',
        proposerRole: 'Fiscal Dev',
        reviewerRole: 'Tech Lead Fiscal',
        futureApproverRole: 'Head de Engenharia',
        executorRole: 'CI/CD Pipeline',
        samePersonCanApproveAndExecute: false,
        executionAllowedNow: false,
        requiresExternalApproval: true
      },
      {
        domain: 'Observabilidade',
        proposerRole: 'SRE',
        reviewerRole: 'Tech Lead Operações',
        futureApproverRole: 'Head de Operações',
        executorRole: 'Observability CI/CD',
        samePersonCanApproveAndExecute: false,
        executionAllowedNow: false,
        requiresExternalApproval: true
      },
      {
        domain: 'Rollback',
        proposerRole: 'SRE',
        reviewerRole: 'Incident Manager',
        futureApproverRole: 'Head de Operações',
        executorRole: 'Incident Manager (Automated Kill Switch)',
        samePersonCanApproveAndExecute: false,
        executionAllowedNow: false,
        requiresExternalApproval: true
      },
      {
        domain: 'Produção V2',
        proposerRole: 'Product Manager',
        reviewerRole: 'CISO, Diretor Jurídico',
        futureApproverRole: 'CEO / CTO',
        executorRole: 'Release Pipeline',
        samePersonCanApproveAndExecute: false,
        executionAllowedNow: false,
        requiresExternalApproval: true
      }
    ];
  }
}
