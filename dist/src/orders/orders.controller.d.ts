import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(req: any, res: any): Promise<void>;
    findAll(req: any, res: any): Promise<{
        orders: (import(".prisma/client").Order & {
            user: import(".prisma/client").User;
        })[];
        name: string;
    }>;
    findAllOrders(req: any, res: any): Promise<{
        orders: (import(".prisma/client").Order & {
            user: import(".prisma/client").User;
        })[];
        name: string;
    }>;
    findOrdersByUser(req: any, res: any): Promise<{
        orders: (import(".prisma/client").Order & {
            orderItems: import(".prisma/client").OrderItem[];
        })[];
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): string;
    remove(id: string): string;
}
