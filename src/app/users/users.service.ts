import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntitie } from '../../domain/entities/user.entity';
import { UpdateUserDto } from '../../interfaces/adapters/dto/update.user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../interfaces/adapters/dto/create.user.dto';
import { LoginUserDto } from '../../interfaces/adapters/dto/login.user.dto';
import { SECRET } from 'src/infrastructure/constants/constants';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntitie)
    private readonly userReporitory: Repository<UserEntitie>,
  ) {}

  async register(dto: CreateUserDto) {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(dto.password, salt);
    const newDto = { ...dto, password: password };

    const banco = await this.userReporitory.find({
      where: { email: dto.email },
    });

    if (banco.length > 0) {
      throw new BadRequestException('Error! User already exists!');
    }

    return await this.userReporitory.save(newDto);
  }

  async auth(dto: LoginUserDto) {
    const userFound = await this.userReporitory.find({
      where: { email: dto.email },
    });

    if (!userFound || !bcrypt.compareSync(dto.password, userFound[0].password))
      throw new UnauthorizedException('Incorrect user email or password');

    return sign({ email: userFound[0].email, id: userFound[0].id }, SECRET, {
      expiresIn: '1d',
    });
  }

  async findOne(id: number) {
    const user = await this.userReporitory.findOne({
      relations: { products: true },
      where: { id },
    });

    if (!user) throw new NotFoundException(`User not found`);

    return user;
  }

  findAll() {
    return this.userReporitory.find({ relations: { products: true } });
  }

  async update(decoded, dto: UpdateUserDto) {
    const { id } = decoded;

    const user = await this.userReporitory.preload({
      id: +id,
      ...dto,
    });

    if (!user) throw new NotFoundException(`User not found`);

    return this.userReporitory.save(user);
  }

  removeAnyUser(id: number) {
    const user = this.userReporitory.find({
      where: { id: id },
    });
    if (!user) throw new NotFoundException(`User not found`);

    return this.userReporitory.delete(id);
  }

  remove(decoded) {
    const { id } = decoded;

    const user = this.userReporitory.find({
      where: { id: id },
    });

    if (!user) throw new NotFoundException(`User not found`);

    return this.userReporitory.delete(id);
  }
}
