import { Express } from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

const xss = require('xss-clean');

const limiter = {
  windowMs: 600_000,
  max: 100,
};

const directives = {
  ...helmet.contentSecurityPolicy.getDefaultDirectives(),
  'script-src': ["'self'", "'unsafe-inline'", 'example.com'],
};

export const useSecure = (app: Express): void => {
  app.use(mongoSanitize());
  app.use(helmet());
  app.use(helmet.contentSecurityPolicy({ directives }));
  app.use(xss());
  app.use(hpp());
  app.use(rateLimit(limiter));
  app.use(cors());
};
