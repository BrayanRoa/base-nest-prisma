import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    // @ApiProperty()
    name: string

    @IsString()
    @IsNotEmpty()
    // @ApiProperty()
    lastname: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    // @ApiProperty()
    email: string

    @IsString()
    @IsNotEmpty()
    // @ApiProperty()
    password: string

    @IsString()
    @IsNotEmpty()
    username:string
}
