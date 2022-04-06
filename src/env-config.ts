import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  debug: true,
  path: path.resolve(__dirname, '../', 'config', 'config.env'),
});

const googleTranslateCreds = JSON.parse(process.env.GOOGLE_TRANSLATE_CREDENTIALS as string);

export const ENV_CONFIG = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  googleTranslateCreds,
};
