import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from '../adapters/dto/create.user.dto';
import { LoginUserDto } from '../adapters/dto/login.user.dto';
import { UpdateUserDto } from '../adapters/dto/update.user.dto';
import { UsersService } from '../../app/users/users.service';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto, @Res() res) {
    await this.usersService.register(body);

    return res.status(200).json({ success: true, message: 'User created!' });
  }

  @Post('auth')
  auth(@Body() body: LoginUserDto) {
    return this.usersService.auth(body);
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
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.usersService.update(req.headers.user, dto);

    return res.status(200).json({ success: true, message: 'User updated!' });
  }

  @Delete('intern/:id')
  deleteAnyUser(@Param('id') id: string, @Res() res: Response) {
    this.usersService.removeAnyUser(Number(id));

    return res.status(200).json({ success: true, message: 'User removed!' });
  }

  @Delete()
  delete(@Headers('authorization') auth: string, @Res() res: Response) {
    this.usersService.remove(auth);

    return res.status(200).json({ success: true, message: 'User removed!' });
  }
}
