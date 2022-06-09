import { NextFunction, Request, Response } from 'express';
import { ExerciseRepository } from '../app/contracts';
import { CreateExerciseCommand } from '../app/use-cases/exercise/CreateExercise';
import { ProjectDependencies } from '../dependencies/project-dependencies.interface';
import bind from 'bind-decorator';
import { GetExerciseCommand } from '../app/use-cases/exercise/GetExercise';
import { GetManyExercisesCommand } from '../app/use-cases/exercise/GetManyExerciss';
import { TranslateService } from '../app/contracts/i18n/translate-service';
import { Empty } from '../app/shared/models/api/empty';
import { APIResponse } from '../app/shared/models/api/api-response.interface';
import { ExercisePreSaveDTO, ExerciseResponseDTO } from '../entities/exercise';
import { I18nBody } from '../app/shared/models/api/i18n-extended-request.interface';
import { Pagination } from '../app/shared/models/api/pagination.interface';
import { BaseParams } from '../app/shared/models/api/base-params.interface';
import { QueryWithLanguage } from '../app/shared/models/api/query-with-language.interface';
import { SuccessfulResponse } from '../app/shared/models/api/successful-response.model';

export class ExerciseController {
  private static instance: ExerciseController;

  private constructor(
    public readonly exerciseRepo: ExerciseRepository,
    public readonly translateService: TranslateService,
  ) {}

  public static getInstance({
    DatabaseService,
    TranslateService,
  }: ProjectDependencies): ExerciseController {
    if (!ExerciseController.instance) {
      ExerciseController.instance = new ExerciseController(
        DatabaseService.exerciseRepository,
        TranslateService,
      );
    }

    return ExerciseController.instance;
  }

  @bind
  public async createExercise(
    req: Request<
      Empty,
      APIResponse<ExerciseResponseDTO>,
      ExercisePreSaveDTO & I18nBody,
      QueryWithLanguage
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { body } = req;
      const CreateExercise = CreateExerciseCommand.getInstance(
        this.exerciseRepo,
        this.translateService,
      );
      const exercise = await CreateExercise.execute(body);

      res.status(200).json(new SuccessfulResponse(exercise));
    } catch (error: unknown) {
      next(error);
    }
  }

  @bind
  public async getExerciseById(
    req: Request<
      BaseParams,
      APIResponse<ExerciseResponseDTO | null>,
      I18nBody,
      QueryWithLanguage
    >,
    res: APIResponse<ExerciseResponseDTO | null>,
    next: NextFunction,
  ): Promise<void> {
    try {
      const {
        params: { id },
        body: { i18nResults },
      } = req;
      const GetExercise = GetExerciseCommand.getInstance(this.exerciseRepo);

      const exercise = await GetExercise.execute(id, i18nResults);

      res.status(200).json(new SuccessfulResponse(exercise));
    } catch (error: unknown) {
      next(error);
    }
  }

  @bind
  public async getExercises(
    req: Request<
      Empty,
      APIResponse<ExerciseResponseDTO[]>,
      I18nBody,
      Pagination & QueryWithLanguage
    >,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const GetManyExercises = GetManyExercisesCommand.getInstance(
        this.exerciseRepo,
      );

      const exercises = await GetManyExercises.execute(req.body.i18nResults);

      res.status(200).json(new SuccessfulResponse(exercises));
    } catch (error: unknown) {
      next(error);
    }
  }
}
