import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Repository } from 'typeorm';

// get all column names for db table, given the repository
export function getCols<T>(repository: Repository<T>): (keyof T)[] {
  return repository.metadata.columns.map(
    (col) => col.propertyName,
  ) as (keyof T)[];
}

export function extractJwtFromRequest(request: Request) {
  const [type, jwt] = request.headers.authorization?.split(' ') ?? [];
  if (type !== 'Bearer' || !jwt) throw new UnauthorizedException();

  return jwt;
}

export function isProductionEnv(configService: ConfigService) {
  return configService.get('NODE_ENV') === 'production';
}

export function isDevelopmentEnv(configService: ConfigService) {
  return configService.get('NODE_ENV') === 'development';
}
