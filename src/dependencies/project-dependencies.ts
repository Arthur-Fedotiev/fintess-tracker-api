import { MongoDBService } from '../frameworks/persistance/mongo/mongo-db-service';

export default (() => {
  return {
    DatabaseService: new MongoDBService(),
  };
})();
