import { ProductEntitie } from 'src/domain/entities/products.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class UserEntitie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  first_name: string;

  @Column('text')
  last_name: string;

  @Column('text')
  store_name: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  phone_number: string;

  @Column()
  store_visible: boolean;

  @OneToMany(() => ProductEntitie, (products) => products.user)
  products: ProductEntitie[];
}
