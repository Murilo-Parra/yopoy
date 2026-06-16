import { Router } from "express";
import { AdminUserController } from "./adminUser.controller";

const adminUserRoutes = Router();
const controller = new AdminUserController();

adminUserRoutes.get("/users", controller.listUsers);
adminUserRoutes.post("/users/:id/update", controller.updateUser);
adminUserRoutes.post("/users/create", controller.createUser);

export { adminUserRoutes };
