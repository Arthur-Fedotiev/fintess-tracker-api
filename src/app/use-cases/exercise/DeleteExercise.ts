import { ExerciseRepository } from '../../contracts';
import { WithID } from '../../shared/models/api/with-id.interface';
import { UseCaseExecutor } from '../common/use-case.interface';

export class DeleteExerciseCommand implements UseCaseExecutor<WithID | null> {
  private static instance: DeleteExerciseCommand;

  private constructor(
    private readonly exerciseRepository: ExerciseRepository,
  ) {}

  public static getInstance(
    exerciseRepository: ExerciseRepository,
  ): DeleteExerciseCommand {
    if (!DeleteExerciseCommand.instance) {
      DeleteExerciseCommand.instance = new DeleteExerciseCommand(
        exerciseRepository,
      );
    }

    return DeleteExerciseCommand.instance;
  }

  public async execute(id: number | string): Promise<WithID | null> {
    return this.exerciseRepository.deleteOne(id);
  }
}
