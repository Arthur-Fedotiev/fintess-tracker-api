import express from 'express';
import { AuthController } from '../../../controllers/auth/auth.controller';
import { ProjectDependencies } from '../../../dependencies/project-dependencies.interface';

export const authRouter = (dependencies: ProjectDependencies) => {
  const router = express.Router();

  const controller = AuthController.getInstance(dependencies);

  router.route('/signup').post(controller.signup);

  return router;
};
