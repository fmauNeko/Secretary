import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { JwtModule } from '../jwt/jwt.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthGuard } from './auth.guard.js';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule, PrismaModule],
      providers: [AuthGuard],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
