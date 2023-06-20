import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Render,
  Res,
  Req,
  Response,
  Request,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { Public } from "src/common/decorators";
import { Role } from "src/auth/entities/role.enum";
import { Roles } from "src/auth/entities/roles.decorator";
import { Permission } from "src/auth/entities/permissions.enum";
import { Permissions } from "src/auth/entities/permissions.decorator";

@Public()
@Controller("Category")
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly prismaService: PrismaService
  ) {}

  @Public()
  // @Roles(Role.ADMIN)
  @Get("/Categories")
  @Render("Category_add")
  async getAllCategories() {
    const categories = await this.categoriesService.getAllCategories();
    return { categories };
  }

  @Public()
  @Post("/create-categories")
  async createCategory(@Body() dto: CreateCategoryDto, @Res() res) {
    const createdCategory = await this.categoriesService.createCategory(dto);
    const categories = await this.categoriesService.getAllCategories();
    return res.render("Category_add", { categories });
  }

  @Public()
  @Post("/edit/:id")
  async editUser(
    @Param("id") id: number,
    @Body() dto: CreateCategoryDto,
    @Request() req,
    @Response() res
  ) {
    return this.categoriesService.editcategoryById(Number(id), dto, res, req);
  }

  @Public()
  @Post("/delete/:id")
  async deleteCategory(@Param("id") id: number, @Res() res) {
    await this.categoriesService.deleteCategory(id);
    const categories = await this.categoriesService.getAllCategories();
    return res.render("Category_add", { categories });
  }
}
