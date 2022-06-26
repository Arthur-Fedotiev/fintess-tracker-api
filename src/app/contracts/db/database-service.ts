import { ExerciseRepository } from '../features/exercise/exercise-repository.class';

export abstract class DatabaseService {
  abstract exerciseRepository: ExerciseRepository;

  public abstract connect(): Promise<void>;
  public abstract close(): Promise<void>;
}
