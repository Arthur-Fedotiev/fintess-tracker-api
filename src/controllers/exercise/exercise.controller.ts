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
import { WithID } from '../../app/shared/models/api/with-id.interface';
import { QueryWithLanguage } from '../../app/shared/models/api/query-with-language.interface';
import { SuccessfulResponse } from '../../app/shared/models/api/successful-response.model';
import { AsyncHandler } from '../../app/shared/decorators/async-handler';
import { GetManyExercisesCommand } from '../../app/use-cases/exercise/GetManyExerciss';
import { DeleteExerciseCommand } from '../../app/use-cases/exercise/DeleteExercise';
import { NotFoundException } from '../../app/shared/models/error/not-found';
import { CreateExerciseDTO } from './dto/create-exercise-dto';
import { UpdateExerciseCommand } from '../../app/use-cases/exercise/UpdateExercise';
import { DeepPartial } from '../../app/shared/models/common/deep-partial.type';
import { RequestQuery } from '../../app/shared/models/api/request-query.type';

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
      CreateExerciseDTO,
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
      WithID,
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
      WithID,
      APIResponse<ExerciseResponseDTO | null>,
      Empty,
      RequestQuery
    >,
    res: Response,
  ): Promise<void> {
    const {
      params: { id },
      query,
    } = req;
    const GetExercise = GetExerciseCommand.getInstance(this.exerciseRepo);
    const exercise = await GetExercise.execute(id, query);

    if (!exercise) throw new NotFoundException();

    res.status(200).json(new SuccessfulResponse(exercise));
  }

  @bind
  @AsyncHandler()
  public async getExercises(
    req: Request<
      Empty,
      APIResponse<ExerciseResponseDTO[]>,
      Empty,
      RequestQuery
    >,
    res: Response,
  ): Promise<void> {
    const GetManyExercises = GetManyExercisesCommand.getInstance(
      this.exerciseRepo,
    );

    const data = await GetManyExercises.execute(req.query);

    res.status(200).json({
      success: true,
      ...data,
    });
  }

  @bind
  @AsyncHandler()
  public async deleteOne(
    req: Request<WithID, APIResponse<WithID>, Empty, QueryWithLanguage>,
    res: Response,
  ): Promise<void> {
    const {
      params: { id },
    } = req;
    const DeleteExercise = DeleteExerciseCommand.getInstance(this.exerciseRepo);

    const result = await DeleteExercise.execute(id);

    if (!result) throw new NotFoundException();

    res.status(200).json(new SuccessfulResponse(result));
  }
}
