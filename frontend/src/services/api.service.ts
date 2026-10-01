const API_URL = import.meta.env.PUBLIC_API_URL ||
  (import.meta.env.PROD ? '/api' : 'http://localhost:3000');

export class ApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
  }
}

export const apiRequest = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('refugio_token') : null;
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401 && typeof window !== 'undefined') localStorage.removeItem('refugio_token');
    throw new ApiError(response.status, payload.error ?? 'No se pudo completar la solicitud');
  }
  return payload as T;
};
