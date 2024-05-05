import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { CarsRepository } from './repositories/cars.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';

@Module({
  controllers: [CarsController],
  providers: [CarsService, CarsRepository],
  imports: [TypeOrmModule.forFeature([Car])],
})
export class CarsModule {}
