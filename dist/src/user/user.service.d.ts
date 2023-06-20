import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Request } from "express";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUser(): Promise<(import(".prisma/client").User & {
        role: import(".prisma/client").Role;
    })[]>;
    hashPassword(password: string): Promise<string>;
    createUser(dto: CreateUserDto): Promise<void>;
    deleteUserById(id: number): Promise<void>;
    editUserById(id: number, dto: CreateUserDto, req: Request): Promise<import(".prisma/client").User>;
}
