import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CryptoService } from '../crypto/crypto.service';
import { LocalJWTService } from '../jwt/localjwt.service';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWTSEC })],
  providers: [
    AuthResolver,
    AuthService,
    JwtService,
    LocalJWTService,
    PrismaService,
    CryptoService,
  ],
})
export class AuthModule {}
