import { ApiProperty } from '@nestjs/swagger';

export class StandardResponseDto {
    @ApiProperty({ example: 200 })
    code: number;

    @ApiProperty({ example: "success" })
    message: string;
}

export class StandardResponsePostDto<T> {
    @ApiProperty({ example: 201 })
    code: number;

    @ApiProperty({ example: "success" })
    message: string;

    @ApiProperty()
    data: T;
}
