import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  create(createCarDto: CreateCarDto) {
    return 'This action adds a new car';
  }

  async findAll(): Promise<Car[]> {
    const cars: Car[] = await this.carRepository.query('SELECT * FROM CAR');
    console.log(cars);
    return cars;
  }

  async findOne(id: number): Promise<Car> {
    const car: Car = await this.carRepository.query(
      'SELECT * FROM CAR WHERE id = $1',
      [id],
    );
    console.log(car);
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    await this.updatePrice(id, updateCarDto);
    const car = await this.findOne(id);
    console.log('Atualizando o carro id:' + id);
    return car;
  }

  async updatePrice(id: number, updateCarDto: UpdateCarDto): Promise<void> {
    if (updateCarDto.price) {
      await this.carRepository.query(
        'UPDATE car SET price = $1 WHERE car.id = $2',
        [updateCarDto.price, id],
      );
    }
    return;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
