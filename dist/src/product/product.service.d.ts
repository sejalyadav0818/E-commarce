import { CreateProductDto } from "./dto/create-product.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Request, Response } from "express";
export declare class ProductService {
    private readonly prismaSerivce;
    constructor(prismaSerivce: PrismaService);
    getAllprodcut(): Promise<(import(".prisma/client").Product & {
        catrgory: import(".prisma/client").Category[];
    })[]>;
    getAllCategories(): Promise<import(".prisma/client").Category[]>;
    getAllprodcutandCategorty(): Promise<(import(".prisma/client").Product & {
        catrgory: import(".prisma/client").Category[];
    })[]>;
    createUser(dto: CreateProductDto, req: Request, category_id: number, file: any): Promise<import(".prisma/client").Product & {
        catrgory: import(".prisma/client").Category[];
    }>;
    updatedata(categoryId: number, product_name: string, product_description: string, product_price: string, product_image: string, id: number, req: Request, res: Response): Promise<import(".prisma/client").Product & {
        catrgory: import(".prisma/client").Category[];
    }>;
    editUserById(id: number, product_name: string, product_description: string, product_price: string, categoryId: number, req: Request): Promise<void>;
    deleteproductById(id: number): Promise<void>;
    usersAllProducts(req: Request, res: Response): Promise<{
        products: (import(".prisma/client").Product & {
            catrgory: import(".prisma/client").Category[];
        })[];
    }>;
    findProductById(id: number, req: Request, res: Response): Promise<{
        product: import(".prisma/client").Product & {
            catrgory: import(".prisma/client").Category[];
        };
    }>;
    findAllProducts(): Promise<(import(".prisma/client").Product & {
        catrgory: import(".prisma/client").Category[];
    })[]>;
    productByCategory(category_name: string, res: Response, req: Request): Promise<void>;
    findProduct(id: number): Promise<import(".prisma/client").Product & {
        catrgory: import(".prisma/client").Category[];
    }>;
    search(req: any, res: any): Promise<(import(".prisma/client").Product & {
        catrgory: import(".prisma/client").Category[];
    })[]>;
}
