import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductModel } from '../models/product.model';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product)
              private productRepository: Repository<Product>) {
  }

  findAll() : Promise<Product[]> {
    return this.productRepository.find();
  }

  create(productModel: ProductModel) : Promise<Product> {
    const product = this.productRepository.create(productModel)
    return this.productRepository.save(product);
  }

}
