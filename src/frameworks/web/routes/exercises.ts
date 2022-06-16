import express from 'express';
import { CreateExerciseDTO } from '../../../controllers/exercise/dto/create-exercise-dto';
import { ExerciseController } from '../../../controllers/exercise/exercise.controller';
import { ProjectDependencies } from '../../../dependencies/project-dependencies.interface';
import { firebaseAuthProtected } from '../../authentication/firebase/auth-middleware';
import validationMiddleware from '../../common/error/validation.middleware';

export const exerciseRouter = (dependencies: ProjectDependencies) => {
  const router = express.Router();

  const controller = ExerciseController.getInstance(dependencies);

  router
    .route('/')
    .get(controller.getExercises)
    .post(
      firebaseAuthProtected,
      validationMiddleware(CreateExerciseDTO),
      controller.createExercise,
    );

  router
    .route('/:id')
    .get(controller.getExerciseById)
    .patch(
      firebaseAuthProtected,
      validationMiddleware(CreateExerciseDTO, true),
      controller.updateOneExercise,
    )
    .delete(firebaseAuthProtected, controller.deleteOne);

  return router;
};
