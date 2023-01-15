import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProductDto } from 'src/interfaces/adapters/dto/update.product.dto';
import { Repository } from 'typeorm';
import { ProductEntitie } from '../../domain/entities/products.entity';
import { UserEntitie } from '../../domain/entities/user.entity';
import { CreateProductDto } from '../../interfaces/adapters/dto/create.product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntitie)
    private readonly productReporitory: Repository<ProductEntitie>,
    @InjectRepository(UserEntitie)
    private readonly userRepository: Repository<UserEntitie>,
  ) {}

  async findAll(userId) {
    const userFound = await this.productReporitory.findOne({
      where: { user: userId },
    });

    if (!userFound) throw new UnauthorizedException('Invalid user!');

    return userFound;
  }

  async create(userId, dto: CreateProductDto) {
    const newProduct = { ...dto, user: userId };

    const userFound = await this.userRepository.find({
      where: { id: userId },
    });

    if (!userFound) throw new UnauthorizedException('Invalid user!');

    await this.productReporitory.save(newProduct);

    return await this.userRepository.findOne({
      where: { id: userId },
      relations: { products: true },
    });
  }

  async update(productId: string, dto: UpdateProductDto) {
    const productLoaded = await this.productReporitory.preload({
      id: +productId,
      ...dto,
    });

    if (!productLoaded) throw new NotFoundException(`Product not found`);

    return this.productReporitory.save(productLoaded);
  }

  async delete(userId, productId: string) {
    const userFound = await this.productReporitory.find({
      where: { id: Number(userId) },
    });

    if (!userFound) throw new UnauthorizedException('Invalid user!');

    return this.productReporitory.delete(productId);
  }
}
