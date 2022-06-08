import { TranslationDTO } from '../../../../app/contracts/i18n/models/translatin-dto.interface';
import { ExerciseBase } from '../exercise-base.interface';
import { ExerciseTranslatableData } from '../exercise-translatable-data.interface';

export type ExerciseResponseDTO = ExerciseBase &
  Partial<TranslationDTO<ExerciseTranslatableData>>;
