import express from 'express';
import { i18n } from '../../../app/contracts/i18n/middlewares/i18n';
import { CreateExerciseDTO } from '../../../controllers/exercise/dto/create-exercise-dto';
import { ExerciseController } from '../../../controllers/exercise/exercise.controller';
import { ProjectDependencies } from '../../../dependencies/project-dependencies.interface';
import validationMiddleware from '../../common/error/validation.middleware';

export const exerciseRouter = (dependencies: ProjectDependencies) => {
  const router = express.Router();

  const controller = ExerciseController.getInstance(dependencies);
  const { authProtected, adminOnly } = dependencies.AuthService;

  router
    .route('/')
    .get(i18n, controller.getExercises)
    .post(
      authProtected(),
      validationMiddleware(CreateExerciseDTO),
      controller.createExercise,
    );

  router
    .route('/:id')
    .get(i18n, controller.getExerciseById)
    .patch(
      authProtected(),
      validationMiddleware(CreateExerciseDTO, true),
      controller.updateOneExercise,
    )
    .delete(adminOnly, controller.deleteOne);

  return router;
};
