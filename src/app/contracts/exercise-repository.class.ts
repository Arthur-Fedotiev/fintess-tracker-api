import { ExerciseRequestDTO } from '../../entities/exercise/models/dto/exercise-request-DTO.interface';
import { ExerciseResponseDTO } from '../../entities/exercise/models/dto/exercise-response-DTO';

export abstract class ExerciseRepository {
  abstract getMany(): Promise<ExerciseResponseDTO[]>;
  abstract getOneById(id: number | string): Promise<ExerciseResponseDTO | null>;
  abstract createOne(
    dto: ExerciseRequestDTO,
  ): Promise<ExerciseResponseDTO | null>;
}
