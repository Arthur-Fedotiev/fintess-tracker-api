import mongoose from 'mongoose';
import { ENV_CONFIG } from '../env-config';

export const connectDB = async () => {
  const connection = await mongoose.connect(ENV_CONFIG.mongoURI);

  console.log(`MongoDB connected: ${connection.connection.host}`.cyan.underline.bold);
};
