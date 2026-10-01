import { serve } from '@hono/node-server';
import { app } from './app.mjs';
import { environment } from './config/environment.js';

serve({ fetch: app.fetch, port: environment.port }, (info) => {
  console.log(`Backend ejecutándose en http://localhost:${info.port}`);
});
