import { z } from 'zod';
import { apiRequest } from './api.service';
import type { Animal, AnimalFilters, AnimalInput } from '../types/animal';

export const animalSchema = z.object({
  nombre: z.string().trim().min(1, 'Ingresa el nombre'),
  raza: z.string().trim().min(1, 'Ingresa la raza'),
  edad: z.coerce.number().int('La edad debe ser entera').min(0, 'La edad no puede ser negativa'),
  sexo: z.enum(['Hembra', 'Macho']),
  tipoAnimal: z.enum(['Perro', 'Gato']),
});

export const getAnimals = async (filters: AnimalFilters = {}): Promise<Animal[]> => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => value && params.set(key, value));
  const query = params.toString();
  return apiRequest<Animal[]>(`/animals${query ? `?${query}` : ''}`);
};

export const createAnimal = async (input: unknown): Promise<Animal> =>
  apiRequest<Animal>('/animals', { method: 'POST', body: JSON.stringify(animalSchema.parse(input)) });

export const updateAnimal = async (id: number, input: AnimalInput): Promise<Animal> =>
  apiRequest<Animal>(`/animals/${id}`, { method: 'PUT', body: JSON.stringify(animalSchema.parse(input)) });
