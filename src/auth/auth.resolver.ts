import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { SignupInput } from './dto/signup';
import { UpdateAuthInput } from './dto/update-auth.input';
import { AuthResponse, CaptureBioResponse } from './dto/authresponse';
import { LocalSigninInput } from './dto/signin';
import { AccessToken } from '../common/decorators/access-token.decorator';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async signup(@Args('signupInput') signupInput: SignupInput) {
    return await this.authService.create(signupInput);
  }

  @Mutation(() => AuthResponse)
  async signin(@Args('localsigninInput') localsignininput: LocalSigninInput) {
    return await this.authService.signin(localsignininput);
  }

  @Mutation(() => CaptureBioResponse)
  async captureBiometric(
    @Args('biometricCapture') biometric: string,
    @AccessToken() token: string,
  ): Promise<CaptureBioResponse> {
    const success = await this.authService.captureBiometricInit(
      token,
      biometric,
    );
    return { success };
  }

  @Mutation(() => AuthResponse)
  async biometricLogin(
    @Args('biometricCapture') biometric: string,
  ): Promise<AuthResponse> {
    return this.authService.confirmBiometric(biometric);
  }

  @Query(() => [Auth], { name: 'auth' })
  findAll() {
    return this.authService.findAll();
  }
}
