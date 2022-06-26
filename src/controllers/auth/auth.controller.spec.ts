import { AuthController } from './auth.controller';

function privateFactory<T = any>(cls: any, ...args: any[]): T {
  return new cls(...args);
}

describe('AuthController', () => {
  let controller: AuthController;
  let authRepoMock: { signup: jest.Mock; login: jest.Mock };
  let authServiceMock: {
    authRepository: { signup: jest.Mock; login: jest.Mock };
  };

  beforeEach(() => {
    authRepoMock = {
      signup: jest.fn(),
      login: jest.fn(),
    };
    authServiceMock = { authRepository: authRepoMock };
    controller = privateFactory<AuthController>(
      AuthController,
      authServiceMock,
    );
  });

  it('should create controller', async () => {
    expect(controller).toBeUndefined();
  });
});
