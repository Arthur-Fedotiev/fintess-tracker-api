import express from 'express';
import { CreateExerciseDTO } from '../../../controllers/exercise/dto/create-exercise-dto';
import { ExerciseController } from '../../../controllers/exercise/exercise.controller';
import { ProjectDependencies } from '../../../dependencies/project-dependencies.interface';
import validationMiddleware from '../../common/error/validation.middleware';

export const exerciseRouter = (dependencies: ProjectDependencies) => {
  const router = express.Router();

  const controller = ExerciseController.getInstance(dependencies);

  router
    .route('/')
    .get(controller.getExercises)
    .post(validationMiddleware(CreateExerciseDTO), controller.createExercise);

  router
    .route('/:id')
    .get(controller.getExerciseById)
    .patch(
      validationMiddleware(CreateExerciseDTO, true),
      controller.updateOneExercise,
    )
    .delete(controller.deleteOne);

  return router;
};
