import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly product_name: string;

  @IsString()
  readonly product_sku: string;

  @IsString()
  readonly product_description: string | null;

  @IsString()
  readonly product_image: string | null;

  @IsString()
  readonly product_quantity: string;

  @IsNumber()
  readonly product_price: number;

  @IsString()
  readonly product_category: string;
}
