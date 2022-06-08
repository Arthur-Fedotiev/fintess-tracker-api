import { v2 } from '@google-cloud/translate';
import { ENV_CONFIG } from '../env-config';
import { GoogleTranslateService } from '../frameworks/i18n/translate';
import { MongoDBService } from '../frameworks/persistance/mongo/mongo-db-service';
import { ProjectDependencies } from './project-dependencies.interface';

export default ((): ProjectDependencies => {
  return {
    DatabaseService: new MongoDBService(),
    TranslateService: new GoogleTranslateService(
      new v2.Translate({
        credentials: ENV_CONFIG.googleTranslateCreds,
        projectId: ENV_CONFIG.googleTranslateCreds.project_id,
      }),
    ),
  };
})();
