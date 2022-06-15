import { CreateExerciseDTO } from '../../../controllers/exercise/dto/create-exercise-dto';
import { ExerciseResponseDTO } from '../../../entities/exercise';
import { ExerciseRepository } from '../../contracts';
import { TranslateService } from '../../contracts/i18n/translate-service';
import { DeepPartial } from '../../shared/models/common/deep-partial.type';
import { NotFoundException } from '../../shared/models/error/not-found';
import { mergeDeep } from '../../shared/utils/merge-deep';
import { UseCaseExecutor } from '../common/use-case.interface';

export class UpdateExerciseCommand
  implements UseCaseExecutor<ExerciseResponseDTO | null>
{
  private static instance: UpdateExerciseCommand;

  private constructor(
    private readonly exerciseRepository: ExerciseRepository,
    private readonly translateService: TranslateService,
  ) {}

  public static getInstance(
    exerciseRepository: ExerciseRepository,
    translateService: TranslateService,
  ): UpdateExerciseCommand {
    if (!UpdateExerciseCommand.instance) {
      UpdateExerciseCommand.instance = new UpdateExerciseCommand(
        exerciseRepository,
        translateService,
      );
    }

    return UpdateExerciseCommand.instance;
  }

  public async execute(
    id: string | number,
    dto: DeepPartial<CreateExerciseDTO>,
  ): Promise<ExerciseResponseDTO | null> {
    const exercise = await this.exerciseRepository.getOneById(id);

    if (!exercise) {
      throw new NotFoundException();
    }

    const translatedData = dto.translatableData
      ? await this.translateService.translate(dto.translatableData)
      : {};
    const dtoWithTranslation = Object.assign(dto, translatedData, {
      translatableData: undefined,
    });
    const mergedExercise = mergeDeep(exercise, dtoWithTranslation);

    return this.exerciseRepository.updateOne(id, mergedExercise);
  }
}
