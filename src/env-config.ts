import dotenv from 'dotenv';
import path from 'path';
import { EnvironmentConfig } from './shared/models/environment-config.interface';

dotenv.config({
  debug: true,
  path: path.resolve(__dirname, '../', 'config', 'config.env'),
});

export const ENV_CONFIG: EnvironmentConfig = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  googleTranslateCreds: JSON.parse(process.env.GOOGLE_TRANSLATE_CREDENTIALS),
};
