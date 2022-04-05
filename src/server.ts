import express from 'express';
import { CONFIG } from './config';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Here is process env vars: process.env.NODE_ENV=${CONFIG.env}`,
  });
});

const PORT = CONFIG.port || 8080;

app.listen(PORT, () => console.log(`⚡ Server running in ${CONFIG.env} mode on port ${CONFIG.port}`));
