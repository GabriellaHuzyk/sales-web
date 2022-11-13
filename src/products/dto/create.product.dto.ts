import { IsArray, IsInt, IsString } from 'class-validator';

export class CreateProductDto {
  product_name: string;

  @IsString()
  readonly product_sku: string;

  @IsString()
  readonly product_description: string;

  @IsString()
  readonly product_images: {
    type: string[];
    nullabe: true;
  };

  @IsString()
  readonly product_quantity: string;

  @IsString()
  readonly product_price: string;
}
