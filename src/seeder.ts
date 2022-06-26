import fs from 'fs/promises';
import mongoose from 'mongoose';
import appRoot from 'app-root-path';

import { ExerciseModel } from './frameworks/persistance/mongo/exercise/models/Exercise';
import {
  ExerciseBase,
  ExerciseRequestDTO,
  ExerciseTranslatableData,
} from './entities/exercise';
import { v2 } from '@google-cloud/translate';
import { GoogleTranslateService } from './frameworks/i18n/translate';
import { ENV_CONFIG } from './env-config';

mongoose.connect(ENV_CONFIG.mongoURI!);
const translateService = new GoogleTranslateService(
  new v2.Translate({
    credentials: ENV_CONFIG.googleTranslateCreds,
    projectId: ENV_CONFIG.googleTranslateCreds.project_id,
  }),
);

const parseData = (
  data: string,
): {
  exercises: {
    [key: string]: {
      baseData: ExerciseBase;
      translatableData: ExerciseTranslatableData;
    };
  };
} => {
  return JSON.parse(data);
};

const importExercises = async (exercises: {
  [key: string]: {
    baseData: ExerciseBase;
    translatableData: ExerciseTranslatableData;
  };
}) => {
  const mappedExercises = Object.keys(exercises).map((key) => ({
    ...exercises[key].baseData,
    translatableData: exercises[key].translatableData,
  }));

  const getTranslatedExercise = async (dto: Required<ExerciseRequestDTO>) => {
    Object.keys(dto.translatableData).forEach(
      (key) =>
        dto.translatableData[
          key as unknown as keyof ExerciseTranslatableData
        ] === null &&
        (dto.translatableData[
          key as unknown as keyof ExerciseTranslatableData
        ] = ''),
    );

    const translatedData = await translateService.translate(
      dto.translatableData,
    );

    Object.assign(dto, translatedData, {
      translatableData: undefined,
    });

    return dto;
  };

  const translatedExercises = await Promise.all(
    mappedExercises.map(getTranslatedExercise),
  );
  await ExerciseModel.create(translatedExercises);
};

const deleteData = async () => {
  try {
    await ExerciseModel.deleteMany();

    console.log('Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

const importData = async () => {
  try {
    const data = await fs.readFile(
      `${appRoot}/_data/fitness-tracker-collections.json`,
      'utf-8',
    );
    const { exercises } = parseData(data);

    await importExercises(exercises);

    console.log('Data Imported...');
    process.exit();
  } catch (err) {
    console.error(err);

    deleteData();
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
