import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('emailQueue')
export class JobsProcessor extends WorkerHost {
  async process(job: Job) {
    console.log(job.name, job.data);

    if (job.name === 'welcomeEmail') console.log('Sending welcome email...');
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`Job completed: ${job.name}`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, err: Error) {
    console.log(`Job failed: ${job.name}, ${err.message}`);
  }
}
