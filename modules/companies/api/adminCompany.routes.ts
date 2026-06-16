import { Router } from "express";
import { AdminCompanyController } from "./adminCompany.controller";

const adminCompanyRoutes = Router();
const controller = new AdminCompanyController();

adminCompanyRoutes.get("/stats", controller.getStats);
adminCompanyRoutes.get("/companies", controller.listCompanies);
adminCompanyRoutes.post("/companies/:id/update", controller.updateCompany);
adminCompanyRoutes.post("/companies/:id/delete", controller.deleteCompany);

export { adminCompanyRoutes };
