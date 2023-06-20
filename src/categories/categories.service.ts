import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Category } from ".prisma/client";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllCategories(): Promise<Category[]> {
    return this.prismaService.category.findMany();
  }
  async editcategoryById(
    id: number,
    dto: CreateCategoryDto,
    req: Request,
    res: Response
  ) {
    await this.prismaService.category.update({
      where: {
        id: id,
      },
      data: {
        category_name: dto.category_name,
      },
    });
  }
  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    return this.prismaService.category.create({
      data: {
        category_name: dto.category_name,
      },
    });
  }
  async editUserById(id: number, dto: CreateCategoryDto, req: Request) {
    await this.prismaService.category.update({
      where: {
        id: id,
      },
      data: {
        category_name: dto.category_name,
      },
    });

    const updatedcategory = await this.prismaService.category.findUnique({
      where: {
        id: id,
      },
    });

    return updatedcategory;
  }
  async deleteCategory(id: number): Promise<void> {
    await this.prismaService.category.delete({
      where: {
        id: +id,
      },
    });
  }
  async findAllCategory(req: Request, res: Response) {
    const categories = await this.prismaService.category.findMany({
      // include:{
      //   products: true
      // }
    });
    // console.log("categories",categories);
    return { categories };
  }
}
