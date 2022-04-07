import { Document } from 'mongoose';
import {
  EquipmentEnum,
  ExerciseTypeEnum,
  MusclesEnum,
} from '../constants/exercise.enums';
import { TargetLanguages } from '../../../google-translate/models/target-languages.type';

export type ExerciseDocument = Document &
  ExerciseBaseData & {
    [P in TargetLanguages[number]]: TranslatableData;
  };

export interface TranslatableData {
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
  translatableData?: TranslatableData;
}
