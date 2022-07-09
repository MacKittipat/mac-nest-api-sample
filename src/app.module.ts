import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';

@Module({
  imports: [],
  controllers: [AppController, ProductController],
  providers: [AppService, ProductService],
})
export class AppModule {}
