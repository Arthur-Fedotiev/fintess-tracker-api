import {
  ExercisePreSaveDTO,
  ExerciseResponseDTO,
} from '../../../entities/exercise';
import { ExerciseRepository } from '../../contracts';
import { TranslateService } from '../../contracts/i18n/translate-service';
import { UseCaseExecutor } from '../common/use-case.interface';

export class CreateExerciseCommand
  implements UseCaseExecutor<ExerciseResponseDTO | null>
{
  private static instance: CreateExerciseCommand;

  private constructor(
    private readonly exerciseRepository: ExerciseRepository,
    private readonly translateService: TranslateService,
  ) {}

  public static getInstance(
    exerciseRepository: ExerciseRepository,
    translateService: TranslateService,
  ): CreateExerciseCommand {
    if (!CreateExerciseCommand.instance) {
      CreateExerciseCommand.instance = new CreateExerciseCommand(
        exerciseRepository,
        translateService,
      );
    }

    return CreateExerciseCommand.instance;
  }

  public async execute(
    dto: ExercisePreSaveDTO,
  ): Promise<ExerciseResponseDTO | null> {
    const translateExercise = await this.translateService.translate(dto);
    const dtoWithTranslation = Object.assign(dto, translateExercise, {
      translatableData: undefined,
    });

    return this.exerciseRepository.createOne(dtoWithTranslation);
  }
}
