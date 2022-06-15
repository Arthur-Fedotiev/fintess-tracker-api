import { ExerciseResponseDTO } from '../../../entities/exercise';
import { ExerciseRepository } from '../../contracts';
import { UseCaseExecutor } from '../common/use-case.interface';
import { RequestQuery } from '../../shared/models/api/request-query.type';

export class GetExerciseCommand
  implements UseCaseExecutor<ExerciseResponseDTO | null>
{
  private static instance: GetExerciseCommand;

  private constructor(
    private readonly exerciseRepository: ExerciseRepository,
  ) {}

  public static getInstance(
    exerciseRepository: ExerciseRepository,
  ): GetExerciseCommand {
    if (!GetExerciseCommand.instance) {
      GetExerciseCommand.instance = new GetExerciseCommand(exerciseRepository);
    }

    return GetExerciseCommand.instance;
  }

  public async execute(
    id: number | string,
    query?: RequestQuery,
  ): Promise<ExerciseResponseDTO | null> {
    return this.exerciseRepository.getOneById(id, query);
  }
}
