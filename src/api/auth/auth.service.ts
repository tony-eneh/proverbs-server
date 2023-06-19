import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { extractJwtFromRequest } from 'src/helpers';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  signup(signupDto: SignupDto) {
    return this.userService.create(signupDto);
  }

  async login(loginDto: LoginDto) {
    let user;
    try {
      // check if user with email exists in db
      user = (
        await this.userService.findAll(
          { email: loginDto.email },
          { withUnselected: true, exactEmailMatch: true }, // withUnselected = true fetches columns hidden in user entity (like passwordHash)
        )
      )[0];
    } catch (err) {
      throw new UnprocessableEntityException(
        'We could not process your credentials',
      );
    }
    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    let pwMatches;
    // confirm password matches
    try {
      pwMatches = await argon.verify(user.passwordHash, loginDto.password);
    } catch (err) {
      throw new UnprocessableEntityException(
        'We could not process your credentials',
      );
    }
    if (!pwMatches) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    // put up payload and sign to generate access and refresh tokens
    const payload = {
      sub: user.id,
      email: user.email,
    };
    const access_token = await this.jwtService.signAsync(payload); // uses the default secret set during JwtModule registration
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
    });
    delete user.passwordHash;

    // return user (minus hash), access token and refresh token
    return {
      access_token,
      refresh_token,
      user,
    };
  }

  logout(id: number) {
    return `Successfully logged out ${id}`;
  }

  async refreshAccessToken(req: Request) {
    let user;
    let payload;

    const refreshToken = extractJwtFromRequest(req);
    // verify validity of refresh token using jwtService
    try {
      user = await this.jwtService.verify(refreshToken, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      });
      req['user'] = user;
    } catch (err) {
      throw new UnauthorizedException();
    }

    // TODO Verify user has not logged out. Check redis store if logout date of user is less than refresh token iat

    // sign user with access secret and return access-token, refresh_token and user
    payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: refreshToken,
      user,
    };
  }
}
