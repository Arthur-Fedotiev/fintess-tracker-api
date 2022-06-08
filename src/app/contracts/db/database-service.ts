import { ExerciseRepository } from '../features/exercise/exercise-repository.class';

export abstract class DatabaseService {
  abstract exerciseRepository: ExerciseRepository;

  abstract connect(): Promise<void>;
}
