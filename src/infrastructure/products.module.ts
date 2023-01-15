import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntitie } from '../domain/entities/products.entity';
import { ProductsController } from '../interfaces/controllers/products.controller';
import { ProductsService } from '../app/products/products.service';
import { UserEntitie } from 'src/domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntitie, UserEntitie])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
