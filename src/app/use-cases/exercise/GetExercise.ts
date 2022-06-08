import { ExerciseResponseDTO } from '../../../entities/exercise';
import { I18nResults } from '../../../frameworks/i18n/models/i18n-results.interface';
import { ExerciseRepository } from '../../contracts';
import { UseCaseExecutor } from '../common/use-case.interface';

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
    i18nResults: I18nResults,
  ): Promise<ExerciseResponseDTO | null> {
    return this.exerciseRepository.getOneById(id, i18nResults);
  }
}
