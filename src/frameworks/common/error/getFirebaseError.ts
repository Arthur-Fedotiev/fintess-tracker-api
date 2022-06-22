import { FirebaseAuthException } from '../../../app/shared/models/error/authentication';
import {
  FirebaseAuthErrorCodes,
  FirebaseAuthErrorMessages,
} from './firebase-auth-error-codes.enum';

const parseCode = (code: string): FirebaseAuthErrorCodes =>
  code.split(':')[0].trim() as FirebaseAuthErrorCodes;

export const getFirebaseError = (
  code: FirebaseAuthErrorCodes,
): FirebaseAuthException | null => {
  const parsedCode = parseCode(code);

  return FirebaseAuthErrorMessages[parsedCode]
    ? new FirebaseAuthException(FirebaseAuthErrorMessages[parsedCode])
    : null;
};
