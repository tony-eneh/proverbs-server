import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
const configService = new ConfigService();

console.log({ processEnvNodeEnv: process.env.NODE_ENV });

// TODO use secrets (if possible) instead of env
export const getTypeormConfig = (configService: ConfigService) =>
  ({
    type: 'postgres',
    database: configService.get('DATABASE_NAME'),
    username: configService.get('DATABASE_USERNAME'),
    password: configService.get('DATABASE_PASSWORD'),
    port: +configService.get('DATABASE_PORT'),
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.ts'],
  } as TypeOrmModuleOptions);

export default new DataSource(
  getTypeormConfig(configService) as DataSourceOptions,
);
