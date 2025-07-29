import { Module } from '@nestjs/common';
import { BaseService } from './services/base.service';
import { HandlerDbExceptionService } from './services/handledb-exception.service';
import { BcryptPasswordHasher } from './services/bcrypt.service';

@Module({
    providers: [BaseService, HandlerDbExceptionService, BcryptPasswordHasher],
    exports: [BaseService, HandlerDbExceptionService, BcryptPasswordHasher]
})
export class CommonModule { }
