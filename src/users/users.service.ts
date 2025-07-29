import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseService } from 'src/common/services/base.service';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from './dto/response/response-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class UsersService {

  constructor(
    private readonly baseService: BaseService
  ) {
    this.baseService.setEntity = "User"
  }

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await this.baseService.encrypPassword(createUserDto.password)
      const user = await this.baseService.prisma.user.create({
        data: createUserDto
      })
      return plainToInstance(ResponseUserDto, user)
    } catch (error) {
      this.baseService.errorDb.errorHandle(error)
    }
  }

  async findAll(pagination: PaginationDto) {
    return this.baseService.paginationResponse(
      this.baseService.prisma.user,
      pagination,
      ResponseUserDto
    )
  }

  async findOne(id: string) {
    const user = await this.baseService.prisma.user.findUnique({
      where: { id, deletedAt: null }
    })

    if (!user) this.baseService.msgNotFound("id", id)

    return plainToInstance(ResponseUserDto, user)
  }

  async findOneByEmail(email: string) {
    const user = await this.baseService.prisma.user.findUnique({
      where: { email }
    })

    if (!user) this.baseService.msgNotFound("email", email)

    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const { password, ...data } = updateUserDto

    await this.findOne(id)

    try {
      await this.baseService.prisma.user.update({
        where: { id },
        data
      })
      return this.baseService.msgUpdate
    } catch (error) {
      this.baseService.errorDb.errorHandle(error)
    }
  }

  async remove(id: string) {

    await this.findOne(id)

    try {
      await this.baseService.prisma.user.update({
        where: { id },
        data: { deletedAt: new Date() }
      })
      return this.baseService.msgDelete
    } catch (error) {
      this.baseService.errorDb.errorHandle(error)
    }
  }
}
