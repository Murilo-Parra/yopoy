import { FiscalSandboxReplayBridgeSource, FiscalSandboxReplayBridgeOperation } from './FiscalSandboxReplayBridgeTypes';

// Em uma implementação real usando banco de dados, isso usaria uma tabela própria como fiscal_v2_sandbox_bridge_audit
// Como regra, se usar o banco, apenas inserir em tabelas do sandbox e nunca gravar payload bruto.
// Para este laboratório inerte sem tabela de audit pré-criada, mantemos contadores em memória
// E respeitamos todo o framework isolado.

export class FiscalSandboxReplayBridgeAuditService {
  private static attempts: { 
    source: string; 
    operation: string; 
    status: 'SUCCESS' | 'BLOCKED' | 'FAILED_SAFE';
    timestamp: string;
  }[] = [];

  public static async logAttempt(
    source: string, 
    operation: string, 
    status: 'SUCCESS' | 'BLOCKED' | 'FAILED_SAFE'
  ): Promise<void> {
    this.attempts.push({
      source,
      operation,
      status,
      timestamp: new Date().toISOString()
    });
    
    // Manter o limite in-memory para n\u00e3o estourar mem\u00f3ria num ambiente serverless
    if (this.attempts.length > 5000) {
      this.attempts.shift();
    }
  }

  public static async getLogs(limit: number = 100): Promise<any[]> {
    return [...this.attempts].reverse().slice(0, limit).map(a => ({
      ...a,
      sandboxOnly: true,
      productionWrite: false,
      simulationOnly: true,
      activationBlocked: true
    }));
  }

  public static getAttempts() {
    return this.attempts;
  }
}
