import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class EmailQueueService {
  constructor(
    @InjectQueue('email') private readonly emailQueue: Queue,
  ) {}

  async addEmailToQueue(emailData: { to: string; subject: string; body: string }) {
    await this.emailQueue.add('send-email', emailData, {
      attempts: 3, // จำนวนครั้งที่พยายามส่งใหม่เมื่อผิดพลาด
      backoff: 5000, // รอ 5 วินาทีก่อนพยายามใหม่
    });
    return { message: 'Email added to queue' };
  }

  async getQueueStats() {
    return {
      waiting: await this.emailQueue.getWaitingCount(),
      active: await this.emailQueue.getActiveCount(),
      completed: await this.emailQueue.getCompletedCount(),
      failed: await this.emailQueue.getFailedCount(),
    };
  }
}
