import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
const configService = new ConfigService();

// TODO use secrets (if possible) instead of env
export const getTypeormConfig = (configService: ConfigService) =>
  ({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    database: configService.get('POSTGRES_DB'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    port: +configService.get('POSTGRES_PORT'),
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    synchronize: configService.get('NODE_ENV') === 'development',
  } as TypeOrmModuleOptions);

export default new DataSource(
  getTypeormConfig(configService) as DataSourceOptions,
);
