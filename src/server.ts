import express from 'express';
import { ENV_CONFIG } from './env-config';
import { detectLanguage, translateText } from './google-translate/translate';

const app = express();

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

app.listen(PORT, () => console.log(`⚡ Server running in ${ENV_CONFIG.env} mode on port ${ENV_CONFIG.port}`));
