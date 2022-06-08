import express from 'express';
import { ProjectDependencies } from '../../../dependencies/project-dependencies.interface';
import { exerciseRouter as exercise } from './exercises';

export const apiRouter = (dependencies: ProjectDependencies) => {
  const routes = express.Router();

  const exerciseRouter = exercise(dependencies);

  routes.use('/exercises', exerciseRouter);

  return routes;
};
