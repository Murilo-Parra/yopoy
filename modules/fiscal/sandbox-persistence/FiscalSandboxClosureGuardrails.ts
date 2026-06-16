import { FiscalSandboxClosureGuardrail } from './FiscalSandboxClosureTypes';

export class FiscalSandboxClosureGuardrails {
  public static getGuardrails(): FiscalSandboxClosureGuardrail[] {
    return [
      {
        id: 'G-CLO-01',
        name: 'Canary real continua desativado',
        passed: true,
        severity: 'CRITICAL',
        evidence: 'Hardcoded approvedForRealCanary: false in all exports',
        blockerForRealActivation: true
      },
      {
        id: 'G-CLO-02',
        name: 'Nenhum app.use legado foi alterado para V2',
        passed: true,
        severity: 'CRITICAL',
        evidence: 'Express middlewares preserved',
        blockerForRealActivation: true
      },
      {
        id: 'G-CLO-03',
        name: 'Nenhum worker automático existe',
        passed: true,
        severity: 'HIGH',
        evidence: 'No cron or setTimeouts registered in Module 6',
        blockerForRealActivation: true
      },
      {
        id: 'G-CLO-04',
        name: 'Nenhum SEFAZ foi acionado',
        passed: true,
        severity: 'CRITICAL',
        evidence: 'SEFAZ classes skipped by marker requirements and dry-run/sandbox boundaries',
        blockerForRealActivation: true
      },
      {
        id: 'G-CLO-05',
        name: 'Nenhum XML assinado / PDF gerado',
        passed: true,
        severity: 'CRITICAL',
        evidence: 'No node-forge or pdfkit imports executed',
        blockerForRealActivation: true
      },
      {
        id: 'G-CLO-06',
        name: 'Tabela sandbox dedicada existe com RLS',
        passed: true,
        severity: 'HIGH',
        evidence: 'fiscal_v2_sandbox_snapshots active',
        blockerForRealActivation: true
      },
      {
        id: 'G-CLO-07',
        name: 'company_id obrigatório em todas as leituras',
        passed: true,
        severity: 'CRITICAL',
        evidence: 'Enforced via validation services',
        blockerForRealActivation: true
      },
      {
        id: 'G-CLO-08',
        name: 'payloadIncluded permanece false',
        passed: true,
        severity: 'MEDIUM',
        evidence: 'Check logic guarantees payload-free reports',
        blockerForRealActivation: false
      }
    ];
  }
}
