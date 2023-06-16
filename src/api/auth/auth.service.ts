import { Inject, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  signup(signupDto: SignupDto) {
    return this.userService.create(signupDto);
  }

  login(login: LoginDto) {
    return `successfully logged in`;
  }

  logout(id: number) {
    return `Successfully logged out ${id}`;
  }
}
