import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bullmq';
import { PrismaModule } from './prisma/prisma.module.js';
import { UserModule } from './user/user.module.js';
import { AuthModule } from './auth/auth.module.js';
import { TaskModule } from './task/task.module.js';
import { JobsModule } from './jobs/jobs.module.js';
import { SchedulerModule } from './scheduler/scheduler.module.js';
import { EventsModule } from './events/events.module.js';
import { LoggerModule } from './logger/logger.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    TaskModule,
    JobsModule,
    SchedulerModule,
    EventsModule,
    LoggerModule,
  ],
})
export class AppModule {}
