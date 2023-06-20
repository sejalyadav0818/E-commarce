import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "../product/product.service";
import { CategoriesService } from "../categories/categories.service";
export declare class ProductController {
    private readonly productService;
    private readonly categoriesService;
    constructor(productService: ProductService, categoriesService: CategoriesService);
    userProductPage(req: any, res: any): Promise<{
        products: (import(".prisma/client").Product & {
            catrgory: import(".prisma/client").Category[];
        })[];
    }>;
    showProductInCart(id: number, req: any, res: any): Promise<{
        product: import(".prisma/client").Product & {
            catrgory: import(".prisma/client").Category[];
        };
    }>;
    productDetailPage(req: any, res: any): void;
    Data(): {
        msg: string;
    };
    productData(): Promise<(import(".prisma/client").Product & {
        catrgory: import(".prisma/client").Category[];
    })[]>;
    productByCategory(category_name: string, res: any, req: any): Promise<{
        products: void;
    }>;
    findProduct(id: number): Promise<import(".prisma/client").Product & {
        catrgory: import(".prisma/client").Category[];
    }>;
    findClickedProduct(id: number, req: any, res: any): Promise<{
        product: import(".prisma/client").Product & {
            catrgory: import(".prisma/client").Category[];
        };
    }>;
    insertUser(dto: CreateProductDto, res: any, req: any, file: any): Promise<any>;
    catgoryDropdwon(res: any, req: any): Promise<void>;
    adminPanel(): Promise<{
        products: (import(".prisma/client").Product & {
            catrgory: import(".prisma/client").Category[];
        })[];
        categories: import(".prisma/client").Category[];
    }>;
    deleteproduct_category(id: number): Promise<{
        message: string;
    }>;
    editUser(id: number, product_name: string, product_description: string, product_price: string, categoryId: number, req: any): Promise<{
        updatedUser: void;
    }>;
    Search(req: any, res: any): Promise<void>;
}
