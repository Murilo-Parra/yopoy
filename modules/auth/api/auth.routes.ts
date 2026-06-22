import { Request, Response, Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthHttpHandlers } from "../../../src/backend/auth/AuthHttpHandlers";
import { LocalPostgresSqlExecutor } from "../../../src/infrastructure/postgres/executor/LocalPostgresSqlExecutor";
import { LocalPostgresUnitOfWork } from "../../../src/infrastructure/postgres/unit-of-work/LocalPostgresUnitOfWork";

const router = Router();
const controller = new AuthController();
let minimalSignupHandlers: AuthHttpHandlers | null = null;

type RegistrationRecord = Record<string, unknown>;

function isRecord(value: unknown): value is RegistrationRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function normalizeRegistrationPayload(body: unknown): unknown {
  if (!isRecord(body) || body.admin !== undefined) {
    return body;
  }

  return {
    admin: {
      nomeCompleto: body.adminName,
      email: body.email,
      senha: body.password,
      confirmarSenha: body.confirmPassword
    },
    company: {
      razaoSocial: body.companyName,
      nomeFantasia: body.tradeName,
      cnpj: body.cnpj,
      email: body.companyEmail,
      endereco: body.endereco,
      regimeTributario: body.regimeTributario
    }
  };
}

function getMinimalSignupHandlers(): AuthHttpHandlers {
  if (minimalSignupHandlers) {
    return minimalSignupHandlers;
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL é obrigatório para o cadastro inicial.");
  }

  const executor = new LocalPostgresSqlExecutor(databaseUrl);
  const unitOfWork = new LocalPostgresUnitOfWork(executor);
  minimalSignupHandlers = new AuthHttpHandlers(unitOfWork);
  return minimalSignupHandlers;
}

export async function handleMinimalSignup(req: Request, res: Response): Promise<void> {
  req.body = normalizeRegistrationPayload(req.body);
  await getMinimalSignupHandlers().handleRegisterCompany(req, res);
}

async function handleSession(req: Request, res: Response): Promise<void> {
  const cookie = req.headers.cookie;
  if (typeof cookie === "string" && cookie.includes("yopoy_session=")) {
    await getMinimalSignupHandlers().handleSession(req, res);
    return;
  }

  await controller.checkSession(req, res);
}

// Define express routes and hook them into their controller actions
router.post("/register", handleMinimalSignup);
router.post("/register-company", handleMinimalSignup);
router.post("/login", (req, res) => getMinimalSignupHandlers().handleLogin(req, res));
router.get("/session", handleSession);
router.post("/logout", (req, res) => getMinimalSignupHandlers().handleLogout(req, res));
router.post("/forgot-password", controller.forgotPassword);
router.post("/reset-password", controller.resetPassword);

export default router;
export { router as authRoutes };
