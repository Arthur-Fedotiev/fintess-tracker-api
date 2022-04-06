import { NodeEnvEnum } from '../constants/node-env.enum';

export interface EnvironmentConfig {
  readonly env: NodeEnvEnum;
  readonly port: number | undefined;
  readonly mongoURI: string;
  readonly googleTranslateCreds: any;
}
