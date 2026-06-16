import { Router } from "express";
import { CompanyController } from "./company.controller";

const router = Router();
const controller = new CompanyController();

// Define express routes and hook them into their controller actions
router.get("/company-details", controller.getDetails);
router.post("/company-update", controller.update);

export default router;
export { router as companyRoutes };
