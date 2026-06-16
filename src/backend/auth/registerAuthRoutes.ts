import { Router } from 'express';
import { AuthHttpHandlers } from './AuthHttpHandlers';

export function registerAuthRoutes(handlers: AuthHttpHandlers): Router {
  const router = Router();

  router.post('/login', handlers.handleLogin);
  router.get('/session', handlers.handleSession);
  router.post('/logout', handlers.handleLogout);
  router.post('/require-permission', handlers.handleRequirePermission);
  router.post('/register-company', handlers.handleRegisterCompany);

  return router;
}
