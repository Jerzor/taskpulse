import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { JobsProcessor } from './jobs.processor.js';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'emailQueue',
    }),
  ],
  providers: [JobsProcessor],
})
export class JobsModule {}
