import mongoose, { SortOrder } from 'mongoose';
import { I18nResults } from '../../../../../app/contracts/i18n/models/i18n-results.interface';
import { PaginationResult } from '../../../../../app/shared/models/api/pagination/pagination-result.interface';
import { RequestQuery } from '../../../../../app/shared/models/api/request-query.type';
import { PopulateParams } from '../../types/populate-params.type';

export class MongooseQueryBuilder<ModelType, ResultType, DocType> {
  private static readonly mongooseOperators = /\b(gt|gte|lt|lte|in)\b/g;

  private query!: mongoose.Query<ResultType, DocType>;
  private sanitizedQuery!: string;

  page?: number;
  limit?: number;
  startIndex?: number;

  private get select(): string | undefined {
    return this.requestQuery.select;
  }
  private get sort(): string | undefined {
    return this.requestQuery.sort;
  }
  private get queryPage(): string | undefined {
    return this.requestQuery.page;
  }
  private get queryLimit(): string | undefined {
    return this.requestQuery.limit;
  }
  private get rawQueryObj(): RequestQuery {
    const { select, sort, queryPage, queryLimit, ...reqQuery } =
      this.requestQuery;

    return reqQuery;
  }

  public async execute(): Promise<mongoose.Query<ResultType, DocType>> {
    return await this.query;
  }

  constructor(
    private readonly model: mongoose.Model<ModelType>,
    private readonly requestQuery: RequestQuery,
  ) {
    this.reset();
  }

  public async getPaginationResults(): Promise<PaginationResult> {
    if (!(this.startIndex != null && this.page != null && this.limit != null)) {
      return {};
    }
    const pagination = {} as any;

    const endIndex = this.page * this.limit;
    const total = await this.model.countDocuments(
      JSON.parse(this.sanitizedQuery),
    );

    if (endIndex < total) {
      pagination.next = {
        page: this.page + 1,
        limit: this.limit,
      };
    }

    if (this.startIndex > 0) {
      pagination.prev = {
        page: this.page - 1,
        limit: this.limit,
      };
    }

    return pagination;
  }

  public setSelect(
    i18nResults?: I18nResults,
  ): MongooseQueryBuilder<ModelType, ResultType, DocType> {
    if (this.select) {
      const fields = this.select.split(',').join(' ');

      this.query = this.query.select(fields);
    } else if (i18nResults) {
      this.query.select(i18nResults.excludedLanguagesQuery);
    }

    return this;
  }

  public setSort(
    sortConfigFallback?: string | { [key: string]: SortOrder },
  ): MongooseQueryBuilder<ModelType, ResultType, DocType> {
    if (this.sort) {
      const sortBy = this.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else if (sortConfigFallback) {
      this.query = this.query.sort(sortConfigFallback);
    }

    return this;
  }

  public setPagination(): MongooseQueryBuilder<ModelType, ResultType, DocType> {
    this.page = parseInt(this.queryPage!, 10) || 1;
    this.limit = parseInt(this.queryLimit!, 10) || 25;
    this.startIndex = (this.page - 1) * this.limit;

    this.query = this.query.skip(this.startIndex).limit(this.limit);

    return this;
  }

  public setPopulate(
    populate?: PopulateParams,
  ): MongooseQueryBuilder<ModelType, ResultType, DocType> {
    if (!populate) return this;

    this.query = this.query.populate(populate) as any;

    return this;
  }

  public reset(): void {
    this.sanitizedQuery = JSON.stringify(this.rawQueryObj).replace(
      MongooseQueryBuilder.mongooseOperators,
      (match) => `$${match}`,
    );

    this.query = this.model.find(JSON.parse(this.sanitizedQuery)) as any;
  }
}
