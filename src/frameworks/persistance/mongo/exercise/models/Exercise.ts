import mongoose, { SchemaDefinitionProperty, Schema } from 'mongoose';
import {
  ExerciseTypeEnum,
  MusclesEnum,
  EquipmentEnum,
} from '../../../../../entities/exercise/constants/exercise.enums';
import { Exercise } from '../../../../../entities/exercise/ExerciseEntity';
import { ExercisePreSaveDTO } from '../../../../../entities/exercise/models/dto/exercise-pre-save-DTO.type';
import { ExerciseTranslatableData } from '../../../../../entities/exercise/models/exercise-translatable-data.interface';
import { DBModelNames } from '../../../../../shared/enums/db-model-names.enum';
import { getEnumValues } from '../../../../../shared/utils/get-enum-values';
import { mergeTranslation } from '../middlewares/instance-methods';
import { translateBeforeSave } from '../middlewares/translate-before-save';

const getLocalizedDataDefinition =
  (): SchemaDefinitionProperty<ExerciseTranslatableData> => ({
    name: {
      type: String,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    shortDescription: {
      type: String,
      maxlength: [1000, 'Description can not be more than 500 characters'],
    },
    longDescription: {
      type: String,
      maxlength: [2000, 'Description can not be more than 500 characters'],
    },
    instructions: {
      type: String,
      maxlength: [2000, 'Instruction can not be more than 1000 characters'],
    },
    benefits: {
      type: String,
      maxlength: [2000, 'Benefits can not be more than 1000 characters'],
    },
  });

const ExerciseSchema: Schema<Exercise> = new Schema({
  exerciseType: {
    type: String,
    required: [true, 'Please specify an exercise type'],
    enum: getEnumValues(ExerciseTypeEnum),
  },
  targetMuscle: {
    type: String,
    required: [true, 'Please specify a target muscle'],
    enum: getEnumValues(MusclesEnum),
  },
  equipment: {
    type: String,
    required: [true, 'Please specify an equipment type'],
    enum: getEnumValues(EquipmentEnum),
  },
  rating: {
    type: Number,
    required: [true, 'Please specify a rating'],
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating can not be more than 10'],
  },
  avatarUrl: {
    type: String,
    maxlength: [150, 'Avatar url can not be more than 150 characters long'],
  },
  coverUrl: {
    type: String,
    maxlength: [150, 'Cover url can not be more than 150 characters long'],
  },
  coverSecondaryUrl: {
    type: String,
    maxlength: [
      150,
      'Secondary cover can not be more than 150 characters long',
    ],
  },
  muscleDiagramUrl: {
    type: String,
    maxlength: [
      150,
      'Muscle diagram url can not be more than 150 characters long',
    ],
  },
  instructionVideo: {
    type: String,
    maxlength: [
      150,
      'Instruction video url can not be more than 150 characters long',
    ],
  },
  translatableData: getLocalizedDataDefinition(),
  en: getLocalizedDataDefinition(),
  bg: getLocalizedDataDefinition(),
  ru: getLocalizedDataDefinition(),
  ukr: getLocalizedDataDefinition(),
  ...(getLocalizedDataDefinition() as any),
});
ExerciseSchema.method({ mergeTranslation });
ExerciseSchema.pre<ExercisePreSaveDTO>('save', translateBeforeSave);

export const ExerciseModel = mongoose.model(
  DBModelNames.Exercise,
  ExerciseSchema,
);
