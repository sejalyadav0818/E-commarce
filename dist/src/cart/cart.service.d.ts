import { PrismaService } from "../prisma/prisma.service";
import { CreateCartDto } from "./dto/create-cart.dto";
import { Request, Response } from "express";
export declare class CartService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createCartDto: CreateCartDto, req: Request, res: Response): import(".prisma/client").Prisma.Prisma__CartClient<import(".prisma/client").Cart, never>;
    addItemtoCart(productId: number, quantity: number, total: number, req: Request, res: Response): Promise<void>;
    getAllCart(req: Request, res: Response): Promise<{
        carts: (import(".prisma/client").Cart & {
            product: import(".prisma/client").Product;
            user: import(".prisma/client").User;
        })[];
    }>;
    clearCart(req: Request, res: Response): Promise<void>;
    remove(id: number, req: Request, res: Response): Promise<void>;
    getProductByCart(req: Request, res: Response): Promise<void>;
}
