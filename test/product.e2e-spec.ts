import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ProductService } from '../src/services/product.service';
import { Product } from '../src/entities/product.entity';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

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
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [ProductService],
    }).overrideProvider(ProductService)
      .useValue(mockProductService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /products', () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect(allProductsMock);
  });

  it('POST /products', () => {
    return request(app.getHttpServer())
      .post('/products')
      .send(productMock)
      .expect(201)
      .expect(productMock);
  });
});
