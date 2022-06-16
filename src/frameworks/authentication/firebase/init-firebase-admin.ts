import admin from 'firebase-admin';
import { ENV_CONFIG } from '../../../env-config';

export const initFirebaseAdmin = () =>
  admin.initializeApp({
    credential: admin.credential.cert(ENV_CONFIG.firebaseAdminCreds),
  });
