import type { ErrorHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';

export const errorHandler: ErrorHandler = (error, context) => {
  if (error instanceof ZodError) {
    return context.json({ error: 'Datos inválidos', detalles: error.issues }, 400);
  }
  if (error instanceof HTTPException) {
    return error.getResponse();
  }
  console.error(error);
  return context.json({ error: 'Error interno del servidor' }, 500);
};
