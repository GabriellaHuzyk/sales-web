import { UserEntitie } from 'src/domain/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('products')
export class ProductEntitie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  product_name: string;

  @Column('text')
  product_sku: string;

  @Column('text')
  product_description: string | null;

  @Column('text')
  product_image: string | null;

  @Column('text')
  product_quantity: string;

  @Column('text')
  product_price: number;

  @Column('text')
  product_category: string;

  @ManyToOne(() => UserEntitie, (user) => user.products)
  user: UserEntitie;
}
