import { getSchemaPath } from "@nestjs/swagger";
import { StandardResponseDto } from "src/common/dto/standard-response.dto";
import { ResponsePaginatedUserDto } from "../dto/response/paginated-user-response.dto";
import { ResponseUserDto } from "../dto/response/response-user.dto";

export const UserDocumentation = {
    getAll: {
        description: "List of users paginated",
        schema: {
            allOf: [
                { $ref: getSchemaPath(StandardResponseDto) },
                {
                    type: "object",
                    properties: {
                        data: { $ref: getSchemaPath(ResponsePaginatedUserDto) }
                    }
                }
            ]
        }
    },
    getOne: {
        description: "Get user by id",
        schema: {
            allOf: [
                { $ref: getSchemaPath(StandardResponseDto) },
                {
                    properties: {
                        data: { $ref: getSchemaPath(ResponseUserDto) }
                    }
                }
            ]
        }
    },
    update: {
        description: "Update user by id",
        schema: {
            allOf: [
                { $ref: getSchemaPath(StandardResponseDto) },
                {
                    type: "object",
                    properties: {
                        data: {
                            type: "string",
                            example: "User updated successfully",
                        },
                    },
                },
            ]
        }
    },
    delete:{
        description: "Delete user by id",
        schema: {
            allOf: [
                { $ref: getSchemaPath(StandardResponseDto) },
                {
                    type: "object",
                    properties: {
                        data: {
                            type: "string",
                            example: "User deletedu successfully",
                        },
                    },
                },
            ]
        }
    }
}