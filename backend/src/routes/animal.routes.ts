import { Hono } from 'hono';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import type { AnimalController } from '../types/hono.types.js';

export const createAnimalRoutes = (controller: AnimalController) => {
  const routes = new Hono();
  routes.use('*', authMiddleware);
  routes.post('/', controller.create);
  routes.put('/:id', controller.update);
  routes.get('/', controller.list);
  return routes;
};
