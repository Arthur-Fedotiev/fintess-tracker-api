import { PaginationResult } from './pagination-result.interface';

export interface PaginatedResponse<T = unknown> {
  count: number;
  pagination: PaginationResult;
  data: T;
}
