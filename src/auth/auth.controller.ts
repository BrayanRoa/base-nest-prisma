import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { AuthDocumentation } from './swagger/auth.documentation';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login")
  @ApiBody({ type: LoginDto })
  @ApiOkResponse(AuthDocumentation.common)
  create(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("register")
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse(AuthDocumentation.common)
  register(@Body() createUSerDto: CreateUserDto) {
    return this.authService.register(createUSerDto)
  }
}
