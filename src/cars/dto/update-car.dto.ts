import { IsOptional, IsPositive, Length } from 'class-validator';

export class UpdateCarDto {
  @Length(8, 8, {
    message: 'Plate must be 8 characters',
  })
  @IsOptional()
  plate?: string;

  @IsOptional()
  model?: string;

  @IsOptional()
  color?: string;

  @IsPositive()
  @IsOptional()
  price?: number;

  @IsOptional()
  description?: string;

  @IsOptional()
  manufacture?: string;

  @IsOptional()
  status?: string;
}
