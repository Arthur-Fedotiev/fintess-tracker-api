import { AuthRepository } from '../../contracts/features/auth/auth-repository.class';
import { UserCredentials } from '../../contracts/features/auth/user-credentials';
import { UseCaseExecutor } from '../common/use-case.interface';

export class UserSigninCommand implements UseCaseExecutor<string | null> {
  private static instance: UserSigninCommand;

  private constructor(private readonly authRepository: AuthRepository) {}

  public static getInstance(authRepository: AuthRepository): UserSigninCommand {
    if (!UserSigninCommand.instance) {
      UserSigninCommand.instance = new UserSigninCommand(authRepository);
    }

    return UserSigninCommand.instance;
  }

  public async execute(creds: UserCredentials): Promise<string | null> {
    return await this.authRepository.login(creds);
  }
}
