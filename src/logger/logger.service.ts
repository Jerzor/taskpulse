import { Injectable, LoggerService } from '@nestjs/common';
import { appendFileSync } from 'fs';

@Injectable()
export class AppLogger implements LoggerService {
  log(message: string) {
    console.log('LOG:', message);
    appendFileSync(
      'logs.txt',
      `[LOG] ${new Date().toISOString()} ${message}\n`,
    );
  }

  error(message: string, trace: string) {
    console.error('ERROR:', message);
    appendFileSync(
      'logs.txt',
      `[ERROR] ${new Date().toISOString()} ${message} - ${trace}\n`,
    );
  }

  warn(message: string) {
    console.warn('🟡 WARN:', message);
    appendFileSync(
      'logs.txt',
      `[WARN] ${new Date().toISOString()} ${message}\n`,
    );
  }
}
