import { Prisma } from '@prisma/client';
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export class HandlerDbExceptionService {

    private readonly logger = new Logger(HandlerDbExceptionService.name);

    errorHandle(error: Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002':
                throw new BadRequestException(`The value for '${(error.meta?.target as string[]).join(', ')}' is already in use.`);
            case 'P2003':
                throw new BadRequestException('Foreign key constraint failed. Related record not found.');
            case 'P2025':
                throw new NotFoundException('No record found for the given condition.');
            case 'P2000':
                throw new BadRequestException(`The value is too long for field '${(error.meta?.target as string[]).join(', ')}'.`);
            case 'P2001':
                throw new NotFoundException('No record found matching the condition.');
            case 'P2004':
                throw new BadRequestException('A database constraint failed.');
            case 'P2010':
                throw new BadRequestException('Raw query failed. Please check SQL syntax.');
            case 'P2011':
                throw new BadRequestException(`Null constraint violation on field '${(error.meta?.target as string[]).join(', ')}'.`);
            default:
                this.logger.error(error);
                throw new InternalServerErrorException('Unexpected error. Please try again later.');
        }
    }

}
