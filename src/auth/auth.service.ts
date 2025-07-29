import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { BaseService } from 'src/common/services/base.service';
import { IJwtPayload } from './interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from 'src/users/dto/response/response-user.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly baseService: BaseService,
    private jwtService: JwtService
  ) { }


  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto)
    return {
      ...user,
      access_token: this.getJwt({ userId: user?.id! })
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto
    const exist = await this.userService.findOneByEmail(email)

    const isPasswordValid = await this.baseService.verifyPassword(password, exist.password)
    if (!isPasswordValid) throw new UnauthorizedException('Email or password invalid')

    return {
      ...plainToInstance(ResponseUserDto, exist),
      access_token: this.getJwt({ userId: exist.id })
    };
  }

  private getJwt(payload: IJwtPayload) {
    const token = this.jwtService.sign(payload)
    return token
  }
}
