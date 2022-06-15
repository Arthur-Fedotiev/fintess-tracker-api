export type RequestQuery = Partial<{
  [key: string]: string;
}> & {
  select?: string;
  sort?: string;
  page?: string;
  limit?: string;
};
