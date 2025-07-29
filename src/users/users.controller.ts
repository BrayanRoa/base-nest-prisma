import { StandardResponseDto } from './../common/dto/standard-response.dto';
import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Query, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiOkResponse } from '@nestjs/swagger';
import { ApiPagination } from 'src/common/decorators/api-pagination.decarator';
import { UserDocumentation } from './swagger/user.documentation';
import { ResponseUserDto } from './dto/response/response-user.dto';
import { ResponsePaginatedUserDto } from './dto/response/paginated-user-response.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // @Post()
  // @ApiBody({ type: CreateUserDto })
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @Get()
  @ApiPagination()
  @ApiExtraModels(StandardResponseDto, ResponsePaginatedUserDto, ResponseUserDto)
  @ApiOkResponse(UserDocumentation.getAll)
  findAll(@Query() pagination: PaginationDto) {
    return this.usersService.findAll(pagination);
  }

  @Get(':id')
  @ApiExtraModels(StandardResponseDto, ResponseUserDto)
  @ApiOkResponse(UserDocumentation.getOne)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse(UserDocumentation.update)
  @ApiBody({ type: UpdateUserDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse(UserDocumentation.delete)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
