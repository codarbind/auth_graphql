import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupInput } from './dto/signup';
import { PrismaService } from '../prisma/prisma.service';
import { compare, hash } from 'bcrypt';
import { AuthResponse } from './dto/authresponse';
import { LocalSigninInput } from './dto/signin';
import { LocalJWTService } from '../jwt/localjwt.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtservice: LocalJWTService,
  ) {}
  async create(signupInput: SignupInput): Promise<AuthResponse> {
    // Check if email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: signupInput.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // If email doesn't exist, proceed with user creation
    let hashedPassword = await hash(signupInput.password, 10);
    signupInput.password = hashedPassword;
    const user = await this.prisma.user.create({ data: { ...signupInput } });
    const token = await this.generateToken(user.id, user.email);
    return { token, user };
  }

  async signin(signinInput: LocalSigninInput): Promise<AuthResponse> {
    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email: signinInput.email },
    });

    // If user doesn't exist, throw UnauthorizedException
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare provided password with stored hashed password
    const passwordMatch = await compare(signinInput.password, user.password);

    // If passwords don't match, throw UnauthorizedException
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate token for authenticated user
    const token = await this.generateToken(user.id, user.email);

    // Return token and user details
    return { token, user };
  }

  async captureBiometricInit(
    token: string,
    biometricKey: string,
  ): Promise<boolean> {
    // Verify authentication token and get user ID
    const tokenpayload = this.jwtservice.verify(token);
    //const bioenc = this.cryptoservice.encrypt(biometricKey);
    // Update the user with the biometrickey
    await this.prisma.user.update({
      where: { id: tokenpayload.id },
      data: { biometricKey },
    });

    return true;
  }

  async confirmBiometric(biometricKey: string): Promise<AuthResponse> {
    // Retrieve the user from the database
    const user = await this.prisma.user.findUnique({
      where: { biometricKey },
    });
    // Ensure user exists
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.generateToken(user.id, user.email);
    // Biometric key is confirmed
    return { user, token };
  }

  private async generateToken(id: string, email: string) {
    const token = this.jwtservice.sign({ id, email });
    return token;
  }
  findAll() {
    return `This action returns all auth`;
  }
}
