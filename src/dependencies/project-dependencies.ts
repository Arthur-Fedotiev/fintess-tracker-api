import { MongoDBService } from '../frameworks/persistance/mongo/mongo-db-service';
import { ProjectDependencies } from './project-dependencies.interface';

export default ((): ProjectDependencies => {
  return {
    DatabaseService: new MongoDBService(),
  };
})();
