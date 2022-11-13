import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { authValidate } from 'src/utils/middleware/auth.validate';
import { Repository } from 'typeorm';
import { UserEntitie } from '../users/entities/user.entity';
import { UpdateUserDto } from './dto/update.user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { SECRET } from 'src/utils/constats';
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

    console.log(userFound);
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

  async update(dto: UpdateUserDto, token: string) {
    const validate = await authValidate(token);
    const { id } = validate;

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

  remove(token: string) {
    const validate = authValidate(token);
    const { id } = validate;

    const user = this.userReporitory.find({
      where: { id: id },
    });

    if (!user) throw new NotFoundException(`User not found`);

    return this.userReporitory.delete(id);
  }
}
