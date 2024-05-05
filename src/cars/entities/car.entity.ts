import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plate: string;

  @Column()
  model: string;

  @Column()
  color: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  manufacture: string;

  @Column()
  status: string;
}
