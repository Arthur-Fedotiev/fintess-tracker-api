import mongoose from 'mongoose';
import { MongooseQueryBuilder } from './exercise/utils/mongoose-query-builder';
import { AdvancedResultsOptions } from './types/advanced-results-options.interface';

import { PaginatedResponse } from '../../../app/shared/models/api/pagination/paginated-response.interface';
import { RequestQuery } from '../../../app/shared/models/api/request-query.type';

export class AdvancedResultsMongooseService {
  private static instance: AdvancedResultsMongooseService;

  private constructor() {}

  public static getInstance(): AdvancedResultsMongooseService {
    if (!AdvancedResultsMongooseService.instance) {
      AdvancedResultsMongooseService.instance =
        new AdvancedResultsMongooseService();
    }

    return AdvancedResultsMongooseService.instance;
  }

  public async getAdvancedResults<
    ModelType,
    ResultsType extends unknown[],
    DocType,
  >(
    model: mongoose.Model<ModelType>,
    requestQuery: RequestQuery,
    options: AdvancedResultsOptions = { paginationInfo: false },
  ): Promise<PaginatedResponse<ResultsType>> {
    const qb = new MongooseQueryBuilder<ModelType, ResultsType, DocType>(
      model,
      requestQuery,
    )
      .setSelect()
      .setSort()
      .setPopulate(options.populate);

    if (options.paginationInfo) {
      qb.setPagination();
    }

    const data = await qb.execute();

    return {
      count: options.paginationInfo ? data.length : undefined,
      pagination: options.paginationInfo
        ? await qb.getPaginationResults()
        : undefined,
      data,
    };
  }
}
