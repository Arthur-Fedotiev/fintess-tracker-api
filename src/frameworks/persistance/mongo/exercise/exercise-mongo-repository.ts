import { ExerciseRepository } from '../../../../app/contracts';
import {
  ExerciseRequestDTO,
  ExerciseResponseDTO,
} from '../../../../entities/exercise';
import { I18nResults } from '../../../../app/contracts/i18n/models/i18n-results.interface';
import { ExerciseModel } from './models/Exercise';
import { i18nDefaultConfig } from '../../../../app/contracts/i18n/constants/i18n-default-config';
import { DeepPartial } from '../../../../app/shared/models/common/deep-partial.type';

export class ExerciseMongoRepository extends ExerciseRepository {
  async getMany(
    i18nResults: I18nResults = i18nDefaultConfig,
  ): Promise<ExerciseResponseDTO[]> {
    const { excludedLanguagesQuery } = i18nResults;

    const exercisesDocs = await ExerciseModel.find().select(
      excludedLanguagesQuery,
    );

    return exercisesDocs;
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
