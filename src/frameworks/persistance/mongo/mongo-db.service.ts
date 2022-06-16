import mongoose from 'mongoose';
import { ExerciseRepository } from '../../../app/contracts';
import { DatabaseService } from '../../../app/contracts/db/database-service';
import { retrier } from '../../../app/shared/utils/retrier';
import { ENV_CONFIG } from '../../../env-config';
import { AppLogger } from '../../common/log/winston-logger';

export class MongoDBService extends DatabaseService {
  private readonly RETRIES = 5;
  private readonly RETRY_DELAY = 500;

  constructor(public readonly exerciseRepository: ExerciseRepository) {
    super();
  }

  async connect(): Promise<void> {
    for await (const attempt of retrier({
      attempts: this.RETRIES,
      delay: this.RETRY_DELAY,
    })) {
      try {
        const connection = await mongoose.connect(ENV_CONFIG.mongoURI!);
        AppLogger.info(`MongoDB connected: ${connection.connection.host}`.cyan);
        break;
      } catch (error) {
        const leftAttempts = this.RETRIES - attempt - 1;

        if (!leftAttempts) {
          AppLogger.error(
            `All attempts to connect to MongoDB failed! Server is being shut down!`,
          );
          throw error;
        }

        AppLogger.warn(
          `MongoDB was not established! Left attempts: ${leftAttempts} Retrying...`
            .cyan,
        );
      }
    }
  }
}
