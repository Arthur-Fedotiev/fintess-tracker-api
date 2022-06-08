import { NodeEnvEnum } from '../app/shared/constants/node-env.enum';
import { GoogleTranslateCredentials } from '../app/shared/models/google-translate-credentials.interface';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: NodeEnvEnum;
      MONGO_URI: string;
      GOOGLE_TRANSLATE_CREDENTIALS: GoogleTranslateCredentials;
      PORT?: number;
    }
  }
}
