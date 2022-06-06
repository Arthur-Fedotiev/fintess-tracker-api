import { TranslationDTO } from '../../../i18n/models/translatin-dto.interface';
import { ExerciseModelMiddlewares } from './exercise-model-middlewares.type';
import {
  ExerciseBaseData,
  ExerciseTranslatableData,
} from './exercise.interface';

export type ExerciseSchemaType = Document &
  ExerciseBaseData &
  ExerciseModelMiddlewares &
  TranslationDTO<ExerciseTranslatableData> & {
    translatableData?: ExerciseTranslatableData;
  };
