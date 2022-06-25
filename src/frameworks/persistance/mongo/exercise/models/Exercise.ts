import mongoose, { SchemaDefinitionProperty, Schema } from 'mongoose';
import {
  ExerciseTypeEnum,
  MusclesEnum,
  EquipmentEnum,
} from '../../../../../entities/exercise/constants/exercise.enums';
import { Exercise } from '../../../../../entities/exercise/ExerciseEntity';
import { ExerciseTranslatableData } from '../../../../../entities/exercise/models/exercise-translatable-data.interface';
import { DBModelNames } from '../../../../../app/shared/enums/db-model-names.enum';
import { getEnumValues } from '../../../../../app/shared/utils/get-enum-values';
import { mergeTranslations } from '../middlewares/instance-methods';

const getLocalizedDataDefinition =
  (): SchemaDefinitionProperty<ExerciseTranslatableData> => ({
    name: {
      type: String,
      trim: true,
      maxlength: [100, 'Name can not be more than 100 characters'],
    },
    shortDescription: {
      type: String,
      maxlength: [1500, 'Description can not be more than 1500 characters'],
    },
    longDescription: {
      type: String,
      maxlength: [3000, 'Description can not be more than 3000 characters'],
    },
    instructions: {
      type: String,
      maxlength: [3000, 'Instruction can not be more than 3000 characters'],
    },
    benefits: {
      type: String,
      maxlength: [3000, 'Benefits can not be more than 3000 characters'],
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

/**
 * Deprecated.
 * TODO: remove in a future
 */
ExerciseSchema.method({ mergeTranslations });

export const ExerciseModel = mongoose.model(
  DBModelNames.Exercise,
  ExerciseSchema,
);
