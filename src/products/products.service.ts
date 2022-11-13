import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { authValidate } from 'src/utils/middleware/auth.validate';
import { Repository } from 'typeorm';
import { ProductEntitie } from './entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntitie)
    private readonly productReporitory: Repository<ProductEntitie>,
  ) {}

  async create(login, createProductDto) {
    const auth = await authValidate(login);
    const userFound = await this.productReporitory.find({
      where: { id: auth.id },
    });

    if (!auth || !userFound) throw new UnauthorizedException('Invalid user!');

    return this.productReporitory.create(createProductDto);
  }
}
