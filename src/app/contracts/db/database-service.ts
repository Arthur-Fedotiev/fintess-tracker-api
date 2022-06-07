import { ExerciseRepository } from '../exercise-repository.class';

export abstract class DatabaseService {
  abstract exerciseRepository: ExerciseRepository;

  abstract connect(): Promise<void>;
}
