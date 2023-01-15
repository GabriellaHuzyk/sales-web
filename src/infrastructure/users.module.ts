import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntitie } from 'src/domain/entities/products.entity';
import { UserEntitie } from '../domain/entities/user.entity';
import { UsersController } from '../interfaces/controllers/users.controller';
import { UsersService } from '../app/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntitie, ProductEntitie])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
