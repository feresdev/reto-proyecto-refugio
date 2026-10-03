import { serve } from "@hono/node-server";
import { app } from "../src/app.mjs";
import { environment } from "../src/config/environment.js";

serve({ fetch: app.fetch, port: environment.port }, (info) => {
  console.log(`Backend ejecutándose en http://localhost:${info.port}`);
});
