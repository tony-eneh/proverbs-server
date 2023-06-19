import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { extractJwtFromRequest } from 'src/helpers';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride('IS_PUBLIC_ROUTE', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    // it's a protected route, so verify jwt
    const request = context.switchToHttp().getRequest();
    const jwt = extractJwtFromRequest(request);

    try {
      const user = await this.jwtService.verify(jwt);
      request['user'] = user;
    } catch (err) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
