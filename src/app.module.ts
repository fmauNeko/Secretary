import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaService } from './prisma/prisma.service.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        SECRETARY_DATABASE_URL: Joi.string().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
