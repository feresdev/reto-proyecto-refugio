import { jwtVerify } from 'jose';
import type { MiddlewareHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { environment } from '../config/environment.js';
import type { AuthenticatedUser } from '../types/auth.types.js';

const secret = new TextEncoder().encode(environment.jwtSecret);

export const authMiddleware: MiddlewareHandler = async (context, next) => {
  const authorization = context.req.header('Authorization');
  if (!authorization?.startsWith('Bearer ')) {
    throw new HTTPException(401, { message: 'Token de autenticación requerido' });
  }
  try {
    const { payload } = await jwtVerify(authorization.slice(7), secret);
    context.set('user', { id: Number(payload.sub), usuario: String(payload.usuario) } satisfies AuthenticatedUser);
    await next();
  } catch {
    throw new HTTPException(401, { message: 'Token inválido o expirado' });
  }
};
