import { Exclude } from "class-transformer"

export class ResponseUserDto {

    name: string

    lastname: string

    email: string

    username: string

    @Exclude()
    password: string
    
    @Exclude()
    createdAt:string
    
    @Exclude()
    updatedAt:string
    
    @Exclude()
    deletedAt:string

}