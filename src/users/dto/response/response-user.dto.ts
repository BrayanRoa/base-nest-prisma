import { ApiProperty } from "@nestjs/swagger"
import { Exclude } from "class-transformer"

export class ResponseUserDto {

    @ApiProperty()
    id: string

    @ApiProperty()
    name: string

    @ApiProperty()
    lastname: string

    @ApiProperty()
    email: string

    @ApiProperty()
    username: string

    @Exclude()
    password: string

    @Exclude()
    createdAt: string

    @Exclude()
    updatedAt: string

    @Exclude()
    deletedAt: string

}