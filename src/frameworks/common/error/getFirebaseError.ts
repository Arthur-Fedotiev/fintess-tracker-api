import { FirebaseAuthException } from '../../../app/shared/models/error/authentication';
import {
  FirebaseAuthErrorCodes,
  FirebaseAuthErrorMessages,
} from './firebase-auth-error-codes.enum';

export const getFirebaseError = (
  code: FirebaseAuthErrorCodes,
): FirebaseAuthException | null =>
  FirebaseAuthErrorMessages[code]
    ? new FirebaseAuthException(FirebaseAuthErrorMessages[code])
    : null;
