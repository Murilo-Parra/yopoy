export class FiscalRealResponsibilityMatrix {
  public static getMatrix() {
    return [
      {
        domain: 'Infraestrutura',
        ownerRole: 'SRE / Cloud Engineer',
        requiredApproval: 'Tech Lead Infraestrutura',
        externalDependency: 'Provedor de Nuvem',
        executionAllowedNow: false,
        approvalRequiredBeforeExecution: true
      },
      {
        domain: 'Segurança',
        ownerRole: 'SecOps',
        requiredApproval: 'CISO / Head of Security',
        externalDependency: 'Pentester / Ferramenta de Análise Estática',
        executionAllowedNow: false,
        approvalRequiredBeforeExecution: true
      },
      {
        domain: 'Banco de Dados',
        ownerRole: 'DBA',
        requiredApproval: 'DBA Leader',
        externalDependency: 'Nenhuma',
        executionAllowedNow: false,
        approvalRequiredBeforeExecution: true
      },
      {
        domain: 'Fiscal/Contábil',
        ownerRole: 'Especialista Fiscal',
        requiredApproval: 'Contador Responsável',
        externalDependency: 'Consultoria Tributária Externa',
        executionAllowedNow: false,
        approvalRequiredBeforeExecution: true
      },
      {
        domain: 'SEFAZ',
        ownerRole: 'Engenheiro de Integração',
        requiredApproval: 'Tech Lead de Integrações',
        externalDependency: 'Endpoint de Homologação SEFAZ',
        executionAllowedNow: false,
        approvalRequiredBeforeExecution: true
      },
      {
        domain: 'Certificados',
        ownerRole: 'SecOps / Responsável Legal',
        requiredApproval: 'Diretor / Sócio (para certificado e-CNPJ)',
        externalDependency: 'Certificadora Raiz',
        executionAllowedNow: false,
        approvalRequiredBeforeExecution: true
      },
      {
        domain: 'Observabilidade',
        ownerRole: 'Site Reliability Engineer',
        requiredApproval: 'Tech Lead Operações',
        externalDependency: 'Plataforma Datadog/ELK',
        executionAllowedNow: false,
        approvalRequiredBeforeExecution: true
      },
      {
        domain: 'Operações',
        ownerRole: 'NOC / Suporte N3',
        requiredApproval: 'Head de Suporte',
        externalDependency: 'Nenhuma',
        executionAllowedNow: false,
        approvalRequiredBeforeExecution: true
      },
      {
        domain: 'Jurídico/Compliance',
        ownerRole: 'Advogado Especialista',
        requiredApproval: 'Diretor Jurídico',
        externalDependency: 'Auditoria Externa (se aplicável)',
        executionAllowedNow: false,
        approvalRequiredBeforeExecution: true
      },
      {
        domain: 'Produto',
        ownerRole: 'Product Manager',
        requiredApproval: 'Head de Produto Fiscal',
        externalDependency: 'Nenhuma',
        executionAllowedNow: false,
        approvalRequiredBeforeExecution: true
      }
    ];
  }
}
