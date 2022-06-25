import {
  EquipmentEnum,
  ExerciseRequestDTO,
  ExerciseTranslatableData,
  ExerciseTypeEnum,
  MusclesEnum,
} from '../../../entities/exercise';
import {
  IsString,
  IsEnum,
  IsNumber,
  Min,
  Max,
  IsOptional,
  IsUrl,
  ValidateNested,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TranslatableDataDTO implements ExerciseTranslatableData {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(1500)
  shortDescription!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(3000)
  longDescription!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(3000)
  instructions!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(3000)
  benefits!: string;
}

export class CreateExerciseDTO implements Required<ExerciseRequestDTO> {
  @IsEnum(ExerciseTypeEnum)
  exerciseType!: ExerciseTypeEnum;

  @IsEnum(MusclesEnum)
  targetMuscle!: MusclesEnum;

  @IsEnum(EquipmentEnum)
  equipment!: EquipmentEnum;

  @IsNumber()
  @Min(1)
  @Max(10)
  rating!: number;

  @IsOptional()
  @IsUrl()
  avatarUrl!: string;

  @IsOptional()
  @IsUrl()
  avatarSecondaryUrl!: string;

  @IsOptional()
  @IsUrl()
  coverUrl!: string;

  @IsOptional()
  @IsUrl()
  coverSecondaryUrl!: string;

  @IsOptional()
  @IsUrl()
  muscleDiagramUrl!: string;

  @IsOptional()
  @IsUrl()
  instructionVideo!: string;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => TranslatableDataDTO)
  translatableData!: TranslatableDataDTO;
}
