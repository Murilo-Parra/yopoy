import { Request, Response } from "express";
import { AdminCompanyService } from "../services/AdminCompanyService";

export class AdminCompanyController {
  private service: AdminCompanyService;

  constructor(service = new AdminCompanyService()) {
    this.service = service;
  }

  /**
   * GET /stats
   */
  public getStats = async (req: Request, res: Response): Promise<void> => {
    try {
      const stats = await this.service.getStats();
      res.json(stats);
    } catch (err: any) {
      console.error("Erro estatísticas Super Admin (Controller):", err);
      res.status(500).json({ error: "Falha ao processar estatísticas SaaS." });
    }
  };

  /**
   * GET /companies
   */
  public listCompanies = async (req: Request, res: Response): Promise<void> => {
    try {
      const companies = await this.service.listCompanies();
      res.json(companies);
    } catch (err: any) {
      console.error("Erro listar empresas Super Admin (Controller):", err);
      res.status(500).json({ error: "Erro ao listar empresas do SaaS." });
    }
  };

  /**
   * POST /companies/:id/update
   */
  public updateCompany = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const ip = req.ip || (req.headers["x-forwarded-for"] as string) || "127.0.0.1";
      
      await this.service.updateCompanyAdmin(id, req.body, ip);
      
      res.json({ success: true, message: "Empresa do SaaS atualizada com sucesso!" });
    } catch (err: any) {
      console.error("Erro atualizar empresa Super Admin (Controller):", err);
      res.status(500).json({ error: err.message || "Erro ao atualizar dados da empresa no SaaS." });
    }
  };

  /**
   * POST /companies/:id/delete
   */
  public deleteCompany = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const ip = req.ip || (req.headers["x-forwarded-for"] as string) || "127.0.0.1";
      
      await this.service.deleteCompanyAdmin(id, ip);
      
      res.json({ success: true, message: "Empresa excluída com absoluto sucesso da base relacional." });
    } catch (err: any) {
      console.error("Erro deletar empresa Super Admin (Controller):", err);
      res.status(500).json({ error: err.message || "Erro ao excluir empresa." });
    }
  };
}
