import express from 'express';
import { ENV_CONFIG } from './env-config';
import { detectLanguage, translateText } from './google-translate/translate';
import { connectDB } from './db/connect-db';
import { useLogger } from './shared/utils/use-logger';

const colors = require('colors');
import * as c from 'colors';

connectDB();

const app = express();

useLogger(app);

app.use(express.json());

app.get('/:text', async (req, res) => {
  const text = req.params.text;
  const language = await detectLanguage(text);
  const translation = await translateText(text);

  res.status(200).json({
    success: true,
    translation,
  });
});

const PORT = ENV_CONFIG.port || 8080;

const server = app.listen(PORT, () =>
  console.log(`⚡ Server running in ${ENV_CONFIG.env} mode on port ${ENV_CONFIG.port}`.yellow.bold),
);

process.on('unhandledRejection', (err: Error, promise: Promise<unknown>) => {
  console.log(`Error: ${err.message}`.red);

  /**
   * Close server and exit process
   */
  server.close(() => process.exit(1));
});
