import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export class ResponseInterceptor<T> implements NestInterceptor<T, any> {

    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> | Promise<Observable<any>> {
        const response = context.switchToHttp().getResponse()
        return next.handle().pipe(
            map((data) => {
                if (data && typeof data === 'object' && 'data' in data && 'metadata' in data) {
                    // Ya tiene la forma paginada, no lo vuelvas a envolver
                    return {
                        code: 200,
                        message: 'success',
                        ...data,
                    };
                }
                return {
                    code: 200,
                    message: 'success',
                    data,
                };
            }),

        )
    }

}