import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { resolve } from 'path/posix';
import { Roles } from 'src/auth/entities/roles.decorator';
import { Role } from 'src/auth/entities/role.enum';
import { Permissions } from 'src/auth/entities/permissions.decorator';
import { Permission } from 'src/auth/entities/permissions.enum';
import { Public } from 'src/common/decorators';

@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Public()
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Public()
  @Roles(Role.ADMIN)
  // @Permissions(Permissions.))
  @Render("role-permission")
  findAll(@Req() req, @Res() res) {
    return this.rolesService.findAll();
  }

  @Public()
  @Get("/role")
  @Render("role_permission")
  @Render("roless")
  findAllR() {
    return this.rolesService.findAll();
  }

  @Public()
  @Get("/permissions")
  getPermission(@Req() req, @Res() res) {
    return this.rolesService.getAllPermissions(req, res);
  }

  @Public()
  @Post("/permissions")
  createPermission(@Body("name") permission_name: string) {
    return this.rolesService.createPermissions(permission_name);
  }
  @Public()
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.rolesService.findOne(+id);
  }

  @Public()
  @Put("/:id")
  async updateP(
    @Param("id") roleId: number,
    @Body("permissionIds") permissionIds: string[]
  ) {
    const asn =await  this.rolesService.updatePermissionn(+roleId, permissionIds);
  }
}

