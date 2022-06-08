import {
  ExerciseRequestDTO,
  ExerciseResponseDTO,
} from '../../../entities/exercise';
import { ExerciseRepository } from '../../contracts';
import { UseCaseExecutor } from '../common/use-case.interface';

export class CreateExerciseCommand
  implements UseCaseExecutor<ExerciseResponseDTO | null>
{
  private static instance: CreateExerciseCommand;

  private constructor(
    private readonly exerciseRepository: ExerciseRepository,
  ) {}

  public static getInstance(
    exerciseRepository: ExerciseRepository,
  ): CreateExerciseCommand {
    if (!CreateExerciseCommand.instance) {
      CreateExerciseCommand.instance = new CreateExerciseCommand(
        exerciseRepository,
      );
    }

    return CreateExerciseCommand.instance;
  }

  public async execute(
    dto: ExerciseRequestDTO,
  ): Promise<ExerciseResponseDTO | null> {
    return this.exerciseRepository.createOne(dto);
  }
}
