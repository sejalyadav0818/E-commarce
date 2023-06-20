import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
export default class PermissionsGuard implements CanActivate {
    private reflector;
    private jwtService;
    private prismaService;
    constructor(reflector: Reflector, jwtService: JwtService, prismaService: PrismaService);
    canActivate(context: ExecutionContext): boolean;
}
