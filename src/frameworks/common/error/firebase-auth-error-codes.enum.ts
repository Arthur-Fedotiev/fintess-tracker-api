export enum FirebaseAuthErrorCodes {
  'TokenExpired' = 'auth/id-token-expired',
  'AuthInternal' = 'auth/internal-error',
  'InvalidArgument' = 'auth/invalid-argument',
  'InvalidClaims' = 'auth/invalid-claims',
  'InvalidCredential' = 'auth/invalid-credential',
  'InvalidEmail' = 'auth/invalid-email',
  'InvalidPassword' = 'auth/invalid-password',
  'InvalidPhoneNumber' = 'auth/invalid-phone-number',
  'InvalidPhotoUrl' = 'auth/invalid-photo-url',
  'EmailExists' = 'auth/email-already-exists',
  'InsufficientPermissions' = 'auth/insufficient-permission',
  'InvalidDisplayName' = 'auth/invalid-display-name',
  'ProjectNotFound' = 'auth/project-not-found',
  'UserNotFound' = 'auth/user-not-found',
  'PhoneExists' = 'auth/phone-number-already-exists',
}

export enum FirebaseAuthErrorMessages {
  'auth/id-token-expired' = 'The provided Firebase ID token is expired.',
  'auth/insufficient-permission' = 'The credential used to initialize the Admin SDK has insufficient permission to access the requested Authentication resource. ',
  'auth/internal-error' = 'The Authentication server encountered an unexpected error while trying to process the request.',
  'auth/invalid-argument' = 'An invalid argument was provided to an Authentication method.',
  'auth/invalid-claims' = 'The custom claim attributes provided to setCustomUserClaims() are invalid.',
  'auth/invalid-credential' = 'The credential used to authenticate the Admin SDKs cannot be used to perform the desired action. Certain Authentication methods such as createCustomToken() and verifyIdToken() require the SDK to be initialized with a certificate credential as opposed to a refresh token or Application Default credential. ',
  'auth/invalid-display-name' = 'The provided value for the displayName user property is invalid. It must be a non-empty string.',
  'auth/invalid-email' = 'The provided value for the email user property is invalid. It must be a string email address.',
  'auth/invalid-password' = 'The provided value for the password user property is invalid. It must be a string with at least six characters.',
  'auth/invalid-phone-number' = 'The provided value for the phoneNumber is invalid. It must be a non-empty E.164 standard compliant identifier string.',
  'auth/phone-number-already-exists' = 'The provided phoneNumber is already in use by an existing user. Each user must have a unique phoneNumber.',
  'auth/invalid-photo-url' = 'The provided value for the photoURL user property is invalid. It must be a string URL.',
  'auth/email-already-exists' = 'The provided email is already in use by an existing user. Each user must have a unique email.',
  'auth/project-not-found' = 'No Firebase project was found for the credential used to initialize the Admin SDKs.',
  'auth/user-not-found' = 'There is no existing user record corresponding to the provided identifier.',
}