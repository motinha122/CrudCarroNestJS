import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './cars/cars.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from './person/person.module';
import { AccessoryModule } from './accessory/accessory.module';

@Module({
  imports: [
    CarsModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [__dirname + '/../*/.entity.{js,ts}'],
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DATABASE_NAME,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      synchronize: true,
    }),
    PersonModule,
    AccessoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
