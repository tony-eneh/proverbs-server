import { SetMetadata } from '@nestjs/common';

export const PublicRoute = () => SetMetadata('IS_PUBLIC_ROUTE', true);
