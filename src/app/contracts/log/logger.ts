import { LeveledLogMethod } from 'winston';

export abstract class Logger {
  public abstract fatal(...args: any[]): LeveledLogMethod;
  public abstract error: LeveledLogMethod;
  public abstract info: LeveledLogMethod;
  public abstract debug: LeveledLogMethod;
  public abstract trace: LeveledLogMethod;
}
