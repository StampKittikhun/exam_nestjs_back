import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { EmailQueueService } from './email-queue.service';
import { EmailProcessor } from './email-processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email', // ชื่อ Queue
    }),
  ],
  providers: [EmailQueueService, EmailProcessor],
  exports: [EmailQueueService],
})
export class EmailQueueModule {}
