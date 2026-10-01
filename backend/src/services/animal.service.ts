import type { AnimalRepository } from '../repositories/animal.repository.js';
import type { AnimalFilters, AnimalInput } from '../types/animal.types.js';

export class AnimalService {
  constructor(private readonly animals: AnimalRepository) {}

  create(input: AnimalInput) { return this.animals.create(input); }
  update(id: number, input: Partial<AnimalInput>) { return this.animals.update(id, input); }
  list(filters: AnimalFilters) { return this.animals.findAll(filters); }
}
