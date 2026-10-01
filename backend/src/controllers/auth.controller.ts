import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import type { AuthService } from '../services/auth.service.js';
import { loginSchema } from '../schemas/auth.schema.js';

export const createAuthController = (service: AuthService) => ({
  login: async (context: Context) => {
    const input = loginSchema.parse(await context.req.json());
    const token = await service.login(input.usuario, input.contrasena);
    if (!token) throw new HTTPException(401, { message: 'Usuario o contraseña incorrectos' });
    return context.json({ token });
  },
  logout: (context: Context) => context.json({ mensaje: 'Sesión cerrada. Elimine el token en el cliente.' }),
});
