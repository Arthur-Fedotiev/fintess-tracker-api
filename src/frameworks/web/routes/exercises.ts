import express from 'express';
import { CreateExerciseDTO } from '../../../controllers/exercise/dto/create-exercise-dto';
import { ExerciseController } from '../../../controllers/exercise/exercise.controller';
import { ProjectDependencies } from '../../../dependencies/project-dependencies.interface';
import validationMiddleware from '../../common/error/validation.middleware';

export const exerciseRouter = (dependencies: ProjectDependencies) => {
  const router = express.Router();

  const controller = ExerciseController.getInstance(dependencies);
  const authService = dependencies.AuthService;

  router
    .route('/')
    .get(controller.getExercises)
    .post(
      authService.authProtected,
      validationMiddleware(CreateExerciseDTO),
      controller.createExercise,
    );

  router
    .route('/:id')
    .get(controller.getExerciseById)
    .patch(
      authService.authProtected,
      validationMiddleware(CreateExerciseDTO, true),
      controller.updateOneExercise,
    )
    .delete(authService.authProtected, controller.deleteOne);

  return router;
};
