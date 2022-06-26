import mongoose from 'mongoose';
import { ExerciseRepository } from '../../../app/contracts';
import { DatabaseService } from '../../../app/contracts/db/database-service';
import { retrier } from '../../../app/shared/utils/retrier';
import { ENV_CONFIG } from '../../../env-config';
import { AppLogger } from '../../common/log/winston-logger';
import { MongoMemoryServer } from 'mongodb-memory-server';

const IN_MEMORY_DB = 'inmemory';

export class MongoDBService extends DatabaseService {
  private _mongoServer?: MongoMemoryServer;
  private readonly RETRIES = 5;
  private readonly RETRY_DELAY = 500;
  private readonly MONGO_URL = ENV_CONFIG.mongoURI!;

  constructor(public readonly exerciseRepository: ExerciseRepository) {
    super();
  }

  public async connect(): Promise<void> {
    for await (const attempt of retrier({
      attempts: this.RETRIES,
      delay: this.RETRY_DELAY,
    })) {
      try {
        const connection =
          this.MONGO_URL === IN_MEMORY_DB
            ? await this.initInMemoryDB()
            : await this.initMongoDB();

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

  public async close(): Promise<void> {
    try {
      await mongoose.disconnect();
      if (this.MONGO_URL === IN_MEMORY_DB) {
        await this._mongoServer?.stop();
      }
    } catch (err) {
      AppLogger.error(`db.open: ${err}`);
      throw err;
    }
  }

  private async initInMemoryDB(): Promise<Promise<typeof mongoose>> {
    AppLogger.debug('Connecting to inmemory mongo db');

    this._mongoServer = await MongoMemoryServer.create();
    const mongoUrl = await this._mongoServer.getUri();

    return await mongoose.connect(mongoUrl);
  }

  private async initMongoDB(): Promise<typeof mongoose> {
    const url = ENV_CONFIG.mongoURI!;

    AppLogger.debug('Connecting to MongoDB: ' + url);
    return await mongoose.connect(url);
  }
}
