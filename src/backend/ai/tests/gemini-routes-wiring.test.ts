import { describe, expect, it } from "vitest";
import * as fs from "fs";
import * as path from "path";

describe("Gemini route extraction 49.1-C", () => {
  function readProjectFile(relativePath: string): string {
    const filePath = path.resolve(process.cwd(), relativePath);
    expect(fs.existsSync(filePath), `${relativePath} must exist`).toBe(true);
    return fs.readFileSync(filePath, "utf8");
  }

  it("mantém o wiring modular no server.ts", () => {
    const serverContent = readProjectFile("server.ts");

    expect(serverContent).toContain(
      'import { registerGeminiRoutes } from "./src/backend/ai/registerGeminiRoutes";'
    );
    expect(serverContent).toContain("registerGeminiRoutes(app);");
    expect(serverContent).not.toMatch(
      /app\.post\(\s*["']\/api\/gemini\/parse-receipt["']/
    );
    expect(serverContent).not.toMatch(
      /app\.post\(\s*["']\/api\/gemini\/chat-assistant["']/
    );
    expect(serverContent).not.toContain("GoogleGenAI");
  });

  it("mantém as duas rotas no módulo ai", () => {
    const routeContent = readProjectFile("src/backend/ai/registerGeminiRoutes.ts");

    expect(routeContent).toContain("export function registerGeminiRoutes(");
    expect(routeContent).toMatch(
      /app\.post\(\s*["']\/api\/gemini\/parse-receipt["']/
    );
    expect(routeContent).toMatch(
      /app\.post\(\s*["']\/api\/gemini\/chat-assistant["']/
    );
  });

  it("não usa atalhos de tipagem proibidos", () => {
    const routeContent = readProjectFile("src/backend/ai/registerGeminiRoutes.ts");
    const forbiddenPatterns = [
      /as\s+\x61ny/,
      /Promise\s*<\s*\x61ny\s*>/,
      /\b\x61ny\b/,
      /unknown\s+as\s+Request/,
      /unknown\s+as\s+Response/
    ];

    for (const pattern of forbiddenPatterns) {
      expect(routeContent).not.toMatch(pattern);
    }
  });

  it("não acopla o módulo ai ao módulo auth", () => {
    const routeContent = readProjectFile("src/backend/ai/registerGeminiRoutes.ts");

    expect(routeContent).not.toContain("src/backend/auth");
    expect(routeContent).not.toContain("../auth");
    expect(routeContent).not.toContain("/auth/");
  });
});
