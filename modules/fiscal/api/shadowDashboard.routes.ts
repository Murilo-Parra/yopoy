import { Router } from "express";
import { ShadowDashboardController } from "./ShadowDashboardController";
import { requireFiscalAuth } from "./helpers";

const shadowDashboardRoutes = Router();
const controller = new ShadowDashboardController();

// Authentication is mandatory
shadowDashboardRoutes.use(requireFiscalAuth);

// Optional: you could add an admin auth middleware here 
// Example: shadowDashboardRoutes.use(requireAdminPrivileges);
// But we're handling basic scoping directly inside the controller methods via `is_master_admin` check.

shadowDashboardRoutes.get("/summary", (req, res) => controller.getSummary(req, res));
shadowDashboardRoutes.get("/divergences", (req, res) => controller.listDivergences(req, res));
shadowDashboardRoutes.get("/severity", (req, res) => controller.getSeverityBreakdown(req, res));
shadowDashboardRoutes.get("/readiness", (req, res) => controller.getReadiness(req, res));

export { shadowDashboardRoutes };
