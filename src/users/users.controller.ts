import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { type Request } from 'express';
import { type UserDto } from './dto/user.dto.js';

@Controller('users')
export class UsersController {
  @HttpCode(HttpStatus.OK)
  @Get('me')
  me(@Req() request: Request): UserDto {
    if (!request.user) {
      throw new UnauthorizedException();
    }

    return request.user;
  }
}
