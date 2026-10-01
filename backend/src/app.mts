import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { pool } from './config/database.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { AdministratorRepository } from './repositories/administrador.repository.js';
import { AnimalRepository } from './repositories/animal.repository.js';
import { createAnimalController } from './controllers/animal.controller.js';
import { createAuthController } from './controllers/auth.controller.js';
import { createAnimalRoutes } from './routes/animal.routes.js';
import { createAuthRoutes } from './routes/auth.routes.js';
import { AnimalService } from './services/animal.service.js';
import { AuthService } from './services/auth.service.js';
import { environment } from './config/environment.js';

const administratorRepository = new AdministratorRepository(pool);
const animalRepository = new AnimalRepository(pool);
const authController = createAuthController(new AuthService(administratorRepository));
const animalController = createAnimalController(new AnimalService(animalRepository));

export const app = new Hono();
app.use('*', cors({
  origin: (origin) => environment.frontendOrigins.includes(origin) ? origin : undefined,
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'OPTIONS'],
}));
app.get('/health', (context) => context.json({ status: 'ok' }));
app.route('/auth', createAuthRoutes(authController));
app.route('/animals', createAnimalRoutes(animalController));
// Vercel puede conservar el prefijo del rewrite; se soportan ambas formas.
app.get('/api/health', (context) => context.json({ status: 'ok' }));
app.route('/api/auth', createAuthRoutes(authController));
app.route('/api/animals', createAnimalRoutes(animalController));
app.onError(errorHandler);

export default app;
