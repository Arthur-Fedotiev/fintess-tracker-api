import { DatabaseService } from '../app/contracts/db/database-service';
import { TranslateService } from '../app/contracts/i18n/translate-service';

export interface ProjectDependencies {
  DatabaseService: DatabaseService;
  TranslateService: TranslateService;
}
