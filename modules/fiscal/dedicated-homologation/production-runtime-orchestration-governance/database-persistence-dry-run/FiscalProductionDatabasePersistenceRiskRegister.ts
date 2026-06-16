export class FiscalProductionDatabasePersistenceRiskRegister {
  public static getRisks(): string[] {
    return [
      'R-PDBP-01: Risco de blueprint de conexão parecer banco realmente conectado.',
      'R-PDBP-02: Risco de connection pool no-create parecer pool provisionado.',
      'R-PDBP-03: Risco de transaction boundary parecer transação real segura.',
      'R-PDBP-04: Risco de query runner no-execute parecer consulta real validada.',
      'R-PDBP-05: Risco de DML/DDL no-execute parecer migração testada em banco real.',
      'R-PDBP-06: Risco de repository no-mutation parecer escrita validada.',
      'R-PDBP-07: Risco de database credential no-read parecer segredo sanitizado lido.',
      'R-PDBP-08: Risco de tenant data no-read parecer leitura segura real.',
      'R-PDBP-09: Risco de fiscal document no-read parecer validação real de XML/PDF.',
      'R-PDBP-10: Risco de UI ocultar activationBlocked=true e simulationOnly=true.',
      'R-PDBP-11: Risco de automação externa ignorar approvedForRealDatabaseConnection=false.',
      'R-PDBP-12: Risco de testes temporários permanecerem no repositório.',
      'R-PDBP-13: Risco de namespace/export colidir com domínios anteriores.',
      'R-PDBP-14: Risco de diretoria interpretar persistence blueprint como banco produtivo liberado.'
    ];
  }
}
