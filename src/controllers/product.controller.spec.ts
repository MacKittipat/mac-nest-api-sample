import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from '../services/product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { BadRequestException } from '@nestjs/common';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;

  const productMock = { id: 1, name: 'Product1', price: 100 };
  const allProductsMock: Product[] = [
    { id: 1, name: 'Product1', price: 100 },
    { id: 2, name: 'Product2', price: 200 },
  ];
  const mockProductService = {
    findAll: jest.fn(() => Promise.resolve(allProductsMock)),
    create: jest.fn(() => productMock),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).overrideProvider(ProductService)
      .useValue(mockProductService)
      .compile();

    controller = module.get<ProductController>(ProductController);
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      expect(controller).toBeDefined();
      const products = await controller.findAll();
      expect(products).toEqual(allProductsMock);
      expect(jest.spyOn(mockProductService, 'findAll')).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      expect(controller).toBeDefined();
      const product = await controller.create(
        { id: 1, name: 'Product1', price: 100 });
      expect(product).toEqual(productMock);
      expect(jest.spyOn(mockProductService, 'create')).toBeCalledTimes(1);
    });
  });

  describe('create without body', () => {
    it('should create return error', async () => {
      expect(controller).toBeDefined();
      expect(controller.create(null)).rejects.toThrowError(BadRequestException);
    });
  });

});
