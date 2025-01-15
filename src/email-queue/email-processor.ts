import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('email')
export class EmailProcessor {
  @Process('send-email')
  async handleSendEmail(job: Job<{ to: string; subject: string; body: string }>) {
    console.log(`Sending email to: ${job.data.to}`);
    console.log(`Subject: ${job.data.subject}`);
    console.log(`Body: ${job.data.body}`);

    // จำลองการส่ง Email
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(`Email sent to: ${job.data.to}`);
  }
}
