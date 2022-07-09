import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../models/product.model';
import { Product } from '../entities/product.entity';

@Controller('products')
export class ProductController {

  constructor(private productService: ProductService) {
  }

  @Get()
  async findAll() : Promise<Product[]> {
    return this.productService.findAll();
  }

  @Post()
  async create(@Body() productModel: ProductModel) : Promise<Product> {
    if(productModel == null || Object.keys(productModel).length === 0) {
      throw new BadRequestException();
    }
    return this.productService.create(productModel);
  }
}
