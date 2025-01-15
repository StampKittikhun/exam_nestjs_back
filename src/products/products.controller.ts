import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('main')
  async getProductsFromMain() {
    return this.productsService.findAllFromMain();
  }

  @Get('secondary')
  async getProductsFromSecondary() {
    return this.productsService.findAllFromSecondary();
  }

  @Get('main/:id')
  async getProductByIdFromMain(@Param('id') productId: number) {
    return this.productsService.findByIdFromMain(productId);
  }

  @Get('secondary/:id')
  async getProductByIdFromSecondary(@Param('id') productId: number) {
    return this.productsService.findByIdFromSecondary(productId);
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') productId: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(productId, updateProductDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') productId: number) {
    return this.productsService.deleteProduct(productId);
  }
}
