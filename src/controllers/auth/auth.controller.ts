import { Request, Response } from 'express';
import { ProjectDependencies } from '../../dependencies/project-dependencies.interface';
import bind from 'bind-decorator';
import { Empty } from '../../app/shared/models/api/empty';
import { APIResponse } from '../../app/shared/models/api/api-response.interface';
import { SuccessfulResponse } from '../../app/shared/models/api/successful-response.model';
import { AsyncHandler } from '../../app/shared/decorators/async-handler';
import { AuthRepository } from '../../app/contracts/features/auth/auth-repository.class';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { User } from '../../entities/auth/User';
import { UserSignupCommand } from '../../app/use-cases/auth/UserSignup';
import { UserSigninCommand } from '../../app/use-cases/auth/UserSignin';
import { FirebaseAuthException } from '../../app/shared/models/error/authentication';
import { UserCredentials } from '../../app/contracts/features/auth/user-credentials';

export class AuthController {
  private static instance: AuthController;

  private constructor(public readonly authRepository: AuthRepository) {}

  public static getInstance({
    AuthService,
  }: ProjectDependencies): AuthController {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController(AuthService.authRepository);
    }

    return AuthController.instance;
  }

  @bind
  @AsyncHandler()
  public async signup(
    req: Request<Empty, APIResponse<UserRecord>, User, Empty>,
    res: Response,
  ): Promise<void> {
    const { body } = req;

    const UserSignup = UserSignupCommand.getInstance(this.authRepository);
    const user = await UserSignup.execute(body);

    res.status(200).json(new SuccessfulResponse(user));
  }

  @bind
  @AsyncHandler()
  public async signin(
    req: Request<Empty, APIResponse<string | null>, UserCredentials, Empty>,
    res: Response,
  ): Promise<void> {
    const { body } = req;

    const UserSignin = UserSigninCommand.getInstance(this.authRepository);
    const idToken = await UserSignin.execute(body);

    if (!idToken)
      throw new FirebaseAuthException(
        'There is no user signed up with such credentials!',
      );

    res.status(200).json(new SuccessfulResponse(idToken));
  }

  @bind
  @AsyncHandler()
  public async currentUser(
    req: Request & { user?: User },
    res: Response,
  ): Promise<void> {
    const { user } = req;

    res.status(200).json(new SuccessfulResponse(user));
  }
}
