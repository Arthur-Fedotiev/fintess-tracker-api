import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { UserWithFullName } from '../../../entities/auth/models/user-with-full-name';
import { User } from '../../../entities/auth/User';
import { AuthRepository } from '../../contracts/features/auth/auth-repository.class';
import { UseCaseExecutor } from '../common/use-case.interface';

export class UserSignupCommand implements UseCaseExecutor<UserRecord> {
  private static instance: UserSignupCommand;

  private constructor(private readonly authRepository: AuthRepository) {}

  public static getInstance(authRepository: AuthRepository): UserSignupCommand {
    if (!UserSignupCommand.instance) {
      UserSignupCommand.instance = new UserSignupCommand(authRepository);
    }

    return UserSignupCommand.instance;
  }

  public async execute({
    firstName,
    lastName,
    ...user
  }: User): Promise<UserRecord> {
    const userWithFullName: UserWithFullName = {
      displayName: `${firstName} ${lastName}`,
      ...user,
    };

    return await this.authRepository.signup(userWithFullName);
  }
}
