import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';

@Injectable()
export class CarsRepository {
  constructor(){}

  async getAllCars() {
    const entityManager = getManager();
    const result = await entityManager.query(
      'DELETE FROM "users" WHERE id = $1',
      [1],
    );
    console.log(result);
  }
}
