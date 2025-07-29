// common/decorators/api-pagination.decorator.ts
import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function ApiPagination() {
    return applyDecorators(
        ApiQuery({ name: 'page', required: false, type: Number, default: 1 }),
        ApiQuery({ name: 'per_page', required: false, type: Number, default: 10 }),
    );
}
