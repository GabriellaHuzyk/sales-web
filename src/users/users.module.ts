import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntitie } from 'src/products/entities/products.entity';
import { UserEntitie } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntitie, ProductEntitie])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
