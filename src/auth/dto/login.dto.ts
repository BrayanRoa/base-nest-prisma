import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class LoginDto {

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @ApiProperty()
    password: string
}