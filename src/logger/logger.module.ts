import { AppLogger } from './logger.service.js';
import { Module } from '@nestjs/common';

@Module({
  providers: [AppLogger],
  exports: [AppLogger],
})
export class LoggerModule {}
