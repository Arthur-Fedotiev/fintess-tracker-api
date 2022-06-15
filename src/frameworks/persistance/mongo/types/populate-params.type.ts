import mongoose from 'mongoose';

export type PopulateParams = Parameters<
  typeof mongoose.Query.prototype.populate
>[number];
