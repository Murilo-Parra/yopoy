import { beforeAll, describe, expect, it } from "vitest";
import express, { Express } from "express";
import request from "supertest";
import { randomUUID } from "crypto";
import * as dotenv from "dotenv";
import { AuthRequestValidators } from "../../../src/backend/auth/AuthRequestValidators";
import { authRoutes, normalizeRegistrationPayload } from "../api/auth.routes";

dotenv.config({ path: ".env.local", override: true });

describe("modules/auth real signup routes", () => {
  let app: Express;
  let hasDb = false;

  const validAdmin = () => ({
    nomeCompleto: "Administrador Local",
    email: `modules-auth-${randomUUID().substring(0, 8)}@example.com`,
    senha: "N7!rKq4#vM2zLw9",
    confirmarSenha: "N7!rKq4#vM2zLw9"
  });

  beforeAll(async () => {
    app = express();
    app.use(express.json());
    app.use("/api/auth", authRoutes);

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) return;

    try {
      const { Client } = await import("pg");
      const client = new Client({ connectionString: databaseUrl, connectionTimeoutMillis: 1000 });
      await client.connect();
      await client.end();
      hasDb = true;
    } catch {
      hasDb = false;
    }
  });

  it("accepts minimal signup through the server alias without CNPJ", async () => {
    if (!hasDb) return;

    const response = await request(app)
      .post("/api/auth/register-company")
      .send({
        admin: validAdmin(),
        company: { razaoSocial: "Meu negócio modules auth" }
      });

    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.company.razaoSocial).toBe("Meu negócio modules auth");
    expect(response.body.company.cnpj).toBeNull();
    expect(response.body.user.id).toBeDefined();
    expect(response.body.session.id).toBeDefined();
    expect(response.headers["set-cookie"]?.join(";")).toContain("yopoy_session=");
  });

  it("keeps POST /register and maps the legacy payload to the minimal contract", async () => {
    if (!hasDb) return;

    const response = await request(app)
      .post("/api/auth/register")
      .send({
        companyName: "Meu negócio via cadastro mínimo",
        adminName: "Administrador Legado",
        email: `legacy-${randomUUID().substring(0, 8)}@example.com`,
        password: "N7!rKq4#vM2zLw9",
        confirmPassword: "N7!rKq4#vM2zLw9"
      });

    expect(response.status).toBe(200);
    expect(response.body.company.razaoSocial).toBe("Meu negócio via cadastro mínimo");
    expect(response.body.company.cnpj).toBeNull();
  });

  it("logs in the minimally registered account and recognizes both cookies", async () => {
    if (!hasDb) return;

    const email = `full-flow-${randomUUID().substring(0, 8)}@example.com`;
    const password = "N7!rKq4#vM2zLw9";
    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({
        companyName: "Workspace fluxo completo",
        adminName: "Administrador Completo",
        email,
        password,
        confirmPassword: password
      });

    expect(registerResponse.status).toBe(200);
    const registerCookie = registerResponse.headers["set-cookie"]?.[0];
    expect(registerCookie).toContain("yopoy_session=");

    const registerSession = await request(app)
      .get("/api/auth/session")
      .set("Cookie", registerCookie);
    expect(registerSession.body.authenticated).toBe(true);

    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({ email, password });
    expect(loginResponse.status).toBe(200);
    const loginCookie = loginResponse.headers["set-cookie"]?.[0];
    expect(loginCookie).toContain("yopoy_session=");

    const loginSession = await request(app)
      .get("/api/auth/session")
      .set("Cookie", loginCookie);
    expect(loginSession.body.authenticated).toBe(true);

    const wrongPassword = await request(app)
      .post("/api/auth/login")
      .send({ email, password: "senha-incorreta" });
    expect(wrongPassword.status).toBe(401);
  });

  it("accepts a valid optional CNPJ without persisting a test company", () => {
    const payload = normalizeRegistrationPayload({
      adminName: "Administrador",
      email: "valid-cnpj@example.com",
      password: "N7!rKq4#vM2zLw9",
      confirmPassword: "N7!rKq4#vM2zLw9",
      companyName: "Empresa com CNPJ",
      cnpj: "12.345.678/0001-90"
    });

    expect(AuthRequestValidators.validateRegisterCompanyInput(payload).valid).toBe(true);
  });

  it("rejects an invalid optional CNPJ", () => {
    const validation = AuthRequestValidators.validateRegisterCompanyInput({
      admin: validAdmin(),
      company: { cnpj: "123" }
    });

    expect(validation.valid).toBe(false);
    expect(validation.message).toContain("14 dígitos");
  });

  it.each([
    { nomeCompleto: "", email: "missing-name@example.com", senha: "N7!rKq4#vM2zLw9", confirmarSenha: "N7!rKq4#vM2zLw9" },
    { nomeCompleto: "Administrador", email: "", senha: "N7!rKq4#vM2zLw9", confirmarSenha: "N7!rKq4#vM2zLw9" },
    { nomeCompleto: "Administrador", email: "missing-password@example.com", senha: "", confirmarSenha: "" },
    { nomeCompleto: "Administrador", email: "missing-confirmation@example.com", senha: "N7!rKq4#vM2zLw9", confirmarSenha: "" }
  ])("keeps required admin fields mandatory", (admin) => {
    const validation = AuthRequestValidators.validateRegisterCompanyInput({ admin });
    expect(validation.valid).toBe(false);
  });

  it("keeps the strong password policy", async () => {
    if (!hasDb) return;

    const response = await request(app)
      .post("/api/auth/register-company")
      .send({
        admin: {
          nomeCompleto: "Administrador",
          email: `weak-${randomUUID().substring(0, 8)}@example.com`,
          senha: "123",
          confirmarSenha: "123"
        }
      });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("INVALID_INPUT");
  });
});
