import { z } from 'zod';

const animalFields = {
  nombre: z.string().min(1),
  raza: z.string().min(1),
  edad: z.number().int().nonnegative(),
  sexo: z.enum(['Hembra', 'Macho']),
  tipoAnimal: z.enum(['Perro', 'Gato']),
};

export const createAnimalSchema = z.object(animalFields);

export const updateAnimalSchema = z.object(animalFields).partial().refine(
  (value) => Object.keys(value).length > 0,
  'Debe enviar al menos un campo para actualizar',
);

export const animalFiltersSchema = z.object({
  nombre: z.string().optional(),
  raza: z.string().optional(),
  sexo: z.enum(['Hembra', 'Macho']).optional(),
  tipoAnimal: z.enum(['Perro', 'Gato']).optional(),
});
