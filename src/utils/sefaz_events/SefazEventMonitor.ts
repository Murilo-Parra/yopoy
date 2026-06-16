import { SefazEventQueue } from "./SefazEventQueue";
import { SefazEventsService } from "./SefazEventsService";
import { SefazEventAuditService } from "./SefazEventAuditService";
import { pgPool } from "../../../db";

export class SefazEventMonitor {
  private static isRunning = false;

  /**
   * Inicializa o monitoramento automático da fila de Eventos SEFAZ 
   * a ser chamado no bootstrap da aplicação.
   */
  public static startWorker(intervalMs: number = 10000) {
    if (this.isRunning) return;
    this.isRunning = true;
    console.log(`[SefazEventMonitor] Worker de processamento iniciado - checando cada ${intervalMs}ms`);
    
    setInterval(async () => {
      await this.processQueue();
    }, intervalMs);
  }

  private static async processQueue() {
    try {
      const pendingJobs = await SefazEventQueue.getPending(5); // Pega de 5 em 5 jobs
      for (const job of pendingJobs) {
        await this.processJob(job);
      }
    } catch (e) {
      console.error("[SefazEventMonitor] Erro na verificação da fila:", e);
    }
  }

  private static async processJob(job: any) {
    console.log(`[SefazEventMonitor] Processando job ${job.id} (${job.event_type})`);
    await SefazEventQueue.updateStatus(job.id, 'PROCESSING');
    
    try {
      const payload = typeof job.payload === 'string' ? JSON.parse(job.payload) : job.payload;
      
      let res: any;
      
      switch (job.event_type) {
        case 'MANIFESTACAO':
          res = await SefazEventsService.sendManifestacao(
            job.company_id,
            payload.cnpj,
            payload.chaveNfe,
            payload.tipoManifestacao,
            payload.justificativa
          );
          break;
        case 'DISTRIBUICAO_DFE':
          res = await SefazEventsService.distribuicaoDFe(
            job.company_id,
            payload.cnpj,
            payload.uf,
            payload.ultNSU
          );
          // O processamento e gravacao dos XML baixados deve ir para sefaz_distribution_documents
          if (res.success && res.data) {
             await this.processDistDfeXML(job.company_id, res.data);
          }
          break;
        default:
          throw new Error('Tipo de evento desconhecido no SefazEventMonitor');
      }

      if (res.success) {
        await SefazEventQueue.updateStatus(job.id, 'COMPLETED');
        await SefazEventAuditService.logAction(job.company_id, "EVENT_SUCCESS", res, "worker", job.id, job.document_id);
      } else {
        throw new Error(res.message || 'Falha SEFAZ desconhecida');
      }
    } catch (err: any) {
      console.error(`[SefazEventMonitor] Falha no job ${job.id}:`, err.message);
      
      // Retry policy: backoff de base 5 minutes = 300000 * 2^attempts
      const baseDelay = 5 * 60 * 1000;
      const nextDate = new Date(Date.now() + (baseDelay * Math.pow(2, job.retry_count)));
      
      await SefazEventQueue.updateStatus(job.id, 'FAILED', err.message, nextDate);
      await SefazEventAuditService.logAction(job.company_id, "EVENT_FAILED", { error: err.message, attempt: job.retry_count + 1 }, "worker", job.id, job.document_id);
    }
  }

  /**
   * Helper para processar o lote de XML retornado pela Distribuição.
   * Adiciona no PostgreSQL para que os clientes / frontend possam ler.
   */
  private static async processDistDfeXML(companyId: string, xmlResponse: string) {
    if (!pgPool) return;
    
    // Simplificando o parser aqui com regex
    const docs = xmlResponse.match(/<docZip.*?>(.*?)<\/docZip>/g);
    if (!docs) return;

    for (const docXml of docs) {
       const b64 = docXml.match(/>(.*?)</)?.[1] || "";
       if (b64) {
          const rawXml = Buffer.from(b64, 'base64').toString('utf8');
          const nsu = docXml.match(/NSU="(.*?)"/)?.[1] || "0";
          const schema = docXml.match(/schema="(.*?)"/)?.[1] || "";
          
          let chave = rawXml.match(/chNFe=\\"(.*?)\\"/)?.[1] || rawXml.match(/<chNFe>(.*?)<\/chNFe>/)?.[1] || "";
          let cnpj = rawXml.match(/<CNPJ>(.*?)<\/CNPJ>/)?.[1] || "";
          let xNome = rawXml.match(/<xNome>(.*?)<\/xNome>/)?.[1] || "";
          
          try {
            await pgPool.query(`
              INSERT INTO sefaz_distribution_documents (id, company_id, nsu, schema_type, cnpj_cpf, name, access_key, xml_content)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
              ON CONFLICT (id) DO NOTHING
            `, [`dist_${companyId}_${nsu}`, companyId, nsu, schema, cnpj, xNome, chave, rawXml]);
          } catch(e) {}
       }
    }
  }
}
