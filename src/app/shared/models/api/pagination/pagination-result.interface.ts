import { PaginationInfo } from './pagination.interface';

export interface PaginationResult {
  next?: PaginationInfo;
  prev?: PaginationInfo;
}
