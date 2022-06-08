import { ExerciseResponseDTO } from '../../../entities/exercise';
import { I18nResults } from '../../../frameworks/i18n/models/i18n-results.interface';
import { ExerciseRepository } from '../../contracts';
import { UseCaseExecutor } from '../common/use-case.interface';

export class GetManyExercisesCommand
  implements UseCaseExecutor<ExerciseResponseDTO[]>
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
    i18nResults: I18nResults,
  ): Promise<ExerciseResponseDTO[]> {
    return this.exerciseRepository.getMany(i18nResults);
  }
}
