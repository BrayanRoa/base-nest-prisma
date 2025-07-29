import { ResponseUserDto } from './../../users/dto/response/response-user.dto';
import { Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { ClassConstructor, instanceToPlain, plainToInstance } from "class-transformer";
import { HandlerDbExceptionService } from "./handledb-exception.service";
import { PrismaService } from "src/prisma/prisma.service";
import { PaginationDto } from "../dto/pagination.dto";


@Injectable()
export class BaseService {

    private readonly SALT_ROUNDS: number = 10
    protected entity: string

    constructor(
        readonly prisma: PrismaService,
        protected readonly errorHandler: HandlerDbExceptionService,
    ) { }

    set setEntity(entity: string) {
        this.entity = entity
    }

    get errorDb(): HandlerDbExceptionService {
        return this.errorHandler
    }

    get msgUpdate() {
        return `${this.entity} updated successfully`
    }

    get msgCreate() {
        return `${this.entity} created successfully`
    }

    get msgDelete() {
        return `${this.entity} deleted successfully `
    }

    msgNotFound(field: string = 'id', value?: string | number): never {
        const message = value
            ? `${this.entity} with ${field} "${value}" not found`
            : `${this.entity} not found`;

        throw new NotFoundException(message);
    }

    // methods to bcrypt
    async encrypPassword(password: string) {
        return await bcrypt.hash(password, this.SALT_ROUNDS);
    }

    async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    }

    // Paginated response of any model
    async paginationResponse<T>(model: any, pagination: PaginationDto, dto: ClassConstructor<T>, options?: {}) {
        const { page, per_page } = pagination

        const baseWhere = {
            deletedAt: null,
            ...options
        }

        let [totalRecords, users] = await Promise.all([
            model.count({ where: baseWhere }),
            model.findMany({
                where: baseWhere,
                skip: (page - 1) * per_page,
                take: per_page
            })
        ])

        const metadata = this.pagination(page, per_page, totalRecords)

        return {
            data: plainToInstance(dto, users),
            metadata
        }
    }

    // configura la paginación de una consulta
    pagination(page: number, per_page: number, totalRecords: number) {
        const totalPage = Math.ceil(totalRecords / per_page);

        return {
            totalRecords,
            totalPage,
            currentPage: page,
            nextPage: page < totalPage ? page + 1 : null,
            prevPage: page > 1 ? page - 1 : null,
        };
    }
}