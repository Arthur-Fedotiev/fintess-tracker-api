import { v2 } from '@google-cloud/translate';
import { AdvancedResultsMongooseService } from '../frameworks/persistance/mongo/advanced-results-mongoose.service';
import { ENV_CONFIG } from '../env-config';
import { GoogleTranslateService } from '../frameworks/i18n/translate';
import { ExerciseMongoRepository } from '../frameworks/persistance/mongo/exercise/exercise-mongo-repository';
import { MongoDBService } from '../frameworks/persistance/mongo/mongo-db.service';
import { ProjectDependencies } from './project-dependencies.interface';
import { FirebaseAuthService } from '../frameworks/persistance/mongo/firebase-auth.service';
import { FirebaseAuthRepository } from '../frameworks/authentication/firebase/firebase-auth-repository';

export default ((): ProjectDependencies => {
  return {
    DatabaseService: new MongoDBService(
      new ExerciseMongoRepository(AdvancedResultsMongooseService.getInstance()),
    ),
    TranslateService: new GoogleTranslateService(
      new v2.Translate({
        credentials: ENV_CONFIG.googleTranslateCreds,
        projectId: ENV_CONFIG.googleTranslateCreds.project_id,
      }),
    ),
    AuthService: new FirebaseAuthService(new FirebaseAuthRepository()),
  };
})();
