import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create.product.dto';
import { LoginUserDto } from './dto/token.user.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  create(@Body() login: LoginUserDto, createProduct: CreateProductDto) {
    return this.productsService.create(login, createProduct);
  }

  // @Patch(':product_id')
  // update(
  //   @Param('product_id') product_id: string,
  //   @Body() updateUserDto: UpdateUserDto,
  // ) {
  //   return this.productsService.update(id, UpdateUserDto);
  // }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return 'Success! User removed!';
  }
}
