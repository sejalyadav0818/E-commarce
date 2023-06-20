import { PrismaService } from "src/prisma/prisma.service";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
export declare class CategoriesController {
    private readonly categoriesService;
    private readonly prismaService;
    constructor(categoriesService: CategoriesService, prismaService: PrismaService);
    getAllCategories(): Promise<{
        categories: import(".prisma/client").Category[];
    }>;
    createCategory(dto: CreateCategoryDto, res: any): Promise<any>;
    editUser(id: number, dto: CreateCategoryDto, req: any, res: any): Promise<void>;
    deleteCategory(id: number, res: any): Promise<any>;
}
