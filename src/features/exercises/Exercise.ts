import mongoose from 'mongoose';
import { SchemaDefinitionProperty, Schema } from 'mongoose';
import { getEnumValues } from '../../shared/utils/get-enum-values';
import {
  EquipmentEnum,
  ExerciseTypeEnum,
  MusclesEnum,
} from './constants/exercise.enums';
import { translateBeforeSave } from './middlewares/mongoose/translate-before-save';
import { mergeTranslation } from './middlewares/mongoose/instance-methods';
import { ExercisePreSaveDTO } from './models/exercise-pre-save-DTO.type';
import { ExerciseSchemaType } from './models/exercise-schema.model';
import { ExerciseTranslatableData } from './models/exercise.interface';
import { DBModelNames } from '../../shared/enums/db-model-names.enum';

const getLocalizedDataDefinition = (
  isBeforeTranslation = false,
): SchemaDefinitionProperty<ExerciseTranslatableData> => ({
  name: {
    type: String,
    required: [isBeforeTranslation, 'Please add a name'],
    trim: true,
    unique: true,
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

const ExerciseSchema: Schema<ExerciseSchemaType> = new Schema({
  exerciseType: {
    type: String,
    required: [true, 'Please add an exercise type'],
    enum: getEnumValues(ExerciseTypeEnum),
  },
  targetMuscle: {
    type: String,
    required: [true, 'Please add a muscle type'],
    enum: getEnumValues(MusclesEnum),
  },
  equipment: {
    type: String,
    required: [true, 'Please add an equipment type'],
    enum: getEnumValues(EquipmentEnum),
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating'],
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating can not be more than 10'],
  },
  avatarUrl: String,
  coverUrl: String,
  coverSecondaryUrl: String,
  muscleDiagramUrl: String,
  instructionVideo: String,
  translatableData: getLocalizedDataDefinition(true),
  en: getLocalizedDataDefinition(),
  bg: getLocalizedDataDefinition(),
  ru: getLocalizedDataDefinition(),
  ukr: getLocalizedDataDefinition(),
  ...(getLocalizedDataDefinition() as ExerciseTranslatableData),
});

ExerciseSchema.method({ mergeTranslation });
ExerciseSchema.pre<ExercisePreSaveDTO>('save', translateBeforeSave);

export const ExerciseModel = mongoose.model(
  DBModelNames.Exercise,
  ExerciseSchema,
);
