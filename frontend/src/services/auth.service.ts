import { z } from 'zod';
import { apiRequest } from './api.service';

export const loginSchema = z.object({
  usuario: z.string().min(1, 'Ingresa tu usuario').max(15, 'Máximo 15 caracteres'),
  contrasena: z.string().min(1, 'Ingresa tu contraseña').max(60, 'Máximo 60 caracteres'),
});

interface LoginResponse {
  token: string;
}

export const login = async (input: unknown): Promise<void> => {
  const data = loginSchema.parse(input);
  const response = await apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  localStorage.setItem('refugio_token', response.token);
};

export const logout = async (): Promise<void> => {
  try {
    await apiRequest('/auth/logout', { method: 'POST' });
  } finally {
    localStorage.removeItem('refugio_token');
  }
};

export const hasSession = (): boolean =>
  typeof localStorage !== 'undefined' && Boolean(localStorage.getItem('refugio_token'));
