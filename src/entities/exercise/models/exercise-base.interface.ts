import {
  EquipmentEnum,
  ExerciseTypeEnum,
  MusclesEnum,
} from '../constants/exercise.enums';

export interface ExerciseBase {
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
