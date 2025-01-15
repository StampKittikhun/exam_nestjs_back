import { Controller, Post, Body, Get } from '@nestjs/common';
import { EmailQueueService } from './email-queue.service';

@Controller('email-queue')
export class EmailQueueController {
  constructor(private readonly emailQueueService: EmailQueueService) {}

  @Post('add')
  async addEmailToQueue(@Body() emailData: { to: string; subject: string; body: string }) {
    return this.emailQueueService.addEmailToQueue(emailData);
  }

  @Get('stats')
  async getQueueStats() {
    return this.emailQueueService.getQueueStats();
  }
}
