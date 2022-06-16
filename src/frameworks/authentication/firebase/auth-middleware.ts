import { NextFunction, Request, Response } from 'express';
import admin from 'firebase-admin';
import { UnauthorizedException } from '../../../app/shared/models/error/unauthorized';

export const firebaseAuthProtected = (
  req: any,
  _res: any,
  next: NextFunction,
) => {
  if (req.headers.authorization) {
    admin
      .auth()
      .verifyIdToken(req.headers.authorization)
      .then(() => {
        next();
      })
      .catch(() => {
        next(new UnauthorizedException());
      });
  } else {
    next(new UnauthorizedException());
  }
};
