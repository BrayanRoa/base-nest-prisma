import { ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseMetadataDto {
    @ApiPropertyOptional()
    totalRecords: number;

    @ApiPropertyOptional()
    totalPage: number;

    @ApiPropertyOptional()
    currentPage: number;

    @ApiPropertyOptional()
    nextPage?: number;

    @ApiPropertyOptional()
    prevPage?: number;
}
