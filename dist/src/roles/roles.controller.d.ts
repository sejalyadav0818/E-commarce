import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<import(".prisma/client").Role & {
        permissions: import(".prisma/client").Permission[];
    }>;
    findAll(req: any, res: any): Promise<{
        roles: (import(".prisma/client").Role & {
            permissions: import(".prisma/client").Permission[];
        })[];
        permissions: import(".prisma/client").Permission[];
    }>;
    findAllR(): Promise<{
        roles: (import(".prisma/client").Role & {
            permissions: import(".prisma/client").Permission[];
        })[];
        permissions: import(".prisma/client").Permission[];
    }>;
    getPermission(req: any, res: any): Promise<void>;
    createPermission(permission_name: string): Promise<import(".prisma/client").Permission>;
    findOne(id: string): Promise<import(".prisma/client").Role & {
        permissions: import(".prisma/client").Permission[];
    }>;
    updateP(roleId: number, permissionIds: string[]): Promise<void>;
}
