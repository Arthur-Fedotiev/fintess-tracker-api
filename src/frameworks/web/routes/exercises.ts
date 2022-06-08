import express from 'express';
import { ExerciseController } from '../../../controllers/exercise.controller';
import { ProjectDependencies } from '../../../dependencies/project-dependencies.interface';
import { i18nResults } from '../../i18n/middlewares/i18n-results';

export const exerciseRouter = (dependencies: ProjectDependencies) => {
  const router = express.Router();

  const controller = ExerciseController.getInstance(dependencies);

  router
    .route('/')
    .get(i18nResults, controller.getExercises)
    .post(controller.createExercise);

  router.route('/:id').get(i18nResults, controller.getExerciseById);

  return router;
};
