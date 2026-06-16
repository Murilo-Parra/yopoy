import { Router } from "express";
import { FiscalShadowReplayClosureController } from "./FiscalShadowReplayClosureController";

export const createFiscalShadowReplayClosureRoutes = () => {
    const router = Router();
    const controller = new FiscalShadowReplayClosureController();

    router.get("/inventory", controller.getInventory);
    router.get("/guardrails", controller.getGuardrails);
    router.get("/handoff", controller.getHandoff);
    router.get("/final-report", controller.getFinalReport);

    return router;
};
