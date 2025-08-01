import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { IPasswordHasher } from "../interfaces/password-hasher.interface";


@Injectable()
export class BcryptPasswordHasher implements IPasswordHasher {
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    }
}