import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { SessionService } from "../services/SessionService";
import { PasswordResetService } from "../services/PasswordResetService";
import { AuthValidators } from "../validators/auth.validators";
import { AuditLogger, AuditCategory } from "../../../shared/audit";

export class AuthController {
  private authService: AuthService;
  private sessionService: SessionService;
  private passwordResetService: PasswordResetService;

  constructor(
    authService = new AuthService(),
    sessionService = new SessionService(),
    passwordResetService = new PasswordResetService()
  ) {
    this.authService = authService;
    this.sessionService = sessionService;
    this.passwordResetService = passwordResetService;
  }

  /**
   * Register a new user and company
   */
  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = AuthValidators.validateRegister(req.body);
      if (!validation.success) {
        res.status(400).json({ error: validation.error });
        return;
      }

      const { email, companyName, adminName } = req.body;
      const existingUser = await this.authService.findUserByEmail(email);
      if (existingUser) {
        res.status(400).json({ error: "Este endereço de e-mail já possui um cadastro ativo no sistema." });
        return;
      }

      const tenant = await this.authService.register(req.body);
      const token = await this.sessionService.createSession(tenant.userId, tenant.companyId);

      const ip = req.ip || (req.headers["x-forwarded-for"] as string) || "127.0.0.1";
      await AuditLogger.info(
        AuditCategory.AUTH,
        "CADASTRO_CONTA",
        `Criação da conta multi-tenant pela empresa ${companyName.toUpperCase()} e administrador ${adminName}`,
        null,
        { companyId: tenant.companyId, userId: tenant.userId, ip }
      );
      await AuditLogger.info(
        AuditCategory.AUTH,
        "LOGIN_SUCESSO",
        `Login automático pós-cadastro realizado pelo IP: ${ip}`,
        null,
        { companyId: tenant.companyId, userId: tenant.userId, ip }
      );

      res.json({
        success: true,
        token,
        user: {
          id: tenant.userId,
          name: tenant.name,
          email: tenant.email,
          company_id: tenant.companyId,
          corporateName: tenant.corporate_name,
          tradeName: tenant.corporate_name,
          cnpj: "Não Preenchido",
          plan: tenant.plan || "media",
          allowedTabs: ["dashboard", "finance", "logistics", "advisor", "hierarchy", "invoice", "settings"],
          is_admin: true
        }
      });
    } catch (err: any) {
      console.error("[AuthController] Error during register:", err);
      res.status(500).json({ error: err.message || "Erro interno de processamento ao registrar" });
    }
  };

  /**
   * Login user
   */
  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = AuthValidators.validateLogin(req.body);
      if (!validation.success) {
        res.status(400).json({ error: validation.error });
        return;
      }

      const { email, password } = req.body;
      const ip = req.ip || (req.headers["x-forwarded-for"] as string) || "127.0.0.1";

      const user = await this.authService.findUserByEmail(email);
      if (!user) {
        await AuditLogger.warn(
          AuditCategory.AUTH,
          "CADASTRO_LOGIN_FALHA",
          `Falha de autenticação para e-mail incorreto: ${email} a partir do IP: ${ip}`,
          null,
          { ip }
        );
        res.status(401).json({ error: "Credenciais incorretas ou inválidas. Por favor verifique seu e-mail e senha." });
        return;
      }

      if (user.locked_until) {
        const lockDate = new Date(user.locked_until);
        if (lockDate > new Date()) {
          const remainingMin = Math.ceil((lockDate.getTime() - Date.now()) / 1000 / 60);
          await AuditLogger.warn(
            AuditCategory.AUTH,
            "LOGIN_BLOQUEADO",
            `Tentativa de login de conta bloqueada a partir do IP: ${ip}`,
            null,
            { companyId: user.company_id, userId: user.id, ip }
          );
          res.status(403).json({ error: `Esta conta está temporariamente bloqueada devido a múltiplas falhas seguidas. Tente novamente em ${remainingMin} minuto(s).` });
          return;
        }
      }

      const isPassValid = this.authService.comparePasswords(password, user.password_hash || "");
      if (!isPassValid) {
        const currentAttempts = await this.authService.handleLoginFailure(user.id);
        await AuditLogger.warn(
          AuditCategory.AUTH,
          "LOGIN_FALHA",
          `Tentativa incorreta. Erros seguidos: ${currentAttempts}. IP: ${ip}`,
          null,
          { companyId: user.company_id, userId: user.id, ip }
        );

        if (currentAttempts && currentAttempts >= 5) {
          res.status(403).json({ error: "Conta boicotada e bloqueada por excesso de erros (5 tentativas). Aguarde 15 minutos e tente de novo." });
        } else {
          res.status(401).json({ error: "Credenciais incorretas ou inválidas. Por favor verifique seu e-mail e senha." });
        }
        return;
      }

      await this.authService.handleLoginSuccess(user.id);
      const token = await this.sessionService.createSession(user.id, user.company_id);

      await AuditLogger.info(
        AuditCategory.AUTH,
        "LOGIN_SUCESSO",
        `Autenticação bem-sucedida realizada. Sessão estabelecida por IP: ${ip}`,
        null,
        { companyId: user.company_id, userId: user.id, ip }
      );

      let corporateName = "Empresa Integrada";
      let tradeName = "Empresa Integrada";
      let cnpj = "Não Preenchido";

      const validatedSess = await this.sessionService.validateSession(token);
      if (validatedSess) {
        corporateName = validatedSess.corporate_name || corporateName;
        tradeName = validatedSess.trade_name || tradeName;
        cnpj = validatedSess.cnpj || cnpj;
      }

      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.login,
          company_id: user.company_id,
          corporateName,
          tradeName,
          cnpj,
          plan: validatedSess?.plan || "media",
          allowedTabs: user.allowed_tabs || ["dashboard", "finance", "logistics", "advisor", "hierarchy", "invoice", "settings"],
          is_admin: user.is_admin
        }
      });
    } catch (err: any) {
      console.error("[AuthController] Error during login:", err);
      res.status(500).json({ error: err.message || "Erro interno de autenticação" });
    }
  };

  /**
   * Validate session check
   */
  public checkSession = async (req: Request, res: Response): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Sessão expirada ou Token inválido." });
        return;
      }

      const token = authHeader.substring(7);
      const session = await this.sessionService.validateSession(token);
      if (!session) {
        res.status(401).json({ error: "Sessão expirada ou Token inválido." });
        return;
      }

      res.json({
        success: true,
        token,
        user: {
          id: session.user_id,
          name: session.name,
          email: session.login,
          company_id: session.company_id,
          corporateName: session.corporate_name,
          tradeName: session.trade_name,
          cnpj: session.cnpj || "Não Preenchido",
          plan: session.plan || "media",
          allowedTabs: session.allowed_tabs || ["dashboard", "finance", "logistics", "advisor", "hierarchy", "invoice", "settings"],
          is_admin: session.is_admin
        }
      });
    } catch (err: any) {
      console.error("[AuthController] Error checking session:", err);
      res.status(500).json({ error: "Erro de checagem interna" });
    }
  };

  /**
   * Handle user logout
   */
  public logout = async (req: Request, res: Response): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7);
        const session = await this.sessionService.validateSession(token);
        if (session) {
          const ip = req.ip || (req.headers["x-forwarded-for"] as string) || "127.0.0.1";
          await AuditLogger.info(
            AuditCategory.AUTH,
            "LOGOUT",
            `Usuário efetuou logout voluntário. IP: ${ip}`,
            null,
            { companyId: session.company_id, userId: session.user_id, ip }
          );
          await this.sessionService.revokeSession(token);
        }
      }
      res.json({ success: true });
    } catch (err: any) {
      console.error("[AuthController] Error during logout:", err);
      res.status(500).json({ error: "Erro interno no logout" });
    }
  };

  /**
   * Request password reset token
   */
  public forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = AuthValidators.validateForgotPassword(req.body);
      if (!validation.success) {
        res.status(400).json({ error: validation.error });
        return;
      }

      const { email } = req.body;
      const result = await this.passwordResetService.forgotPassword(email);

      if (result.user) {
        const ip = req.ip || (req.headers["x-forwarded-for"] as string) || "127.0.0.1";
        await AuditLogger.info(
          AuditCategory.AUTH,
          "SOLICITAR_RECUPERACAO",
          `Geração de token de redefinição de senha por e-mail: ${email}. IP: ${ip}`,
          null,
          { companyId: result.user.company_id, userId: result.user.id, ip }
        );
      }

      res.json({
        success: result.success,
        message: result.message,
        simulated: result.simulated,
        recoverLink: result.recoverLink,
        resetToken: result.resetToken
      });
    } catch (err: any) {
      console.error("[AuthController] Error in forgotPassword:", err);
      res.status(500).json({ error: "Erro de processamento interno" });
    }
  };

  /**
   * Reset user password
   */
  public resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const validation = AuthValidators.validateResetPassword(req.body);
      if (!validation.success) {
        res.status(400).json({ error: validation.error });
        return;
      }

      const { token, password } = req.body;
      const success = await this.passwordResetService.resetPassword(token, password);
      if (!success) {
        res.status(400).json({ error: "O link de redefinição expirou, já foi utilizado ou é inválido." });
        return;
      }

      res.json({
        success: true,
        message: "Sua senha foi redefinida com sucesso em ambiente criptografado!"
      });
    } catch (err: any) {
      console.error("[AuthController] Error in resetPassword:", err);
      res.status(500).json({ error: "Erro de processamento interno ao redefinir" });
    }
  };
}
