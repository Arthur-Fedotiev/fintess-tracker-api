import { NodeEnvEnum } from '../constants/node-env.enum';
import { GoogleTranslateCredentials } from './google-translate-credentials.interface';

export interface EnvironmentConfig {
  readonly env: NodeEnvEnum;
  readonly port: number | undefined;
  readonly mongoURI: string;
  readonly googleTranslateCreds: GoogleTranslateCredentials;
}
