import { ExerciseRepository } from '../../../../app/contracts';
import {
  Exercise,
  ExerciseRequestDTO,
  ExerciseResponseDTO,
} from '../../../../entities/exercise';
import { ExerciseModel } from './models/Exercise';
import { DeepPartial } from '../../../../app/shared/models/common/deep-partial.type';
import { AdvancedResultsMongooseService } from '../advanced-results-mongoose.service';
import { PaginatedResponse } from '../../../../app/shared/models/api/pagination/paginated-response.interface';
import { RequestQuery } from '../../../../app/shared/models/api/request-query.type';
import { MongooseQueryBuilder } from './utils/mongoose-query-builder';
import { WithID } from '../../../../app/shared/models/api/with-id.interface';

export class ExerciseMongoRepository extends ExerciseRepository {
  constructor(
    private readonly advancedResultsService: AdvancedResultsMongooseService,
  ) {
    super();
  }
  async getMany(
    query: RequestQuery,
  ): Promise<PaginatedResponse<ExerciseResponseDTO[]>> {
    return this.advancedResultsService.getAdvancedResults<
      Exercise,
      ExerciseResponseDTO[],
      Exercise
    >(ExerciseModel, query, { paginationInfo: true });
  }

  async getOneById(
    id: string | number,
    query?: RequestQuery,
  ): Promise<ExerciseResponseDTO | null> {
    const selectQuery = MongooseQueryBuilder.toSelectFields(query?.select);
    const exercise = await ExerciseModel.findById(id).select(selectQuery);

    return exercise ?? null;
  }

  async createOne(
    dto: ExerciseRequestDTO,
  ): Promise<ExerciseResponseDTO | null> {
    return await ExerciseModel.create(dto);
  }

  async deleteOne(id: string | number): Promise<WithID | null> {
    return ExerciseModel.findByIdAndRemove(id, { select: 'id' });
  }

  async updateOne(id: string | number, dto: DeepPartial<ExerciseRequestDTO>) {
    const exercise = await ExerciseModel.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    });

    return exercise;
  }
}
