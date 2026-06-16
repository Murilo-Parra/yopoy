const fs = require('fs');

let code = fs.readFileSync('server.ts', 'utf8');

// Add imports
if (!code.includes('SefazEventMonitor')) {
  code = `import { SefazEventMonitor } from './src/utils/sefaz_events/SefazEventMonitor';\n` + 
         `import { SefazEventQueue } from './src/utils/sefaz_events/SefazEventQueue';\n` +
         `import { SefazEventAuditService } from './src/utils/sefaz_events/SefazEventAuditService';\n` + 
         code;
}

// Ensure the monitor is started during bootstrap
code = code.replace(/async function bootstrapServer\(\) \{/, \`async function bootstrapServer() {
  // Start Event Monitor for SEFAZ
  SefazEventMonitor.startWorker(20000);
\`);

// Add HTTP endpoints for SEFAZ Events
const eventsEndpoints = \`

// ==========================================
// MÓDULO DE EVENTOS / MANIFESTAÇÃO DF-e 
// ==========================================

app.post("/api/sefaz/manifest", async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) { res.status(401).json({ error: "Sessão inválida" }); return; }
    
    const { chaveNfe, tipoManifestacao, justificativa } = req.body;
    
    // Obter CNPJ do emissor/empresa 
    const compRes = await pgPool?.query('SELECT cnpj_cpf FROM companies WHERE id = $1', [session.company_id]);
    const cnpj = compRes?.rows[0]?.cnpj_cpf?.replace(/[^0-9]/g, '');

    const eventId = await SefazEventQueue.enqueue(
      session.company_id,
      'MANIFESTACAO',
      { cnpj, chaveNfe, tipoManifestacao, justificativa }
    );

    res.json({ success: true, message: "Evento de Manifestação enfileirado para envio.", jobId: eventId });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/sefaz/distribuicao", async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) { res.status(401).json({ error: "Sessão inválida" }); return; }
    
    const { uf, ultNSU } = req.body;
    
    const compRes = await pgPool?.query('SELECT cnpj_cpf FROM companies WHERE id = $1', [session.company_id]);
    const cnpj = compRes?.rows[0]?.cnpj_cpf?.replace(/[^0-9]/g, '');

    const eventId = await SefazEventQueue.enqueue(
      session.company_id,
      'DISTRIBUICAO_DFE',
      { cnpj, uf, ultNSU: ultNSU || "000000000000000" }
    );

    res.json({ success: true, message: "Consulta de Distribuição DF-e enfileirada e aguardando retorno SEFAZ.", jobId: eventId });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/sefaz/distribuicao", async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) { res.status(401).json({ error: "Sessão inválida" }); return; }
    
    const limit = parseInt(req.query.limit as string) || 100;

    const result = await pgPool?.query(
      'SELECT * FROM sefaz_distribution_documents WHERE company_id = $1 ORDER BY created_at DESC LIMIT $2', 
      [session.company_id, limit]
    );

    res.json(result?.rows || []);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/sefaz/event-queue", async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) { res.status(401).json({ error: "Sessão inválida" }); return; }

    const result = await pgPool?.query(
      'SELECT * FROM sefaz_event_queue WHERE company_id = $1 ORDER BY created_at DESC LIMIT 50', 
      [session.company_id]
    );
    res.json(result?.rows || []);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/sefaz/audit-logs", async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) { res.status(401).json({ error: "Sessão inválida" }); return; }

    const logs = await SefazEventAuditService.getLogs(session.company_id, 100);
    res.json(logs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

\`;

code = code.replace(/app\.get\\("\\/api\\/sefaz\\/status",/, eventsEndpoints + \`\napp.get("/api/sefaz/status",\`);
fs.writeFileSync('server.ts', code, 'utf8');
console.log("Patched server.ts successfully with Events Endpoints.");
