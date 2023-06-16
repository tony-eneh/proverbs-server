import { DEFAULT_PAGE_SIZE, DEFAULT_START_DATE } from 'src/constants';
import { FindUserDto } from './dto/find-user.dto';
import { Between } from 'typeorm';

export function prepareQueryParams({
  name,
  email,
  pageNumber,
  pageSize,
  dateCreatedStart,
  dateCreatedEnd,
  dateOfBirthStart,
  dateOfBirthEnd,
}: FindUserDto) {
  const today = new Date();
  dateCreatedStart = dateCreatedStart
    ? new Date(dateCreatedStart)
    : DEFAULT_START_DATE;
  dateCreatedEnd = dateCreatedEnd ? new Date(dateCreatedEnd) : today;
  dateOfBirthStart = dateOfBirthStart
    ? new Date(dateOfBirthStart)
    : DEFAULT_START_DATE;
  dateOfBirthEnd = dateOfBirthEnd ? new Date(dateOfBirthEnd) : today;

  return {
    name: name || '',
    email: email || '',
    pageNumber: pageNumber || 1,
    pageSize: pageSize || DEFAULT_PAGE_SIZE,
    dateFilters: {
      createdAt: Between(dateCreatedStart, dateCreatedEnd),
      dateOfBirth: Between(dateOfBirthStart, dateOfBirthEnd),
    },
  };
}
