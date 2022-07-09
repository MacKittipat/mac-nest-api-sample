import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import exp from 'constants';

describe('ProductService', () => {
  let service: ProductService;

  const productMock = { id: 1, name: 'Product1', price: 100 };
  const allProductsMock: Product[] = [
    { id: 1, name: 'Product1', price: 100 },
    { id: 2, name: 'Product2', price: 200 },
  ];

  const mockProductRepo = {
    find: jest.fn(() => Promise.resolve(allProductsMock)),
    create: jest.fn(() => productMock),
    save: jest.fn(() => Promise.resolve(productMock)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepo,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      expect(service).toBeDefined();
      const products = await service.findAll();
      expect(products).toEqual(allProductsMock);
      expect(jest.spyOn(mockProductRepo, 'find')).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new products', async () => {
      expect(service).toBeDefined();
      const product = await service.create(
        { id: 1, name: 'Product1', price: 100 });
      expect(product).toEqual(productMock);
      expect(jest.spyOn(mockProductRepo, 'create')).toBeCalledTimes(1);
      expect(jest.spyOn(mockProductRepo, 'save')).toBeCalledTimes(1);
    });
  });

});
