import { ExerciseRequestDTO } from '../../../../entities/exercise/models/dto/exercise-request-DTO.interface';
import { ExerciseResponseDTO } from '../../../../entities/exercise/models/dto/exercise-response-DTO';
import { PaginatedResponse } from '../../../shared/models/api/pagination/paginated-response.interface';
import { DeepPartial } from '../../../shared/models/common/deep-partial.type';
import { I18nResults } from '../../i18n/models/i18n-results.interface';

export abstract class ExerciseRepository {
  public abstract getMany(
    query: object,
    i18nResults: I18nResults,
  ): Promise<PaginatedResponse<ExerciseResponseDTO[]>>;
  public abstract getOneById(
    id: number | string,
    i18nResults?: I18nResults,
  ): Promise<ExerciseResponseDTO | null>;
  public abstract createOne(
    dto: ExerciseRequestDTO,
  ): Promise<ExerciseResponseDTO | null>;
  public abstract deleteOne(
    id: number | string,
  ): Promise<ExerciseResponseDTO | null>;
  public abstract updateOne(
    id: number | string,
    dto: DeepPartial<ExerciseRequestDTO>,
  ): Promise<ExerciseResponseDTO | null>;
}
