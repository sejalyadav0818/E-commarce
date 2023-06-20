import { PrismaService } from "src/prisma/prisma.service";
import { Category } from ".prisma/client";
import { CreateCategoryDto } from "./dto/create-category.dto";
export declare class CategoriesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAllCategories(): Promise<Category[]>;
    editcategoryById(id: number, dto: CreateCategoryDto, req: Request, res: Response): Promise<void>;
    createCategory(dto: CreateCategoryDto): Promise<Category>;
    editUserById(id: number, dto: CreateCategoryDto, req: Request): Promise<Category>;
    deleteCategory(id: number): Promise<void>;
    findAllCategory(req: Request, res: Response): Promise<{
        categories: Category[];
    }>;
}
