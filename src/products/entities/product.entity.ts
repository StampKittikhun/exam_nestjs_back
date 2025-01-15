import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; //ชื่อสินค้า

  @Column('decimal', { precision: 10, scale: 2 })
  price: number; // ราคาสินค้า 

  @Column()
  description: string; //รายละเอียดสินค้า

  @Column({ default: true })
  isActive: boolean; //สถานะสินค้า (เปิด / ปิดการขาย)
}
