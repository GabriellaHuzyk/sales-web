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
import { CreateProductDto } from '../adapters/dto/create.product.dto';
import { ProductsService } from '../../app/products/products.service';
import { UpdateProductDto } from '../../interfaces/adapters/dto/update.product.dto';
import { Request, Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(
    @Headers('authorization') auth: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const data = await this.productsService.findAll(req.headers.user);

    return res.status(200).json({ success: true, data: data });
  }

  @Post('create')
  async create(
    @Headers('authorization') auth: string,
    req: Request,
    @Body() body: CreateProductDto,
    @Res() res: Response,
  ) {
    const data = await this.productsService.create(req.headers.user, body);

    return res
      .status(200)
      .json({ success: true, message: 'Product created!', data: data });
  }

  @Patch(':product_id')
  async update(
    @Headers('authorization') auth: string,
    @Param('product_id') productId: string,
    @Body() body: UpdateProductDto,
    @Res() res: Response,
  ) {
    const data = await this.productsService.update(productId, body);

    return res
      .status(200)
      .json({ success: true, message: 'Product updated!', data: data });
  }

  @Delete(':product_id')
  async delete(
    @Headers('authorization') auth: string,
    @Param('product_id') productId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.productsService.delete(req.headers.user, productId);

    return res.status(200).json({ success: true, message: 'Product removed!' });
  }
}
