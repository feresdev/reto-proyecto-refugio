import { Hono } from 'hono';
import type { ReturnType } from '../types/hono.types.js';

export const createAuthRoutes = (controller: ReturnType) => {
  const routes = new Hono();
  routes.post('/login', controller.login);
  routes.post('/logout', controller.logout);
  return routes;
};
