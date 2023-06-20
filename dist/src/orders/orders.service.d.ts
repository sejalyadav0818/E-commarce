import { PrismaService } from "../prisma/prisma.service";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Request, Response } from "express";
export declare class OrdersService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(req: Request, res: Response): Promise<void>;
    findAll(req: Request, res: Response): Promise<{
        orders: (import(".prisma/client").Order & {
            user: import(".prisma/client").User;
        })[];
        name: string;
    }>;
    findOrderByUser(req: Request, res: Response): Promise<{
        orders: (import(".prisma/client").Order & {
            orderItems: import(".prisma/client").OrderItem[];
        })[];
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): string;
    remove(id: string): string;
}
