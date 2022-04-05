import express from 'express';
import { ENV_CONFIG } from './env-config';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Here is process env vars: process.env.NODE_ENV=${ENV_CONFIG.env}`,
  });
});

const PORT = ENV_CONFIG.port || 8080;

app.listen(PORT, () => console.log(`⚡ Server running in ${ENV_CONFIG.env} mode on port ${ENV_CONFIG.port}`));
