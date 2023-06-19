import { Repository } from 'typeorm';

// get all column names for db table, given the repository
export function getCols<T>(repository: Repository<T>): (keyof T)[] {
  return repository.metadata.columns.map(
    (col) => col.propertyName,
  ) as (keyof T)[];
}
