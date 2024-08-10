import { Prisma } from '@prisma/client';

export type UserDto = Prisma.UserGetPayload<{
  include: { characters: true };
  omit: { passwordHash: true };
}>;
