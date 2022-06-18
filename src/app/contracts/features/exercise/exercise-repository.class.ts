import { ExerciseRequestDTO } from '../../../../entities/exercise/models/dto/exercise-request-DTO.interface';
import { ExerciseResponseDTO } from '../../../../entities/exercise/models/dto/exercise-response-DTO';
import { WithID } from '../../../shared/models/api/with-id.interface';
import { PaginatedResponse } from '../../../shared/models/api/pagination/paginated-response.interface';
import { RequestQuery } from '../../../shared/models/api/request-query.type';
import { DeepPartial } from '../../../shared/models/common/deep-partial.type';

export abstract class ExerciseRepository {
  public abstract getMany(
    query: RequestQuery,
  ): Promise<PaginatedResponse<ExerciseResponseDTO[]>>;
  public abstract getOneById(
    id: number | string,
    query?: RequestQuery,
  ): Promise<ExerciseResponseDTO | null>;
  public abstract createOne(
    dto: ExerciseRequestDTO,
  ): Promise<ExerciseResponseDTO | null>;
  public abstract deleteOne(id: number | string): Promise<WithID | null>;
  public abstract updateOne(
    id: number | string,
    dto: DeepPartial<ExerciseRequestDTO>,
  ): Promise<ExerciseResponseDTO | null>;
}
