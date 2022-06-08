export interface UseCaseExecutor<Result = unknown> {
  execute(...args: unknown[]): Result | Promise<Result>;
}
