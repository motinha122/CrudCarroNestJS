import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async create(createCarDto: CreateCarDto): Promise<Car> {
    try {
      await this.carRepository.query(
        'INSERT INTO car (plate, model, color, price, description, manufacture, status) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [
          createCarDto.plate,
          createCarDto.model,
          createCarDto.color,
          createCarDto.price,
          createCarDto.description,
          createCarDto.manufacture,
          createCarDto.status,
        ],
      );
      const car: Car = await this.findByPlate(createCarDto.plate);
      return car;
    } catch (error) {
      throw new HttpException(
        'Algum campo está inválido',
        HttpStatus.BAD_REQUEST,
      );
    }
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
    await this.updatePlate(id, updateCarDto);
    await this.updateModel(id, updateCarDto);
    await this.updateColor(id, updateCarDto);
    await this.updatePrice(id, updateCarDto);
    await this.updateDescription(id, updateCarDto);
    await this.updateManufacture(id, updateCarDto);
    await this.updateStatus(id, updateCarDto);
    const car = await this.findOne(id);
    console.log('Atualizando o carro id:' + id);
    return car;
  }

  private async carExistsById(id: number): Promise<boolean> {
    const exists: boolean = await this.carRepository.query(
      'SELECT EXISTS (SELECT * FROM CAR WHERE id = $1)',
      [id],
    );
    return exists[0].exists;
  }

  private async findByPlate(plate: string): Promise<Car> {
    const car: Car = await this.carRepository.query(
      'SELECT * FROM CAR WHERE plate = $1',
      [plate],
    );
    console.log(car);
    return car;
  }

  private async updatePlate(
    id: number,
    updateCarDto: UpdateCarDto,
  ): Promise<void> {
    if (updateCarDto.plate) {
      await this.carRepository.query(
        'UPDATE car SET plate = $1 WHERE car.id = $2',
        [updateCarDto.plate, id],
      );
    }
    return;
  }

  private async updateModel(
    id: number,
    updateCarDto: UpdateCarDto,
  ): Promise<void> {
    if (updateCarDto.model) {
      await this.carRepository.query(
        'UPDATE car SET model = $1 WHERE car.id = $2',
        [updateCarDto.model, id],
      );
    }
    return;
  }

  private async updateColor(
    id: number,
    updateCarDto: UpdateCarDto,
  ): Promise<void> {
    if (updateCarDto.color) {
      await this.carRepository.query(
        'UPDATE car SET color = $1 WHERE car.id = $2',
        [updateCarDto.color, id],
      );
    }
    return;
  }

  private async updatePrice(
    id: number,
    updateCarDto: UpdateCarDto,
  ): Promise<void> {
    if (updateCarDto.price) {
      await this.carRepository.query(
        'UPDATE car SET price = $1 WHERE car.id = $2',
        [updateCarDto.price, id],
      );
    }
    return;
  }

  private async updateDescription(
    id: number,
    updateCarDto: UpdateCarDto,
  ): Promise<void> {
    if (updateCarDto.description) {
      await this.carRepository.query(
        'UPDATE car SET description = $1 WHERE car.id = $2',
        [updateCarDto.description, id],
      );
    }
    return;
  }

  private async updateManufacture(
    id: number,
    updateCarDto: UpdateCarDto,
  ): Promise<void> {
    if (updateCarDto.manufacture) {
      await this.carRepository.query(
        'UPDATE car SET manufacture = $1 WHERE car.id = $2',
        [updateCarDto.manufacture, id],
      );
    }
    return;
  }

  private async updateStatus(
    id: number,
    updateCarDto: UpdateCarDto,
  ): Promise<void> {
    if (updateCarDto.status) {
      await this.carRepository.query(
        'UPDATE car SET status = $1 WHERE car.id = $2',
        [updateCarDto.status, id],
      );
    }
    return;
  }

  async remove(id: number) {
    const carExists: boolean = await this.carExistsById(id);
    if (carExists == true) {
      await this.carRepository.query('DELETE FROM car WHERE id = $1', [id]);
      return 'Car id = ' + id + ' Deleted';
    }
    throw new HttpException('Carro não encontrado', HttpStatus.BAD_REQUEST);
  }
}
