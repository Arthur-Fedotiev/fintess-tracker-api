import mongoose from 'mongoose';
import { SchemaDefinitionProperty, Schema } from 'mongoose';
import { TranslationDTO } from '../../google-translate/models/translatin-dto.interface';
import {
  TranslatedData,
  Translations,
} from '../../google-translate/models/translation.interfaces';
import { translateToLangs } from '../../google-translate/translate';
import { mapTranslatedValuesToKeys } from '../../google-translate/utils/map-translated-values-to-keys';
import { mapTranslatedData } from '../../google-translate/utils/translation-mappers';
import { getEnumValues } from '../../shared/utils/get-enum-values';
import {
  EquipmentEnum,
  ExerciseTypeEnum,
  MusclesEnum,
} from './constants/exercise.enums';
import {
  ExerciseDocument,
  ExerciseDTO,
  TranslatableData,
} from './models/exercise.interface';

const getLocalizedDataDefinition = (
  isBeforeTranslation = false,
): SchemaDefinitionProperty<TranslatableData> => ({
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
    maxlength: [1000, 'Instruction can not be more than 1000 characters'],
  },
  benefits: {
    type: String,
    maxlength: [1000, 'Benefits can not be more than 1000 characters'],
  },
});

const ExerciseSchema: Schema<
  ExerciseDocument & { translatableData?: TranslatableData }
> = new Schema({
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
});

ExerciseSchema.pre<ExerciseDTO>(
  'save',
  async function (next: (err?: Error) => void): Promise<void> {
    const { translatableData } = this;
    const translatableEntries: [string, string][] = Object.entries(
      translatableData!,
    );

    const rawTranslatedData: (TranslationDTO<string> | null)[] =
      await Promise.all(
        translatableEntries.map(([, value]) => translateToLangs(value)),
      );

    const mappedTranslatedData = translatableEntries.reduce(
      mapTranslatedValuesToKeys(
        rawTranslatedData.filter((data): data is TranslationDTO<string> =>
          Boolean(data),
        ),
      ),
      {} as TranslatedData<TranslatableData>,
    );

    const translations: Translations<TranslatableData> =
      mapTranslatedData<TranslatableData>(mappedTranslatedData);

    Object.assign(this, translations);
    this.translatableData = undefined;

    next();
  },
);

export const ExerciseModel = mongoose.model('Exercise', ExerciseSchema);
