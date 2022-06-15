import mongoose from 'mongoose';
import { MongooseQueryBuilder } from './exercise/utils/mongoose-query-builder';
import { AdvancedResultsOptions } from './types/advanced-results-options.interface';
import { i18nDefaultConfig } from '../../../app/contracts/i18n/constants/i18n-default-config';
import { I18nResults } from '../../../app/contracts/i18n/models/i18n-results.interface';
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
    i18nResults: I18nResults = i18nDefaultConfig,
    options: AdvancedResultsOptions = { paginationInfo: false },
  ): Promise<PaginatedResponse<ResultsType>> {
    const qb = new MongooseQueryBuilder<ModelType, ResultsType, DocType>(
      model,
      requestQuery,
    )
      .setSelect(i18nResults)
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
