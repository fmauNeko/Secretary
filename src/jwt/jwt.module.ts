import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from './jwt.service.js';

@Module({
  imports: [ConfigModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
