import { Response } from 'express';

export interface ResponseBody<Data> {
  data: Data;
  success: boolean;
}

export type APIResponse<Data> = Response<ResponseBody<Data>>;
