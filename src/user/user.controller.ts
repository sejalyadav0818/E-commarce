import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Render,
  Res,
  Request,
  Req,
} from "@nestjs/common";
import { Response } from "express";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Public } from "../common/decorators";
import { CategoriesService } from "src/categories/categories.service";
import { Roles } from "src/auth/entities/roles.decorator";
import { Role } from "src/auth/entities/role.enum";
import { Permissions } from "src/auth/entities/permissions.decorator";
import { Permission } from "src/auth/entities/permissions.enum";

@Public()
@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly categoriesService: CategoriesService
  ) {}

  @Public()
  @Get("/users")
  // @Roles(Role.USER, Role.ADMIN)
  @Render("user-panel")
  async userPanel() {
    const users = await this.userService.getAllUser();
    return { users };
  }

  @Public()
  @Post("/insert")
  @Render("add_user_page")
  // @Roles(Role.ADMIN)
  async insertUser(@Body() dto: CreateUserDto, @Res() res: Response) {
    await this.userService.createUser(dto);
    return res.redirect("/user/users"); // Redirect to the user panel after adding a user
  }

  @Public()
  @Delete("delete/:id")
  async deleteUserById(@Param("id") id: number) {
    await this.userService.deleteUserById(+id);
    return { message: "User deleted successfully" };
  }

  @Public()
  @Post("/edit/:id")
  async editUser(
    @Param("id") id: number,
    @Body() dto: CreateUserDto,
    @Request() req
  ) {
    const updatedUser = await this.userService.editUserById(
      Number(id),
      dto,
      req
    );
    return { user: updatedUser };
  }
  @Get("user_home")
  // @Roles(Role.ADMIN)
  // @Permissions(Permission.READ)
  @Render("users_panel")
  getUserPanel(@Req() req, @Res() res) {
    return this.categoriesService.findAllCategory(req, res);
  }
}
