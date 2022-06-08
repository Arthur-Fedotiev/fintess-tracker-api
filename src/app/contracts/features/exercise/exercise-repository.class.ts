import { ExerciseRequestDTO } from '../../../../entities/exercise/models/dto/exercise-request-DTO.interface';
import { ExerciseResponseDTO } from '../../../../entities/exercise/models/dto/exercise-response-DTO';
import { I18nResults } from '../../i18n/models/i18n-results.interface';

export abstract class ExerciseRepository {
  abstract getMany(i18nResults: I18nResults): Promise<ExerciseResponseDTO[]>;
  abstract getOneById(
    id: number | string,
    i18nResults: I18nResults,
  ): Promise<ExerciseResponseDTO | null>;
  abstract createOne(
    dto: ExerciseRequestDTO,
  ): Promise<ExerciseResponseDTO | null>;
}
