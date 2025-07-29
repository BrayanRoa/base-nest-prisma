import { getSchemaPath } from '@nestjs/swagger';
import { StandardResponseDto } from 'src/common/dto/standard-response.dto';
import { ResponseUserDto } from 'src/users/dto/response/response-user.dto';

export const AuthDocumentation = {
    common: {
        description: "Register user",
        schema: {
            allOf: [
                { $ref: getSchemaPath(StandardResponseDto) },
                {
                    type: "object",
                    properties: {
                        data: {
                            type: "object",
                            allOf: [
                                { $ref: getSchemaPath(ResponseUserDto) },
                                {
                                    type: "object",
                                    properties: {
                                        access_token: {
                                            type: "string",
                                            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
            ],
        },
    },
}