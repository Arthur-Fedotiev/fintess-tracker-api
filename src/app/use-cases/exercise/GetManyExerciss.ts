import { ExerciseResponseDTO } from '../../../entities/exercise';
import { I18nResults } from '../../contracts/i18n/models/i18n-results.interface';
import { ExerciseRepository } from '../../contracts';
import { UseCaseExecutor } from '../common/use-case.interface';
import { PaginatedResponse } from '../../shared/models/api/pagination/paginated-response.interface';
import { RequestQuery } from '../../shared/models/api/request-query.type';

export class GetManyExercisesCommand
  implements UseCaseExecutor<PaginatedResponse<ExerciseResponseDTO[]>>
{
  private static instance: GetManyExercisesCommand;

  private constructor(
    private readonly exerciseRepository: ExerciseRepository,
  ) {}

  public static getInstance(
    exerciseRepository: ExerciseRepository,
  ): GetManyExercisesCommand {
    if (!GetManyExercisesCommand.instance) {
      GetManyExercisesCommand.instance = new GetManyExercisesCommand(
        exerciseRepository,
      );
    }

    return GetManyExercisesCommand.instance;
  }

  public async execute(
    query: RequestQuery = {},
    i18nResults: I18nResults,
  ): Promise<PaginatedResponse<ExerciseResponseDTO[]>> {
    return this.exerciseRepository.getMany(query, i18nResults);
  }
}
