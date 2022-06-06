import { TranslationDTO } from '../../../i18n/models/translatin-dto.interface';
import {
  ExerciseBaseData,
  ExerciseTranslatableData,
} from './exercise.interface';

export type ExercisePersistedDoment = ExerciseBaseData &
  TranslationDTO<ExerciseTranslatableData>;
