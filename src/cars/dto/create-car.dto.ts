import { IsNotEmpty, IsPositive, Length } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  @Length(8, 8, {
    message: 'Plate must be 8 characters',
  })
  plate: string;

  @IsNotEmpty()
  model: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  manufacture: string;

  @IsNotEmpty()
  status: string;
}
