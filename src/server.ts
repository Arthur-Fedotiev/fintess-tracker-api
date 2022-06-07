import express from 'express';
import { ENV_CONFIG } from './env-config';
import { connectDB } from './db/connect-db';
import { useLogger } from './shared/utils/use-logger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const c = require('colors');
import colors from 'colors';

import { ExerciseModel } from './frameworks/persistance/mongo/exercise/models/Exercise';
import { i18nResults } from './frameworks/i18n/middlewares/i18n-results';
import projectDependencies from './dependencies/project-dependencies';

// connectDB();

const app = express();
const PORT = ENV_CONFIG.port || 8080;
// load app only if db is alive and kicking

projectDependencies.DatabaseService.connect()
  .then(() => {
    useLogger(app);
    app.use(express.json());

    app.post('/exercises', async (req, res) => {
      const { body } = req;

      const exercise =
        await projectDependencies.DatabaseService.exerciseRepository.createOne(
          body,
        );

      res.status(200).json({
        success: true,
        data: exercise,
      });
    });

    app.get('/exercises/:id', i18nResults, async (req, res) => {
      const id = req.params.id;

      const exercise =
        await projectDependencies.DatabaseService.exerciseRepository.getOneById(
          id as any,
          (req as any).i18nResults,
        );

      res.status(200).json({
        success: true,
        data: exercise,
      });
    });

    app.get('/exercises', i18nResults, async (req, res) => {
      const exercisesDocs =
        await projectDependencies.DatabaseService.exerciseRepository.getMany(
          (req as any).i18nResults,
        );

      res.status(200).json({
        success: true,
        data: exercisesDocs,
      });
    });

    const server = app.listen(PORT, () =>
      console.log(
        `⚡ Server running in ${ENV_CONFIG.env} mode on port ${ENV_CONFIG.port}`
          .yellow.bold,
      ),
    );

    process.on('unhandledRejection', (err: Error) => {
      console.log(`Error: ${err.message}`.red);

      /**
       * Close server and exit process
       */
      server.close(() => process.exit(1));
    });
  })
  .catch((err: unknown) => {
    console.log(`db is not ready, err:${err}`);
  });

// app.post('/exercises', async (req, res) => {
//   const { body } = req;

//   const exercise = await ExerciseModel.create(body);

//   res.status(200).json({
//     success: true,
//     data: exercise,
//   });
// });

// app.get('/exercises/:id', i18nResults, async (req, res, next) => {
//   const id = req.params.id;

//   const exercise = await ExerciseModel.findById(id).select(
//     (req as any).i18nResults?.excludedLanguagesQuery ?? '',
//   );

//   exercise!.mergeTranslation((req as any).i18nResults?.language);

//   res.status(200).json({
//     success: true,
//     data: exercise,
//   });
// });

// app.get('/exercises', i18nResults, async (req, res) => {
//   const exercisesDocs = await ExerciseModel.find().select(
//     (req as any).i18nResults?.excludedLanguagesQuery ?? '',
//   );

//   exercisesDocs.forEach((exerciseDoc) =>
//     exerciseDoc.mergeTranslation((req as any).i18nResults?.language),
//   );

//   res.status(200).json({
//     success: true,
//     data: exercisesDocs,
//   });
// });

// const server = app.listen(PORT, () =>
//   console.log(
//     `⚡ Server running in ${ENV_CONFIG.env} mode on port ${ENV_CONFIG.port}`
//       .yellow.bold,
//   ),
// );

// process.on('unhandledRejection', (err: Error) => {
//   console.log(`Error: ${err.message}`.red);

//   /**
//    * Close server and exit process
//    */
//   server.close(() => process.exit(1));
// });
