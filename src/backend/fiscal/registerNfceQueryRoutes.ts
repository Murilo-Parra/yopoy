import type { Express, Request, Response } from "express";

interface NfceQuerySession {
  company_id: string;
  user_id: string;
}

interface NfceQueryFilters {
  number?: number;
  series?: number;
  customer_document?: string;
  status?: string;
}

interface NfceDashboardItem {
  quantity?: number;
}

interface NfceQueryDocument {
  issued_at: string;
  created_at: string;
  status: string;
  total_value: string;
  items: unknown;
  [key: string]: unknown;
}

export interface NfceQueryRouteDependencies {
  getSessionFromRequest: (req: Request) => Promise<NfceQuerySession | null>;
  getNfceDocuments: (
    companyId: string,
    filters?: NfceQueryFilters
  ) => Promise<NfceQueryDocument[]>;
  getNfceDocumentById: (
    companyId: string,
    id: string
  ) => Promise<Record<string, unknown> | null>;
  logAudit: (
    companyId: string | null,
    userId: string | null,
    action: string,
    details: string,
    ip: string
  ) => Promise<void>;
}

function getErrorDetail(error: unknown): string {
  if (
    typeof error === "object"
    && error !== null
    && "message" in error
    && error.message
  ) {
    return String(error.message);
  }
  return String(error);
}

export function registerNfceQueryRoutes(
  app: Pick<Express, "get">,
  dependencies: NfceQueryRouteDependencies
): void {
  // 1. LISTAR TODAS AS NFC-E
  app.get("/api/nfce", async (req: Request, res: Response): Promise<void> => {
    try {
      const session = await dependencies.getSessionFromRequest(req);
      if (!session) {
        res.status(401).json({ error: "Sessão expirada para ler notas." });
        return;
      }
      const number = req.query.number ? parseInt(req.query.number as string, 10) : undefined;
      const series = req.query.series ? parseInt(req.query.series as string, 10) : undefined;
      const customer_document = req.query.customer_document ? String(req.query.customer_document) : undefined;
      const status = req.query.status ? String(req.query.status) : undefined;

      const docs = await dependencies.getNfceDocuments(session.company_id, { number, series, customer_document, status });

      const ip = req.ip || (req.headers["x-forwarded-for"] as string) || "127.0.0.1";
      await dependencies.logAudit(session.company_id, session.user_id, "CONSULTA_NFCE_LISTA", `Consultou lista de NFC-e com filtros: ${JSON.stringify(req.query)}`, ip);

      res.json({ success: true, documents: docs });
    } catch (err: unknown) {
      console.error("Erro ao ler nfce_documents:", err);
      res.status(500).json({ error: `Falha ao obter lista de NFC-e: ${getErrorDetail(err)}` });
    }
  });

  // 2. DASHBOARD DE VENDAS NFC-E (MÉTRICAS DO PDV)
  app.get("/api/nfce/dashboard", async (req: Request, res: Response): Promise<void> => {
    try {
      const session = await dependencies.getSessionFromRequest(req);
      if (!session) {
        res.status(401).json({ error: "Sessão expirada." });
        return;
      }

      // Pega todas as NFC-e da empresa para computar métricas de vendas
      const docs = await dependencies.getNfceDocuments(session.company_id);

      // Filtro para vendas "Hoje"
      const todayStr = new Date().toISOString().substring(0, 10);
      const todayDocs = docs.filter(d => {
        const jDateStr = new Date(d.issued_at || d.created_at).toISOString().substring(0, 10);
        return jDateStr === todayStr && d.status !== 'REJECTED';
      });

      const activeDocs = docs.filter(d => d.status !== 'REJECTED');

      // Métricas de Hoje
      const todayCount = todayDocs.length;
      const todayRevenue = todayDocs.reduce((sum, d) => sum + parseFloat((d.total_value || 0) as string), 0);
      const todayAvgTicket = todayCount > 0 ? (todayRevenue / todayCount) : 0;

      let todayProductsCount = 0;
      for (const d of todayDocs) {
        const items = Array.isArray(d.items)
          ? d.items as NfceDashboardItem[]
          : (typeof d.items === 'string' ? JSON.parse(d.items) as NfceDashboardItem[] : []);
        todayProductsCount += items.reduce((sum: number, it: NfceDashboardItem) => sum + (it.quantity || 1), 0);
      }

      // Métricas por Período Clássico (Últimos 15 dias)
      const dailyMap: Record<string, { date: string, revenue: number, count: number }> = {};
      for (let i = 14; i >= 0; i--) {
        const dDate = new Date();
        dDate.setDate(dDate.getDate() - i);
        const dStr = dDate.toISOString().substring(0, 10);
        dailyMap[dStr] = { date: dStr, revenue: 0, count: 0 };
      }

      for (const d of activeDocs) {
        const dStr = new Date(d.issued_at || d.created_at).toISOString().substring(0, 10);
        if (dailyMap[dStr]) {
          dailyMap[dStr].revenue += parseFloat((d.total_value || 0) as string);
          dailyMap[dStr].count += 1;
        }
      }

      const periodMetrics = Object.values(dailyMap);

      res.json({
        success: true,
        dashboard: {
          today: {
            salesCount: todayCount,
            revenue: todayRevenue,
            avgTicket: todayAvgTicket,
            productsSold: todayProductsCount
          },
          period: periodMetrics
        }
      });
    } catch (err: unknown) {
      console.error("Erro no dashboard NFC-e:", err);
      res.status(500).json({ error: `Erro técnico no dashboard: ${getErrorDetail(err)}` });
    }
  });

  // 3. OBTER DETALHE DE NFC-E POR ID
  app.get("/api/nfce/:id", async (req: Request, res: Response): Promise<void> => {
    try {
      const session = await dependencies.getSessionFromRequest(req);
      if (!session) {
        res.status(401).json({ error: "Sessão expirada." });
        return;
      }
      const doc = await dependencies.getNfceDocumentById(session.company_id, req.params.id);
      if (!doc) {
        res.status(404).json({ error: "Documento fiscal NFC-e não encontrado." });
        return;
      }
      res.json({ success: true, document: doc });
    } catch (err: unknown) {
      console.error("Erro ao obter NFC-e:", err);
      res.status(500).json({ error: `Erro técnico ao ler documento: ${getErrorDetail(err)}` });
    }
  });
}
