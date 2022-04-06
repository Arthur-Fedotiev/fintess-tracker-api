import { NodeEnvEnum } from '../shared/constants/node-env.enum';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: NodeEnvEnum;
      MONGO_URI: string;
      GOOGLE_TRANSLATE_CREDENTIALS: string;
      PORT?: number;
    }
  }
}
