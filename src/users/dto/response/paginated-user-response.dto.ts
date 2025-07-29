import { ApiProperty } from "@nestjs/swagger";
import { ResponseUserDto } from "./response-user.dto";
import { ResponseMetadataDto } from "src/common/dto/metadata-response.dto";

export class ResponsePaginatedUserDto {

    @ApiProperty({type:[ResponseUserDto]})
    users: ResponseUserDto

    @ApiProperty()
    metadata: ResponseMetadataDto

}