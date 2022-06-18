import { DatabaseService } from '../app/contracts/db/database-service';
import { AuthService } from '../app/contracts/features/auth/auth-service';
import { TranslateService } from '../app/contracts/i18n/translate-service';

export interface ProjectDependencies {
  DatabaseService: DatabaseService;
  TranslateService: TranslateService;
  AuthService: AuthService;
}
