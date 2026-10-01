import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import type { AnimalService } from '../services/animal.service.js';
import { animalFiltersSchema, createAnimalSchema, updateAnimalSchema } from '../schemas/animal.schema.js';

const numberId = (value: string | undefined): number => {
  const id = Number(value);
  if (!Number.isInteger(id) || id < 1) throw new HTTPException(400, { message: 'Identificador inválido' });
  return id;
};

export const createAnimalController = (service: AnimalService) => ({
  create: async (context: Context) => context.json(await service.create(createAnimalSchema.parse(await context.req.json())), 201),
  update: async (context: Context) => {
    const animal = await service.update(numberId(context.req.param('id')), updateAnimalSchema.parse(await context.req.json()));
    if (!animal) throw new HTTPException(404, { message: 'Animal no encontrado' });
    return context.json(animal);
  },
  list: async (context: Context) => {
    const query = context.req.query();
    const filters = animalFiltersSchema.parse({
      nombre: query.nombre, raza: query.raza, sexo: query.sexo, tipoAnimal: query.tipoAnimal,
    });
    return context.json(await service.list(filters));
  },
});
