import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { EmailQueueModule } from './email-queue/email-queue.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    // ตั้งค่าหลายฐานข้อมูล
    DatabaseModule.forRoot([
      {
        name: 'default',
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'exam_db',
        password: 'exam68',
        database: 'exam_db',
        autoLoadEntities: true,
        synchronize: true,
      },
      {
        name: 'secondary',
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'secondary_user',
        password: 'secondary_pass',
        database: 'secondary_db',
        autoLoadEntities: true,
        synchronize: false,
      },
    ]),

    // ตั้งค่า BullModule สำหรับ Email Queue
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),

    // ตั้งค่า CacheModule สำหรับ Redis
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: (await import('cache-manager-ioredis')).default,
        host: 'localhost',
        port: 6379,
        ttl: 300, // Cache TTL 5 นาที
      }),
    }),

    // โมดูลอื่น ๆ
    ProductsModule,
    AuthModule,
    EmailQueueModule,
  ],
})
export class AppModule {}
