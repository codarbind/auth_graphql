import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalJWTService {
  private readonly defaultOptions: any;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.defaultOptions = {
      sign: {
        expiresIn: '2h',
        secret: this.configService.get<string>('JWTSEC'),
      },
      verify: { secret: this.configService.get<string>('JWTSEC') },
    };
  }

  sign(payload: object, options: JwtSignOptions = {}): string {
    const mergedOptions = { ...this.defaultOptions.sign, ...options };
    return this.jwtService.sign(payload, mergedOptions);
  }

  verify(token: string, options: JwtVerifyOptions = {}) {
    const mergedOptions = { ...this.defaultOptions.verify, ...options };

    return this.jwtService.verify(token, mergedOptions);
  }
}
