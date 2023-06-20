import { CreateRoleDto } from "./dto/create-role.dto";
import { Request, Response } from "express";
import { PrismaService } from "src/prisma/prisma.service";
export declare class RolesService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createRoleDto: CreateRoleDto): Promise<import(".prisma/client").Role & {
        permissions: import(".prisma/client").Permission[];
    }>;
    findAll(): Promise<{
        roles: (import(".prisma/client").Role & {
            permissions: import(".prisma/client").Permission[];
        })[];
        permissions: import(".prisma/client").Permission[];
    }>;
    getAllPermissions(req: Request, res: Response): Promise<void>;
    createPermissions(permission_name: string): Promise<import(".prisma/client").Permission>;
    updatePermission(roleId: number, permissionId: string): Promise<import(".prisma/client").Role & {
        permissions: import(".prisma/client").Permission[];
    }>;
    updatePermissionn(roleId: number, permissionIds: string[]): Promise<import(".prisma/client").Role & {
        permissions: import(".prisma/client").Permission[];
    }>;
    findOne(id: number): Promise<import(".prisma/client").Role & {
        permissions: import(".prisma/client").Permission[];
    }>;
}
