import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product], 'default'), // เชื่อมต่อฐานข้อมูลหลัก
    TypeOrmModule.forFeature([Product], 'secondary'), // เชื่อมต่อฐานข้อมูลสำรอง
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService], // หากต้องการใช้งานในโมดูลอื่น
})
export class ProductsModule {}
