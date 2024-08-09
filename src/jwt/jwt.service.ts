import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import {
  exportJWK,
  generateKeyPair,
  JWK,
  JWTPayload,
  jwtVerify,
  KeyLike,
  SignJWT,
} from 'jose';

@Injectable()
export class JwtService implements OnModuleInit {
  private hostname: string;
  private privateKey!: KeyLike;
  private publicKey!: KeyLike;

  constructor(configService: ConfigService) {
    this.hostname = configService.get<string>('SECRETARY_HOSTNAME') ?? '';
  }

  async onModuleInit(): Promise<void> {
    const { privateKey, publicKey } = await generateKeyPair('EdDSA', {
      crv: 'Ed448',
    });
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  async createTokenForUser(user: User): Promise<string> {
    return new SignJWT({})
      .setAudience(this.hostname)
      .setExpirationTime('1d')
      .setIssuedAt()
      .setIssuer(this.hostname)
      .setProtectedHeader({ alg: 'EdDSA', jwk: await this.getPublicKey() })
      .setSubject(user.id)
      .sign(this.privateKey);
  }

  async verifyToken(token: string): Promise<JWTPayload> {
    const decodedToken = await jwtVerify(token, this.publicKey, {
      algorithms: ['EdDSA'],
      audience: this.hostname,
      issuer: this.hostname,
    });

    return decodedToken.payload;
  }

  async getPublicKey(): Promise<JWK> {
    return await exportJWK(this.publicKey);
  }
}
