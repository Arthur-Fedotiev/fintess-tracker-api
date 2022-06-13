import { ExerciseRepository } from '../../../../app/contracts';
import {
  ExerciseRequestDTO,
  ExerciseResponseDTO,
} from '../../../../entities/exercise';
import { I18nResults } from '../../../../app/contracts/i18n/models/i18n-results.interface';
import { ExerciseModel } from './models/Exercise';

export class ExerciseMongoRepository extends ExerciseRepository {
  async getMany({
    excludedLanguagesQuery,
    language,
  }: I18nResults): Promise<ExerciseResponseDTO[]> {
    const exercisesDocs = await ExerciseModel.find().select(
      excludedLanguagesQuery ?? '',
    );

    exercisesDocs.forEach((exerciseDoc) =>
      exerciseDoc.mergeTranslation(language),
    );

    return exercisesDocs;
  }

  async getOneById(
    id: string | number,
    { excludedLanguagesQuery, language }: I18nResults,
  ): Promise<ExerciseResponseDTO | null> {
    const exercise = await ExerciseModel.findById(id).select(
      excludedLanguagesQuery ?? '',
    );

    if (!exercise) {
      return null;
    }

    exercise.mergeTranslation(language);

    return exercise;
  }

  async createOne(
    dto: ExerciseRequestDTO,
  ): Promise<ExerciseResponseDTO | null> {
    return await ExerciseModel.create(dto);
  }

  async deleteOne(id: string | number): Promise<ExerciseResponseDTO | null> {
    return ExerciseModel.findByIdAndRemove(id, { select: 'id' });
  }
}
