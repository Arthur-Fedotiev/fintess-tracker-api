import express from 'express';
import { CreateExerciseDTO } from '../../../controllers/exercise/dto/create-exercise-dto';
import { ExerciseController } from '../../../controllers/exercise/exercise.controller';
import { ProjectDependencies } from '../../../dependencies/project-dependencies.interface';
import validationMiddleware from '../../common/error/validation.middleware';

export const exerciseRouter = (dependencies: ProjectDependencies) => {
  const router = express.Router();

  const controller = ExerciseController.getInstance(dependencies);
  const authProtected = dependencies.AuthService.authProtected;

  router
    .route('/')
    .get(controller.getExercises)
    .post(
      authProtected(),
      validationMiddleware(CreateExerciseDTO),
      controller.createExercise,
    );

  router
    .route('/:id')
    .get(controller.getExerciseById)
    .patch(
      authProtected(),
      validationMiddleware(CreateExerciseDTO, true),
      controller.updateOneExercise,
    )
    .delete(authProtected(), controller.deleteOne);

  return router;
};
