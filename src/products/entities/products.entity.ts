import { UserEntitie } from 'src/users/entities/user.entity';
import { Tracing } from 'trace_events';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('catalogs')
export class ProductEntitie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  product_name: string;

  @Column('text')
  product_sku: string;

  @Column('text')
  product_description: {
    type: string;
    nullable: true;
  };

  @Column('text')
  product_image: {
    type: string;
    nullabe: true;
  };

  @Column('text')
  product_quantity: string;

  @Column('text')
  product_price: string;

  @Column('text')
  product_category: string;

  @ManyToOne(() => UserEntitie, (user) => user.products)
  user: UserEntitie;
}
