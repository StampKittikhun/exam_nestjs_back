import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // สร้าง Access Token และ Refresh Token
  async login(user: User) {
    const payload = { sub: user.id, email: user.email }; // เปลี่ยนจาก username เป็น email
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // เก็บ Refresh Token ในฐานข้อมูล
    user.refreshToken = refreshToken; // ตรวจสอบว่ามี refreshToken ใน Entity User
    await this.userRepository.save(user);

    return { accessToken, refreshToken };
  }

  // Validate และ Refresh Access Token
  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userRepository.findOne({ where: { id: payload.sub } });

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid Refresh Token');
      }

      const newAccessToken = this.jwtService.sign({ sub: user.id, email: user.email }, { expiresIn: '15m' });

      return { accessToken: newAccessToken };
    } catch (err) {
      throw new UnauthorizedException('Invalid Refresh Token');
    }
  }
}
