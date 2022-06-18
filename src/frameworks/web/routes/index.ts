import express from 'express';
import { ProjectDependencies } from '../../../dependencies/project-dependencies.interface';
import { exerciseRouter as exercise } from './exercises';
import { authRouter as auth } from './auth';

export const apiRouter = (dependencies: ProjectDependencies) => {
  const routes = express.Router();

  const exerciseRouter = exercise(dependencies);
  const authRouter = auth(dependencies);

  routes.use('/exercises', exerciseRouter);
  routes.use('/auth', authRouter);

  return routes;
};
