import { Request, Response } from 'express';
import { ExerciseRepository } from '../../app/contracts';
import { CreateExerciseCommand } from '../../app/use-cases/exercise/CreateExercise';
import { ProjectDependencies } from '../../dependencies/project-dependencies.interface';
import bind from 'bind-decorator';
import { GetExerciseCommand } from '../../app/use-cases/exercise/GetExercise';
import { TranslateService } from '../../app/contracts/i18n/translate-service';
import { Empty } from '../../app/shared/models/api/empty';
import { APIResponse } from '../../app/shared/models/api/api-response.interface';
import { ExerciseResponseDTO } from '../../entities/exercise';
import { I18nBody } from '../../app/shared/models/api/i18n-extended-request.interface';
import { Pagination } from '../../app/shared/models/api/pagination.interface';
import { BaseParams } from '../../app/shared/models/api/base-params.interface';
import { QueryWithLanguage } from '../../app/shared/models/api/query-with-language.interface';
import { SuccessfulResponse } from '../../app/shared/models/api/successful-response.model';
import { AsyncHandler } from '../../app/shared/decorators/async-handler';
import { GetManyExercisesCommand } from '../../app/use-cases/exercise/GetManyExerciss';
import { DeleteExerciseCommand } from '../../app/use-cases/exercise/DeleteExercise';
import { NotFoundException } from '../../app/shared/models/error/not-found';
import { CreateExerciseDTO } from './dto/create-exercise-dto';
import { UpdateExerciseCommand } from '../../app/use-cases/exercise/UpdateExercise';
import { DeepPartial } from '../../app/shared/models/common/deep-partial.type';

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
  @AsyncHandler()
  public async createExercise(
    req: Request<
      Empty,
      APIResponse<ExerciseResponseDTO>,
      CreateExerciseDTO & I18nBody,
      QueryWithLanguage
    >,
    res: Response,
  ): Promise<void> {
    const { body } = req;

    const CreateExercise = CreateExerciseCommand.getInstance(
      this.exerciseRepo,
      this.translateService,
    );
    const exercise = await CreateExercise.execute(body);

    res.status(200).json(new SuccessfulResponse(exercise));
  }

  @bind
  @AsyncHandler()
  public async updateOneExercise(
    req: Request<
      BaseParams,
      APIResponse<Partial<ExerciseResponseDTO>>,
      DeepPartial<CreateExerciseDTO>,
      QueryWithLanguage
    >,
    res: Response,
  ): Promise<void> {
    const {
      body,
      params: { id },
    } = req;

    const UpdateExercise = UpdateExerciseCommand.getInstance(
      this.exerciseRepo,
      this.translateService,
    );
    const exercise = await UpdateExercise.execute(id, body);

    res.status(200).json(new SuccessfulResponse(exercise));
  }

  @bind
  @AsyncHandler()
  public async getExerciseById(
    req: Request<
      BaseParams,
      APIResponse<ExerciseResponseDTO | null>,
      I18nBody,
      QueryWithLanguage
    >,
    res: APIResponse<ExerciseResponseDTO | null>,
  ): Promise<void> {
    const {
      params: { id },
      body: { i18nResults },
    } = req;
    const GetExercise = GetExerciseCommand.getInstance(this.exerciseRepo);

    const exercise = await GetExercise.execute(id, i18nResults);

    if (!exercise) throw new NotFoundException();

    res.status(200).json(new SuccessfulResponse(exercise));
  }

  @bind
  @AsyncHandler()
  public async getExercises(
    req: Request<
      Empty,
      APIResponse<ExerciseResponseDTO[]>,
      I18nBody,
      Pagination & QueryWithLanguage
    >,
    res: Response,
  ): Promise<void> {
    const GetManyExercises = GetManyExercisesCommand.getInstance(
      this.exerciseRepo,
    );

    const exercises = await GetManyExercises.execute(req.body.i18nResults);

    res.status(200).json(new SuccessfulResponse(exercises));
  }

  @bind
  @AsyncHandler()
  public async deleteOne(
    req: Request<BaseParams, APIResponse<BaseParams>, Empty, QueryWithLanguage>,
    res: Response,
  ): Promise<void> {
    const {
      params: { id },
    } = req;
    const DeleteExercise = DeleteExerciseCommand.getInstance(this.exerciseRepo);

    await DeleteExercise.execute(id);

    res.status(200).json(new SuccessfulResponse({ id }));
  }
}
