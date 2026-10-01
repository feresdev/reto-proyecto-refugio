import type { Context } from 'hono';

export interface AuthController {
  login(context: Context): Promise<Response>;
  logout(context: Context): Response;
}

export interface AnimalController {
  create(context: Context): Promise<Response>;
  update(context: Context): Promise<Response>;
  list(context: Context): Promise<Response>;
}

export type ReturnType = AuthController;
