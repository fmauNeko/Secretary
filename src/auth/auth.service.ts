import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { JwtService } from '../jwt/jwt.service.js';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class AuthService {
  private pepper: Buffer;
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {
    const pepper = this.configService.get<string>('SECRETARY_PEPPER');

    if (!pepper) {
      throw new Error('SECRETARY_PEPPER must be set');
    }

    this.pepper = Buffer.from(pepper);
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.user({ email });

    if (
      !user ||
      !(await argon2.verify(user.passwordHash, password, {
        secret: this.pepper,
      }))
    ) {
      throw new UnauthorizedException();
    }

    return {
      access_token: await this.jwtService.createTokenForUser(user),
    };
  }
}
