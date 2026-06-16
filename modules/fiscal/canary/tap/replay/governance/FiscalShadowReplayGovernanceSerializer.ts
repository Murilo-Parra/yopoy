export class FiscalShadowReplayGovernanceSerializer {
  public serializeJson(data: any): any {
    const rawStr = JSON.stringify(data);
    const blockedKeywords = ["<xml", "<?xml", "CERTIFICATE", "PFX", "PRIVATE KEY", "privateKey", "token", "password", "senha"];
    
    for (const kw of blockedKeywords) {
      if (rawStr.includes(kw)) {
        return { error: `Sensível payload detectado: contem ${kw}. Abortando.` };
      }
    }
    
    const dt = JSON.parse(rawStr);
    delete dt.payload;
    delete dt.rawPayload;
    delete dt.rawRequest;
    delete dt.rawResponse;
    return dt;
  }

  public serializeText(data: any): string {
    const jsonStr = JSON.stringify(this.serializeJson(data), null, 2);
    if (jsonStr.includes("error:")) return jsonStr;

    return `
=============================================
REPLAY GOVERNANCE EXPORT
=============================================
Data: ${new Date().toISOString()}

STATUS EXECUTIVO: NÃO APROVADO PARA PRODUÇÃO V2
Mensagem: Este pacote de governança é read-only, simulationOnly e não autoriza ativação real do Fiscal V2.

Métricas Básicas:
- Itens de Fila: ${data.snapshot?.totalQueueItems || 0}
- Simulações Manuais: ${data.snapshot?.totalManualCaptures || 0}
- Corridas de Lote (Batches): ${data.snapshot?.totalBatchRuns || 0}

Regras:
- approvedForRealCanary: false
- approvedForProductionV2: false
- payloadIncluded: false
- sensitiveDataIncluded: false

=============================================
FIM DO RELATÓRIO
=============================================
`;
  }
}
