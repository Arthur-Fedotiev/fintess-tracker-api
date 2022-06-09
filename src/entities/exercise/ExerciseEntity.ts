import { TranslationDTO } from '../../app/contracts/i18n/models/translatin-dto.interface';
import { ExerciseModelMiddlewares } from './models/exercise-model-middlewares.type';
import { ExerciseBase } from './models/exercise-base.interface';
import { ExerciseTranslatableData } from './models/exercise-translatable-data.interface';

export type Exercise = ExerciseBase &
  ExerciseModelMiddlewares &
  TranslationDTO<ExerciseTranslatableData> & {
    translatableData?: ExerciseTranslatableData;
  };
