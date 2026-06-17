import { Router } from 'express';
import { AdminUsersHttpHandlers } from './AdminUsersHttpHandlers';

export function registerAdminUsersRoutes(handlers: AdminUsersHttpHandlers): Router {
  const router = Router();

  router.get('/users', handlers.handleListUsers);
  router.patch('/users/:userId/status', handlers.handleUpdateStatus);
  router.patch('/users/:userId/permissions', handlers.handleUpdatePermissions);
  router.patch('/users/:userId/role', handlers.handleUpdateRole);
  router.post('/users/:userId/password-reset', handlers.handleResetPassword);

  return router;
}
