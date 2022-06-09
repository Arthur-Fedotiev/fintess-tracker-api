import { ExerciseBase } from '../exercise-base.interface';
import { ExerciseTranslatableData } from '../exercise-translatable-data.interface';

export interface ExerciseRequestDTO extends ExerciseBase {
  translatableData?: ExerciseTranslatableData;
}
