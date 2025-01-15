import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'your-secret-key', // ใช้ Environment Variable ใน Production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController], // เพิ่ม Controller
  providers: [AuthService],
})
export class AuthModule {}
