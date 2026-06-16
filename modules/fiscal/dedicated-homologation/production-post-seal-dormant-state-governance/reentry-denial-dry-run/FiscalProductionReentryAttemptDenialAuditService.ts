export class FiscalProductionReentryAttemptDenialAuditService {
  public static audit(event: string, details?: any) {
    // registrar apenas leituras administrativas em memória;
    // não persistir payload bruto;
    // não persistir dado sensível;
    // não criar tentativa real de reentrada;
    // não desbloquear retomada real;
    // não retomar autoridade real;
    // não retomar ativação real;
    // não retomar roteamento real;
    // não retomar runtime real;
    // não retomar banco real;
    // não retomar integração externa real;
    // não retomar acesso a dado sensível real;
    // não destravar gate;
    // não emitir token;
    // não criar caminho real de ativação;
    // não criar caminho real para Produção V2;
    // não ativar Produção V2;
    // não alterar routeToV2;
    // não alterar routeToLegacy;
    // não alterar tráfego/load balancer/DNS;
    // não instalar proxy/middleware/tap/mirror/sniffer/shadow traffic;
    // não iniciar runtime/queue/job/worker/scheduler/cron/shell;
    // não conectar banco;
    // não abrir transação;
    // não executar DML/DDL/migration;
    // não chamar SEFAZ/API externa;
    // não enviar webhook/notificação;
    // não ler payload/XML/PDF/tenant data/documento fiscal;
    // não ler token/secret/API key/certificado/PFX/private key;
    // não usar crypto real;
    // não assinar XML;
    // não escrever filesystem/storage/banco.
    console.log(`[AUDIT - Módulo 46.2] ${event}`, details ? JSON.stringify(details) : '');
  }
}
