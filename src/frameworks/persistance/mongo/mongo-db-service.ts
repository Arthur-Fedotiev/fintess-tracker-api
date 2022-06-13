import mongoose from 'mongoose';
import { ExerciseRepository } from '../../../app/contracts';
import { DatabaseService } from '../../../app/contracts/db/database-service';
import { ENV_CONFIG } from '../../../env-config';
import { ExerciseMongoRepository } from './exercise/exercise-mongo-repository';

export class MongoDBService extends DatabaseService {
  exerciseRepository: ExerciseRepository;

  constructor() {
    super();
    this.exerciseRepository = new ExerciseMongoRepository();
  }

  async connect(): Promise<void> {
    const connection = await mongoose.connect(ENV_CONFIG.mongoURI!);

    console.log(
      `MongoDB connected: ${connection.connection.host}`.cyan.underline.bold,
    );
  }
}
