import dotenv from 'dotenv';
import path from 'path';
import { NodeEnvEnum } from './app/shared/constants/node-env.enum';
import { EnvironmentConfig } from './app/shared/models/environment/environment-config.interface';

dotenv.config({
  debug: true,
  path: path.resolve(__dirname, '../', 'config', 'config.env'),
});

export const ENV_CONFIG: EnvironmentConfig = {
  env: process.env.NODE_ENV as NodeEnvEnum,
  port: process.env.PORT ?? 8080,
  mongoURI: process.env.MONGO_URI,
  googleTranslateCreds: JSON.parse(
    process.env.GOOGLE_TRANSLATE_CREDENTIALS as unknown as string,
  ),
  firebaseAdminCreds: JSON.parse(
    process.env.FIREBASE_ADMIN as unknown as string,
  ),
};
