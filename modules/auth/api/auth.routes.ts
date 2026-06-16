import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();
const controller = new AuthController();

// Define express routes and hook them into their controller actions
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/session", controller.checkSession);
router.post("/logout", controller.logout);
router.post("/forgot-password", controller.forgotPassword);
router.post("/reset-password", controller.resetPassword);

export default router;
export { router as authRoutes };
