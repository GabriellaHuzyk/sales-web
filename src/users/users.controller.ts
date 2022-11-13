import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { authValidate } from 'src/utils/middleware/auth.validate';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res) {
    await this.usersService.register(createUserDto);

    return res.status(200).json({ success: true, message: 'User created!' });
  }

  @Post('auth')
  auth(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.auth(loginUserDto);
  }

  @Get('intern')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('intern/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Patch('/update')
  async update(
    @Headers('authorization') auth: string,
    @Body() dto: UpdateUserDto,
    @Res() res,
  ) {
    await this.usersService.update(dto, auth);

    return res.status(200).json({ success: true, message: 'User updated!' });
  }

  @Delete('intern/:id')
  deleteAnyUser(@Param('id') id: string, @Res() res) {
    this.usersService.removeAnyUser(Number(id));

    return res.status(200).json({ success: true, message: 'User removed!' });
  }

  @Delete()
  delete(@Headers('authorization') auth: string, @Res() res) {
    this.usersService.remove(auth);

    return res.status(200).json({ success: true, message: 'User removed!' });
  }
}
