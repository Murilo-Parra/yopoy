import { Request, Response } from "express";
import { AdminUserService } from "../services/AdminUserService";
import { AdminUserValidators } from "../validators/adminUser.validators";

export class AdminUserController {
  private service: AdminUserService;

  constructor(service = new AdminUserService()) {
    this.service = service;
  }

  /**
   * GET /users
   */
  public listUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = AdminUserValidators.validateFilters(req.query);
      if (!validation.success) {
        res.status(400).json({ error: validation.error });
        return;
      }

      const users = await this.service.listUsers(validation.data);
      res.json(users);
    } catch (err: any) {
      console.error("Erro listar usuários globais (Controller):", err);
      res.status(500).json({ error: "Erro ao listar usuários globais." });
    }
  };

  /**
   * POST /users/:id/update
   */
  public updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const validation = AdminUserValidators.validateUpdate(req.body);
      if (!validation.success) {
        res.status(400).json({ error: validation.error });
        return;
      }

      const ip = req.ip || (req.headers["x-forwarded-for"] as string) || "127.0.0.1";
      await this.service.updateUser(id, req.body, ip);

      res.json({ success: true, message: "Usuário atualizado com sucesso no SaaS!" });
    } catch (err: any) {
      console.error("Erro atualizar usuário global (Controller):", err);
      res.status(500).json({ error: err.message || "Erro ao salvar dados do usuário." });
    }
  };

  /**
   * POST /users/create
   */
  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = AdminUserValidators.validateCreate(req.body);
      if (!validation.success) {
        res.status(400).json({ error: validation.error });
        return;
      }

      const ip = req.ip || (req.headers["x-forwarded-for"] as string) || "127.0.0.1";
      const user = await this.service.createUser(req.body, ip);

      res.status(201).json({
        success: true,
        message: "Usuário administrativo corporativo gerado estrategicamente com sucesso!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          company_id: user.company_id,
          is_admin: user.is_admin,
          active: user.active
        }
      });
    } catch (err: any) {
      console.error("Erro criar usuário global (Controller):", err);
      res.status(500).json({ error: err.message || "Erro ao criar usuário corporativo no SaaS." });
    }
  };
}
