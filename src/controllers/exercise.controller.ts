import { NextFunction, Request, Response } from 'express';
import { ExerciseRepository } from '../app/contracts';
import { CreateExerciseCommand } from '../app/use-cases/exercise/CreateExercise';
import { ProjectDependencies } from '../dependencies/project-dependencies.interface';
import bind from 'bind-decorator';
import { GetExerciseCommand } from '../app/use-cases/exercise/GetExercise';
import { GetManyExercisesCommand } from '../app/use-cases/exercise/GetManyExerciss';

export class ExerciseController {
  private static instance: ExerciseController;

  private constructor(private readonly exerciseRepo: ExerciseRepository) {}

  public static getInstance(
    dependencies: ProjectDependencies,
  ): ExerciseController {
    if (!ExerciseController.instance) {
      ExerciseController.instance = new ExerciseController(
        dependencies.DatabaseService.exerciseRepository,
      );
    }

    return ExerciseController.instance;
  }

  @bind
  public async createExercise(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { body } = req;
      const CreateExercise = CreateExerciseCommand.getInstance(
        this.exerciseRepo,
      );
      const exercise = await CreateExercise.execute(body);

      res.status(200).json({
        success: true,
        data: exercise,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  @bind
  public async getExerciseById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = req.params.id;
      const GetExercise = GetExerciseCommand.getInstance(this.exerciseRepo);

      const exercise = await GetExercise.execute(id, (req as any).i18nResults);

      res.status(200).json({
        success: true,
        data: exercise,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  @bind
  public async getExercises(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const GetManyExercises = GetManyExercisesCommand.getInstance(
        this.exerciseRepo,
      );

      const exercise = await GetManyExercises.execute((req as any).i18nResults);

      res.status(200).json({
        success: true,
        data: exercise,
      });
    } catch (error: unknown) {
      next(error);
    }
  }
}
