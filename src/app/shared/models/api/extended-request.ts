import { Request } from 'express';

export type ExtendedRequest<T> = Request & T;
