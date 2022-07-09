import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../models/product.model';
import { Product } from '../entities/product.entity';

@Controller('products')
export class ProductController {

  constructor(private productService: ProductService) {
  }

  @Get()
  findAll() : Promise<Product[]> {
    return this.productService.findAll();
  }

  @Post()
  create(@Body() productModel: ProductModel) : Promise<Product> {
    return this.productService.create(productModel);
  }
}
