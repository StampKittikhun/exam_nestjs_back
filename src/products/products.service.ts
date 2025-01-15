import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product, 'default') // การเชื่อมต่อฐานข้อมูลหลัก
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Product, 'secondary') // การเชื่อมต่อฐานข้อมูลสำรอง
    private readonly secondaryProductRepository: Repository<Product>,
  ) {}

  // ดึงสินค้าทั้งหมดจากฐานข้อมูลหลัก
  async findAllFromMain(): Promise<Product[]> {
    return this.productRepository.find();
  }

  // ดึงสินค้าทั้งหมดจากฐานข้อมูลสำรอง
  async findAllFromSecondary(): Promise<Product[]> {
    return this.secondaryProductRepository.find();
  }

  // ดึงสินค้าโดย ID จากฐานข้อมูลหลัก
  async findByIdFromMain(productId: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return product;
  }

  // ดึงสินค้าโดย ID จากฐานข้อมูลสำรอง
  async findByIdFromSecondary(productId: number): Promise<Product> {
    const product = await this.secondaryProductRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return product;
  }
  // สร้างสินค้าใหม่ในฐานข้อมูลหลัก
async createProduct(createProductDto: CreateProductDto): Promise<Product> {
  const product = this.productRepository.create(createProductDto);
  return this.productRepository.save(product);
}

// อัปเดตสินค้าในฐานข้อมูลหลัก
async updateProduct(productId: number, updateProductDto: UpdateProductDto): Promise<Product> {
  const product = await this.findByIdFromMain(productId);
  Object.assign(product, updateProductDto);
  return this.productRepository.save(product);
}

// ลบสินค้าในฐานข้อมูลหลัก
async deleteProduct(productId: number): Promise<void> {
  const product = await this.findByIdFromMain(productId);
  await this.productRepository.remove(product);
}

}
