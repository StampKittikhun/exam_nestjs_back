import { IsString, IsNumber, IsOptional, IsBoolean, Min, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(100)
  name: string;  // ชื่อสินค้า

  @IsNumber()
  @Min(0)
  price: number; // ราคาสินค้า

  @IsString()
  @MaxLength(255)
  description: string; // รายละเอียดสินค้า

  @IsOptional()
  @IsBoolean()
  isActive?: boolean; // หมวดหมู่สินค้า
}
