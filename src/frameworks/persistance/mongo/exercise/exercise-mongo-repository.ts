import { ExerciseRepository } from '../../../../app/contracts';
import {
  Exercise,
  ExerciseRequestDTO,
  ExerciseResponseDTO,
} from '../../../../entities/exercise';
import { I18nResults } from '../../../../app/contracts/i18n/models/i18n-results.interface';
import { ExerciseModel } from './models/Exercise';
import { i18nDefaultConfig } from '../../../../app/contracts/i18n/constants/i18n-default-config';
import { DeepPartial } from '../../../../app/shared/models/common/deep-partial.type';
import { AdvancedResultsMongooseService } from '../advanced-results-mongoose.service';
import { PaginatedResponse } from '../../../../app/shared/models/api/pagination/paginated-response.interface';
import { RequestQuery } from '../../../../app/shared/models/api/request-query.type';

export class ExerciseMongoRepository extends ExerciseRepository {
  constructor(
    private readonly advancedResultsService: AdvancedResultsMongooseService,
  ) {
    super();
  }
  async getMany(
    query: RequestQuery = {} as RequestQuery,
  ): Promise<PaginatedResponse<ExerciseResponseDTO[]>> {
    return this.advancedResultsService.getAdvancedResults<
      Exercise,
      ExerciseResponseDTO[],
      Exercise
    >(ExerciseModel, query, { paginationInfo: true });
  }

  async getOneById(
    id: string | number,
    i18nResults: I18nResults = i18nDefaultConfig,
  ): Promise<ExerciseResponseDTO | null> {
    const { excludedLanguagesQuery } = i18nResults;

    const exercise = await ExerciseModel.findById(id).select(
      excludedLanguagesQuery,
    );

    return exercise ?? null;
  }

  async createOne(
    dto: ExerciseRequestDTO,
  ): Promise<ExerciseResponseDTO | null> {
    return await ExerciseModel.create(dto);
  }

  async deleteOne(id: string | number): Promise<ExerciseResponseDTO | null> {
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
