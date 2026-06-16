import { Router } from "express";
import { SandboxFiscalController } from "./SandboxFiscalController";
import { requireFiscalAuth } from "./helpers";

const router = Router();

// Middleware de autenticação obrigatória para todas as rotas sandbox
router.use(requireFiscalAuth);

const sandboxController = new SandboxFiscalController();

/**
 * Rotas de Sandbox (Sprint 4.10)
 * Exclusivo para persistência de dados de teste de forma isolada e com cleanup obrigatório.
 */

// Criação de documentos sandbox
router.post("/documents", (req, res) => sandboxController.sandboxCreateDocument(req, res));

// NFe sandbox
router.post("/nfe", (req, res) => sandboxController.sandboxCreateNfe(req, res));
router.post("/nfe/:id/status", (req, res) => sandboxController.sandboxUpdateNfeStatus(req, res));

// NFCe sandbox
router.post("/nfce", (req, res) => sandboxController.sandboxCreateNfce(req, res));
router.post("/nfce/:id/cancel", (req, res) => sandboxController.sandboxCancelNfce(req, res));

// DANFE sandbox
router.post("/danfe", (req, res) => sandboxController.sandboxSaveDanfe(req, res));

// Sefaz Protocols sandbox
router.post("/sefaz/protocols", (req, res) => sandboxController.sandboxSaveProtocol(req, res));

// Cleanup obrigatório sandbox
router.post("/cleanup", (req, res) => sandboxController.cleanupSandbox(req, res));

export { router as sandboxRoutes };
