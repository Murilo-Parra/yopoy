import { Request, Response } from "express";
import { CompanyService } from "../services/CompanyService";
import { CompanyCertificateService } from "../services/CompanyCertificateService";
import { SessionService } from "../../auth/services/SessionService";
import { CompanyValidators } from "../validators/company.validators";
import { CompanyCertificateValidators } from "../validators/companyCertificate.validators";

export class CompanyController {
  private companyService: CompanyService;
  private companyCertificateService: CompanyCertificateService;
  private sessionService: SessionService;

  constructor(
    companyService = new CompanyService(),
    companyCertificateService = new CompanyCertificateService(),
    sessionService = new SessionService()
  ) {
    this.companyService = companyService;
    this.companyCertificateService = companyCertificateService;
    this.sessionService = sessionService;
  }

  /**
   * Helper to resolve the session from either req.session or request header authorization
   */
  private async getSession(req: Request): Promise<any | null> {
    if ((req as any).session) {
      return (req as any).session;
    }

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      return this.sessionService.validateSession(token);
    }
    return null;
  }

  /**
   * GET /api/auth/company-details
   */
  public getDetails = async (req: Request, res: Response): Promise<void> => {
    try {
      const session = await this.getSession(req);
      if (!session) {
        res.status(401).json({ error: "Sessão expirada ou Token inválido." });
        return;
      }

      const company = await this.companyService.getCompanyDetails(session.company_id);
      if (!company) {
        res.status(404).json({ error: "Empresa não encontrada no PostgreSQL." });
        return;
      }

      res.json({
        success: true,
        company
      });
    } catch (err: any) {
      console.error("[CompanyController] Error in getDetails:", err);
      res.status(500).json({ error: "Falha interna ao carregar detalhes corporativos" });
    }
  };

  /**
   * POST /api/auth/company-update
   */
  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const session = await this.getSession(req);
      if (!session) {
        res.status(401).json({ error: "Usuário não autenticado." });
        return;
      }

      const validatorResult = CompanyValidators.validateUpdate(req.body);
      if (!validatorResult.success) {
        res.status(400).json({ error: validatorResult.error });
        return;
      }

      const ip = req.ip || (req.headers["x-forwarded-for"] as string) || "127.0.0.1";

      const serviceResult = await this.companyService.updateCompany(
        session.company_id,
        session.user_id,
        validatorResult.data!,
        ip
      );

      res.json(serviceResult);
    } catch (err: any) {
      console.error("[CompanyController] Error in update:", err);
      res.status(500).json({ error: "Falha interna ao salvar detalhes corporativos" });
    }
  };

  /**
   * GET /api/fiscal/certificates
   */
  public listCertificates = async (req: Request, res: Response): Promise<void> => {
    try {
      const session = await this.getSession(req);
      if (!session) {
        res.status(401).json({ error: "Sessão expirada ou Token inválido." });
        return;
      }

      const safeCerts = await this.companyCertificateService.listCertificates(session.company_id);
      res.json({ success: true, certificates: safeCerts });
    } catch (err: any) {
      console.error("[CompanyController] Error in listCertificates:", err);
      res.status(500).json({ error: "Falha interna ao carregar certificados do servidor." });
    }
  };

  /**
   * POST /api/fiscal/certificates
   */
  public uploadCertificate = async (req: Request, res: Response): Promise<void> => {
    try {
      const session = await this.getSession(req);
      if (!session) {
        res.status(401).json({ error: "Sessão expirada ou Token inválido." });
        return;
      }

      const validatorResult = CompanyCertificateValidators.validateUpload(req.body);
      if (!validatorResult.success) {
        res.status(400).json({ error: validatorResult.error });
        return;
      }

      const ip = req.ip || (req.headers["x-forwarded-for"] as string) || "127.0.0.1";

      const serviceResult = await this.companyCertificateService.uploadCertificate(
        session.company_id,
        session.user_id,
        validatorResult.data!,
        ip
      );

      res.json(serviceResult);
    } catch (err: any) {
      console.error("[CompanyController] Error in uploadCertificate:", err);
      const status = err.message && err.message.includes("Não foi possível abrir") ? 400 : 500;
      res.status(status).json({ error: err.message || "Erro inesperado ao salvar certificado digital no servidor." });
    }
  };

  /**
   * DELETE /api/fiscal/certificates/:id
   */
  public deleteCertificate = async (req: Request, res: Response): Promise<void> => {
    try {
      const session = await this.getSession(req);
      if (!session) {
        res.status(401).json({ error: "Sessão expirada ou Token inválido." });
        return;
      }

      const certId = req.params.id;
      const validatorResult = CompanyCertificateValidators.validateDelete(certId);
      if (!validatorResult.success) {
        res.status(400).json({ error: validatorResult.error });
        return;
      }

      const ip = req.ip || (req.headers["x-forwarded-for"] as string) || "127.0.0.1";

      const serviceResult = await this.companyCertificateService.deleteCertificate(
        session.company_id,
        session.user_id,
        certId,
        ip
      );

      res.json(serviceResult);
    } catch (err: any) {
      console.error("[CompanyController] Error in deleteCertificate:", err);
      const status = err.message && err.message.includes("não foi localizado") ? 404 : 400;
      res.status(status).json({ error: err.message || "Erro inesperado ao remover o certificado digital." });
    }
  };
}
