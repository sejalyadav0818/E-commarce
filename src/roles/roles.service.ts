import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Request, Response } from "express";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RolesService {
  constructor(private prismaService: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const { name } = createRoleDto;

    return await this.prismaService.role.create({
      data: {
        name,
      },
      include: {
        permissions: true,
      },
    });
  }

  async findAll() {
    const roles = await this.prismaService.role.findMany({
      include: {
        permissions: true,
      },
    });
    const permissions = await this.prismaService.permission.findMany({});
    console.log(permissions, roles);
    return { roles, permissions };
  }

  async getAllPermissions(req: Request, res: Response) {
    const permission = await this.prismaService.permission.findMany({});
    res.send(permission);
  }

  async createPermissions(permission_name: string) {
    return await this.prismaService.permission.create({
      data: {
        name: permission_name,
      },
    });
  }

  async updatePermission(roleId: number, permissionId: string) {
    console.log("update permission");

    await this.prismaService.role.update({
      where: { id: +roleId },
      data: {
        permissions: {
          set: [],
        },
      },
    });

    return await this.prismaService.role.update({
      where: { id: +roleId },
      data: {
        permissions: {
          connect: { id: permissionId },
        },
      },
      include: {
        permissions: true,
      },
    });
  }

  async updatePermissionn(roleId: number, permissionIds: string[]) {
    await this.prismaService.role.update({
      where: { id: +roleId },
      data: {
        permissions: {
          set: [],
        },
      },
    });

    return await this.prismaService.role.update({
      where: { id: +roleId },
      data: {
        permissions: {
          connect: permissionIds.map((id) => ({ id })),
        },
      },
      include: {
        permissions: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.role.findUnique({
      where: { id: id },
      include: {
        permissions: true,
      },
    });
  }
}
