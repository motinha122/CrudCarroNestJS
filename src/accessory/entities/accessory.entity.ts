import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Accessory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  manufacture: string;
}
