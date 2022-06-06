import {
  EquipmentEnum,
  ExerciseTypeEnum,
  MusclesEnum,
} from '../constants/exercise.enums';
export interface ExerciseTranslatableData {
  shortDescription: string;
  longDescription: string;
  instructions: string;
  benefits: string;
}

export interface ExerciseBaseData {
  name: string;
  exerciseType: ExerciseTypeEnum;
  targetMuscle: MusclesEnum;
  equipment: EquipmentEnum;
  rating: number;
  avatarUrl: string;
  avatarSecondaryUrl: string;
  coverUrl: string;
  coverSecondaryUrl: string;
  muscleDiagramUrl: string;
  instructionVideo: string;
}

export interface ExerciseDTO extends ExerciseBaseData {
  ExerciseTranslatableData?: ExerciseTranslatableData;
}
