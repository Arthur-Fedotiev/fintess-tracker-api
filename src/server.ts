import express from 'express';
import { ENV_CONFIG } from './env-config';
import { connectDB } from './db/connect-db';
import { useLogger } from './shared/utils/use-logger';

const colors = require('colors');
import * as c from 'colors';
import { ExerciseModel } from './features/exercises/Exercise.model';

connectDB();

const app = express();

useLogger(app);

app.use(express.json());

app.post('/exercises', async (req, res) => {
  const { body } = req;

  const exercise = await ExerciseModel.create(body);

  res.status(200).json({
    success: true,
    data: exercise,
  });
});

const PORT = ENV_CONFIG.port || 8080;

const server = app.listen(PORT, () =>
  console.log(
    `⚡ Server running in ${ENV_CONFIG.env} mode on port ${ENV_CONFIG.port}`
      .yellow.bold,
  ),
);

process.on('unhandledRejection', (err: Error, promise: Promise<unknown>) => {
  console.log(`Error: ${err.message}`.red);

  /**
   * Close server and exit process
   */
  server.close(() => process.exit(1));
});
