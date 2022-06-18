import express from 'express';
import { Roles } from '../../../app/shared/constants/roles.enum';
import { AuthController } from '../../../controllers/auth/auth.controller';
import { CreateUserDTO } from '../../../controllers/auth/dto/create-user-dto';
import { ProjectDependencies } from '../../../dependencies/project-dependencies.interface';
import validationMiddleware from '../../common/error/validation.middleware';

export const authRouter = (dependencies: ProjectDependencies) => {
  const router = express.Router();

  const controller = AuthController.getInstance(dependencies);
  const authProtected = dependencies.AuthService.authProtected;

  router
    .route('/signup')
    .post(validationMiddleware(CreateUserDTO), controller.signup);

  router.route('/current-user').get(authProtected(), controller.currentUser);

  return router;
};
